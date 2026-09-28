import { Star } from 'lucide-react';
import { ComingSoon } from '@/components/common/ComingSoon';

export default function RatingsPage() {
  return (
    <ComingSoon
      icon={Star}
      title="Ratings Analytics"
      description="This module will provide product and seller rating trends and satisfaction analytics."
    />
  );
}
