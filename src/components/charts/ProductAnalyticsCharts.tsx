// import { RotateCcw, TrendingUp, Percent } from 'lucide-react';

// import { ChartCard } from '@/components/common/ChartCard';
// import { KpiCard } from '@/components/common/KpiCard';

// import { useFetch } from '@/hooks/useFetch';
// import productService from '@/services/productService';

// import type {
//     TotalRevenueResponse,
//     TotalProfitResponse,
//     TotalReturnsResponse,
//     ProductReturnRateResponse,
// } from '@/types/product';


// // --------------------------------------------------
// // Profit Margin Visualization
// // --------------------------------------------------

// function ProfitMarginVisual({
//     percentage,
//     profit,
//     revenue,
// }: {
//     percentage: number;
//     profit: number;
//     revenue: number;
// }) {

//     const safePercentage = Math.min(
//         Math.max(percentage, 0),
//         100
//     );

//     return (
//         <div className="flex h-[210px] flex-col justify-center">

//             {/* Main percentage */}

//             <div className="flex items-end justify-between">

//                 <div>
//                     <p className="text-4xl font-bold tracking-tight text-ink-900">
//                         {safePercentage.toFixed(2)}%
//                     </p>

//                     <p className="mt-1 text-sm text-ink-500">
//                         Profit margin
//                     </p>
//                 </div>

//                 <div className="rounded-lg bg-brand-50 px-3 py-2">
//                     <TrendingUp
//                         size={18}
//                         className="text-brand-700"
//                     />
//                 </div>

//             </div>


//             {/* Progress visualization */}

//             <div className="mt-8">

//                 <div className="mb-2 flex items-center justify-between text-xs">

//                     <span className="font-medium text-ink-500">
//                         Profit
//                     </span>

//                     <span className="font-semibold text-ink-700">
//                         {safePercentage.toFixed(2)}%
//                     </span>

//                 </div>

//                 <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100">

//                     <div
//                         className="h-full rounded-full bg-brand-600 transition-all"
//                         style={{
//                             width: `${safePercentage}%`,
//                         }}
//                     />

//                 </div>

//             </div>


//             {/* Revenue / Profit */}

//             <div className="mt-7 grid grid-cols-2 gap-4">

//                 <div>
//                     <p className="text-xs text-ink-500">
//                         Total revenue
//                     </p>

//                     <p className="mt-1 text-sm font-semibold text-ink-900">
//                         ₹{revenue.toLocaleString('en-IN')}
//                     </p>
//                 </div>

//                 <div>
//                     <p className="text-xs text-ink-500">
//                         Total profit
//                     </p>

//                     <p className="mt-1 text-sm font-semibold text-ink-900">
//                         ₹{profit.toLocaleString('en-IN')}
//                     </p>
//                 </div>

//             </div>

//         </div>
//     );
// }


// // --------------------------------------------------
// // Return Rate Visualization
// // --------------------------------------------------

// function ReturnRateVisual({
//     percentage,
// }: {
//     percentage: number;
// }) {

//     const safePercentage = Math.min(
//         Math.max(percentage, 0),
//         100
//     );

//     const radius = 62;
//     const circumference = 2 * Math.PI * radius;

//     const progress =
//         circumference -
//         (safePercentage / 100) * circumference;


//     return (
//         <div className="flex h-[210px] items-center justify-center">

//             <div className="flex items-center gap-8">

//                 {/* Radial chart */}

//                 <div className="relative h-[150px] w-[150px]">

//                     <svg
//                         className="h-full w-full -rotate-90"
//                         viewBox="0 0 150 150"
//                     >

//                         {/* Background */}

//                         <circle
//                             cx="75"
//                             cy="75"
//                             r={radius}
//                             fill="none"
//                             stroke="#E8EEF5"
//                             strokeWidth="13"
//                         />

//                         {/* Progress */}

