import { useState } from "react";
import { useCreateTransaction } from "@/hooks/use-transactions";
import { Plus, X } from "lucide-react";
import { Input } from "@/components/ui/input";

export function AddTransactionDialog() {
  const [open, setOpen] = useState(false);
  const createTransaction = useCreateTransaction();
  const [formData, setFormData] = useState({
    description: "", amount: "", type: "expense" as "income" | "expense",
    category: "Alimentação", paymentMethod: "Pix",
    date: new Date().toISOString().split('T')[0]
  });

  if (!open) return (
    <button onClick={() => setOpen(true)} className="fixed bottom-28 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center z-50">
      <Plus className="w-8 h-8" />
    </button>
  );

  return (
    <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
      <div className="bg-slate-900 w-full max-w-md rounded-[32px] border border-slate-800 p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-black text-white italic">NOVO LANÇAMENTO</h2>
          <button onClick={() => setOpen(false)} className="text-slate-500"><X /></button>
        </div>
        <form onSubmit={(e) => {
          e.preventDefault();
          createTransaction.mutate({...formData, amount: parseFloat(formData.amount)}, { onSuccess: () => setOpen(false) });
        }} className="space-y-4">
          <Input placeholder="Descrição" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} required />
          <Input type="number" placeholder="Valor" value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} required />
          <div className="grid grid-cols-2 gap-4">
            <select className="bg-slate-950 text-white p-3 rounded-xl border border-slate-800 text-xs" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Transporte">Transporte</option>
            </select>
            <select className="bg-slate-950 text-white p-3 rounded-xl border border-slate-800 text-xs" value={formData.paymentMethod} onChange={e => setFormData({...formData, paymentMethod: e.target.value})}>
              <option value="Pix">Pix</option>
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão">Cartão</option>
            </select>
          </div>
          <button type="submit" className="w-full py-4 bg-blue-600 text-white rounded-xl font-black uppercase text-xs">Confirmar</button>
        </form>
      </div>
    </div>
  );
}
