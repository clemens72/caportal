export interface User {
    id: number;
    username: string;
    password?: string;
    first_name: string;
    last_name: string;
}

export interface Product {
  id: string;
  name: string;
  website: string;
  booking_contact: string;
  phone: string;
  leader: string;
  gross_price: number;
  fee_percent: number;
  exclusive: boolean;
  agent: string;
  size: string;
  product_type: string;
  categories: string[];
  description: string;
  bio: string;
  special_requirements: string;
  business_cards: boolean;
  active: boolean;
  note: string;
  created_at?: string;
  updated_at?: string;
}

export interface Event {
  id: string;
  name: string;
  description: string;
  start_time: string;
  end_time: string;
  location: string;
  price: number;
  leader: string;
  booking_contact: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  product_id?: string;
  organization_id?: string;
  notes?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Organization {
  id: string;
  name: string;
  type: 'client' | 'venue' | 'vendor' | 'partner';
  address: string;
  year: number;
  website?: string;
  phone?: string;
  email?: string;
  contact_person?: string;
  notes?: string;
  active: boolean;
  created_at?: string;
  updated_at?: string;
}

// Common types that might be used across interfaces
export type Status = 'active' | 'inactive' | 'pending';
export type EntityType = 'product' | 'event' | 'organization' | 'user';
export type ContactType = 'phone' | 'email' | 'website';

// Type for API responses
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
  status: number;
}

// Type for paginated responses
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Type for search/filter parameters
export interface SearchParams {
  query?: string;
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  filters?: Record<string, any>;
} 