import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import logger from '@/lib/logger';

import Button from '@/components/buttons/Button';
import Input from '@/components/forms/Input';
import Layout from '@/components/layout/Layout';
import MockLogo from '@/components/MockLogo';
import Seo from '@/components/Seo';

import useAuthStore from '@/store/useAuthStore';

import api from '@/pages/api/axios';

export default function Page() {
  const methods = useForm({
    mode: 'onTouched',
  });

  const formData = methods.watch();
  const { login, isAuthenticated } = useAuthStore();

  const handleSubmit = async () => {
    try {
      const response = await api.post('/login', formData);
      const token = response.data?.data?.token;
      if (token !== null || token !== undefined) {
        login(token);
        toast.success(
          'Alright! However, we are still on beta. Please stay tune to our website',
        );
        // router.replace('/client/dashboard/');
      }
    } catch (e) {
      toast('error');
      logger({ error: e });
    }
  };

  return (
    <Layout>
      <Seo />

      <main>
        <section className='h-screen w-full bg-gray-200 flex justify-center items-center'>
          <div className='shadow-lg rounded w-11/12 md:w-4/12 bg-white py-8 px-16 flex flex-col gap-4'>
            <div className='flex flex-col items-center justify-center w-full'>
              <MockLogo />
              <div className='h-4' />
              <p className='text-xl font-bold text-blue-800'>Client Login</p>
              <p className='text-sm text-gray-400'>
                Where immersive experience starts...
              </p>
            </div>
            <div className='flex flex-col gap-4 mt-8'>
              <FormProvider {...methods}>
                <form
                  onSubmit={methods.handleSubmit(handleSubmit)}
                  className='max-w-full space-y-3'
                >
                  <Input label='Email' placeholder='email' id='email' />
                  <Input
                    label='Password'
                    type='password'
                    placeholder='password'
                    id='password'
                  />
                  <Button
                    className='w-full'
                    onClick={handleSubmit}
                    disabled={isAuthenticated}
                  >
                    Login
                  </Button>
                </form>
              </FormProvider>
            </div>
            <div className='h-px w-full bg-gray-200' />
            <div className='flex flex-col w-full gap-2'>
              <Button variant='outline' disabled={true}>
                Login with Google
              </Button>
              <Button variant='outline' disabled={true}>
                Login with Apple
              </Button>
            </div>
            <div className='h-px w-full mt-16' />
            <a className='w-full block' href='/client/register'>
              <Button className='w-full' variant='outline'>
                Haven't created an account?
              </Button>
            </a>
          </div>
        </section>
      </main>
    </Layout>
  );
}
