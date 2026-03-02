import { useTransactions } from "@/hooks/use-transactions";
import { formatCurrency, formatDate } from "@/lib/format";
import { ReceiptText, Tag, CreditCard } from "lucide-react";

export default function Transactions() {
  const { data: transactions = [] } = useTransactions();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Histórico</h1>
      <div className="space-y-3">
        {transactions.map((t) => (
          <div key={t.id} className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex justify-between items-center">
            <div className="flex gap-4 items-center">
              <div className={`p-3 rounded-xl ${t.type === 'income' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                <ReceiptText className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-slate-100">{t.description}</p>
                <div className="flex items-center gap-2 text-[10px] text-slate-500 uppercase font-bold tracking-wider">
                  <span className="flex items-center gap-1"><Tag className="w-3 h-3"/> {t.category}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><CreditCard className="w-3 h-3"/> {t.paymentMethod}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className={`font-bold ${t.type === 'income' ? 'text-emerald-500' : 'text-rose-500'}`}>
                {t.type === 'income' ? '+' : '-'} {formatCurrency(t.amount)}
              </p>
              <p className="text-xs text-slate-500">{formatDate(t.date)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
