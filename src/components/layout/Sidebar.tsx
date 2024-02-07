import { Code2, GaugeCircle, LayoutPanelTop, LogOut } from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import * as React from 'react';

import clsxm from '@/lib/clsxm';
import useDialog from '@/hooks/useDialog';

import useAuthStore from '@/store/useAuthStore';

export default function Sidebar() {
  const currentPath = usePathname();

  const dialog = useDialog();
  const auth = useAuthStore();
  const router = useRouter();

  const logoutDialog = () => {
    dialog({
      title: 'Logout',
      description: 'Are you sure you want to log out from your account?',
      submitText: 'Yes',
      variant: 'danger',
      catchOnCancel: false,
    }).then(() => {
      auth.logout();
      router.replace('/client/login');
    });
  };

  const menus = [
    {
      redirectTo: '/client/dashboard',
      icon: <GaugeCircle className='inline' />,
      text: 'Dashboard',
      activeFunc: (path: string) => {
        return '/client/dashboard' === path;
      },
    },
    {
      redirectTo: '/client/dashboard/template',
      icon: <LayoutPanelTop className='inline' />,
      text: 'Templates',
    },
    {
      redirectTo: '/client/dashboard/api',
      icon: <Code2 className='inline' />,
      text: 'API Management',
    },
  ];
  return (
    <nav className='col-span-2 h-full relative flex gap-4 p-4 flex-col bg-blue-700'>
      <div className='w-full flex flex-col items-center justify-center'>
        <div className='bg-white rounded-lg p-2 px-4'>
          <Image alt='logo' src='/images/logo.png' height={16} width={110} />
        </div>
        <span className='mt-2 bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300'>
          Beta
        </span>
      </div>
      <div className='w-full flex flex-col gap-2 mt-8 items-center'>
        {menus.map((v) => {
          return (
            <a
              key={v.text}
              className={clsxm(
                'w-full p-2 cursor-pointer hover:bg-blue-600 rounded text-gray-100',
                currentPath.includes(v.redirectTo) &&
                  (v.activeFunc === undefined || v.activeFunc?.(currentPath))
                  ? `bg-blue-600`
                  : ``,
              )}
              href={v.redirectTo}
            >
              <div className=''>
                {v.icon} {v.text}
              </div>
            </a>
          );
        })}
      </div>
      <div className='bottom-0 left-0 absolute w-full flex flex-col p-4 gap-2 mt-8 items-center'>
        <div
          onClick={logoutDialog}
          className='w-full p-2 cursor-pointer rounded text-gray-300 text-xs'
        >
          <LogOut className='inline' />
        </div>
      </div>
    </nav>
  );
}
