import { useEffect, useState } from "react";
import {
  LogBox,
  SectionList,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import { useNavigate } from "react-router-native";
import BookTracker from "../Components/BookTracker";
import { getAllTrackedBooks } from "../Services/FirestoreServices";
LogBox.ignoreLogs(["Setting a timer"]);

const BookTrackerList = (props) => {
  const styleSheet = props.styleSheet;
  const componentStyle = StyleSheet.create({
    componentContainer: {
      flex: 1,
      marginTop: 20,
    },
    section: {
      fontSize: 15,
      color: "#fff",
      backgroundColor: "#2196F3",
      marginTop: 10,
      marginBottom: 10,
      padding: 15,
      paddingRight: "73%",
      borderRadius: 10,
      elevation: 10,
    },
    item: {
      margin: 5,
    },
  });

  const navigation = useNavigate();
  const [trackedBooks, setTrackedBooks] = useState({
    onGoingBooks: [],
    onPauseBooks: [],
  });

  useEffect(() => {
    getAllTrackedBooks().then((data) => {
      setTrackedBooks(data);
    });
  }, []);

  return (
    <View style={componentStyle.componentContainer}>
      <SectionList
        sections={[
          { title: "On Going", data: trackedBooks.onGoingBooks },
          {
            title: "On Pause",
            data: trackedBooks.onPauseBooks,
          },
        ]}
        renderItem={({ item }) => (
          <BookTracker
            style={componentStyle.item}
            bookName={item.bookName}
            totalAmount={item.totalVolume}
            userAmount={item.ownVolume}
            id={item.id}
          />
        )}
        renderSectionHeader={({ section }) => (
          <Text style={componentStyle.section}>{section.title}</Text>
        )}
        keyExtractor={(item, index) => index}
      />
      <TouchableHighlight
        style={styleSheet.buttonBase}
        onPress={() => {
          navigation("/bookDetail", { state: { id: "" } });
        }}
      >
        <View>
          <Text style={styleSheet.btnTxtBase}>Add a new book</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
};

export default BookTrackerList;
