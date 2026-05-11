import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const destinations = [
    {
        title: 'Blog: Scripts, Guides, and Deep Dives',
        imageUrl: 'img/coding-svgrepo-com.svg',
        to: '/blog/',
        cta: 'Open the Blog',
        description: (
            <>
                Explore practical PowerShell posts, tutorials, and real-world troubleshooting write-ups.
            </>
        ),
    },
    {
        title: 'Module Documentation',
        imageUrl: 'img/delivery-box-svgrepo-com.svg',
        to: '/modules/',
        cta: 'Browse Modules',
        description: (
            <>
                Find docs, usage examples, and installation details for modules published on GetPS.dev.
            </>
        ),
    },
    {
        title: 'Exchange Version Reference',
        imageUrl: 'img/Question-Girl.svg',
        to: '/exchangeversions/',
        cta: 'Open Exchange Versions',
        description: (
            <>
                Quickly check Exchange build numbers, release history, and version details in one place.
            </>
        ),
    },
    {
        title: 'About the Author',
        imageUrl: 'img/Question-Girl.svg',
        to: '/about',
        cta: 'Go to Author',
        description: (
            <>
                Learn more about the author, their background, and their contributions to the PowerShell community.
            </>
        ),
    },
];

function DestinationCard({ imageUrl, title, description, to, cta }) {
    const imgUrl = useBaseUrl(imageUrl);
    return (
        <div className={clsx('col col--6 margin-bottom--lg')}>
            <Link className={styles.cardLink} to={to}>
                <div className={styles.destinationCard}>
                    {imgUrl && (
                        <div className="text--center">
                            <img className={styles.featureImage} src={imgUrl} alt={title} />
                        </div>
                    )}
                    <h3>{title}</h3>
                    <p>{description}</p>
                    <span className={styles.cardCta}>{cta}</span>
                </div>
            </Link>
        </div>
    );
}

function Home() {
    const context = useDocusaurusContext();
    const { siteConfig = {} } = context;
    return (
        <Layout
            title="GetPS.dev - PowerShell Scripts, Modules, Tutorials & Exchange Server Resources"
            description="The PowerShell resource hub. Download free PowerShell modules (PSMQTT, PSImmich, PSPortainer), find scripts, tutorials, and the most comprehensive Exchange Server version database. Perfect for PowerShell developers and system administrators.">
            <header className={clsx('hero hero--primary', styles.heroBanner)}>
                <div className="container">
                    <h1 className={clsx('hero__title', styles.heroTitle)}>{siteConfig.title}</h1>
                </div>
            </header>
            <main>
                {destinations && destinations.length > 0 && (
                    <section className={styles.features}>
                        <div className="container">
                            <h2 className={styles.sectionTitle}>Start Here</h2>
                            <p className={styles.sectionLead}>
                                Choose your destination. Every section below is clickable and takes you straight to the content.
                            </p>
                            <div className="row">
                                {destinations.map((props, idx) => (
                                    <DestinationCard key={idx} {...props} />
                                ))}
                            </div>
                        </div>
                    </section>
                )}
            </main>
        </Layout>
    );
}

export default Home;
