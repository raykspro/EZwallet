import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export interface Transaction {
  id: number;
  description: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  date: string;
}

export function useTransactions() {
  return useQuery<Transaction[]>({
    queryKey: ["/api/transactions"],
    queryFn: () => {
      const data = localStorage.getItem("ezwallet_data");
      return data ? JSON.parse(data) : [];
    },
  });
}

export function useCreateTransaction() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newTx: Omit<Transaction, "id">) => {
      const data = localStorage.getItem("ezwallet_data");
      const transactions = data ? JSON.parse(data) : [];
      const txWithId = { ...newTx, id: Date.now() };
      localStorage.setItem("ezwallet_data", JSON.stringify([...transactions, txWithId]));
      return txWithId;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["/api/transactions"] }),
  });
}

export function useDeleteTransaction() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const data = localStorage.getItem("ezwallet_data");
      if (data) {
        const transactions = JSON.parse(data).filter((t: Transaction) => t.id !== id);
        localStorage.setItem("ezwallet_data", JSON.stringify(transactions));
      }
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["/api/transactions"] }),
  });
}
