import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Plus } from 'lucide-react';
import { addTask } from '../store/slices/tasksSlice';
import { RootState } from '../store';
import { Task } from '../types';

export const TaskInput: React.FC = () => {
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !user) return;

    const newTask = {
      title: title.trim(),
      completed: false,
      priority: 'medium' as Task['priority'],
      createdAt: new Date().toISOString(),
      userId: user.id,
    };

    dispatch(addTask(newTask));
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 mb-6">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a task..."
        className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
      >
        <Plus className="w-5 h-5" />
      </button>
    </form>
  );
};