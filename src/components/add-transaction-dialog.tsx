import { useState } from "react";
import { useCreateTransaction } from "@/hooks/use-transactions";
import { Plus, X } from "lucide-react";
import { Input } from "./ui/input";

export default function AddTransactionDialog() {
  const [open, setOpen] = useState(false);
  const createMutation = useCreateTransaction();
  
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    type: "expense" as "income" | "expense",
    category: "Geral",
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
    <button 
      onClick={() => setOpen(true)}
      className="fixed bottom-24 right-6 bg-blue-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform z-50"
    >
      <Plus className="w-6 h-6" />
    </button>
  );

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-end md:items-center justify-center p-4">
      <div className="bg-slate-900 w-full max-w-md rounded-t-[32px] md:rounded-[32px] p-8 border border-slate-800 animate-in slide-in-from-bottom duration-300">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Novo Lançamento</h2>
          <button onClick={() => setOpen(false)} className="text-slate-400"><X /></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex bg-slate-800 p-1 rounded-xl">
            <button 
              type="button"
              onClick={() => setFormData({...formData, type: 'income'})}
              className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${formData.type === 'income' ? 'bg-emerald-500 text-white' : 'text-slate-400'}`}
            >Receita</button>
            <button 
              type="button"
              onClick={() => setFormData({...formData, type: 'expense'})}
              className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${formData.type === 'expense' ? 'bg-rose-500 text-white' : 'text-slate-400'}`}
            >Despesa</button>
          </div>

          <Input 
            placeholder="O que o Senhor comprou?" 
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            required
          />
          <Input 
            type="number" 
            placeholder="Valor (R$)" 
            value={formData.amount}
            onChange={(e) => setFormData({...formData, amount: e.target.value})}
            required
          />
          <Input 
            type="date" 
            value={formData.date}
            onChange={(e) => setFormData({...formData, date: e.target.value})}
            required
          />

          <button 
            type="submit"
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition-colors"
          >
            Confirmar Lançamento
          </button>
        </form>
      </div>
    </div>
  );
}
