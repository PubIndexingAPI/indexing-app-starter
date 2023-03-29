# Indexing App Starter - from Pub Index API

This is a simple indexing app starter that utilizes the Pub Index API. Follow the instructions below to set up the app and the environment variable.

## Prerequisites

- [API Key](https://docs.pubindexapi.com/docs/api-keys). If you do not already have one please visit the API dashboard https://app.pubindexapi.com/.

- pnpm, Yarn or npm.

## Installation

1. Clone the repository:

```
git clone https://github.com/PubIndexingAPI/indexing-app-starter.git
```

2. Change the directory:

```
cd indexing-app-starter
```

3. Install dependencies:

Using pnpm:

```
pnpm install
```

Using Yarn:

```
yarn install
```

Using npm:

```
npm install
```

## Setting up the environment variable

To safely store your API key, add your PubIndexAPI API key as an environment variable `NEXT_PUBLIC_API_KEY`.

Locally, create a `.env.local` file and add:

```
NEXT_PUBLIC_API_KEY=YOUR-API-KEY
```

Replace YOUR-API-KEY with your actual API key.

On the server/live environment, add the `NEXT_PUBLIC_API_KEY` environment variable with the value as your API key.

## Running the app

Using pnpm:

```
pnpm dev
```

Using Yarn:

```
yarn dev
```

Using npm:

```
npm run dev
```

## Documentation

The app as it is currently set up uses the `api/rss` endpoint, however you can customise this or any other part of the code to your requirements.

For more information, see the Pub Index API documentation at https://docs.pubindexapi.com/docs/indexing-app-starter.
