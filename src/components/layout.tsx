import { Link, useLocation } from "wouter";
import { LayoutDashboard, ReceiptText } from "lucide-react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  // Função para verificar se a aba está ativa, ignorando o /EZwallet/
  const isActive = (path: string) => location === path;

  return (
    <div className="min-h-screen bg-slate-950 pb-24 text-slate-50">
      {/* O conteúdo principal do Dashboard entrará aqui */}
      <main className="max-w-md mx-auto p-6">{children}</main>

      {/* Barra de Navegação Estilo App (Fixa no Rodapé) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 px-6 py-3 flex justify-around items-center max-w-md mx-auto shadow-2xl z-50">
        <Link href="/">
          <div className={`flex flex-col items-center gap-1 cursor-pointer transition-colors ${isActive('/') ? 'text-blue-400' : 'text-slate-500'}`}>
            <LayoutDashboard className="w-6 h-6" />
            <span className="text-xs font-medium">Dashboard</span>
          </div>
        </Link>
        
        <Link href="/transactions">
          <div className={`flex flex-col items-center gap-1 cursor-pointer transition-colors ${isActive('/transactions') ? 'text-blue-400' : 'text-slate-500'}`}>
            <ReceiptText className="w-6 h-6" />
            <span className="text-xs font-medium">Transações</span>
          </div>
        </Link>
      </nav>
    </div>
  );
}
