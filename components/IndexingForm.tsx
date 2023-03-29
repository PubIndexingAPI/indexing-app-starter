import React, { useState, useRef } from 'react';
import styles from '@/styles/Form.module.css';

interface IndexingFormProps {}

const IndexingForm: React.FC = () => {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY || '';

  const [feedUrl, setFeedUrl] = useState('');
  const [interval, setInterval] = useState(60);
  const [output, setOutput] = useState('');
  const [stopFetching, setStopFetching] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const [status, setStatus] = useState('Ready');
  const [lastPing, setLastPing] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const stopFetchingRef = useRef(stopFetching);

  const checkRssFeed = async (interval: number) => {
    if (stopFetchingRef.current) return;
  
    const api_url = `/api/rss?feed=${encodeURIComponent(feedUrl)}&apiKey=${encodeURIComponent(apiKey)}`;
  
    try {
      const response = await fetch(api_url);
  
      if (response.ok) {
        const data = await response.json();
        const timestamp = new Date().toLocaleString();
  
        setOutput(
          `${timestamp} - Size: ${data.size ?? 'n/a'}, Size Changed: ${data.sizeChanged ?? 'n/a'}, WebSub Ping: ${data.webSubPingSuccess ?? 'n/a'}, Google Ping: ${data.googlePingSuccess ?? 'n/a'}\n${output}`
        );
  
        if (data.sizeChanged) {
          setLastPing(timestamp);
        }
      } else {
        const text = await response.text();
        setOutput(`Error: ${response.status} - ${text}\n${output}`);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setOutput(`Error: ${error.message}\n${output}`);
      } else {
        setOutput(`Error: ${String(error)}\n${output}`);
      }
    }
  
    const id = setTimeout(() => checkRssFeed(interval), interval * 1000);
    setTimeoutId(id);
  };  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setStopFetching(false);
    stopFetchingRef.current = false;
    setStatus('🟢 Running');
    checkRssFeed(interval);
  };

  const handleStop = () => {
    setStopFetching(true);
    stopFetchingRef.current = true;
    setStatus('🔴 Stopped');
    if (timeoutId) clearTimeout(timeoutId);
  };

  const handleFeedUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFeedUrl(e.target.value);
  };

  const handleIntervalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInterval(Number(e.target.value));
  };

  return (
    <div className={styles.container}>
      <div>
        <form onSubmit={handleSubmit}>
          <label>RSS Feed URL:</label>
          <input
            type="url"
            placeholder="https://example.com/feed/"
            pattern="https://.*"
            value={feedUrl}
            onChange={handleFeedUrlChange}
            required
          />
          <label>Interval (seconds):</label>
          <input type="number" value={interval} onChange={handleIntervalChange} required />
          <span>
            <button type="submit">Submit</button>
            <button type="button" onClick={handleStop}>Stop</button>
            <p className={styles.status}>{status}</p>
          </span>
        </form>
      </div>
      {formSubmitted && (
        <>
          <div className={styles.response}>
            <p>Response:</p>
            <pre className={styles.output}>{output}</pre>
          </div>
          <div className={styles.ping}>
            <p className={styles.inline}>Last ping:</p>
            <pre className={styles.inlinePre}>{lastPing ? lastPing : 'None'}</pre>
          </div>
          <div>
            {(() => {
              const debugUrl = `https://pubsubhubbub.appspot.com/topic-details?hub.url=${encodeURIComponent(feedUrl)}`;
              return (
                <p className={styles.debug}>
                  <a href={debugUrl} target="_blank" rel="noopener noreferrer">
                    Debug
                  </a>
                </p>
              );
            })()}
          </div>
        </>
      )}
    </div>
  );
};

export default IndexingForm;