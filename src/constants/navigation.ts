import {
  LayoutGrid,
  Users,
  ShoppingCart,
  Truck,
  CreditCard,
  Star,
  Package,
  type LucideIcon,
} from 'lucide-react';

export interface NavItem {
  label: string;
  path: string;
  icon: LucideIcon;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', path: '/dashboard', icon: LayoutGrid },
  { label: 'Customers', path: '/customers', icon: Users },
  { label: 'Products', path: '/products', icon: ShoppingCart },
  { label: 'Shipments', path: '/shipments', icon: Truck },
  { label: 'Payments', path: '/payments', icon: CreditCard },
  { label: 'Ratings', path: '/ratings', icon: Star },
  { label: 'Order Items', path: '/order-items', icon: Package },
];
