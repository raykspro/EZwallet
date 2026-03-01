import { Link, useLocation } from "wouter";
import { LayoutDashboard, ReceiptText } from "lucide-react";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <main className="max-w-md mx-auto p-6">{children}</main>
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-6 py-3 flex justify-around items-center max-w-md mx-auto shadow-lg">
        <Link href="/ezwallet/">
          <a className={`flex flex-col items-center gap-1 ${location === '/ezwallet/' ? 'text-slate-900' : 'text-slate-400'}`}>
            <LayoutDashboard className="w-6 h-6" />
            <span className="text-xs font-medium">Dashboard</span>
          </a>
        </Link>
        <Link href="/ezwallet/transactions">
          <a className={`flex flex-col items-center gap-1 ${location === '/ezwallet/transactions' ? 'text-slate-900' : 'text-slate-400'}`}>
            <ReceiptText className="w-6 h-6" />
            <span className="text-xs font-medium">Transações</span>
          </a>
        </Link>
      </nav>
    </div>
  );
}
