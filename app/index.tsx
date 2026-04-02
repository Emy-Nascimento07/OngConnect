import { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const verificacaoLogin = () => {
    if (email.includes("@") && password.length > 6) {
      console.log("✅ Acesso autorizado para:", email);
      console.table({ email, password });
    } else {
      console.log("❌ Falha no login: E-mail inválido ou senha muito curta.");
      console.table({ email, password });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerLogo}>
        <Image
          style={styles.logo}
          source={require("../assets/images/logo.png")}
          accessibilityLabel="Logo ONG Connect"
        />
        <Text style={styles.name}>ONG Connect</Text>
      </View>

      <View style={styles.formulario}>
        <TextInput
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholder="E-mail"
          onChangeText={setEmail}
          value={email}
        />
        <Text style={styles.textoAjuda}>Logando como: {email}</Text>

        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
          onChangeText={setPassword}
          value={password}
        />
      </View>
      <TouchableOpacity style={styles.buttonLogin} onPress={verificacaoLogin}>
        <Text style={styles.buttonText2}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonProjects}
        onPress={() =>
          console.log("Botão pressionado, conheça os nossos projetos!")
        }
      >
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
  },
  name: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1b489d",
    margin: 0,
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
    backgroundColor: "#62a6fe",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#3c6395",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginBottom: 10,
    marginTop: 5,
  },
  input: {
    width: "100%",
    padding: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    marginBottom: 10,
  },
  formulario: {
    width: "80%",
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: "#ffffff",
    padding: 16,
  },
  containerLogo: {
    marginBottom: 100,
    textAlign: "center",
    alignItems: "center",
    display: "flex",
  },
  textoAjuda: {
    fontSize: 12,
    color: "red",
    marginBottom: 10,
    textAlign: "left",
    alignSelf: "flex-start",
  },
});
