import axios from 'axios';

const api=axios.create({
    baseURL: process.env.BASE_URL,
    timeout:5000,
})

export const fetchTodos = async () => {
    try {
      const response = await axios.get('http://10.0.2.2:3000/todos');
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch todos');
    }
};

export const addTodoTask = async (textInput: string) => {
    try {
        const response = await api.post('/todos', { task: 'Test demo' });
        return response.data;
      } catch (error) {        
        throw new Error('Failed to create new todo');
      }
};




