'use client'

import { H1, Paragraph, XStack, YStack, Avatar, Button } from 'tamagui'
import { Trash2, Pencil, MoreVertical } from '@tamagui/lucide-icons'
import { useState } from 'react'
import { DataTable, type DataTableColumn, type DataTableAction } from '@my/ui'

// Tipos de datos de ejemplo
type Transaction = {
  id: string
  name: string
  icon: string
  iconColor: string
  date: string
  price: string
  category: string
  status: 'success' | 'pending' | 'failed'
}

type Order = {
  id: string
  dealId: string
  customer: {
    name: string
    email: string
    initials: string
    avatarColor: string
  }
  product: string
  dealValue: string
  closeDate: string
  status: 'complete' | 'pending' | 'cancel'
}

// Datos de ejemplo para transacciones
const transactionsData: Transaction[] = [
  {
    id: '1',
    name: 'Bought PYPL',
    icon: 'P',
    iconColor: '#0070BA',
    date: 'Nov 23, 01:00 PM',
    price: '$2,567.88',
    category: 'Finance',
    status: 'success',
  },
  {
    id: '2',
    name: 'Bought AAPL',
    icon: '🍎',
    iconColor: '#1D1D1F',
    date: 'Nov 23, 01:00 PM',
    price: '$2,567.88',
    category: 'Finance',
    status: 'pending',
  },
  {
    id: '3',
    name: 'Sell KKST',
    icon: 'K',
    iconColor: '#00A86B',
    date: 'Nov 23, 01:00 PM',
    price: '$2,567.88',
    category: 'Finance',
    status: 'success',
  },
  {
    id: '4',
    name: 'Bought FB',
    icon: 'f',
    iconColor: '#1877F2',
    date: 'Nov 23, 01:00 PM',
    price: '$2,567.88',
    category: 'Finance',
    status: 'success',
  },
  {
    id: '5',
    name: 'Sell AMZN',
    icon: 'a',
    iconColor: '#FF9900',
    date: 'Nov 23, 01:00 PM',
    price: '$2,567.88',
    category: 'Finance',
    status: 'failed',
  },
  {
    id: '6',
    name: 'Bought TSLA',
    icon: 'T',
    iconColor: '#E31937',
    date: 'Nov 22, 02:30 PM',
    price: '$1,234.56',
    category: 'Finance',
    status: 'success',
  },
  {
    id: '7',
    name: 'Sell GOOGL',
    icon: 'G',
    iconColor: '#4285F4',
    date: 'Nov 22, 11:15 AM',
    price: '$3,456.78',
    category: 'Finance',
    status: 'pending',
  },
  {
    id: '8',
    name: 'Bought MSFT',
    icon: 'M',
    iconColor: '#00A4EF',
    date: 'Nov 21, 09:45 AM',
    price: '$4,567.89',
    category: 'Finance',
    status: 'success',
  },
]

// Datos de ejemplo para órdenes
const ordersData: Order[] = [
  {
    id: '1',
    dealId: 'DE124321',
    customer: {
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      initials: 'JD',
      avatarColor: '#FF6B6B',
    },
    product: 'Software License',
    dealValue: '$18,50.34',
    closeDate: '2024-06-15',
    status: 'complete',
  },
  {
    id: '2',
    dealId: 'DE124322',
    customer: {
      name: 'Jane Smith',
      email: 'janesmith@gmail.com',
      initials: 'JS',
      avatarColor: '#FFA07A',
    },
    product: 'Cloud Hosting',
    dealValue: '$12,99.00',
    closeDate: '2024-06-18',
    status: 'pending',
  },
  {
    id: '3',
    dealId: 'DE124323',
    customer: {
      name: 'Michael Brown',
      email: 'michaelbrown@gmail.com',
      initials: 'MB',
      avatarColor: '#FF8C00',
    },
    product: 'Web Domain',
    dealValue: '$9,50.00',
    closeDate: '2024-06-20',
    status: 'cancel',
  },
  {
    id: '4',
    dealId: 'DE124324',
    customer: {
      name: 'Alice Johnson',
      email: 'alicejohnson@gmail.com',
      initials: 'AJ',
      avatarColor: '#9370DB',
    },
    product: 'SSL Certificate',
    dealValue: '$2,30.45',
    closeDate: '2024-06-25',
    status: 'pending',
  },
  {
    id: '5',
    dealId: 'DE124325',
    customer: {
      name: 'Robert Lee',
      email: 'robertlee@gmail.com',
      initials: 'RL',
      avatarColor: '#20B2AA',
    },
    product: 'Premium Support',
    dealValue: '$15,20.00',
    closeDate: '2024-06-30',
    status: 'complete',
  },
  {
    id: '6',
    dealId: 'DE124326',
    customer: {
      name: 'Sarah Wilson',
      email: 'sarahwilson@gmail.com',
      initials: 'SW',
      avatarColor: '#FF69B4',
    },
    product: 'API Access',
    dealValue: '$8,75.50',
    closeDate: '2024-07-01',
    status: 'complete',
  },
  {
    id: '7',
    dealId: 'DE124327',
    customer: {
      name: 'David Garcia',
      email: 'davidgarcia@gmail.com',
      initials: 'DG',
      avatarColor: '#32CD32',
    },
    product: 'Database Hosting',
    dealValue: '$25,00.00',
    closeDate: '2024-07-05',
    status: 'pending',
  },
  {
    id: '8',
    dealId: 'DE124328',
    customer: {
      name: 'Emily Davis',
      email: 'emilydavis@gmail.com',
      initials: 'ED',
      avatarColor: '#FFD700',
    },
    product: 'Enterprise Plan',
    dealValue: '$50,00.00',
    closeDate: '2024-07-10',
    status: 'complete',
  },
]

