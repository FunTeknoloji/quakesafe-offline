
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import BottomNav from './BottomNav';

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isEmergency = location.pathname === '/emergency';

  if (isEmergency) return <>{children}</>;

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-blue-500/30 pb-24">
      <header className="fixed top-0 left-0 right-0 h-16 bg-black/80 backdrop-blur-md border-b border-gray-800 flex items-center justify-between px-4 z-40">
        {!isHome ? (
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-900 rounded-full transition-colors text-gray-400"
            aria-label="Geri"
          >
            <ArrowLeft size={24} />
          </button>
        ) : (
          <div className="w-10" />
        )}
        <h1 className="text-lg font-black tracking-tighter uppercase italic">QuakeSafe</h1>
        <div className="w-10" />
      </header>
      <main className="pt-20 px-4 max-w-lg mx-auto animate-in fade-in duration-500">
        {children}
      </main>
      <BottomNav />
    </div>
  );
};

export default Layout;
