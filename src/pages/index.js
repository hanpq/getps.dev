import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const features = [
    {
        title: 'Scripts and Snippets',
        imageUrl: 'img/coding-svgrepo-com.svg',
        description: (
            <>
                GetPS.dev hosts a knowledge base with misc scripts and snippets
            </>
        ),
    },
    {
        title: 'Modules',
        imageUrl: 'img/delivery-box-svgrepo-com.svg',
        description: (
            <>
                Here you will find <code>docs</code> for the modules developed and published by getps.dev
            </>
        ),
    },
    {
        title: 'Guides and tutorials',
        imageUrl: 'img/Question-Girl.svg',
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
        cta: 'Go to About',
        description: (
            <>
                Learn more about the author, their background, and their contributions to the PowerShell community.
            </>
        ),
    },
];

function Feature({ imageUrl, title, description }) {
    const imgUrl = useBaseUrl(imageUrl);
    return (
        <div className={clsx('col col--4', styles.feature)}>
            {imgUrl && (
                <div className="text--center">
                    <img className={styles.featureImage} src={imgUrl} alt={title} />
                </div>
            )}
            <h3>{title}</h3>
            <p>{description}</p>
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
                {features && features.length > 0 && (
                    <section className={styles.features}>
                        <div className="container">
                            <div className="row">
                                {features.map((props, idx) => (
                                    <Feature key={idx} {...props} />
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
