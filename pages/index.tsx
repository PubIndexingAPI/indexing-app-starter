// Path: pages\index.tsx

import Head from 'next/head'
import type { NextPage } from 'next';
import styles from '@/styles/Home.module.css'
import IndexingForm from '@/components/IndexingForm';
import Footer from '@/components/Footer';

const Home: NextPage = () => {

  return (
    <>
      <Head>
        <title>Indexing App Starter</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Indexing App Starter" />
        <meta name="robots" content="noindex,nofollow" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <main className={styles.main}>
        
        <h1>Indexing App Starter</h1>

        <p>Enter an RSS feed URL and the check interval.</p>

        <IndexingForm />

      </main>

      <Footer />
    </>
  )
}

export default Home;