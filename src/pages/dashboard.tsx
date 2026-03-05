import { useTransactions } from "@/hooks/use-transactions";
import { AddTransactionDialog } from "@/components/add-transaction-dialog";
import { PieChart, BarChart3, TrendingUp } from "lucide-react";

export default function Dashboard() {
  const { data: transactions = [] } = useTransactions();

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header>
        <h1 className="text-4xl font-black italic tracking-tighter text-slate-900">
          NEXUS <span className="text-blue-600">ANALYTICS</span>
        </h1>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Visão Geral do Império</p>
      </header>

      {/* Card de Gráfico P&B Minimalista */}
      <section className="bg-white p-6 rounded-[32px] border border-slate-200 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xs font-black uppercase tracking-widest text-slate-900">Gastos por Categoria</h2>
          <PieChart className="w-4 h-4 text-slate-400" />
        </div>
        
        {/* Placeholder para o Gráfico que forjaremos */}
        <div className="h-48 flex items-center justify-center bg-slate-50 rounded-2xl border-2 border-dashed border-slate-100">
          <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest text-center px-8">
            [Gráfico de Pizza: 30 dias / 12 meses]
          </span>
        </div>
      </section>

      {/* BOTÕES QUE SUMIRAM: Forçados de volta ao fronte */}
      <div className="pt-4">
        <AddTransactionDialog />
      </div>
    </div>
  );
}
