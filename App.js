import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  Platform,
  StatusBar,
  Modal,
  Dimensions,
  TextInput,
  Button,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import DatePicker from "react-native-datepicker";
// import Category from "react-native-category";

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("09-10-2020");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetch("https://dermasync.herokuapp.com/api/tasks?completed=0")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        data.data.tasks.map((item) => {
          setTitle(item.title);
          setDescription(item.description);
        });
      });
    // .catch(err => alert(err))
  }, []);
  // const data = [
  //   {id: 1, title: 'Apple'},
  //   {id: 2, title: 'Samsung'},
  //   {id: 3, title: 'Sony'},
  //   {id: 4, title: 'Nokia'},
  //   {id: 5, title: 'HTC'},
  //   {id: 6, title: 'LG'}
  // ];

  // function itemChoose(item) {
  //   alert(item.title);
  // }

  const modalToggle = () => {
    setModalOpen(true);
  };

  const handleSubmit = () => {
    fetch('https://dermasync.herokuapp.com/api/task', {
      method: 'POST',
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({ title, description})
    }).then(() => {
      console.log("new task added")
    })
  };

  return (
    <View style={styles.container}>
      <Modal visible={modalOpen} animationType="slide">
        <View style={styles.modalContent}>
          <Ionicons
            name="close"
            size={40}
            color="black"
            onPress={() => setModalOpen(false)}
          />
          <Text>Create a task</Text>
          <Text>Task title</Text>
          <TextInput
            placeholder="enter your title"
            style={styles.input}
            onChangeText={(value) => setTitle(value)}
          ></TextInput>

          <Text>Select Date</Text>
          <DatePicker
            style={styles.datePickerStyle}
            date={date} // Initial date from state
            mode="date" // The enum of date, datetime and time
            placeholder="select date"
            format="DD-MM-YYYY"
            minDate="01-01-2021"
            maxDate="01-01-2050"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                //display: 'none',
                position: "absolute",
                left: 0,
                top: 4,
                marginLeft: 0,
              },
              dateInput: {
                marginLeft: 36,
              },
            }}
            onDateChange={(date) => {
              setDate(date);
            }}
          />

          {/* <Text>Category</Text>
          <Category
            data={data}
            itemSelected={(item) => itemChoose(item)}
            itemText={"title"} //set attribule of object show in item category
          /> */}

          <View>
            <View>
              <Text>Start Time</Text>
              <Text>End Time</Text>
            </View>
            <View>
              <TextInput
                placeholder="12:00"
                onChangeText={(value) => setStartTime(value)}
              ></TextInput>
              <TextInput
                placeholder="23:00"
                onChangeText={(value) => setEndTime(value)}
              ></TextInput>
            </View>

            <View>
              <Text>Add Description</Text>
              <TextInput
                placeholder="Description"
                onChangeText={(value) => setDescription(value)}
              ></TextInput>
            </View>

            <Button title="Create Task" onPress={handleSubmit} />
          </View>
        </View>
      </Modal>

      <View style={styles.row}>
        <View style={styles.wish}>
          <Text style={styles.greet}>Hello Steve,</Text>
          <Text style={styles.good}>Good Morning</Text>
        </View>
        <Feather style={styles.search} name="search" size={24} color="black" />
        <Image
          style={styles.tinyLogo}
          source={{
            uri: "https://reactnative.dev/img/tiny_logo.png",
          }}
        />
      </View>

      <View style={styles.taskContainer}>
        <View style={styles.row}>
          <View style={styles.task}>
            <Text style={{ fontSize: 20 }}>New Task</Text>
          </View>
          <View style={styles.task}>
            <Text style={{ fontSize: 20 }}>Completed</Text>
          </View>
        </View>

        <View>
          <Text>{title}</Text>
          <Text>{description}</Text>
        </View>

        <View style={styles.add}>
          <Ionicons
            name="add-circle-sharp"
            size={75}
            color="blue"
            onPress={modalToggle}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    margin: 10,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  searchbar: {
    flex: 1,
    flexDirection: "row",
  },
  search: {
    color: "#000",
    fontSize: 30,
  },
  tinyLogo: {
    height: 40,
    width: 40,
    borderRadius: 50,
  },
  greet: {
    marginLeft: 10,
    fontSize: 20,
  },
  good: {
    marginLeft: 10,
    fontSize: 35,
  },
  taskContainer: {
    position: "absolute",
    top: 120,
    width: "100%",
  },
  task: {
    flex: 1,
    alignItems: "center",
  },
  add: {
    position: "absolute",
    top: 500,
    right: 10,
    height: 75,
    width: 75,
    borderRadius: 50,
  },
  modalContent: {
    margin: 20,
  },
  input: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
  },
  datePickerStyle: {
    width: 200,
    marginTop: 20,
  },
});
