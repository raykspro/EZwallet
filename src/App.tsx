import { Switch, Route, Router } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import Layout from "@/components/layout"; 
import Dashboard from "@/pages/dashboard";
import Transactions from "@/pages/transactions";
import { User, ShieldCheck, Settings } from "lucide-react";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router base="/Nexus">
        <Layout>
          <Switch>
            {/* Rota Alpha: Analytics e Gráficos */}
            <Route path="/" component={Dashboard} />
            
            {/* Rota Bravo: Histórico de Operações */}
            <Route path="/transactions" component={Transactions} />
            
            {/* Rota Delta: Perfil Exclusivo do Mestre */}
            <Route path="/profile">
              <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-700">
                <header className="text-center py-6">
                  <div className="w-24 h-24 bg-blue-600 rounded-[32px] mx-auto flex items-center justify-center shadow-2xl shadow-blue-200 dark:shadow-none mb-4">
                    <User className="text-white w-12 h-12" />
                  </div>
                  <h2 className="text-2xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white">Mestre Nexus</h2>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Comandante do Sistema</p>
                </header>

                <div className="space-y-3">
                  <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-4">
                    <ShieldCheck className="w-5 h-5 text-blue-500" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-300">Segurança Ativa</span>
                  </div>
                  <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-4">
                    <Settings className="w-5 h-5 text-slate-400" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-300">Preferências do Sistema</span>
                  </div>
                </div>
              </div>
            </Route>

            {/* Extração de Emergência: Redireciona para o Painel */}
            <Route>
              <Dashboard />
            </Route>
          </Switch>
        </Layout>
      </Router>
    </QueryClientProvider>
  );
}
