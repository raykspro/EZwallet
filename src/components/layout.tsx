import { Link, useLocation } from "wouter";
import { LayoutDashboard, ReceiptText } from "lucide-react";

// Mudamos para exportação nomeada para bater com o import do App.tsx
export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  // Com o 'base' configurado no Router, o isActive volta a ser simples
  const isActive = (path: string) => location === path;

  return (
    <div className="min-h-screen bg-slate-950 pb-24 text-slate-50">
      {/* Container principal centralizado para mobile */}
      <main className="max-w-md mx-auto p-6 min-h-screen">
        {children}
      </main>

      {/* Navegação inferior fixa - z-50 para não sumir */}
      <nav className="fixed bottom-0 left-0 right-0 bg-slate-900/80 backdrop-blur-lg border-t border-slate-800 px-6 py-3 flex justify-around items-center max-w-md mx-auto shadow-2xl z-50">
        <Link href="/">
          <div className={`flex flex-col items-center gap-1 cursor-pointer transition-all active:scale-90 ${isActive('/') ? 'text-blue-400' : 'text-slate-500'}`}>
            <LayoutDashboard className="w-6 h-6" />
            <span className="text-xs font-medium">Dashboard</span>
          </div>
        </Link>
        
        <Link href="/transactions">
          <div className={`flex flex-col items-center gap-1 cursor-pointer transition-all active:scale-90 ${isActive('/transactions') ? 'text-blue-400' : 'text-slate-500'}`}>
            <ReceiptText className="w-6 h-6" />
            <span className="text-xs font-medium">Transações</span>
          </div>
        </Link>
      </nav>
    </div>
  );
}
