import { useTransactions } from "@/hooks/use-transactions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/format";

const COLORS = ['#0ea5e9', '#6366f1', '#f59e0b', '#ec4899', '#10b981', '#f43f5e', '#8b5cf6'];

export default function Dashboard() {
  const { data: transactions = [] } = useTransactions();

  // Processamento de dados para a visão simplificada
  const categories = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc: Record<string, number>, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  const totalExpense = Object.values(categories).reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-6 pb-10 animate-in fade-in duration-700">
      <div>
        <p className="text-slate-500 text-xs font-black uppercase tracking-[0.2em]">Visão Geral</p>
        <h2 className="text-3xl font-black text-white italic">NEXUS <span className="text-blue-500 not-italic">ANALYTICS</span></h2>
      </div>

      {/* Gráfico de Barras Nativo - Estilo Luxo */}
      <Card className="bg-slate-900/50 border-slate-800 rounded-[24px] overflow-hidden backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-widest">Distribuição de Gastos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {Object.entries(categories).map(([name, value], index) => (
            <div key={name} className="space-y-2">
              <div className="flex justify-between text-[11px] font-black uppercase tracking-tight">
                <span className="text-slate-300">{name}</span>
                <span className="text-white">{formatCurrency(value)}</span>
              </div>
              <div className="h-3 w-full bg-slate-800/50 rounded-full overflow-hidden border border-white/5">
                <div 
                  className="h-full transition-all duration-1000 ease-out" 
                  style={{ 
                    width: `${(value / totalExpense) * 100}%`,
                    backgroundColor: COLORS[index % COLORS.length],
                    boxShadow: `0 0 15px ${COLORS[index % COLORS.length]}66` 
                  }}
                />
              </div>
            </div>
          ))}
          {Object.keys(categories).length === 0 && (
            <div className="py-10 text-center">
              <p className="text-slate-600 text-xs font-bold italic uppercase">Aguardando dados do mestre...</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Resumo de Caixa Rápido */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-slate-900/50 border-slate-800 p-4 rounded-[20px]">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Total Gastos</p>
          <p className="text-xl font-black text-white mt-1">{formatCurrency(totalExpense)}</p>
        </Card>
        <Card className="bg-slate-900/50 border-slate-800 p-4 rounded-[20px]">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Operações</p>
          <p className="text-xl font-black text-blue-500 mt-1">{transactions.length}</p>
        </Card>
      </div>
    </div>
  );
}
