import { Navigate, type RouteObject } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import DashboardPage from '@/pages/Dashboard/DashboardPage';
import CustomersPage from '@/pages/Customers/CustomersPage';
import ProductsPage from '@/pages/Products/ProductPage';
import ShipmentsPage from '@/pages/Shipments/ShipmentsPage';
import PaymentsPage from '@/pages/Payments/PaymentsPage';
import RatingsPage from '@/pages/Ratings/RatingsPage';
import OrderItemsPage from '@/pages/OrderItems/OrderItemsPage';

/**
 * Each top-level route renders inside <Layout>, which owns the sidebar and
 * header. title/subtitle are passed straight through to the Header so every
 * page gets a consistent, page-specific heading without repeating markup.
 */
export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: '/dashboard',
    element: <Layout title="Dashboard" subtitle="A high-level view across your e-commerce analytics." />,
    children: [{ index: true, element: <DashboardPage /> }],
  },
  {
    path: '/customers',
    element: (
      <Layout title="Customer Analytics" subtitle="Analyze customer acquisition, churn, spending, and segments." />
    ),
    children: [{ index: true, element: <CustomersPage /> }],
  },
  {
    path: '/products',
    element: <Layout title="Products" subtitle="Product performance and sales analytics." />,
    children: [{ index: true, element: <ProductsPage /> }],
  },
  {
    path: '/shipments',
    element: <Layout title="Shipments" subtitle="Shipment timing and logistics analytics." />,
    children: [{ index: true, element: <ShipmentsPage /> }],
  },
  {
    path: '/payments',
    element: <Layout title="Payments" subtitle="Payment methods and revenue analytics." />,
    children: [{ index: true, element: <PaymentsPage /> }],
  },
  {
    path: '/ratings',
    element: <Layout title="Ratings" subtitle="Product and seller rating analytics." />,
    children: [{ index: true, element: <RatingsPage /> }],
  },
  {
    path: '/order-items',
    element: <Layout title="Order Items" subtitle="Product-level order item analytics." />,
    children: [{ index: true, element: <OrderItemsPage /> }],
  },
  {
    path: '*',
    element: <Navigate to="/dashboard" replace />,
  },
];
