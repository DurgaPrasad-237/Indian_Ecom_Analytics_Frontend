import { CustomerKpiGrid } from '@/components/dashboard/CustomerKpiGrid';
import { MonthlySignupsChart } from '@/components/charts/MonthlySignupsChart';
import { SignupsByGenderChart } from '@/components/charts/SignupsByGenderChart';
import { SignupTrendChart } from '@/components/charts/SignupTrendChart';
import { CustomerStatusChart } from '@/components/charts/CustomerStatusChart';
import { CustomerSegmentChart } from '@/components/charts/CustomerSegmentChart';
import { AnalyticsAssistant } from '@/components/ai/AnalyticsAssistant';

export default function CustomersPage() {
  return (
    <div className="flex flex-col gap-6">
      <CustomerKpiGrid />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <MonthlySignupsChart />
        <SignupsByGenderChart />
      </div>

      <SignupTrendChart />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <CustomerStatusChart />
        <CustomerSegmentChart />
      </div>

      <AnalyticsAssistant type="customer" />
    </div>
  );
}
