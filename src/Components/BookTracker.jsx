import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import { useNavigate } from "react-router-native";

const componentStyle = StyleSheet.create({
  container: {
    borderRadius: 6,
    padding: 10,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  volumeContainer: {
    margin: 1.5,
    backgroundColor: "#2196F3",
    borderRadius: 3,
    padding: 20,
    justifyContent: "space-between",
  },

  bookTitle: {
    textAlign: "left",
    fontSize: 20,
  },
  volumeCounterText: {
    textAlign: "center",
    color: "#fff",
  },
});

const BookTracker = (props) => {
  const navigation = useNavigate();

  const [name, setName] = useState(props.bookName);
  const [totalAmount, setTotalAmount] = useState(props.totalAmount);
  const [ownAmount, setownAmount] = useState(props.userAmount);
  const [id, setId] = useState(props.id);
  return (
    <TouchableHighlight
      onPress={() => {
        navigation("/bookDetail", { state: { id: id } });
      }}
      underlayColor="#F4F4F4"
    >
      <View style={componentStyle.container}>
        <Text style={componentStyle.bookTitle}> {name}</Text>
        <View style={componentStyle.volumeContainer}>
          <Text style={componentStyle.volumeCounterText}>{`Volume own `}</Text>
          <Text
            style={componentStyle.volumeCounterText}
          >{`${ownAmount} / ${totalAmount}`}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default BookTracker;
