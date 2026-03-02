import { Switch, Route, Router } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Layout } from "./components/layout";
import Dashboard from "./pages/dashboard";
import Transactions from "./pages/transactions";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* ATENÇÃO MESTRE: Alterado de /EZwallet para /Nexus para combinar com seu novo diretório */}
      <Router base="/Nexus">
        <Layout>
          <Switch>
            <Route path="/" component={Dashboard} />
            <Route path="/transactions" component={Transactions} />
            <Route>
              <div className="flex flex-col items-center justify-center min-h-[50vh] text-slate-500 gap-4">
                <span className="text-4xl">⚠️</span>
                <p className="font-bold">Página não encontrada no Nexus, mestre.</p>
              </div>
            </Route>
          </Switch>
        </Layout>
      </Router>
    </QueryClientProvider>
  );
}
