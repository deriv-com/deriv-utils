import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";

import styles from "./index.module.css";

type TExternalLinks = {
    href: string;
    imgSrc: string;
    alt: string;
}[];

const Home = () => {
    const {
        siteConfig: {
            title,
            tagline,
            customFields: { externalLinks },
        },
    } = useDocusaurusContext();

    return (
        <Layout title={title} description="Deriv Utility Library">
            <header className={clsx("hero hero--primary", styles.heroBanner)}>
                <div className="container">
                    <Heading as="h1" className="hero__title">
                        {title}
                    </Heading>
                    <p className="hero__subtitle">{tagline}</p>
                    <div className={styles.buttons}>
                        {(externalLinks as TExternalLinks).map(({ alt, href, imgSrc }) => (
                            <a href={href} key={href}>
                                <img src={imgSrc} alt={alt} />
                            </a>
                        ))}
                    </div>
                </div>
            </header>
        </Layout>
    );
};

export default Home;
