'use strict';

import { useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { PlusIcon, Trash } from 'lucide-react';
import * as React from 'react';

import api from '@/lib/axios';
import { buildPaginatedTableURL } from '@/lib/table';
import useDialog from '@/hooks/useDialog';
import useServerTable from '@/hooks/useServerTable';

import Button from '@/components/buttons/Button';
import IconButton from '@/components/buttons/IconButton';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Seo from '@/components/Seo';
import PopupFilter, { PopupFilterProps } from '@/components/table/PopupFilter';
import ServerTable from '@/components/table/ServerTable';

import { PaginatedApiResponse } from '@/types/api';
import Template from '@/types/entities/template';

type TemplateFilter = {
  status: string[];
};

export default function TablePage() {
  //#region  //*=========== Table Definition ===========
  const { tableState, setTableState } = useServerTable<Template>();

  const columns: ColumnDef<Template>[] = [
    {
      accessorKey: 'name',
      header: '#',
      cell: (cell) =>
        tableState.pagination.pageSize * tableState.pagination.pageIndex +
        cell.row.index +
        1,
      enableSorting: false,
    },
    {
      accessorKey: 'template',
      header: 'Message',
      enableSorting: false,
      cell: (cell) => {
        const message = cell.row.original.template;
        const parsed: React.JSX.Element[] = [];
        let buffer = '';
        let lookForTag = 0;
        for (let i = 0; i < message.length; i++) {
          if (message.at(i) == '{' && lookForTag === 0) {
            parsed.push(<span className=''>{buffer}</span>);
            lookForTag = 1;
            buffer = '';
          }
          if (message.at(i) == '}' && lookForTag === 1) {
            parsed.push(
              <span className='text-blue-500 font-semibold'>
                {buffer + message.at(i)}
              </span>,
            );
            lookForTag = 0;
            buffer = '';
            continue;
          }
          buffer = buffer.concat(message[i]);
        }
        parsed.push(<span>{buffer}</span>);

        return parsed;
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      enableSorting: false,
      cell: (cell) => {
        const status = cell.row.original.status;
        switch (status) {
          case 'approved':
            return (
              <div>
                <div className='max-w-fit text-xs font-semibold bg-green-500 text-white px-2 py-1 rounded-lg'>
                  Approved
                </div>
              </div>
            );
          case 'rejected':
            return (
              <div>
                <div className='max-w-fit text-xs font-semibold bg-red-500 text-white px-2 py-1 rounded-lg'>
                  Rejected
                </div>
              </div>
            );
          case 'validation':
            return (
              <div>
                <div className='max-w-fit text-xs font-semibold bg-yellow-500 text-white px-2 py-1 rounded-lg'>
                  On Validation
                </div>
              </div>
            );
          default:
            return <></>;
        }
      },
    },
    {
      accessorKey: 'updated_at',
      header: 'Last Updated',
      cell: (cell) => {
        const dateObject = cell.row.original.updated_at;
        return dateObject;
      },
      enableSorting: false,
    },
    {
      id: 'actions',
      header: 'Action',
      cell: (cell) => (
        <IconButton
          onClick={() => {
            openConfirmationDialog(cell.row.original);
          }}
          variant='danger'
          icon={Trash}
        />
      ),
    },
  ];
  //#endregion  //*======== Table Definition ===========

  //#region  //*=========== Fetch Data ===========
  const [filterQuery, setFilterQuery] = React.useState<TemplateFilter>({
    status: [],
  });

  const filterOption: PopupFilterProps<TemplateFilter>['filterOption'] =
    React.useMemo(
      () => [
        {
          id: 'status',
          name: 'Status',
          options: [
            { id: 'validation', name: 'On Validation' },
            { id: 'approved', name: 'Approved' },
            { id: 'rejected', name: 'Rejected' },
          ],
        },
      ],
      [],
    );

  const url = buildPaginatedTableURL({
    baseUrl: '/client/template',
    tableState,
    additionalParam: {
      status: filterQuery.status,
    },
  });

  const {
    data: queryData,
    isLoading,
    refetch: refetchData,
  } = useQuery<PaginatedApiResponse<Template[]>, Error>([url], {
    keepPreviousData: true,
    queryFn: async () => api.get(url).then((res) => res.data),
  });
  //#endregion  //*======== Fetch Data ===========

  //#region  //*=========== Confirmation Dialog ===========
  const dialog = useDialog();
  const openConfirmationDialog = (data: Template) => {
    dialog({
      title: 'Confirmation required',
      description: <div>Are you sure want to remove template?</div>,
      submitText: 'Yes',
      variant: 'danger',
      catchOnCancel: false,
    }).then(() => {
      api.delete('/client/template/' + (data.id + '')).then(() => {
        refetchData();
      });
    });
  };
  //#endregion  //*=========== Confirmation Dialog ===========
  return (
    <DashboardLayout>
      <Seo />

      <main>
        <section className='w-full flex flex-col p-16'>
          <div className='w-full min-h-full flex flex-col bg-white p-10 shadow-md gap-2 rounded-lg'>
            <div className='w-full grid grid-cols-2 justify-between'>
              <div className='w-full'>
                <p className='text-4xl font-semibold text-blue-500'>
                  Templates
                </p>
                <p className='w-full md:w-full text-gray-500'>
                  Predefined template for your Whatsapp Notification messages
                </p>
              </div>
              <div className='flex justify-end'>
                <a href='/client/dashboard/template/create'>
                  <Button variant='outline' leftIcon={PlusIcon}>
                    Create New Template
                  </Button>
                </a>
              </div>
            </div>
            <div className='h-px bg-gray-200 w-full mb-4'></div>
            <ServerTable
              columns={columns}
              data={queryData?.data ?? []}
              meta={queryData?.meta}
              header={
                <PopupFilter
                  filterOption={filterOption}
                  setFilterQuery={setFilterQuery}
                />
              }
              isLoading={isLoading}
              tableState={tableState}
              setTableState={setTableState}
              className='mt-8'
              withFilter
            />
          </div>
        </section>
      </main>
    </DashboardLayout>
  );
}
