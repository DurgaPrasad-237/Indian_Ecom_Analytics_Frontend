import { Package } from 'lucide-react';
import { ComingSoon } from '@/components/common/ComingSoon';

export default function OrderItemsPage() {
  return (
    <ComingSoon
      icon={Package}
      title="Order Items Analytics"
      description="This module will provide product-level order item and basket analytics."
    />
  );
}
