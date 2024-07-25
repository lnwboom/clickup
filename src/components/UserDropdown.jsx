import React from 'react';
import { Link } from 'react-router-dom';

function UserDropdown({ user, onLogout }) {
  return (
    <div className="bg-white rounded-xl border-2 border-slate-300 shadow-md w-64">
      <div className="p-4 flex items-start space-x-3">
        <img
          src={user.avatar || "https://via.placeholder.com/40"}
          alt={user.name}
          className="w-10 h-10 rounded-full"
        />
        <div>
          <div className="text-sm font-medium text-slate-700">{user.name}</div>
          <div className="text-xs text-slate-500">{user.email}</div>
        </div>
      </div>
      <div className="border-t border-slate-200" />
      <nav className="py-2">
        <MenuItem to="/profile" icon="https://cdn.builder.io/api/v1/image/assets/TEMP/953d437f63689f64f170290d9a5c7d8497f223136f71755e11883505a8941868?" label="Profile" />
        <MenuItem to="/themes" icon="https://cdn.builder.io/api/v1/image/assets/TEMP/f23a7f6babe43544cb756e4e660fdf70d1d75139b44a1f223af1d2344b121091?" label="Themes" />
        <MenuItem to="/settings" icon="https://cdn.builder.io/api/v1/image/assets/TEMP/e8c3530bccf0a9170bb89a827f7bedec3bb9162f44f0b741e6b1026a356fb7e0?" label="Settings" />
        <MenuItem to="/notification-settings" icon="https://cdn.builder.io/api/v1/image/assets/TEMP/da2246189bed61e5ec937d961fc4ecf4afe091321c83551baec89f4d56d6ffcc?" label="Notification Settings" />
      </nav>
      <div className="border-t border-slate-200" />
      <button 
        onClick={onLogout} 
        className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 flex items-center space-x-3"
      >
        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/73481ba9ae2970803f3b4271f5d2f92876c76871523a6a31ce27fe922eefc5f1?" alt="" className="w-4 h-4" />
        <span>Log Out</span>
      </button>
    </div>
  );
}

function MenuItem({ to, icon, label }) {
  return (
    <Link 
      to={to} 
      className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 flex items-center space-x-3"
    >
      <img src={icon} alt="" className="w-4 h-4" />
      <span>{label}</span>
    </Link>
  );
}

export default UserDropdown;