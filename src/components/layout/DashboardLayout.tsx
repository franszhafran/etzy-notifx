import * as React from 'react';

import BaseDialog from '@/components/dialog/BaseDialog';
import Sidebar from '@/components/layout/Sidebar';

import useDialogStore from '@/store/useDialogStore';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //#region  //*=========== Store ===========
  const open = useDialogStore.useOpen();
  const state = useDialogStore.useState();
  const handleClose = useDialogStore.useHandleClose();
  const handleSubmit = useDialogStore.useHandleSubmit();
  //#endregion  //*======== Store ===========

  return (
    <div className='w-full grid grid-cols-12 overflow-y-auto'>
      <Sidebar />
      <div className='col-span-10 h-screen overflow-y-auto'>{children}</div>
      <BaseDialog
        onClose={handleClose}
        onSubmit={handleSubmit}
        open={open}
        options={state}
      />
    </div>
  );
}
