// Path: pages\index.tsx

import Head from 'next/head'
import type { NextPage } from 'next';
import styles from '@/styles/Home.module.css'
import IndexingForm from '@/components/IndexingForm';
import Footer from '@/components/Footer';

const Home: NextPage = () => {

  const apiKey = 'your_api_key';

  return (
    <>
      <Head>
        <title>Indexing App Starter</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.main}>
        
      <h1>Indexing App Starter</h1>

      <p>Enter an RSS feed URL and the interval (in seconds) to check the feed.</p>

      <IndexingForm apiKey={apiKey} />

      </main>

      <Footer />
    </>
  )
}

export default Home;