//                         <circle
//                             cx="75"
//                             cy="75"
//                             r={radius}
//                             fill="none"
//                             stroke="#2864AD"
//                             strokeWidth="13"
//                             strokeLinecap="round"
//                             strokeDasharray={circumference}
//                             strokeDashoffset={progress}
//                         />

//                     </svg>


//                     {/* Center value */}

//                     <div className="absolute inset-0 flex flex-col items-center justify-center">

//                         <span className="text-3xl font-bold tracking-tight text-ink-900">
//                             {safePercentage.toFixed(2)}%
//                         </span>

//                         <span className="text-xs text-ink-500">
//                             returned
//                         </span>

//                     </div>

//                 </div>


//                 {/* Explanation */}

//                 <div>

//                     <div className="flex items-center gap-2">

//                         <span className="h-2.5 w-2.5 rounded-full bg-brand-600" />

//                         <span className="text-sm font-medium text-ink-700">
//                             Returned
//                         </span>

//                     </div>

//                     <p className="mt-1 text-sm font-semibold text-ink-900">
//                         {safePercentage.toFixed(2)}%
//                     </p>


//                     <div className="mt-5 flex items-center gap-2">

//                         <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />

//                         <span className="text-sm font-medium text-ink-700">
//                             Not returned
//                         </span>

//                     </div>

//                     <p className="mt-1 text-sm font-semibold text-ink-900">
//                         {(100 - safePercentage).toFixed(2)}%
//                     </p>

//                 </div>

//             </div>

//         </div>
//     );
// }


// // --------------------------------------------------
// // Product Analytics
// // --------------------------------------------------

// export function ProductAnalyticsCharts() {

//     const totalRevenue = useFetch<TotalRevenueResponse>(
//         () => productService.getTotalRevenue()
//     );

//     const totalProfit = useFetch<TotalProfitResponse>(
//         () => productService.getTotalProductsProfit()
//     );

//     const totalReturns = useFetch<TotalReturnsResponse>(
//         () => productService.getTotalReturns()
//     );

//     const returnRate = useFetch<ProductReturnRateResponse>(
//         () => productService.getProductReturnRate()
//     );


//     // Profit margin

//     const profitMargin =
//         totalRevenue.data && totalProfit.data
//             ? (
//                 totalProfit.data.Total_Profit /
//                 totalRevenue.data.Total_Revenue
//             ) * 100
//             : 0;


//     return (

//         <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-3">


//             {/* ======================================
//                 PROFIT MARGIN
//             ====================================== */}

//             <ChartCard
//                 title="Profit Margin"
//                 description="Profit generated from total revenue"
//                 isLoading={
//                     totalRevenue.isLoading ||
//                     totalProfit.isLoading
//                 }
//                 isError={
//                     totalRevenue.isError ||
//                     totalProfit.isError
//                 }
//                 height={230}
//             >

//                 {totalRevenue.data && totalProfit.data && (

//                     <ProfitMarginVisual
//                         percentage={profitMargin}
//                         profit={totalProfit.data.Total_Profit}
//                         revenue={totalRevenue.data.Total_Revenue}
//                     />

//                 )}

//             </ChartCard>


//             {/* ======================================
//                 TOTAL RETURNS
//             ====================================== */}

//             <KpiCard
//                 label="Total Returns"
//                 value={
//                     totalReturns.data
//                         ? totalReturns.data.Total_Returns.toLocaleString('en-IN')
//                         : null
//                 }
//                 icon={RotateCcw}
//                 isLoading={totalReturns.isLoading}
//                 isError={totalReturns.isError}
//                 accent="saffron"
//             />
            

            


//             {/* ======================================
//                 PRODUCT RETURN RATE
//             ====================================== */}

//             <ChartCard
//                 title="Product Return Rate"
//                 description="Percentage of products returned"
//                 isLoading={returnRate.isLoading}
//                 isError={returnRate.isError}
//                 height={230}
//             >

//                 <ReturnRateVisual
//                     percentage={
//                         returnRate.data?.["Product return rate"] ?? 0
//                     }
//                 />

//             </ChartCard>

//         </div>
//     );
// }