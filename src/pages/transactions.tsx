import { useTransactions } from "@/hooks/use-transactions";
import { formatCurrency, formatDate } from "@/lib/format";
import { 
  Utensils, 
  PartyPopper, 
  PiggyBank, 
  Repeat, 
  Car, 
  Layers, 
  HeartPulse, 
  Wallet,
  CreditCard,
  Banknote,
  Coins,
  ArrowUpRight,
  ArrowDownLeft
} from "lucide-react";

// Mapeamento de ícones por categoria para o Senhor
const categoryConfig: Record<string, { icon: any, color: string }> = {
  "Alimentação": { icon: Utensils, color: "text-orange-400 bg-orange-400/10" },
  "Lazer": { icon: PartyPopper, color: "text-purple-400 bg-purple-400/10" },
  "Reservado": { icon: PiggyBank, color: "text-blue-400 bg-blue-400/10" },
  "Assinatura": { icon: Repeat, color: "text-indigo-400 bg-indigo-400/10" },
  "Transporte": { icon: Car, color: "text-cyan-400 bg-cyan-400/10" },
  "Parcelamento": { icon: Layers, color: "text-yellow-400 bg-yellow-400/10" },
  "Cuidados Pessoais": { icon: HeartPulse, color: "text-pink-400 bg-pink-400/10" },
  "Salário": { icon: Wallet, color: "text-emerald-400 bg-emerald-400/10" },
  "Investimento": { icon: Banknote, color: "text-blue-500 bg-blue-500/10" },
  "Extra": { icon: Coins, color: "text-amber-400 bg-amber-400/10" },
};

// Mapeamento de ícones para métodos de pagamento
const methodIcons: Record<string, any> = {
  "Pix": Coins,
  "Cartão de Crédito": CreditCard,
  "Cartão de Débito": CreditCard,
  "Dinheiro": Banknote,
};

export default function Transactions() {
  const { data: transactions = [] } = useTransactions();

  // Ordenar para que as mais recentes apareçam primeiro
  const sortedTransactions = [...transactions].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-black text-white tracking-tight">Histórico</h1>
        <span className="bg-slate-800 text-slate-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
          {transactions.length} Itens
        </span>
      </header>

      <div className="space-y-4">
        {sortedTransactions.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/50 rounded-[32px] border border-dashed border-slate-800">
            <p className="text-slate-500 font-medium text-sm">Nenhum lançamento encontrado, mestre.</p>
          </div>
        ) : (
          sortedTransactions.map((t) => {
            const config = categoryConfig[t.category] || { icon: ArrowDownLeft, color: "text-slate-400 bg-slate-400/10" };
            const Icon = config.icon;
            const MethodIcon = methodIcons[t.paymentMethod] || CreditCard;

            return (
              <div key={t.id} className="group bg-slate-900/40 hover:bg-slate-900 p-5 rounded-[24px] border border-slate-800/50 hover:border-slate-700 transition-all active:scale-[0.98]">
                <div className="flex justify-between items-center">
                  <div className="flex gap-4 items-center">
                    {/* Ícone da Categoria */}
                    <div className={`p-3 rounded-2xl ${config.color} transition-transform group-hover:scale-110`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    
                    <div>
                      <p className="font-bold text-slate-100 text-base leading-tight">{t.description}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-[10px] text-slate-500 font-black uppercase tracking-tighter flex items-center gap-1">
                          <MethodIcon className="w-3 h-3" />
                          {t.paymentMethod}
                        </span>
                        <span className="w-1 h-1 bg-slate-700 rounded-full" />
                        <span className="text-[10px] text-slate-500 font-black uppercase tracking-tighter">
                          {t.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className={`font-black text-lg ${t.type === 'income' ? 'text-emerald-400' : 'text-rose-500'}`}>
                      {t.type === 'income' ? (
                        <ArrowUpRight className="inline w-4 h-4 mr-1" />
                      ) : (
                        <ArrowDownLeft className="inline w-4 h-4 mr-1" />
                      )}
                      {formatCurrency(t.amount)}
                    </p>
                    <p className="text-[10px] font-bold text-slate-600 mt-0.5">
                      {formatDate(t.date)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
