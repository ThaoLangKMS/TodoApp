import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {PropsWithChildren} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {COLORS} from '../constants/ColorConstant';
import {ToDoType} from '../model/TodoType';

type ListItemProp = PropsWithChildren<{
  todo: ToDoType;
  isCompletedList: boolean;
  editTask(): void;
  markTodoComplete(): void;
  deleteTodo(): void;
}>;

export function ListItem(props: ListItemProp) {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const handleTaskPress = (todo: ToDoType) => {
    navigation.navigate('Detail', {editingTask: todo});
  };
  return (
    <View>
      {props.todo.completed === props.isCompletedList && (
        <View>
          <TouchableOpacity
            onPress={() => {
              handleTaskPress(props.todo);
            }}>
            <View style={styles.listItem}>
              <View style={{flex: 1}}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: hp('2.25%'),
                    textDecorationLine: props.todo.completed
                      ? 'line-through'
                      : 'none',
                  }}>
                  {props.todo.task}
                </Text>
              </View>

              <TouchableOpacity onPress={() => props.markTodoComplete()}>
                <View
                  style={{
                    ...styles.actionIcon,
                    backgroundColor: props.todo.completed
                      ? COLORS.primary
                      : 'gray',
                  }}>
                  <Icon
                    name={props.todo.completed ? 'done' : 'square'}
                    size={hp('2.5%')}
                    color={props.todo.completed ? 'black' : 'white'}
                  />
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => props.deleteTodo()}>
                <View style={{...styles.actionIcon}}>
                  <Icon name="delete" size={hp('3%')} color="red" />
                </View>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

export default ListItem;

const styles = StyleSheet.create({
  actionIcon: {
    height: hp('3%'),
    width: wp('5%'),
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: wp('2%'),
    borderRadius: wp('1%'),
  },
  listItem: {
    padding: hp('2.5%'),
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    elevation: hp('2%'),
    borderRadius: hp('1%'),
    marginVertical: hp('1%'),
  },
});

//--------------------
// import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
// import {PanGestureHandler, State} from 'react-native-gesture-handler';
// import Animated, {
//   Easing,
//   useAnimatedStyle,
//   useSharedValue,
//   withSpring,
//   withTiming,
// } from 'react-native-reanimated';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import {COLORS} from '../constants/ColorConstant';
// import {ToDoType} from '../model/TodoType';

// type ListItemProp = {
//   todo: ToDoType;
//   isCompletedList: boolean;
//   editTask(): void;
//   markTodoComplete(): void;
//   deleteTodo(): void;
// };

// export function ListItem(props: ListItemProp) {
//   const deleteOpacity = useSharedValue(0);
//   const translateX = useSharedValue(0);
//   const deleting = useSharedValue(false);

//   const deleteStyle = useAnimatedStyle(() => {
//     deleteOpacity.value = withTiming(1);
//     return {
//       opacity: deleteOpacity.value,
//       transform: [{translateX: translateX.value}],
//     };
//   });

//   const handleGestureEvent = (event: any) => {
//     const {translationX} = event;
//     if (!deleting.value) {
//       translateX.value = translationX;
//       deleteOpacity.value = translationX < -50 ? 1 : 0;
//     }
//   };

//   const handleStateChange = (event: any) => {
//     if (event.nativeEvent.state === State.END) {
//       if (deleteOpacity.value === 1) {
//         deleting.value = true;
//         translateX.value = withTiming(-150, {
//           duration: 300,
//           easing: Easing.bezier(0.25, 1, 0.5, 1),
//         });
//         setTimeout(() => {
//           deleteTodoHandler(props.todo.id);
//           deleting.value = false;
//         }, 300);
//       } else {
//         translateX.value = withSpring(0);
//       }
//       deleteOpacity.value = withSpring(0);
//     }
//   };

//   const markTodoCompleteHandler = () => {
//     props.markTodoComplete();
//   };

//   const deleteTodoHandler = (todoId: number) => {
//     props.deleteTodo();
//   };

//   return (
//     <PanGestureHandler
//     // onGestureEvent={handleGestureEvent}
//     // onHandlerStateChange={handleStateChange}
//     >
//       <Animated.View style={[styles.listItem, deleteStyle]}>
//         <View style={{flex: 1}}>
//           <Text
//             style={{
//               fontWeight: 'bold',
//               fontSize: 15,
//               textDecorationLine: props.todo.completed
//                 ? 'line-through'
//                 : 'none',
//             }}>
//             {props.todo.task}
//           </Text>
//         </View>

//         <TouchableOpacity onPress={markTodoCompleteHandler}>
//           <View
//             style={{
//               ...styles.actionIcon,
//               backgroundColor: props.todo.completed ? COLORS.primary : 'gray',
//             }}>
//             <Icon
//               name={props.todo.completed ? 'done' : 'square'}
//               size={20}
//               color={props.todo.completed ? 'black' : 'white'}
//             />
//           </View>
//         </TouchableOpacity>

//         <TouchableOpacity onPress={props.editTask}>
//           <View style={{...styles.actionIcon}}>
//             <Icon name="edit" size={20} color="blue" />
//           </View>
//         </TouchableOpacity>

//         <TouchableOpacity onPress={() => (deleteOpacity.value = 1)}>
//           <View style={{...styles.actionIcon}}>
//             <Icon name="delete" size={20} color="red" />
//           </View>
//         </TouchableOpacity>
//       </Animated.View>
//     </PanGestureHandler>
//   );
// }

// const styles = StyleSheet.create({
//   actionIcon: {
//     height: 20,
//     width: 20,
//     backgroundColor: COLORS.white,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginLeft: 5,
//     borderRadius: 3,
//   },
//   listItem: {
//     padding: 20,
//     backgroundColor: COLORS.white,
//     flexDirection: 'row',
//     elevation: 12,
//     borderRadius: 7,
//     marginVertical: 10,
//   },
// });

// export default ListItem;
