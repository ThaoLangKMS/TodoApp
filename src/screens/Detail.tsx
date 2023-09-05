import {useNavigation, useRoute} from '@react-navigation/native';
import {PropsWithChildren, useState} from 'react';
import {Button, Modal, StyleSheet, TextInput, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {COLORS} from '../constants/ColorConstant';
import {ToDoType} from '../model/TodoType';
import useTodoStore from '../store';

type DetailProp = PropsWithChildren<{
  editedTask: ToDoType | null;
  isEditingTask: boolean;
  closeEditModal(): void;
  saveEditedTask(): void;
  changeEdittedTask(text: string): void;
}>;

export default function Detail(props: DetailProp) {
  const route = useRoute();
  const {editingTask: task} = route.params;
  const [isEditingTask, setEditingTask] = useState(true);
  const [editedTask, setEditedTask] = useState<ToDoType | null>(() => task);
  const updateTodoTask = useTodoStore(state => state.updateTodo);
  const navigation = useNavigation();

  const closeEditModal = () => {
    setEditingTask(false);
    setEditedTask(null);
    navigation.navigate('Home');
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
    <Modal visible={isEditingTask} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {editedTask && (
            <View>
              <TextInput
                style={{fontSize: hp('2.25%')}}
                value={editedTask.task}
                onChangeText={text => {
                  changeEdittedTask(text);
                }}
              />
              <View style={styles.header}>
                <Button title="Save" onPress={saveEditedTask} />
                <Button
                  title="Cancel"
                  onPress={closeEditModal}
                  color={COLORS.gray}
                />
              </View>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  header: {
    padding: hp('2%'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.light_gray,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: hp('4%'),
    borderRadius: hp('2%'),
    width: wp('76%'),
  },
});
