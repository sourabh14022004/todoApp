import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LogOut } from 'lucide-react';
import { RootState } from '../store';
import { logout } from '../store/slices/authSlice';

export const UserProfile: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  if (!user) return null;

  return (
    <div className="flex items-center gap-3 mb-8">
      <img
        src={user.avatar}
        alt={user.name}
        className="w-12 h-12 rounded-full"
      />
      <div className="flex-1">
        <h2 className="font-semibold">{user.name}</h2>
        <p className="text-sm text-gray-500">{user.email}</p>
      </div>
      <button
        onClick={() => dispatch(logout())}
        className="p-2 text-gray-400 hover:text-red-500 hover:bg-gray-100 rounded-lg"
      >
        <LogOut className="w-5 h-5" />
      </button>
    </div>
  );
};