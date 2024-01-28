import { InfoIcon } from 'lucide-react';
import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import Button from '@/components/buttons/Button';
import Input from '@/components/forms/Input';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Seo from '@/components/Seo';

import api from '@/pages/api/axios';

import APIKey from '@/types/entities/api_key';

type APIManagementForm = {
  key: string;
  secret: string;
  callback_url?: string;
};

export default function Page() {
  const methods = useForm<APIManagementForm>({
    mode: 'onTouched',
  });

  const formData = methods.watch();

  const save = async () => {
    try {
      await api.post('/api-key/callback-url', formData);
      toast.success("Callback URL saved! Let's give it a try!");
    } catch {
      toast('error');
    }
  };

  // #region //* ========= Fetch API Key =========
  const [apiKey, setAPIKey] = React.useState<APIKey>();
  const url = `/api-key`;

  React.useEffect(() => {
    api
      .get(url)
      .then((res) => res.data.data)
      .then((d: APIKey) => {
        setAPIKey(d);
      });
  }, [url]);
  // #endregion //* ========= Fetch API Key =========

  // #region //* ========= Test Callback =========
  const testCallbackURL = `/api-key/webhook-test`;
  const [callbackResult, setCallbackResult] = React.useState(null);

  const testCallback = () => {
    api
      .post(testCallbackURL)
      .then((res) => res.data.data)
      .then((d) => {
        setCallbackResult(d);
      });
  };
  // #endregion //* ========= Test Callback =========

  return (
    <DashboardLayout>
      <Seo />

      <main>
        <section className='w-full flex flex-col p-16'>
          <div className='w-full min-h-full flex flex-col bg-white p-10 shadow-md gap-4 rounded-lg'>
            <p className='text-4xl font-semibold text-blue-500'>
              API Access Management
            </p>
            <p className='w-full md:w-1/2 text-sm text-gray-500'>
              Unlock the power of effortless API management with our
              user-friendly access page designed just for you. Managing API
              access has never been this easy!
            </p>
            <div className='h-px bg-gray-200 w-full'></div>
            <div className='w-full md:w-1/2 flex flex-col gap-4'>
              <FormProvider {...methods}>
                <Input
                  label='API ID'
                  id='id'
                  readOnly={true}
                  value={apiKey?.key}
                ></Input>
                <Input
                  label='API Secret'
                  id='secret'
                  readOnly={true}
                  value={apiKey?.secret}
                ></Input>
                <div>
                  <Button variant='primary' disabled={true}>
                    Recreate secure secret key
                  </Button>
                </div>
                <Input
                  label='Callback URL'
                  id='callback_url'
                  defaultValue={apiKey?.callback_url}
                ></Input>
                <div className='flex gap-4'>
                  <Button variant='primary' onClick={save}>
                    Save
                  </Button>
                  <Button variant='outline' onClick={testCallback}>
                    Send a test webhook
                  </Button>
                </div>
                {callbackResult ? (
                  <div className='w-full overflow-x flex flex-col'>
                    <pre className='whitespace-wrap overflow-x'>
                      {JSON.stringify(callbackResult, null, 2)}
                    </pre>
                    <div className='w-full flex flex-row gap-2'>
                      <InfoIcon width={20}> </InfoIcon>
                      <p className='text-gray-500 text-sm'>
                        We provide signature_raw for ease of development. Raw
                        signature won't be given in production.
                      </p>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </FormProvider>
            </div>
          </div>
        </section>
      </main>
    </DashboardLayout>
  );
}
