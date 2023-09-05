import {Button, Modal, StyleSheet, TextInput, View} from 'react-native';
import {COLORS} from '../constants/ColorConstant';
import {PropsWithChildren, SetStateAction} from 'react';
import {ToDoType} from '../model/TodoType';

type EditTaskProp = PropsWithChildren<{
  editedTask: ToDoType | null;
  isEditingTask: boolean;
  closeEditModal(): void;
  saveEditedTask(): void;
  changeEdittedTask(text: string): void;
}>;

export function EditModal(props: EditTaskProp) {
  return (
    <Modal
      visible={props.isEditingTask}
      animationType="slide"
      transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {props.editedTask && (
            <View>
              <TextInput
                value={props.editedTask.task}
                onChangeText={text => {
                  props.changeEdittedTask(text);
                }}
              />
              <View style={styles.header}>
                <Button title="Save" onPress={props.saveEditedTask} />
                <Button
                  title="Cancel"
                  onPress={props.closeEditModal}
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
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: 300,
  },
});
