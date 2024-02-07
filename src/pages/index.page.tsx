import {
  Coins,
  Globe2,
  LayoutDashboard,
  Send,
  ShieldOff,
  TimerReset,
  Webhook,
} from 'lucide-react';
import Image from 'next/image';
import * as React from 'react';

import Button from '@/components/buttons/Button';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

export default function HomePage() {
  return (
    <Layout>
      <Seo />

      <main className=''>
        <Header />
        <section className='w-full bg-blue-800' id='home'>
          <div className='w-full bg-blue-800 flex justify-center items-center relative pt-16 '>
            <div className='hidden absolute md:flex w-full h-full justify-center items-center'>
              <div
                style={{ height: '1500px', width: '1500px' }}
                className='rounded-full bg-blue-700'
              ></div>
            </div>
            <div className='hidden absolute md:flex w-full h-full justify-center items-center'>
              <div
                style={{ height: '1200px', width: '1200px' }}
                className='rounded-full bg-blue-600'
              ></div>
            </div>
            <div className='hidden absolute md:flex w-full h-full justify-center items-center'>
              <div
                style={{ height: '900px', width: '900px' }}
                className='rounded-full bg-blue-500'
              ></div>
            </div>
            <div className='w-full md:w-9/12 flex flex-col justify-between md:flex-row'>
              <div className='text-white px-12 py-12 md:px-0 md:py-64 relative z-0'>
                <p className='font-bold text-white text-6xl notifx-font relative z-10'>
                  NotifX
                </p>
                <p className='text-xl font-regular'>
                  Worry free notification partner! <br /> Highly reliable at
                  lowest price!
                </p>
                <br></br>
                <br></br>
                <a href='/client/register'>
                  <Button variant='outline-blue' className='text-white'>
                    Get Started
                  </Button>
                </a>
              </div>
              <div className='flex items-end justify-center relative pb-12 md:pb-0'>
                <Image
                  alt='demo'
                  className='md:hidden'
                  src='/images/demo.png'
                  width={300}
                  height={300}
                  style={{ maxWidth: '80%' }}
                ></Image>
                <Image
                  alt='demo-mobile'
                  src='/images/demo-crop.webp'
                  className='hidden md:block'
                  style={{ maxWidth: 350 }}
                  width={350}
                  height={350}
                ></Image>
              </div>
            </div>
          </div>
        </section>
        <section className='bg-white relative' id='features'>
          <div className='w-full flex flex-col py-16 items-center gap-16'>
            <p className='text-center text-3xl text-blue-800 font-bold relative'>
              Features
              {/* <div className='h-1 w-8 bg-blue-500 absolute' style={{ top: '-0.5em', left: '-1em' }}></div> */}
            </p>
            <div className='w-9/12 grid md:grid-cols-3 gap-8 justify-between'>
              <div className='p-12 md:py-16 md:px-8 rounded-xl flex flex-col gap-4 items-center bg-blue-800 text-white hover:shadow-lg hover:bg-blue-700 cursor-pointer'>
                <Send className='block w-32 text-white h-32' />
                <p className='font-bold'>Whatsapp Notification</p>
                <p className='text-center'>
                  Empower your business with instant, direct communication
                  through WhatsApp notifications
                </p>
              </div>
              <div className='p-12 md:py-16 md:px-8 rounded-xl flex flex-col gap-4 items-center bg-blue-800 text-white hover:shadow-lg hover:bg-blue-700 cursor-pointer'>
                <LayoutDashboard className='block w-32 text-white h-32' />
                <p className='font-bold'>API Management</p>
                <p className='text-center'>
                  Effortlessly manage your WhatsApp notifications with our
                  powerful API management solution
                </p>
              </div>
              <div className='p-12 md:py-16 md:px-8 rounded-xl flex flex-col gap-4 items-center bg-blue-800 text-white hover:shadow-lg hover:bg-blue-700 cursor-pointer'>
                <Webhook className='block w-32 text-white h-32' />
                <p className='font-bold'>Webhook Call</p>
                <p className='text-center'>
                  Monitor status of sent messages, enabling transparency and
                  better user experience
                </p>
              </div>
              <div className='p-12 md:py-16 md:px-8 rounded-xl flex flex-col gap-4 items-center bg-blue-800 text-white hover:shadow-lg hover:bg-blue-700 cursor-pointer'>
                <Globe2 className='block w-32 text-white h-32' />
                <p className='font-bold'>Global Number Pool</p>
                <p className='text-center'>
                  Access a diverse range of numbers from across the globe,
                  ensuring reliable delivery and unmatched reach for your
                  messages
                </p>
              </div>
              <div className='p-12 md:py-16 md:px-8 rounded-xl flex flex-col gap-4 items-center bg-blue-800 text-white hover:shadow-lg hover:bg-blue-700 cursor-pointer'>
                <ShieldOff className='block w-32 text-white h-32' />
                <p className='font-bold text-center'>
                  Service Level Agreement (SLA)
                </p>
                <p className='text-center'>
                  Our commitment to excellence guarantees reliable performance,
                  ensuring uninterrupted communication with your audience
                </p>
              </div>
              <div className='p-12 md:py-16 md:px-8 rounded-xl flex flex-col gap-4 items-center bg-blue-800 text-white hover:shadow-lg hover:bg-blue-700 cursor-pointer'>
                <TimerReset className='block w-32 text-white h-32' />
                <p className='font-bold'>Spam Protection</p>
                <p className='text-center'>
                  Featured with pre-defined template, avoiding spams with our
                  AI-powered spam filter
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className='bg-blue-800' id='pricing'>
          <div className='w-full flex flex-col py-16 items-center gap-16 text-white'>
            <p className='text-center text-3xl font-bold'>Pricing</p>
            <div className='w-full px-12 md:px-0 md:w-9/12 flex gap-4 justify-between items-center'>
              <div className='rounded-xl text-white'>
                <p className='text-sm text-blue-400'>Free</p>
                <p className='text-2xl font-bold mb-8'>
                  10 messages<span className='text-xs font-normal'> /day</span>
                </p>
                <p className='text-blue-400'>Starts at</p>
                <p className='text-2xl md:text-6xl font-bold'>
                  Rp 50.000
                  <span className='text-sm font-normal'>
                    /1.000(+250) messages
                  </span>
                </p>
              </div>
              <div className=' text-black text-4xl'>
                <Coins className='hidden md:block h-64 w-64 text-white text-4xl'></Coins>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </Layout>
  );
}
