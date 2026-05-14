import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { RootStackParamList } from "../types/navigation";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export default function LoginScreen({ navigation }: Props) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const verificacaoLogin = () => {
    const nomeLimpo = nome.trim();
    const emailLimpo = email.trim();

    if (
      nomeLimpo.length > 0 &&
      emailLimpo.includes("@") &&
      password.length > 5
    ) {
      navigation.navigate("MainTabs", {
        userName: nomeLimpo,
        voluntarioId: "VOL-" + Math.floor(Math.random() * 10000).toString(),
      });
    } else if (nomeLimpo.length < 1) {
      Alert.alert("Atenção", "O nome do voluntário é obrigatório!");
    } else if (!emailLimpo.includes("@")) {
      Alert.alert("Atenção", "Insira um e-mail válido contendo '@'.");
    } else if (password.length <= 5) {
      Alert.alert("Atenção", "A senha deve conter mais de 5 caracteres.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerLogo}>
        <Image
          style={styles.logo}
          source={require("../assets/images/logo.png")}
        />
        <Text style={styles.name}>ONG Connect</Text>
      </View>

      <View style={styles.formulario}>
        <TextInput
          style={styles.input}
          placeholder="Nome do Voluntário"
          onChangeText={setNome}
          value={nome}
          placeholderTextColor="#999"
        />

        <TextInput
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholder="E-mail corporativo ou pessoal"
          onChangeText={setEmail}
          value={email}
          placeholderTextColor="#999"
        />
        {email.length > 0 && (
          <Text style={styles.textoAjuda}>Logando como: {email}</Text>
        )}

        <TextInput
          style={styles.input}
          placeholder="Senha de acesso"
          secureTextEntry
          onChangeText={setPassword}
          value={password}
          placeholderTextColor="#999"
        />
        <Text style={styles.textoAlerta}>
          ⚠️ A senha precisa ter mais de 5 dígitos.
        </Text>
      </View>

      <TouchableOpacity
        style={styles.buttonLogin}
        onPress={verificacaoLogin}
        activeOpacity={0.85}
      >
        <Text style={styles.buttonText}>Entrar na Rede</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FDF8",
  },
  containerLogo: {
    marginBottom: 40,
    alignItems: "center",
  },
  logo: {
    width: 200,
    height: 160,
    resizeMode: "contain",
  },
  name: {
    fontSize: 32,
    fontWeight: "800",
    color: "#2E6641",
    marginTop: 10,
  },
  formulario: {
    width: "85%",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: "#FAFAFA",
    fontSize: 15,
    color: "#333",
  },
  textoAjuda: {
    fontSize: 12,
    color: "#48a165",
    marginBottom: 12,
    alignSelf: "flex-start",
  },
  textoAlerta: {
    fontSize: 11,
    color: "#D9534F",
    alignSelf: "flex-start",
    marginTop: -4,
  },
  buttonLogin: {
    backgroundColor: "#48a165",
    borderRadius: 12,
    paddingVertical: 14,
    width: "85%",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#48a165",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
