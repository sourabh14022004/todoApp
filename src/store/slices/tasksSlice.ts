import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { collection, addDoc, deleteDoc, doc, updateDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { Task } from '../../types';
import { AppDispatch } from '..';

interface TasksState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  tasks: [],
  loading: false,
  error: null,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setTasks, setLoading, setError } = tasksSlice.actions;

// Thunks
export const fetchTasks = (userId: string) => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  try {
    const q = query(collection(db, 'tasks'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    const tasks = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Task[];
    dispatch(setTasks(tasks));
  } catch (error: any) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const addTask = (task: Omit<Task, 'id'> & { userId: string }) => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  try {
    await addDoc(collection(db, 'tasks'), task);
    dispatch(fetchTasks(task.userId));
  } catch (error: any) {
    dispatch(setError(error.message));
  }
};

export const removeTask = (taskId: string, userId: string) => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  try {
    await deleteDoc(doc(db, 'tasks', taskId));
    dispatch(fetchTasks(userId));
  } catch (error: any) {
    dispatch(setError(error.message));
  }
};

export const toggleTask = (taskId: string, completed: boolean, userId: string) => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  try {
    await updateDoc(doc(db, 'tasks', taskId), { completed });
    dispatch(fetchTasks(userId));
  } catch (error: any) {
    dispatch(setError(error.message));
  }
};

export const updateTaskPriority = (taskId: string, priority: Task['priority'], userId: string) => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  try {
    await updateDoc(doc(db, 'tasks', taskId), { priority });
    dispatch(fetchTasks(userId));
  } catch (error: any) {
    dispatch(setError(error.message));
  }
};

export default tasksSlice.reducer;