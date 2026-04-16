import { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigation";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export default function LoginScreen({ navigation }: Props) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const verificacaoLogin = () => {
    if (nome.trim().length > 0 && email.includes("@") && password.length > 5) {
      navigation.navigate("Dashboard", {
        userName: nome,
        voluntarioId: "ID-" + Math.random().toString(),
      });
    } else {
      alert(
        "Verifique os campos! O nome é obrigatório e a senha deve ter +5 caracteres.",
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerLogo}>
        <Image style={styles.logo} source={require("../../assets/logo.png")} />
        <Text style={styles.name}>ONG Connect</Text>
      </View>

      <View style={styles.formulario}>
        <TextInput
          style={styles.input}
          placeholder="Seu nome de voluntário"
          onChangeText={setNome}
          value={nome}
        />
        <TextInput
          style={styles.input}
          keyboardType="email-address"
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
        <Text style={styles.textoAjuda}>⚠️Senha deve ter mais de 5 caracteres</Text>

      </View>

      <TouchableOpacity style={styles.buttonLogin} onPress={verificacaoLogin}>
        <Text style={styles.buttonText2}>Entrar</Text>
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
