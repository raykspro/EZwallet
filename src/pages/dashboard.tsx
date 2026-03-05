import { useState, useMemo } from "react";
import { useTransactions } from "@/hooks/use-transactions";
import { AddTransactionDialog } from "@/components/add-transaction-dialog";
import { PieChart as PieIcon, TrendingUp, ChevronDown } from "lucide-react";
// Importação dos componentes de gráfico
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

export default function Dashboard() {
  const { data: transactions = [] } = useTransactions();
  const [timeRange, setTimeRange] = useState("30");

  // Lógica de Processamento de Dados do Império
  const chartData = useMemo(() => {
    const categoriesMap: Record<string, number> = {};
    
    // Filtramos apenas as despesas para o gráfico de pizza de gastos
    transactions
      .filter(t => t.type === "expense")
      .forEach(t => {
        categoriesMap[t.category] = (categoriesMap[t.category] || 0) + t.amount;
      });

    return Object.entries(categoriesMap).map(([name, value]) => ({
      name,
      value
    }));
  }, [transactions]);

  // Paleta de Cores Nexus (Azul e tons de Cinza)
  const COLORS = ["#2563eb", "#64748b", "#94a3b8", "#1e293b", "#3b82f6", "#0f172a"];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-black italic tracking-tighter uppercase">
            <span className="text-blue-600 dark:text-blue-500">NEXUS</span>{" "}
            <span className="text-slate-900 dark:text-white">ANALYTICS</span>
          </h1>
          <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Visão Geral do Império</p>
        </div>
        
        <div className="relative">
          <select 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value)}
            className="appearance-none bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 pl-4 pr-10 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest outline-none text-slate-900 dark:text-white cursor-pointer"
          >
            <option value="30">30 Dias</option>
            <option value="365">12 Meses</option>
          </select>
          <ChevronDown className="w-3 h-3 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" />
        </div>
      </header>

      <section className="bg-white dark:bg-slate-900 p-6 rounded-[32px] border border-slate-200 dark:border-slate-800 shadow-sm min-h-[450px] flex flex-col">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-blue-600" />
            <h2 className="text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white">Gastos por Categoria</h2>
          </div>
          <PieIcon className="w-4 h-4 text-slate-300 dark:text-slate-600" />
        </div>

        <div className="flex-1 w-full min-h-[300px]">
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="transparent" />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '16px', border: 'none', fontSize: '10px', fontWeight: 'bold' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '10px', fontWeight: '900', textTransform: 'uppercase', paddingTop: '20px' }} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
              <p className="text-[10px] font-black uppercase tracking-widest">Sem dados para exibir</p>
            </div>
          )}
        </div>
      </section>

      <div className="flex justify-center pt-4">
        <AddTransactionDialog />
      </div>
    </div>
  );
}
