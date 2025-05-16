'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
import GenericTable, { Column } from '@/app/components/Admin/Tables/GenericTable';
import { User } from '@/app/types';

const columns: Column<User>[] = [
  { id: 'first_name', label: 'Name' },
  { id: 'last_name', label: 'Address' },
  { id: 'username', label: 'Year' }
];

export default function ContactsPage() {

  const router = useRouter();

  const fetchContacts = async () => {
    const response = await fetch('/api/users');
    if (!response.ok) {
      throw new Error('Failed to fetch contacts');
    }
    return response.json();
  };

  const handleDelete = async (id: string) => {
    const response = await fetch(`/api/contacts/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete contact');
    }
  };

  const handleView = (contact: User) => {
    router.push(`/contacts/${contact.id}`);
  };

  const handleEdit = (contact: User) => {
    router.push(`/contacts/${contact.id}/edit`);
  };

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        width: { sm: `calc(100% - 65px)` },
        ml: { sm: `65px` },
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
        Contacts Overview
      </Typography>


        {/* Organizations Table */}
          <GenericTable<User>
            title="Contacts"
            columns={columns}
            fetchData={fetchContacts}
            onDelete={handleDelete}
            onView={handleView}
            onEdit={handleEdit}
            defaultSort="first_name"
            clickable={true}
            onRowClick={handleView}
          />

    </Box>
  );
}