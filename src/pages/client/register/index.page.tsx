import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import Button from '@/components/buttons/Button';
import Input from '@/components/forms/Input';
import Layout from '@/components/layout/Layout';
import MockLogo from '@/components/MockLogo';
import Seo from '@/components/Seo';

import api from '@/pages/api/axios';

import { ApiError } from '@/types/api';

type RegisterForm = {
  name: string;
  email: string;
  phone: string;
  password: string;
};

export default function Page() {
  const methods = useForm<RegisterForm>({
    mode: 'onTouched',
  });

  const formData = methods.watch();
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      const response = await api.post('/register', formData);
      if (response.status === 201) {
        toast.success('Account created! Let us verify you!');
        router.push('/client/verify?email=' + formData.email);
      }
    } catch (e: unknown) {
      if (e instanceof AxiosError) {
        const data = e.response?.data as ApiError;
        if (data.message instanceof String) {
          toast.error(data.message as string);
          return;
        }
        if (data.message !== undefined && data.message !== null) {
          const messages = data.message as string[];
          messages.map((v) => {
            toast.error(v);
          });
          return;
        }
      }
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
              <p className='text-xl font-bold'>Client Register</p>
              <p className='text-sm text-gray-400'>Let us get to know you!</p>
            </div>
            <div className='flex flex-col gap-4 mt-8'>
              <FormProvider {...methods}>
                <Input
                  label='Name'
                  placeholder='name'
                  id='name'
                  required={true}
                  validation={{
                    minLength: {
                      value: 8,
                      message: 'Name must be longer than 8 chararacters',
                    },
                    required: 'Name is required',
                  }}
                />
                <Input
                  label='Email'
                  placeholder='email'
                  id='email'
                  required={true}
                  validation={{
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Please provide valid email address',
                    },
                    required: 'Email is required',
                  }}
                />
                <Input
                  label='Phone Number'
                  placeholder='with country code. e.g. 6281320207000'
                  id='phone'
                  required={true}
                  validation={{
                    pattern: {
                      value: /^\d{1,3}\s?\d{3,}$/,
                      message:
                        'Phone number with country code. e.g. 6281320207000',
                    },
                    required: 'Phone number is required',
                  }}
                />
                <Input
                  label='Password'
                  placeholder='password'
                  type='password'
                  id='password'
                  required={true}
                  validation={{
                    minLength: {
                      value: 8,
                      message: 'Password must be longer than 8 chararacters',
                    },
                    required: 'Password is required',
                  }}
                />
                <Button onClick={handleSubmit}>Register</Button>
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
