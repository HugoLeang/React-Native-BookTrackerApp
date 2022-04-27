import { react } from "react";
import { Text, View } from "react-native";
import BookDetailForm from "../Components/BookDetailForm";
const BookDetailView = (props) => {
  const styleSheet = props.styleSheet;

  return (
    <View style={styleSheet.container}>
      <Text>Book Detail</Text>
      <BookDetailForm styleSheet={styleSheet} />
    </View>
  );
};

export default BookDetailView;
