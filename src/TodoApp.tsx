import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import { LoginForm } from './components/LoginForm';
import { UserProfile } from './components/UserProfile';
import { TaskInput } from './components/TaskInput';
import { TaskList } from './components/TaskList';

export const TodoApp: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <LoginForm />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <UserProfile />
        <div className="bg-white rounded-xl shadow-sm p-6">
          <TaskInput />
          <TaskList />
        </div>
      </div>
    </div>
  );
};