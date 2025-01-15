import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Check, Trash2, Star } from 'lucide-react';
import { removeTask, toggleTask, updateTaskPriority } from '../store/slices/tasksSlice';
import { Task } from '../types';
import { RootState } from '../store';
import clsx from 'clsx';

interface TaskItemProps {
  task: Task;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const priorityColors = {
    low: 'text-blue-500',
    medium: 'text-yellow-500',
    high: 'text-red-500',
  };

  const handleToggle = () => {
    if (user) {
      dispatch(toggleTask(task.id, !task.completed, user.id));
    }
  };

  const handleRemove = () => {
    if (user) {
      dispatch(removeTask(task.id, user.id));
    }
  };

  const handlePriorityUpdate = () => {
    if (user) {
      const priorities: Task['priority'][] = ['low', 'medium', 'high'];
      const currentIndex = priorities.indexOf(task.priority);
      const nextPriority = priorities[(currentIndex + 1) % priorities.length];
      dispatch(updateTaskPriority(task.id, nextPriority, user.id));
    }
  };

  return (
    <div className={clsx(
      'flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm',
      task.completed && 'bg-gray-50'
    )}>
      <button
        onClick={handleToggle}
        className={clsx(
          'w-5 h-5 rounded-full border-2 flex items-center justify-center',
          task.completed ? 'bg-green-500 border-green-500' : 'border-gray-300'
        )}
      >
        {task.completed && <Check className="w-3 h-3 text-white" />}
      </button>
      
      <span className={clsx(
        'flex-1',
        task.completed && 'line-through text-gray-500'
      )}>
        {task.title}
      </span>

      <button
        onClick={handlePriorityUpdate}
        className="p-1 hover:bg-gray-100 rounded"
      >
        <Star className={clsx('w-5 h-5', priorityColors[task.priority])} />
      </button>

      <button
        onClick={handleRemove}
        className="p-1 text-gray-400 hover:text-red-500 hover:bg-gray-100 rounded"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
};