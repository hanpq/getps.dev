import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const buildMapUrl = (event) => {
    const baseUrl = 'https://www.google.com/maps/embed/v1/place';
    const apiKey = 'AIzaSyC_F0tKp_7AWtYENYCGFzjUOH28DJxJZVw';

    // Build query parameters
    const params = new URLSearchParams({
        key: apiKey,
        q: event.map
    });

    // Add zoom level (1-21, default 15)
    if (event.mapZoom !== undefined) {
        const zoom = Math.max(1, Math.min(21, parseInt(event.mapZoom)));
        params.append('zoom', zoom);
    }

    // Add map type (roadmap, satellite, hybrid, terrain)
    if (event.mapType) {
        const validTypes = ['roadmap', 'satellite', 'hybrid', 'terrain'];
        if (validTypes.includes(event.mapType.toLowerCase())) {
            params.append('maptype', event.mapType.toLowerCase());
        }
    }

    return `${baseUrl}?${params.toString()}`;
};

const Timeline = ({ events, startMarker, endMarker, reverse = false }) => {
    // Sort events by date
    let sortedEvents = [...events].sort((a, b) => new Date(a.date) - new Date(b.date));

    // Reverse the order if requested
    if (reverse) {
        sortedEvents = sortedEvents.reverse();
    }

    const getTypeIcon = (type) => {
        switch (type) {
            case 'text':
                return '📝';
            case 'image':
                return '🖼️';
            case 'map':
                return '🗺️';
            default:
                return '📅';
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const renderContent = (event) => {
        switch (event.type) {
            case 'image':
                return (
                    <div className={styles.timelineContent}>
                        {event.text && <p className={styles.timelineText}>{event.text}</p>}
                        {event.imageUrl && (
                            <img
                                src={event.imageUrl}
                                alt={event.title}
                                className={styles.timelineImage}
                            />
                        )}
                    </div>
                );

            case 'map':
                return (
                    <div className={styles.timelineContent}>
                        {event.text && <p className={styles.timelineText}>{event.text}</p>}
                        {event.map && (
                            <div className={styles.timelineMap}>
                                <iframe
                                    src={buildMapUrl(event)}
                                    width="100%"
                                    height={event.mapHeight || 200}
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title={`Map of ${event.title}`}
                                />
                                <p className={styles.mapFallback}>
                                    📍 <a href={`https://maps.google.com/?q=${encodeURIComponent(event.map)}`} target="_blank" rel="noopener noreferrer">
                                        {event.map}
                                    </a>
                                </p>
                            </div>
                        )}
                    </div>
                );

            case 'text':
            default:
                return (
                    <div className={styles.timelineContent}>
                        {event.text && <p className={styles.timelineText}>{event.text}</p>}
                    </div>
                );
        }
    };

    const renderMarker = (marker, isStart = true) => {
        if (!marker) return null;

        return (
            <div className={clsx(
                styles.timelineTerminal,
                isStart ? styles.timelineStart : styles.timelineEnd
            )}>
                <div className={styles.timelineTerminalMarker}>
                    <span className={styles.timelineTerminalIcon}>
                        {marker.icon || (isStart ? '🚀' : '🏁')}
                    </span>
                    <span className={styles.timelineTerminalText}>
                        {marker.text || (isStart ? 'Start' : 'End')}
                    </span>
                </div>
            </div>
        );
    };

    return (
        <div className={clsx(styles.timeline, reverse && styles.timelineReversed)}>
            <div className={styles.timelineLine}></div>
            {reverse ? renderMarker(endMarker, false) : renderMarker(startMarker, true)}
            {sortedEvents.map((event, index) => (
                <div
                    key={index}
                    className={clsx(
                        styles.timelineItem,
                        index % 2 === 0 ? styles.timelineLeft : styles.timelineRight
                    )}
                >
                    <div className={styles.timelineMarker}>
                        <span className={styles.timelineIcon}>{getTypeIcon(event.type)}</span>
                    </div>
                    <div className={styles.timelineCard}>
                        <div className={styles.timelineHeader}>
                            <h3 className={styles.timelineTitle}>
                                {event.link ? (
                                    <a
                                        href={event.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.timelineTitleLink}
                                    >
                                        {event.title}
                                    </a>
                                ) : (
                                    event.title
                                )}
                            </h3>
                            <span className={styles.timelineDate}>{formatDate(event.date)}</span>
                        </div>
                        {renderContent(event)}
                    </div>
                </div>
            ))}
            {reverse ? renderMarker(startMarker, true) : renderMarker(endMarker, false)}
        </div>
    );
};

export default Timeline;
