import React, { useEffect, useMemo, useRef, useState } from 'react';
import styles from './styles.module.css';

// Decodes a shields.io badge image URL (e.g. .../badge/Security%20Update-8A2BE2)
// into its label text, since markdown badges (![][Ref]) render with an empty alt attribute.
function decodeBadgeLabel(src) {
    const match = src.match(/\/badge\/([^/]+)-[0-9A-Fa-f]{6}$/) || src.match(/\/badge\/([^/]+)-[A-Za-z]+$/);
    if (!match) return '';
    return decodeURIComponent(match[1]).replace(/%20/g, ' ').replace(/\+/g, ' ');
}

function cellText(td) {
    const text = td.textContent.trim();
    const imgLabels = Array.from(td.querySelectorAll('img'))
        .map((img) => decodeBadgeLabel(img.getAttribute('src') || ''))
        .filter(Boolean)
        .join(' ');
    return [text, imgLabels].filter(Boolean).join(' ');
}

const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });

/**
 * Progressively enhances a markdown table (passed as children) with a compact
 * layout plus client-side sorting and filtering. The original table is what
 * renders during SSR/no-JS, so content and SEO are unaffected; authors keep
 * editing plain markdown tables.
 */
export default function EnhancedTable({ children }) {
    const originalRef = useRef(null);
    const [headers, setHeaders] = useState([]);
    const [rows, setRows] = useState([]);
    const [ready, setReady] = useState(false);
    const [filter, setFilter] = useState('');
    const [sort, setSort] = useState({ col: -1, dir: 'asc' });

    useEffect(() => {
        const table = originalRef.current?.querySelector('table');
        if (!table) return;

        const headerCells = Array.from(table.querySelectorAll('thead th'));
        const parsedHeaders = headerCells.map((th) => th.textContent.trim());

        const bodyRows = Array.from(table.querySelectorAll('tbody tr'));
        const parsedRows = bodyRows.map((tr) => {
            const cells = Array.from(tr.children).map((td) => ({
                html: td.innerHTML,
                text: cellText(td),
            }));
            const rowText = cells.map((c) => c.text).join(' ').toLowerCase();
            return { cells, isLatest: /\blatest\b/i.test(rowText) };
        });

        setHeaders(parsedHeaders);
        setRows(parsedRows);
        setReady(true);
    }, [children]);

    const visibleRows = useMemo(() => {
        const needle = filter.trim().toLowerCase();
        let result = rows;
        if (needle) {
            result = rows.filter((r) => r.cells.some((c) => c.text.toLowerCase().includes(needle)));
        }
        if (sort.col >= 0) {
            result = [...result].sort((a, b) => {
                const av = a.cells[sort.col]?.text ?? '';
                const bv = b.cells[sort.col]?.text ?? '';
                const cmp = collator.compare(av, bv);
                return sort.dir === 'asc' ? cmp : -cmp;
            });
        }
        return result;
    }, [rows, filter, sort]);

    function handleSort(colIndex) {
        setSort((prev) => {
            if (prev.col !== colIndex) return { col: colIndex, dir: 'asc' };
            if (prev.dir === 'asc') return { col: colIndex, dir: 'desc' };
            return { col: -1, dir: 'asc' };
        });
    }

    return (
        <div className={styles.wrapper}>
            <div ref={originalRef} className={ready ? styles.hidden : undefined}>
                {children}
            </div>
            {ready && (
                <>
                    <div className={styles.toolbar}>
                        <input
                            type="search"
                            placeholder="Filter this table…"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className={styles.filterInput}
                            aria-label="Filter table rows"
                        />
                        <span className={styles.count}>
                            {visibleRows.length} / {rows.length} rows
                        </span>
                    </div>
                    <div className={styles.tableScroll}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    {headers.map((h, idx) => (
                                        <th
                                            key={idx}
                                            onClick={() => handleSort(idx)}
                                            className={styles.th}
                                            title="Click to sort"
                                        >
                                            <span className={styles.thLabel}>
                                                {h}
                                                <span className={styles.sortIndicator}>
                                                    {sort.col === idx ? (sort.dir === 'asc' ? ' \u25B2' : ' \u25BC') : ''}
                                                </span>
                                            </span>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {visibleRows.map((row, i) => (
                                    <tr key={i} className={row.isLatest ? styles.latestRow : undefined}>
                                        {row.cells.map((c, j) => (
                                            // eslint-disable-next-line react/no-danger
                                            <td key={j} dangerouslySetInnerHTML={{ __html: c.html }} />
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
}
