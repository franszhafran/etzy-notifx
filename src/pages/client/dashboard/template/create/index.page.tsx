'use strict';

import { useRouter } from 'next/navigation';
import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import api from '@/lib/axios';

import Button from '@/components/buttons/Button';
import TextArea from '@/components/forms/TextArea';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Seo from '@/components/Seo';

export default function TablePage() {
  const router = useRouter();
  const methods = useForm({
    mode: 'onTouched',
  });

  const formData = methods.watch();
  const handleSubmit = async () => {
    try {
      const response = await api.post('/client/template', formData);
      if (response.status === 201) {
        toast.success('New template has been created');
        router.push('/client/dashboard/template');
      }
    } catch (e) {
      toast.error('Server error. Please try again.');
    }
  };

  return (
    <DashboardLayout>
      <Seo />

      <main>
        <section className='w-full flex flex-col p-16'>
          <div className='w-full min-h-full flex flex-col bg-white p-10 shadow-md gap-2 rounded-lg'>
            <p className='text-4xl font-semibold text-blue-500'>Templates</p>
            <p className='w-full md:w-1/2 text-gray-500'>
              Predefined template for your Whatsapp Notification messages
            </p>
            <div className='h-px bg-gray-200 w-full mb-4'></div>
            <FormProvider {...methods}>
              <TextArea label='Template' id='template'></TextArea>
              <div>
                <Button variant='primary' onClick={handleSubmit}>
                  Create
                </Button>
              </div>
            </FormProvider>
          </div>
        </section>
      </main>
    </DashboardLayout>
  );
}
