import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import Button from '@/components/buttons/Button';
import Input from '@/components/forms/Input';
import Layout from '@/components/layout/Layout';
import MockLogo from '@/components/MockLogo';
import Seo from '@/components/Seo';

import api from '@/pages/api/axios';

export default function Page() {
  const methods = useForm({
    mode: 'onTouched',
  });

  const formData = methods.watch();

  const handleSubmit = async () => {
    try {
      const response = await api.post('/register', formData);
      if (response.status === 201) {
        toast.success('Account created! Sign in to start the journey!');
      }
    } catch {
      toast('error');
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
                />
                <Input
                  label='Email'
                  placeholder='email'
                  id='email'
                  required={true}
                />
                <Input
                  label='Phone Number'
                  placeholder='phone number'
                  id='phone'
                  required={true}
                />
                <Input
                  label='Password'
                  placeholder='password'
                  type='password'
                  id='password'
                  required={true}
                  validation={{ minLength: 8 }}
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
