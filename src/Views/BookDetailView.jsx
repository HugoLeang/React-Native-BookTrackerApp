import { react } from "react";
import { Text, View, StyleSheet } from "react-native";
import BookDetailForm from "../Components/BookDetailForm";
const BookDetailView = (props) => {
  const styleSheet = props.styleSheet;
  const viewStyle = StyleSheet.create({
    viewTitle: {
      fontWeight: "bold",
      color: "#fff",
      backgroundColor: "#2196F3",
      width: "100%",
      textAlign: "center",
      padding: 20,
      fontSize: 20,
    },
  });
  return (
    <View style={styleSheet.container}>
      <Text style={viewStyle.viewTitle}>Book Detail</Text>
      <BookDetailForm styleSheet={styleSheet} />
    </View>
  );
};

export default BookDetailView;
