import { CreditCard, ShoppingBag, UserMinus, Users } from 'lucide-react';
import { KpiCard } from '@/components/common/KpiCard';
import { useFetch } from '@/hooks/useFetch';
import customerService from '@/services/customerService';
import { formatCurrencyINR, formatIndianNumber, formatPercent } from '@/utils/formatters';
import type {
  AverageOrderValueResponse,
  AverageSpendResponse,
  ChurnRateResponse,
  TotalCustomersResponse,
} from '@/types/customer';

/** The four headline KPI cards for Customer Analytics, each backed by its own endpoint. */
export function CustomerKpiGrid() {
  const totalCustomers = useFetch<TotalCustomersResponse>(() => customerService.getTotalCustomers());
  const churnRate = useFetch<ChurnRateResponse>(() => customerService.getChurnRate());
  const avgSpend = useFetch<AverageSpendResponse>(() => customerService.getAverageCustomerSpend());
  const avgOrderValue = useFetch<AverageOrderValueResponse>(() => customerService.getAverageOrderValue());

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <KpiCard
        label="Total Customers"
        icon={Users}
        accent="brand"
        isLoading={totalCustomers.isLoading}
        isError={totalCustomers.isError}
        value={
          totalCustomers.data ? formatIndianNumber(totalCustomers.data.total_customers) : null
        }
      />
      <KpiCard
        label="Churn Rate"
        icon={UserMinus}
        accent="negative"
        isLoading={churnRate.isLoading}
        isError={churnRate.isError}
        value={churnRate.data ? formatPercent(churnRate.data.churn_rate, { alreadyPercent: true }) : null}
      />
      <KpiCard
        label="Average Customer Spend"
        icon={CreditCard}
        accent="saffron"
        isLoading={avgSpend.isLoading}
        isError={avgSpend.isError}
        value={avgSpend.data ? formatCurrencyINR(avgSpend.data.average_customer_spend) : null}
      />
      <KpiCard
        label="Average Order Value"
        icon={ShoppingBag}
        accent="positive"
        isLoading={avgOrderValue.isLoading}
        isError={avgOrderValue.isError}
        value={avgOrderValue.data ? formatCurrencyINR(avgOrderValue.data.average_order_value) : null}
      />
    </div>
  );
}
