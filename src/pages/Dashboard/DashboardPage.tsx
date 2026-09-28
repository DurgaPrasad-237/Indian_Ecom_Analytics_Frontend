import { CustomerKpiGrid } from '@/components/dashboard/CustomerKpiGrid';
import { MonthlySignupsChart } from '@/components/charts/MonthlySignupsChart';
import { CustomerStatusChart } from '@/components/charts/CustomerStatusChart';
import { SignupTrendChart } from '@/components/charts/SignupTrendChart';
import { PageHeader } from '@/components/common/PageHeader';

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Overview"
        description="A snapshot of customer acquisition, churn, and spend across the business."
      />

      <CustomerKpiGrid />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <MonthlySignupsChart />
        <CustomerStatusChart />
      </div>

      <SignupTrendChart />
    </div>
  );
}
