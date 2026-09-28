import { Truck } from 'lucide-react';
import { ComingSoon } from '@/components/common/ComingSoon';

export default function ShipmentsPage() {
  return (
    <ComingSoon
      icon={Truck}
      title="Shipments Analytics"
      description="This module will provide shipment timing, delays, and logistics performance analytics."
    />
  );
}
