'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import GenericTable, { Column } from './GenericTable';

interface Product {
  id: string;
  name: string;
  gross_price: number;
  note: string;
  description: string;
  booking_contact: string;
  leader: string;
}

const columns: Column<Product>[] = [
  { id: 'name', label: 'Name' },
  { 
    id: 'gross_price', 
    label: 'Price', 
    numeric: true,
    render: (value) => `$${value.toLocaleString()}`
  },
  { id: 'note', label: 'Note' },
  { id: 'booking_contact', label: 'Booking Contact' },
  { id: 'leader', label: 'Leader' },
];

export default function ProductTable({ onRefresh }: { onRefresh?: () => void }) {
  const router = useRouter();

  const fetchProducts = async () => {
    const response = await fetch('/api/products');
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return response.json();
  };

  const handleDelete = async (id: string) => {
    const response = await fetch(`/api/products/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete product');
    }
  };

  const handleView = (product: Product) => {
    router.push(`/products/${product.id}`);
  };

  const handleEdit = (product: Product) => {
    router.push(`/products/${product.id}/edit`);
  };

  return (
    <GenericTable<Product>
      title="Product List"
      columns={columns}
      fetchData={fetchProducts}
      onDelete={handleDelete}
      onView={handleView}
      onEdit={handleEdit}
      onRefresh={onRefresh}
      defaultSort="name"
      clickable={true}
      onRowClick={handleView}
    />
  );
}