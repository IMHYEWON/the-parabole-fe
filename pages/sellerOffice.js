import Head from 'next/head';
import SellerLayout from '@components/seller/SellerLayout';

export default function Home() {
  return (
    <SellerLayout>
      <Head>
        <title>The Parabole Seller Office</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="flex min-h-screen flex-col text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <h1>THE PARABOLE SELLER OFFICE</h1>
        </div>
      </section>
    </SellerLayout>
  );
}
