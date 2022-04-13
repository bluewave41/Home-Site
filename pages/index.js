import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/Link';

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Home Site</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1>At a glance view</h1>
                <Link href='/shopping'>
                    <a>
                        Home
                    </a>
                </Link>
            </main>
        </div>
    )
}
