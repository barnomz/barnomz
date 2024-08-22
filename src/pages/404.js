import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import BLink from '@/components/dls/BLink'
import Head from 'next/head'

export default function Custom404() {
  return (
    <>
      <Head>
        <title>برنومز | ۴۰۴</title>
      </Head>
      <div className='flex flex-col items-center justify-center gap-8 p-8 sm:p-16'>
        <h1 className='text-9xl font-bold text-grey-400'>۴۰۴</h1>
        <h2 className='mb-2 text-center text-2xl font-bold text-white'>
          صفحه‌ای که دنبالش بودید یافت نشد...
        </h2>
        <BLink
          to='/'
          iconSize='1x'
          postIcon={faArrowLeft}
          className='mx-auto max-w-fit'
        >
          بازگشت به صفحه اصلی
        </BLink>
      </div>
    </>
  )
}
