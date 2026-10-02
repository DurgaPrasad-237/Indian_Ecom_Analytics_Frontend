import { CreditCard, IndianRupee, RotateCcw, Wallet } from 'lucide-react';
import { formatCurrencyINR, formatIndianNumber, formatPercent } from '@/utils/formatters';
import { KpiCard } from '@/components/common/KpiCard';
import { KpiDonutCard } from '../common/KpiDonutCard';
import { useFetch } from '@/hooks/useFetch';
import salesService from '@/services/salesService';


import type {
    KpiCardResponse
} from '@/types/sales';

export function SalesKpiCard(){
    const kpis = useFetch<KpiCardResponse>(
        () => salesService.getSalesKPIs()
    )

    console.log("thsi is ales kpis",kpis)

    return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">

        {/* LEFT SIDE */}
        <div className="flex flex-col gap-4">

            <KpiCard
                label="Gross Revenue"
                icon={IndianRupee}
                accent="brand"
                isLoading={kpis.isLoading}
                isError={kpis.isError}
                value={
                    kpis.data
                        ? formatCurrencyINR(kpis.data.Gross_Revenue)
                        : null
                }
            />

            <KpiCard
                label="Net Revenue"
                icon={Wallet}
                accent="positive"
                isLoading={kpis.isLoading}
                isError={kpis.isError}
                value={
                    kpis.data
                        ? formatCurrencyINR(kpis.data.Net_Revenue)
                        : null
                }
            />

        </div>

        {/* RIGHT SIDE */}
        <KpiDonutCard
            label="Profit Margin"
            value={kpis.data?.Profit_Margin ?? null}
            accent="positive"
            isLoading={kpis.isLoading}
            isError={kpis.isError}
            sideMetrics={[
                {
                    label: "Gross Profit",
                    value: kpis.data
                        ? formatCurrencyINR(kpis.data.Gross_Profit)
                        : null,
                },
                {
                    label: "Gross Revenue",
                    value: kpis.data
                        ? formatCurrencyINR(kpis.data.Gross_Revenue)
                        : null,
                },
            ]}
        />
    

    </div>
    );

}