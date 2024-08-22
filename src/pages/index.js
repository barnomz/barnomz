import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>برنومز</title>
      </Head>
      <div></div>
    </>
  )
}

export async function getServerSideProps() {
  return {
    redirect: {
      destination: '/schedules',
      permanent: true,
    },
  }
}
