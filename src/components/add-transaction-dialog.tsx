import { useState } from "react";
import { useCreateTransaction } from "@/hooks/use-transactions";
import { Plus, X, ChevronDown } from "lucide-react";
import { Input } from "./ui/input";

const PAYMENT_METHODS = ["Pix", "Cartão de Crédito", "Cartão de Débito", "Dinheiro"];
const EXPENSE_CATEGORIES = ["Alimentação", "Lazer", "Reservado", "Assinatura", "Transporte", "Parcelamento", "Cuidados Pessoais", "Outros"];
const INCOME_CATEGORIES = ["Salário", "Investimento", "Extra"];

export default function AddTransactionDialog() {
  const [open, setOpen] = useState(false);
  const createMutation = useCreateTransaction();
  
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    type: "expense" as "income" | "expense",
    category: "Alimentação",
    paymentMethod: "Pix",
    date: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createMutation.mutateAsync({
      ...formData,
      amount: Number(formData.amount)
    });
    setOpen(false);
    setFormData({ ...formData, description: "", amount: "" });
  };

  if (!open) return (
    <button onClick={() => setOpen(true)} className="fixed bottom-28 right-6 bg-blue-600 text-white p-4 rounded-full shadow-2xl z-50 active:scale-95 transition-transform">
      <Plus className="w-8 h-8" />
    </button>
  );

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-end md:items-center justify-center p-4">
      <div className="bg-slate-900 w-full max-w-md rounded-t-[32px] md:rounded-[32px] p-8 border border-slate-800 animate-in slide-in-from-bottom duration-300">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Novo Lançamento</h2>
          <button onClick={() => setOpen(false)} className="text-slate-400 p-2"><X /></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Seletor Tipo: Receita/Despesa */}
          <div className="flex bg-slate-800 p-1 rounded-2xl">
            <button type="button" onClick={() => setFormData({...formData, type: 'income', category: 'Salário'})}
              className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${formData.type === 'income' ? 'bg-emerald-500 text-white' : 'text-slate-400'}`}>Receita</button>
            <button type="button" onClick={() => setFormData({...formData, type: 'expense', category: 'Alimentação'})}
              className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${formData.type === 'expense' ? 'bg-rose-500 text-white' : 'text-slate-400'}`}>Despesa</button>
          </div>

          <Input placeholder="Descrição" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} required />
          <Input type="number" placeholder="Valor (R$)" value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})} required />

          {/* Seletor de Categoria */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500 ml-1">CATEGORIA</label>
            <select 
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className="w-full h-12 bg-slate-900 border border-slate-800 rounded-2xl px-4 text-white focus:ring-2 focus:ring-blue-600 outline-none appearance-none"
            >
              {(formData.type === 'expense' ? EXPENSE_CATEGORIES : INCOME_CATEGORIES).map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Seletor de Método de Pagamento */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500 ml-1">MÉTODO DE PAGAMENTO</label>
            <select 
              value={formData.paymentMethod}
              onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
              className="w-full h-12 bg-slate-900 border border-slate-800 rounded-2xl px-4 text-white focus:ring-2 focus:ring-blue-600 outline-none appearance-none"
            >
              {PAYMENT_METHODS.map(method => (
                <option key={method} value={method}>{method}</option>
              ))}
            </select>
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-900/20 active:scale-95">
            Confirmar Lançamento
          </button>
        </form>
      </div>
    </div>
  );
}
