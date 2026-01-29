
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, BookOpen, MessageCircle, Wrench, Settings } from 'lucide-react';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Ana Sayfa', path: '/' },
    { icon: BookOpen, label: 'Rehber', path: '/guide/during' },
    { icon: MessageCircle, label: 'Sohbet', path: '/messaging' },
    { icon: Wrench, label: 'Araçlar', path: '/tools' },
    { icon: Settings, label: 'Ayarlar', path: '/settings' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 flex justify-around items-center h-20 px-2 pb-2 z-50">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path.split('/').slice(0, 2).join('/')));
        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center justify-center w-full transition-colors ${
              isActive ? 'text-blue-500' : 'text-gray-500'
            }`}
          >
            <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
            <span className={`text-[10px] mt-1 font-bold uppercase tracking-tight ${isActive ? 'opacity-100' : 'opacity-60'}`}>
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNav;
