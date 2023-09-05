import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ListItem from '../component/ListItem';
import {COLORS} from '../constants/ColorConstant';
import {ToDoType} from '../model/TodoType';
import useTodoStore from '../store';
import {getToken, saveTodosToMMKV} from '../utils/storage';
import ResponsiveImage from 'react-native-responsive-image';

const Home = () => {
  const [textInput, setTextInput] = useState('');
  const [isEditingTask, setEditingTask] = useState(false);
  const [editedTask, setEditedTask] = useState<ToDoType | null>(null);

  const todos = useTodoStore(state => state.todos);
  const fetchTodos = useTodoStore(state => state.fetchTodos);
  const addTodoTask = useTodoStore(state => state.addTodo);
  const updateTodoTask = useTodoStore(state => state.updateTodo);
  const deleteTodoTask = useTodoStore(state => state.deleteTodo);
  const deleteAll = useTodoStore(state => state.deleteAllTodos);
  const updateTaskList = useTodoStore(state => state.updateTaskLists);
  const navigation = useNavigation();
  const api = axios.create({
    baseURL: process.env.BASE_URL,
    timeout: 5000,
  });
  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    saveTodosToMMKV(todos);
  }, [todos]);

  const addTodoHandler = async () => {
    if (textInput === '') {
      Alert.alert('Error', 'Please input todo');
    } else {
      try {
        const accessToken = await getToken('access_token');
        if (!accessToken) {
          Alert.alert('Error', 'Access token not found');
          return;
        }

        const response = await api.post(
          '/todos',
          {
            task: textInput,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );

        console.log('Todo added successfully', response.data);

        fetchTodos();
        setTextInput('');
      } catch (error) {
        console.error('Failed to add todo', error);
      }
    }
  };

  const markTodoCompleteHandler = (todoId: number) => {
    const updatedTodo = todos.find((todo: ToDoType) => todo.id === todoId);

    if (updatedTodo) {
      updateTodoTask({
        ...updatedTodo,
        completed: true,
      });
    }
  };

  const deleteTodoHandler = (todoId: number) => {
    deleteTodoTask(todoId);
  };

  const clearAllTodosHandler = () => {
    Alert.alert('Confirm', 'Clear todos?', [
      {
        text: 'Yes',
        onPress: () => deleteAll(),
      },
      {
        text: 'No',
      },
    ]);
  };

  const openEditModal = (task: ToDoType) => {
    setEditedTask({...task});
    setEditingTask(true);
  };

  const closeEditModal = () => {
    setEditingTask(false);
    setEditedTask(null);
  };

  const saveEditedTask = () => {
    if (editedTask) {
      updateTodoTask(editedTask);
      closeEditModal();
    }
  };
  const changeEdittedTask = (text: string) => {
    const newEdittedText = {...editedTask, task: text};
    setEditedTask(newEdittedText as ToDoType);
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <View style={styles.header}>
          {/* <TouchableOpacity
            onPress={clearAllTodosHandler}
            style={{flexDirection: 'row'}}>
            <Icon name="delete" size={hp('3.5%')} color="red" />
            <Text style={{fontSize: hp('2.5%')}}>Clear all</Text>
          </TouchableOpacity> */}
          <TouchableOpacity onPress={() => navigation.navigate('Account')}>
            <ResponsiveImage
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/128/547/547413.png',
              }}
              initWidth={50}
              initHeight={50}
            />
          </TouchableOpacity>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            padding: hp('2.5%'),
            paddingBottom: hp('6%'),
          }}
          data={todos}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <ListItem
              isCompletedList={false}
              editTask={() => openEditModal(item)}
              todo={item}
              markTodoComplete={() => markTodoCompleteHandler(item.id)}
              deleteTodo={() => deleteTodoHandler(item.id)}
            />
          )}
        />

        {todos.some((item: ToDoType) => item.completed) && (
          <View>
            <Text>Completed</Text>
          </View>
        )}

        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{padding: hp('2.5%'), paddingBottom: hp('6%')}}
          data={todos}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <ListItem
              isCompletedList={true}
              editTask={() => openEditModal(item)}
              todo={item}
              markTodoComplete={() => markTodoCompleteHandler(item.id)}
              deleteTodo={() => deleteTodoHandler(item.id)}
            />
          )}
        />
        <View style={styles.footer}>
          <View style={styles.inputContainer}>
            <TextInput
              value={textInput}
              placeholder="Add Todo"
              onChangeText={text => setTextInput(text)}
            />
          </View>
          <TouchableOpacity onPress={addTodoHandler}>
            <View style={styles.iconContainer}>
              <Icon name="add" color="white" size={wp('8%')} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: hp('1%'),
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: wp('100%'),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('3%'),
    //backgroundColor: COLORS.white,
  },
  inputContainer: {
    height: hp('7%'),
    paddingHorizontal: wp('5%'),
    elevation: hp('2%'),
    backgroundColor: COLORS.white,
    flex: 1,
    marginVertical: hp('2%'),
    marginRight: hp('2%'),
    borderRadius: hp('5%'),
  },
  iconContainer: {
    height: hp('7%'),
    width: wp('14%'),
    backgroundColor: COLORS.primary,
    elevation: hp('2%'),
    borderRadius: hp('8%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: hp('1%'),
    backgroundColor: COLORS.white,
    flexDirection: 'row',
  },
});

export default Home;
