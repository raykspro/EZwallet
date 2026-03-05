import { useTransactions, useDeleteTransaction } from "@/hooks/use-transactions";
import { formatCurrency, formatDate } from "@/lib/format";
import { Trash2, ReceiptText, ArrowDownLeft } from "lucide-react";

export default function Transactions() {
  const { data: transactions = [] } = useTransactions();
  const deleteTransaction = useDeleteTransaction();

  const sortedTransactions = [...transactions].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const handleDelete = (id: string) => {
    if (confirm("Senhor, deseja aniquilar este registro permanentemente?")) {
      deleteTransaction.mutate(id);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex justify-between items-end">
        <div>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mb-1">Registro de Operações</p>
          <h1 className="text-3xl font-black text-white italic tracking-tighter">HISTÓRICO</h1>
        </div>
        <span className="bg-blue-600/10 text-blue-400 border border-blue-600/20 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-1">
          {transactions.length} Operações
        </span>
      </header>

      <div className="space-y-3 pb-24">
        {sortedTransactions.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/30 rounded-[32px] border border-dashed border-slate-800">
            <p className="text-slate-600 font-bold text-xs uppercase italic">Nenhum rastro financeiro encontrado, mestre.</p>
          </div>
        ) : (
          sortedTransactions.map((t) => (
            <div key={t.id} className="group bg-slate-900/40 p-4 rounded-[24px] border border-slate-800/50 hover:border-blue-900/30 transition-all">
              <div className="flex justify-between items-center">
                <div className="flex gap-4 items-center">
                  <div className={`p-3 rounded-2xl bg-slate-800/50 text-slate-400`}>
                    <ArrowDownLeft className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-100 text-sm leading-tight">{t.description}</p>
                    <p className="text-[9px] text-slate-500 font-black uppercase tracking-wider mt-1">
                      {t.category} • {t.paymentMethod}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className={`font-black text-base tracking-tight ${t.type === 'income' ? 'text-emerald-400' : 'text-rose-500'}`}>
                      {t.type === 'income' ? '+' : '-'} {formatCurrency(t.amount)}
                    </p>
                    <p className="text-[9px] font-bold text-slate-600 mt-0.5 uppercase">
                      {formatDate(t.date)}
                    </p>
                  </div>
                  <button 
                    onClick={() => handleDelete(t.id)}
                    className="p-2 text-slate-600 hover:text-rose-500 hover:bg-rose-500/10 rounded-xl transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
