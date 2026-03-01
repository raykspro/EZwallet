import { Switch, Route, Router } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Layout } from "./components/layout";
import Dashboard from "./pages/dashboard";
import Transactions from "./pages/transactions";
import NotFound from "./pages/not-found";

function RouterComponent() {
  return (
    <Layout>
      <Switch>
        {/* Usamos o caminho relativo para funcionar no GitHub Pages */}
        <Route path="/" component={Dashboard} />
        <Route path="/transactions" component={Transactions} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* O 'base' é o segredo para o link do GitHub funcionar */}
      <Router base="/EZwallet">
        <RouterComponent />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
