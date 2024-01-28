import { ExternalLinkIcon } from 'lucide-react';
import * as React from 'react';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Seo from '@/components/Seo';

function HowToBegin() {
  const contents = [
    <>
      Define your own template with configurable parameters those could be
      customized for every messages. You could define templates by our dashboard
      or using our API, read{' '}
      <a href='#' className='text-blue-500'>
        more. <ExternalLinkIcon className='inline w-4' />
      </a>{' '}
    </>,
    <>
      Configure your API Access Key to start using our messaging API. Define
      your callback URL to tell us where to inform updated message status.{' '}
      <br /> Remember, each callback hit must be responed with{' '}
      <span className='text-green-400 font-bold'>200</span> HTTP status and will
      be retried for 3 times.
    </>,
    <>
      Congrats! You are ready to sent Whatsapp Notifications using our API. Read{' '}
      <a href='#' className='text-blue-500'>
        {' '}
        here <ExternalLinkIcon className='inline w-4' />
      </a>{' '}
      for technical details and more
    </>,
  ];

  return (
    <section className='w-full flex flex-col px-16 py-4'>
      <div className='w-full flex flex-col bg-white p-10 shadow-md gap-10 gap-y-4 rounded-lg'>
        <p className='font-bold text-xl text-blue-500'>How to Begin</p>
        {contents.map((v, i) => {
          return (
            <div
              key={i}
              className='w-full flex flex-col md:flex-row items-center gap-2'
            >
              <div className='border rounded-full text-white font-semibold bg-blue-500 w-12 h-12 text-center flex items-center justify-center'>
                <span>{i + 1}</span>
              </div>
              <p className='text-gray-500'>{contents[i]}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
export default function Page() {
  return (
    <DashboardLayout>
      <Seo />
      <main>
        <section className='w-full flex flex-col px-16 py-4'>
          <div className='w-full grid grid-cols-4 bg-white p-10 shadow-md gap-10 gap-y-4 rounded-lg'>
            <div className='col-span-4'>
              <p className='font-bold text-xl text-blue-500'>Usage Statitics</p>
            </div>
            <div className='flex flex-col gap-2 border-2 border-gray-200 rounded-lg p-4'>
              <p className='text-sm text-gray-500'>Total Sent (messages)</p>
              <p className='text-6xl  text-blue-500 font-semibold'>2.000</p>
            </div>
            <div className='flex flex-col gap-2 border-2 border-gray-200 rounded-lg p-4'>
              <p className='text-sm text-gray-500'>Quota Left (messages)</p>
              <p className='text-6xl  text-blue-500 font-semibold'>2.000</p>
            </div>
            <div className='flex flex-col gap-2 border-2 border-gray-200 rounded-lg p-4'>
              <p className='text-sm text-gray-500'>Undelivered (messages)</p>
              <p className='text-6xl  text-blue-500 font-semibold'>2.000</p>
            </div>
            <div className='flex flex-col gap-2 border-2 border-gray-200 rounded-lg p-4'>
              <p className='text-sm text-gray-500'>Success Rate (%)</p>
              <p className='text-6xl  text-blue-500 font-semibold'>2.000</p>
            </div>
          </div>
        </section>
        <HowToBegin />
      </main>
    </DashboardLayout>
  );
}
