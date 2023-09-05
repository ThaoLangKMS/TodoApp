import {MMKV} from 'react-native-mmkv';
import {ToDoType} from '../model/TodoType';
const storage = new MMKV();

const saveTodosToMMKV = (todos: ToDoType[]) => {
  const todosString = JSON.stringify(todos);
};

const loadTodosFromMMKV = (): ToDoType[] => {
  const todosString = storage.getString('todos');
  if (todosString) {
    const todosArray: ToDoType[] = JSON.parse(todosString);
    const todos = todosArray.map((todo: ToDoType) => ({...todo}));
    return todos;
  }
  return [];
};

const saveAuthToMMKV = (
  email: string,
  access_token: string,
  refresh_token: string,
) => {
  const auth = {
    email: email,
    access_token: access_token,
    refresh_token: refresh_token,
  };
  const authString = JSON.stringify(auth);
  storage.set('authUser', authString);
};

const saveTokenToMMKV = (type: string, token: string) => {
  const tokenString = JSON.stringify(token);
  storage.set(type, tokenString);
};

const getToken = (type: string): string | null => {
  const tokenString = storage.getString(type);
  if (tokenString) {
    return JSON.parse(tokenString);
  }
  return null;
};

const getAuthfFromMMKV = (): string | null => {
  const authString = storage.getString('authUser');
  if (authString) {
    return JSON.parse(authString);
  }
  return null;
};

export {
  getToken,
  loadTodosFromMMKV,
  saveTodosToMMKV,
  saveTokenToMMKV,
  saveAuthToMMKV,
  getAuthfFromMMKV,
};
