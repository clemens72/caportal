'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import GenericTable, { Column } from '@/app/components/Admin/Tables/GenericTable';
import { Organization } from '@/app/types';
import { useRouter } from 'next/navigation';

const columns: Column<Organization>[] = [
  { id: 'name', label: 'Name' },
  { id: 'address', label: 'Address' },
  { id: 'year', label: 'Year' },
  { id: 'type', label: 'Type' },
];

export default function OrganizationsPage() {

  const router = useRouter();

  const fetchOrganizations = async () => {
    const response = await fetch('/api/organizations');
    if (!response.ok) {
      throw new Error('Failed to fetch organizations');
    }
    return response.json();
  };

  const handleDelete = async (id: string) => {
    const response = await fetch(`/api/organizations/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete organization');
    }
  };

  const handleView = (organization: Organization) => {
    router.push(`/organizations/${organization.id}`);
  };

  const handleEdit = (organization: Organization) => {
    router.push(`/organizations/${organization.id}/edit`);
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
        Organizations Overview
      </Typography>

        {/* Organizations Table */}
        <GenericTable<Organization>
          title="Organizations"
          columns={columns}
          fetchData={fetchOrganizations}
          onDelete={handleDelete}
          onView={handleView}
          onEdit={handleEdit}
          defaultSort="name"
          clickable={true}
          onRowClick={handleView}
        />
    </Box>
  );
}