import { type NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Home Page</title>
        <meta name="description" content="Shopping @ our website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center"></main>
    </>
  );
};

export default Home;
