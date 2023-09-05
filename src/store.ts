import { BASE_URL } from '@env';
import axios from 'axios';
import { create } from "zustand";
import { ToDoType } from './model/TodoType';
import { getToken } from './utils/storage';

interface TodoStore {
  deleteAllTodos: any;
  deleteTodo: any;
  updateTodo: any;
  addTodo: any;
  fetchTodos: any;
  todos: ToDoType[];
  updateTaskLists: (taskList: ToDoType[]) => void
}

const api=axios.create({
  baseURL: BASE_URL,
})

const useTodoStore = create<TodoStore>((set) => ({
  todos: [],
updateTaskLists: (taskList) => set((state) => ({
  todos: [...taskList]
})),
  fetchTodos: async () => {
    try {
      const response = await api.get('/todos', {
        headers: {
          Authorization: `Bearer ${getToken("access_token")}`
        }
      });
      set({ todos: response.data });
    } catch (error) {
      console.error(error);
    }
  },
  addTodo: async (newTodo:ToDoType) => {
    try {
      const response = await api.post('/todos', newTodo);
      set((state:TodoStore) => ({ todos: [...state.todos, response.data] }));
    } catch (error) {
      console.error('Failed to add todo:', error);
    }
  },
  updateTodo: async (updatedTodo:ToDoType) => {
    try {
      const response = await api.put(`/todos/${updatedTodo.id}`,{
        task:updatedTodo.task,
        completed: updatedTodo.completed
      } ,{
        headers: {
          Authorization: `Bearer ${getToken("access_token")}`
        }
      });
      set((state:TodoStore) => ({
        todos: state.todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo)),
      }));
    } catch (error) {
      console.error('Failed to update todo:', error);
    }
  },
  deleteTodo: async (todoId:number) => {
    try {
      await api.delete(`/todos/${todoId}`,{
        headers: {
          Authorization: `Bearer ${getToken("access_token")}`
        }
      });
      set((state: TodoStore) => ({ todos: state.todos.filter((todo) => todo.id !== todoId) }));
    } catch (error) {
      console.error('Failed to delete todo:', error);
    }
  },
  deleteAllTodos: async () => {
    try {
      await api.delete('/todos',{
        headers: {
          Authorization: `Bearer ${getToken("access_token")}`
        }
      });
      set({ todos: [] });
    } catch (error) {
      console.error('Failed to delete all todos:', error);
    }
  },
}));

export default useTodoStore;
