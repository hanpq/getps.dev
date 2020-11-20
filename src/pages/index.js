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
        imageUrl: 'img/misc-teleportation-script-imbued.svg',
        description: (
            <>
                GetPS.dev hosts a knowledgebase with misc scripts and snippets
            </>
        ),
    },
    {
        title: 'Modules',
        imageUrl: 'img/redes-colores.svg',
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
                Within the <code>blog</code> getps.dev publishes in dept guides and tutorials
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
            //title={`${siteConfig.title}`}
            title="Welcome"
            description="Getps.dev provides a portal of powershell scripts, modules, blog, knowledge base, tutorials, guides, tips and tricks">
            <header className={clsx('hero hero--primary', styles.heroBanner)}>
                <div className="container">
                    <h1 className="hero__title">{siteConfig.title}</h1>
                    <p className="hero__subtitle">{siteConfig.tagline}</p>
                    <div className={styles.buttons}>
                        <Link
                            className={clsx(
                                'button button--outline button--secondary button--lg',
                                styles.getStarted,
                            )}
                            to={useBaseUrl('docs/')}>
                            Get Started
            </Link>
                    </div>
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
