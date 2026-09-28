import { CreditCard } from 'lucide-react';
import { ComingSoon } from '@/components/common/ComingSoon';

export default function PaymentsPage() {
  return (
    <ComingSoon
      icon={CreditCard}
      title="Payments Analytics"
      description="This module will provide payment method trends, success rates, and revenue analytics."
    />
  );
}
