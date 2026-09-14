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

/**
 * Progressively enhances a markdown table (passed as children) with a compact
 * layout plus client-side filtering. The original table is what renders during
 * SSR/no-JS, so content and SEO are unaffected; authors keep editing plain
 * markdown tables.
 */
export default function EnhancedTable({ children }) {
    const originalRef = useRef(null);
    const [headers, setHeaders] = useState([]);
    const [rows, setRows] = useState([]);
    const [colWidths, setColWidths] = useState([]);
    const [ready, setReady] = useState(false);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        const table = originalRef.current?.querySelector('table');
        if (!table) return;

        const headerCells = Array.from(table.querySelectorAll('thead th'));
        const parsedHeaders = headerCells.map((th) => th.textContent.trim());
        const bodyRows = Array.from(table.querySelectorAll('tbody tr'));

        // Measure the widest cell per column across the full dataset (while the
        // original table still uses auto layout) so the fixed-layout table gets
        // the same natural proportions but stays stable when rows are filtered.
        const maxWidths = headerCells.map((th) => th.getBoundingClientRect().width);
        bodyRows.forEach((tr) => {
            Array.from(tr.children).forEach((td, idx) => {
                if (idx < maxWidths.length) {
                    maxWidths[idx] = Math.max(maxWidths[idx], td.getBoundingClientRect().width);
                }
            });
        });
        const totalWidth = maxWidths.reduce((a, b) => a + b, 0) || 1;
        const widths = maxWidths.map((w) => (w / totalWidth) * 100);

        const parsedRows = bodyRows.map((tr) => {
            const cells = Array.from(tr.children).map((td) => ({
                html: td.innerHTML,
                text: cellText(td),
            }));
            const rowText = cells.map((c) => c.text).join(' ').toLowerCase();
            return { cells, isLatest: /\blatest\b/i.test(rowText) };
        });

        setHeaders(parsedHeaders);
        setColWidths(widths);
        setRows(parsedRows);
        setReady(true);
    }, [children]);

    const visibleRows = useMemo(() => {
        const needle = filter.trim().toLowerCase();
        if (!needle) return rows;
        return rows.filter((r) => r.cells.some((c) => c.text.toLowerCase().includes(needle)));
    }, [rows, filter]);

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
                            <colgroup>
                                {colWidths.map((w, idx) => (
                                    <col key={idx} style={{ width: `${w}%` }} />
                                ))}
                            </colgroup>
                            <thead>
                                <tr>
                                    {headers.map((h, idx) => (
                                        <th key={idx} className={styles.th}>
                                            {h}
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
