import { useState } from "react";
import { useTransactions } from "@/hooks/use-transactions";
import { AddTransactionDialog } from "@/components/add-transaction-dialog";
import { PieChart as PieIcon, TrendingUp, ChevronDown, BarChart3 } from "lucide-react";

export default function Dashboard() {
  const { data: transactions = [] } = useTransactions();
  const [timeRange, setTimeRange] = useState("30");

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header className="flex justify-between items-start">
        <div>
          {/* MUDANÇA EXIGIDA: NEXUS com a cor do logo (Azul) */}
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
            className="appearance-none bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 pl-4 pr-10 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest outline-none text-slate-900 dark:text-white"
          >
            <option value="30">30 Dias</option>
            <option value="365">12 Meses</option>
          </select>
          <ChevronDown className="w-3 h-3 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" />
        </div>
      </header>

      {/* MUDANÇA EXIGIDA: Campo do Gráfico com cores adaptativas P&B */}
      <section className="bg-white dark:bg-slate-900 p-6 rounded-[32px] border border-slate-200 dark:border-slate-800 shadow-sm min-h-[350px] flex flex-col transition-all">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-blue-600" />
            <h2 className="text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white">Gastos por Categoria</h2>
          </div>
          <div className="flex gap-2">
            <PieIcon className="w-4 h-4 text-slate-300 dark:text-slate-600" />
            <BarChart3 className="w-4 h-4 text-slate-300 dark:text-slate-600" />
          </div>
        </div>

        {/* Área Interna do Gráfico - Minimalismo Puro */}
        <div className="flex-1 w-full bg-slate-50 dark:bg-slate-950 rounded-[24px] border-2 border-dashed border-slate-100 dark:border-slate-800 flex flex-col items-center justify-center p-8 transition-colors">
          <div className="relative w-32 h-32 mb-6">
            {/* Círculo Representativo P&B */}
            <div className="absolute inset-0 border-[12px] border-slate-200 dark:border-slate-800 rounded-full" />
            <div className="absolute inset-0 border-[12px] border-blue-600 rounded-full border-t-transparent border-r-transparent -rotate-45" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-tighter">Nexus</span>
            </div>
          </div>
          
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] text-center">
            Sincronizando Inteligência...
          </p>
          <p className="text-[9px] text-slate-300 dark:text-slate-600 font-bold uppercase mt-1">Filtro: {timeRange} dias ativo</p>
        </div>
      </section>

      {/* Botões de Ação Restaurados no Front */}
      <div className="pt-4 flex justify-center">
        <AddTransactionDialog />
      </div>
    </div>
  );
}
