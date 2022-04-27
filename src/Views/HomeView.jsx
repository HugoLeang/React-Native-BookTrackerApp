import { Text, View, StyleSheet } from "react-native";
import BookTrackerList from "../Components/BookTrackerList";
import Icon from "react-native-vector-icons/AntDesign";
import { useNavigate } from "react-router-native";
const HomeView = (props) => {
  const styleSheet = props.styleSheet;
  const viewStyle = StyleSheet.create({
    topBarContainer: {
      flex: 0.12,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: "#2196F3",
      width: "100%",
    },
    logoutBtnImg: {
      marginRight: 20,
      backgroundColor: "#FF3535",
      padding: 10,
      borderRadius: 30,
      elevation: 50,
    },
  });

  const navigation = useNavigate();

  const disconnect = () => {
    //Clear store
    navigation("/");
  };

  return (
    <View style={styleSheet.container}>
      <View style={viewStyle.topBarContainer}>
        <Text style={styleSheet.textTitle}>Home</Text>

        <Icon
          style={viewStyle.logoutBtnImg}
          size={40}
          name="logout"
          color="#fff"
          onPress={() => {
            disconnect();
          }}
        />
      </View>
      <BookTrackerList styleSheet={styleSheet} />
    </View>
  );
};

export default HomeView;
