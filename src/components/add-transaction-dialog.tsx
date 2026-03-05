import { useState } from "react";
import { useCreateTransaction } from "@/hooks/use-transactions";
import { Input } from "@/components/ui/input";

export function AddTransactionDialog() {
  const [open, setOpen] = useState(false);
  const createTransaction = useCreateTransaction();
  const [formData, setFormData] = useState({
    description: "", amount: "", type: "expense" as "income" | "expense",
    category: "Geral", paymentMethod: "Pix", date: new Date().toISOString().split('T')[0]
  });

  if (!open) return (
    <button onClick={() => setOpen(true)} className="fixed bottom-24 right-6 w-14 h-14 bg-blue-600 text-white rounded-full font-bold text-2xl z-50">+</button>
  );

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
      <div className="bg-slate-900 w-full max-w-sm rounded-3xl p-6 border border-slate-800">
        <div className="flex justify-between mb-4">
          <h2 className="text-white font-black italic">NOVO LANÇAMENTO</h2>
          <button onClick={() => setOpen(false)} className="text-slate-500 font-bold">X</button>
        </div>
        <form onSubmit={(e) => {
          e.preventDefault();
          createTransaction.mutate({...formData, amount: parseFloat(formData.amount)}, { onSuccess: () => setOpen(false) });
        }} className="space-y-4">
          <Input placeholder="Descrição" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} required className="bg-slate-950 border-slate-800" />
          <Input type="number" placeholder="Valor" value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} required className="bg-slate-950 border-slate-800" />
          <select className="w-full p-3 bg-slate-950 text-white rounded-xl border border-slate-800" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value as any})}>
            <option value="expense">Despesa</option>
            <option value="income">Receita</option>
          </select>
          <button type="submit" className="w-full py-4 bg-blue-600 text-white rounded-xl font-black">CONFIRMAR</button>
        </form>
      </div>
    </div>
  );
}
