import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-red-500/30">
      <header className="fixed top-0 left-0 right-0 h-16 bg-black border-b border-gray-800 flex items-center justify-between px-4 z-50">
        {!isHome ? (
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-900 rounded-full transition-colors"
            aria-label="Geri"
          >
            <ArrowLeft size={28} />
          </button>
        ) : (
          <div className="w-10" />
        )}
        <h1 className="text-xl font-bold tracking-tight">QuakeSafe Offline</h1>
        {!isHome ? (
          <button
            onClick={() => navigate('/')}
            className="p-2 hover:bg-gray-900 rounded-full transition-colors"
            aria-label="Ana Sayfa"
          >
            <Home size={28} />
          </button>
        ) : (
          <div className="w-10" />
        )}
      </header>
      <main className="pt-20 pb-10 px-4 max-w-lg mx-auto">
        {children}
      </main>
    </div>
  );
};

export default Layout;
