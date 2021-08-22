import React, {useState} from 'react';

// Components
import Header from './Header';
import ListItems from './ListItems';
import InputModal from './InputModal';

// async storage
import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = ({todos, setTodos}) => {

    //clear all todos
    const handleClearTodos = () => {
        AsyncStorage.setItem("storedTodos", JSON.stringify([])).then(() =>{
            setTodos([]);
        }).catch(err => console.log(err));
    }   

    // Modal Visibility & input value
    const [modalVisible, setModalVisible] = useState(false);
    const [todoInputValue, setTodoInputValue] = useState();

    //function to add a new todo
    const handleAddTodo = (todo) => {
        const newTodos = [...todos, todo];
        AsyncStorage.setItem("storedTodos", JSON.stringify(newTodos)).then(() =>{
            setTodos(newTodos);
            setModalVisible(false);
        }).catch(err => console.log(err));
    }

    // Editing

    const [todoToBeEdited, setTodoToBeEdited] = useState(null);

    const handleTriggerEdit = (item) => {
        setTodoToBeEdited(item);
        setModalVisible(true);
        setTodoInputValue(item.title);
    }

    const handleEditTodo = (editedTodo) => {
        const newTodos = [...todos];
        const todoIndex = newTodos.findIndex((todo) => todo.key == editedTodo.key);
        newTodos.splice(todoIndex, 1, editedTodo);

        AsyncStorage.setItem("storedTodos", JSON.stringify(newTodos)).then(() =>{
            setTodos(newTodos);
            setModalVisible(false);
            setTodoToBeEdited(null);
        }).catch(err => console.log(err));
    }

    return(
        <>
            <Header handleClearTodos={handleClearTodos} />
            <ListItems 
                todos={todos}
                setTodos={setTodos}
                handleTriggerEdit={handleTriggerEdit}
            />
            <InputModal 
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                todoInputValue={todoInputValue}
                setTodoInputValue={setTodoInputValue}
                handleAddTodo={handleAddTodo}
                todoToBeEdited={todoToBeEdited}
                setTodoToBeEdited={setTodoToBeEdited}
                handleEditTodo={handleEditTodo}
                todos={todos}
            />
        </>
    );
}

export default Home;