const getStatusBadge = (status: string) => {
  const statusConfig = {
    success: { color: '$green10' as const, bg: '$green2' as const, label: 'Success' },
    pending: { color: '$orange10' as const, bg: '$orange2' as const, label: 'Pending' },
    failed: { color: '$red10' as const, bg: '$red2' as const, label: 'Failed' },
    complete: { color: '$green10' as const, bg: '$green2' as const, label: 'Complete' },
    cancel: { color: '$red10' as const, bg: '$red2' as const, label: 'Cancel' },
  }

  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending

  return (
    <YStack
      backgroundColor={config.bg as any}
      borderColor={config.color as any}
      borderWidth={1}
      paddingHorizontal="$3"
      paddingVertical="$1"
      borderRadius="$10"
      alignItems="center"
      justifyContent="center"
    >
      <Paragraph size="$2" color={config.color as any} fontWeight="600">
        {config.label}
      </Paragraph>
    </YStack>
  )
}

export const AdminTablesScreen = () => {
  // Columnas para la tabla de transacciones
  const transactionColumns: DataTableColumn<Transaction>[] = [
    {
      key: 'name',
      label: 'Name',
      render: (value, row) => (
        <XStack alignItems="center" gap="$3">
          <YStack
            width={40}
            height={40}
            borderRadius="$10"
            backgroundColor={row.iconColor as any}
            alignItems="center"
            justifyContent="center"
          >
            <Paragraph size="$4" fontWeight="700" color="white">
              {row.icon}
            </Paragraph>
          </YStack>
          <Paragraph size="$4" fontWeight="500" color="$color">
            {row.name}
          </Paragraph>
        </XStack>
      ),
    },
    {
      key: 'date',
      label: 'Date',
      sortable: true,
    },
    {
      key: 'price',
      label: 'Price',
      sortable: true,
      align: 'right',
      render: (value) => (
        <Paragraph size="$4" fontWeight="600" color="$color">
          {value}
        </Paragraph>
      ),
    },
    {
      key: 'category',
      label: 'Category',
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => getStatusBadge(value),
    },
  ]

  // Columnas para la tabla de órdenes
  const orderColumns: DataTableColumn<Order>[] = [
    {
      key: 'dealId',
      label: 'Deal ID',
    },
    {
      key: 'customer',
      label: 'Customer',
      render: (value) => (
        <XStack alignItems="center" gap="$3">
          <Avatar circular size="$4" backgroundColor={value.avatarColor}>
            <Avatar.Image source={{ uri: '' }} />
            <Avatar.Fallback backgroundColor={value.avatarColor}>
              <Paragraph size="$3" fontWeight="700" color="white">
                {value.initials}
              </Paragraph>
            </Avatar.Fallback>
          </Avatar>
          <YStack gap="$1">
            <Paragraph size="$4" fontWeight="600" color="$color">
              {value.name}
            </Paragraph>
            <Paragraph size="$2" color="$colorFocus">
              {value.email}
            </Paragraph>
          </YStack>
        </XStack>
      ),
    },
    {
      key: 'product',
      label: 'Product/Service',
    },
    {
      key: 'dealValue',
      label: 'Deal Value',
      align: 'right',
      render: (value) => (
        <Paragraph size="$4" fontWeight="600" color="$color">
          {value}
        </Paragraph>
      ),
    },
    {
      key: 'closeDate',
      label: 'Close Date',
      sortable: true,
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => getStatusBadge(value),
    },
  ]

  // Acciones para transacciones
  const transactionActions: DataTableAction<Transaction>[] = [
    {
      label: 'Edit',
      icon: <Pencil size={16} />,
      onPress: (row) => {
        console.log('Edit transaction:', row.id)
      },
    },
    {
      label: 'Delete',
      icon: <Trash2 size={16} />,
      onPress: (row) => {
        console.log('Delete transaction:', row.id)
      },
      destructive: true,
    },
  ]

  // Acciones para órdenes
  const orderActions: DataTableAction<Order>[] = [
    {
      label: 'Edit',
      icon: <Pencil size={16} />,
      onPress: (row) => {
        console.log('Edit order:', row.id)
      },
    },
    {
      label: 'Delete',
      icon: <Trash2 size={16} />,
      onPress: (row) => {
        console.log('Delete order:', row.id)
      },
      destructive: true,
    },
  ]

  return (
    <YStack flex={1} gap="$8">
      <YStack gap="$2">
        <H1 size="$10" fontWeight="800" color="$color" letterSpacing={-1}>
          Tablas de Datos
        </H1>
        <Paragraph size="$5" color="$colorFocus">
          Ejemplos de tablas con diferentes configuraciones: selección, acciones, filtros y
          paginación
        </Paragraph>
      </YStack>

      {/* Tabla de Transacciones - CON selección */}
      <YStack gap="$4">
        <DataTable
          title="Latest Transactions"
          data={transactionsData}
          columns={transactionColumns}
          searchable
          searchPlaceholder="Search..."
          pagination
          pageSize={5}
          selectable={true}
          actions={transactionActions}
          striped
          hoverable
        />
      </YStack>

      {/* Tabla de Órdenes - SIN selección */}
      <YStack gap="$4">
        <DataTable
          title="Recent Orders"
          data={ordersData}
          columns={orderColumns}
          searchable
          searchPlaceholder="Search orders..."
          pagination
          pageSize={5}
          selectable={false}
          actions={orderActions}
          striped
          hoverable
        />
      </YStack>
    </YStack>
  )
}
