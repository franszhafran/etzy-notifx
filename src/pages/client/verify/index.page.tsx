'use client';

import { AxiosError } from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import Button from '@/components/buttons/Button';
import Input from '@/components/forms/Input';
import Layout from '@/components/layout/Layout';
import MockLogo from '@/components/MockLogo';
import Seo from '@/components/Seo';

import api from '@/pages/api/axios';

type VerifyForm = {
  email: string;
  code: string;
};

export default function Page() {
  const params = useSearchParams();
  const router = useRouter();
  const email = params.get('email');

  const methods = useForm<VerifyForm>({
    mode: 'onTouched',
    defaultValues: {
      email: email ? email : '',
      code: '',
    },
  });

  const formData = methods.watch();

  // if (!email) {
  //   router.replace('/');
  //   return;
  // }

  const handleSubmit = async () => {
    try {
      const response = await api.post('/verify', formData);
      if (response.status === 201) {
        toast.success('Account verified! Sign in to start the journey!');
        router.replace('/client/login');
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e.response?.data.message instanceof Array) {
          const x: string[] = e.response.data.message;
          x.map((v) => {
            toast.error(v);
          });
          return;
        }
      }
      toast.error('Internal server error');
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
              <p className='text-xl font-bold'>Client Verify</p>
              <p className='text-sm text-gray-400'>
                Verify your identity by entering sent code!
              </p>
            </div>
            <div className='flex flex-col gap-4 mt-8'>
              <FormProvider {...methods}>
                <Input
                  label='Email'
                  placeholder='email'
                  id='email'
                  required={true}
                  defaultValue={email ? email : ''}
                  readOnly={true}
                />
                <Input
                  label='OTP Code'
                  placeholder='your OTP Code... check your WhatsApp'
                  id='code'
                  required={true}
                />
                <Button onClick={handleSubmit}>Verify</Button>
              </FormProvider>
            </div>
            <div className='h-px w-full bg-gray-200' />
            <div className='h-px w-full bg-white mt-16' />
            <a className='w-full block' href='/client/login'>
              <Button className='w-full' variant='outline'>
                Already created an account?
              </Button>
            </a>
          </div>
        </section>
      </main>
    </Layout>
  );
}
