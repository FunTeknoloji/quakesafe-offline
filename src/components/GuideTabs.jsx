import React from 'react';
import { NavLink } from 'react-router-dom';

const GuideTabs = () => {
  const tabs = [
    { name: 'Öncesi', path: '/guide/pre' },
    { name: 'Anı', path: '/guide/during' },
    { name: 'Sonrası', path: '/guide/post' },
    { name: 'İlk Yardım', path: '/first-aid' },
  ];

  return (
    <div className="flex bg-gray-900 p-1 rounded-2xl mb-6 overflow-x-auto no-scrollbar">
      {tabs.map((tab) => (
        <NavLink
          key={tab.path}
          to={tab.path}
          className={({ isActive }) =>
            `flex-1 text-center py-2 px-3 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              isActive ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-500'
            }`
          }
        >
          {tab.name}
        </NavLink>
      ))}
    </div>
  );
};

export default GuideTabs;
