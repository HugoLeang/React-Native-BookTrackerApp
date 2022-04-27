import { Picker } from "@react-native-picker/picker";
import { react, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableHighlight,
} from "react-native";
import { useLocation, useNavigate } from "react-router-native";
import {
  addTrackedBook,
  editTrackedBook,
  getTrackedBook,
} from "../Services/FirestoreServices";
const BookDetailForm = (props) => {
  const styleSheet = props.styleSheet;
  const componentStyle = StyleSheet.create({
    formContainer: {
      flex: 1,
      justifyContent: "flex-start",
      marginTop: 30,
    },
    modeTxtDisplay: {
      textAlign: "center",
      fontWeight: "bold",
      fontSize: 25,
      marginTop: 20,
    },
    fieldName: {
      textAlign: "center",
      fontWeight: "bold",
    },
    textInputField: {
      fontSize: 15,
      paddingHorizontal: 5,
      width: 340,
      height: 60,
      borderColor: "#2196F3",
      borderWidth: 3,
      borderRadius: 15,
      textAlign: "center",
    },
    counterInputField: {
      fontSize: 15,
      margin: 5,
      paddingHorizontal: 5,
      width: 100,
      height: 60,
      borderColor: "#2196F3",
      borderWidth: 3,
      borderRadius: 15,
      textAlign: "center",
    },
    counterContainer: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      margin: 1,
      paddingTop: 20,
    },
    pickerField: {
      margin: 20,
      marginTop: 20,
      marginBottom: 50,
      backgroundColor: "#2196F3",
      borderRadius: 15,
    },
  });
  const navigation = useNavigate();
  const { state } = useLocation();
  const [formMode, setFormMode] = useState("");
  const [bookId, setBookId] = useState(state.id);
  const [bookName, setBookName] = useState("");
  const [ownVolume, setOwnVolume] = useState("");
  const [totalVolume, setTotalVolume] = useState("");
  const [status, setStatus] = useState("onGoing");

  useEffect(() => {
    const mode = bookId != "" ? "edit" : "create";
    setFormMode(mode);
    if (mode == "edit") {
      loadBook();
    }
  }, [bookId]);
  const bookStatus = {
    onGoing: "On Going",
    onPause: "On Pause",
  };

  const validForm = () => {
    if (formMode == "edit") {
      editTrackedBook(bookId, bookName, ownVolume, totalVolume, status);
    } else if (formMode == "create") {
      addTrackedBook(bookName, ownVolume, totalVolume, status);
    }
    navigation("/home");
  };

  const loadBook = () => {
    getTrackedBook(bookId).then((result) => {
      setBookName(result.bookName);
      setOwnVolume(result.ownVolume);
      setTotalVolume(result.totalVolume);
      setStatus(result.status);
    });
  };

  return (
    <View style={styleSheet.container}>
      <Text style={componentStyle.modeTxtDisplay}>
        {formMode.toUpperCase() + " BOOK"}
      </Text>
      <View style={componentStyle.formContainer}>
        <View>
          <Text style={componentStyle.fieldName}>Book name</Text>
          <TextInput
            style={componentStyle.textInputField}
            placeholder="Book name"
            onChangeText={setBookName}
            value={bookName}
          ></TextInput>
        </View>

        <View style={componentStyle.counterContainer}>
          <View>
            <Text style={componentStyle.fieldName}>Own</Text>
            <TextInput
              keyboardType="number-pad"
              style={componentStyle.counterInputField}
              placeholder="Volume own"
              onChangeText={setOwnVolume}
              value={ownVolume.toString()}
            />
          </View>
          <View>
            <Text style={componentStyle.fieldName}>Total</Text>
            <TextInput
              keyboardType="number-pad"
              style={componentStyle.counterInputField}
              placeholder="Total volume"
              onChangeText={setTotalVolume}
              value={totalVolume.toString()}
            ></TextInput>
          </View>
        </View>
        <View style={componentStyle.pickerField}>
          <Picker
            style={styleSheet.btnTxtBase}
            selectedValue={status}
            onValueChange={(itemValue, itemIndex) => {
              setStatus(itemValue);
            }}
          >
            <Picker.Item label="On Going" value="onGoing" />
            <Picker.Item label="On Pause" value="onPause" />
          </Picker>
        </View>
        <TouchableHighlight
          style={styleSheet.buttonBase}
          onPress={() => {
            validForm();
          }}
        >
          <Text style={styleSheet.btnTxtBase}>
            {bookId != "" ? "Edit" : "Create"}
          </Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styleSheet.buttonBase}
          onPress={() => {
            navigation("/home");
          }}
        >
          <Text style={styleSheet.btnTxtBase}>Return</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default BookDetailForm;
