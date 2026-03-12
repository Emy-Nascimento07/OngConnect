import { Text, View, StyleSheet, Image, TouchableOpacity} from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Image style={styles.logo}
        source={require("../assets/images/logo.png")}
        alt="Logo ONG Connect"
      />
      <Text style={styles.name}>ONG Connect</Text>

      <TouchableOpacity style={styles.buttonLogin} onPress={() => console.log("Botão pressionado, faça login!")}>
        <Text style={styles.buttonText2}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonProjects} onPress={() => console.log("Botão pressionado, conheça os nossos projetos!")}>
        <Text style={styles.buttonText1}>Conhecer projetos</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f1ffec",
  },
  logo: {
    width: 250,
    height: 200,
    marginBottom: 0,
  },
  name: {
    fontSize: 32,
    fontWeight: 700,
    color: "#1b489d",
    marginBottom: 15,
  },
  buttonProjects: {
    backgroundColor: "#fefff1",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#adb17f",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginBottom: 10,
  },
  buttonText1: {
    color: "#000000",
    fontSize: 18,
    fontWeight: "bold",
    opacity: 0.8,
  },
  buttonText2: {
    color: "#000000",
    fontSize: 18,
    fontWeight: "bold",
    opacity: 0.8,
  },
  buttonLogin: {
    backgroundColor: "#f1f7ff",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#7f89b1",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginBottom: 10,
    textDecorationLine: "underline",
  }
});
