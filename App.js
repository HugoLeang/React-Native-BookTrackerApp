import { Platform, SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { NativeRouter, Route, Routes } from "react-router-native";
import HomeView from "./src/Views/HomeView";
import LoginView from "./src/Views/LoginView.jsx";
import FirebaseConfig from "./src/configs/FirebaseConfig";
import BookDetailView from "./src/Views/BookDetailView";
export default function App() {
  return (
    <NativeRouter>
      <SafeAreaView style={styles.androidSafeArea}>
        <Routes>
          <Route path="/" element={<LoginView styleSheet={styles} />} />
          <Route path="/home" element={<HomeView styleSheet={styles} />} />
          <Route
            path="/bookDetail"
            element={<BookDetailView styleSheet={styles} />}
          />
        </Routes>
      </SafeAreaView>
    </NativeRouter>
  );
}

const styles = StyleSheet.create({
  androidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  textTitle: {
    fontSize: 30,
    color: "#fff",
    fontWeight: "bold",
    padding: 15,
    width: "40%",
  },
  buttonBase: {
    backgroundColor: "#2196F3",
    padding: 15,
    color: "#fff",
    margin: 5,
    borderRadius: 5,
  },
  btnTxtBase: {
    color: "#fff",
    textAlign: "center",
    fontSize: 17,
    fontWeight: "bold",
  },
  errorTxt: {
    color: "#FF2C2C",
    textAlign: "center",
  },
});
