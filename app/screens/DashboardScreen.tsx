import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigation";
import React, { useState } from "react";

type Props = NativeStackScreenProps<RootStackParamList, "Dashboard">;

export default function DashboardScreen({ route, navigation }: Props) {
  const { userName } = route.params;

  const Sair = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  const [mensagem, setMensagem] = useState(
    `Olá, ${userName}, que bom ter você aqui para ajudar!`,
  );
  const substituirTexto = () => {
    setMensagem("Página de projetos ainda não está pronta, volte mais tarde!");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.mensagem}>{mensagem}</Text>

      <TouchableOpacity
        style={styles.buttonProjects}
        onPress={() =>
          console.log("Botão pressionado, conheça os nossos projetos!")
        }
      >
        <Text style={styles.buttonText1} onPress={substituirTexto}>
          Conhecer projetos
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonSair} onPress={Sair}>
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  mensagem: {
    fontSize: 30,
    textAlign: "center",
    marginBottom: 30,
    fontWeight: 600,
  },
  buttonSair: {
    backgroundColor: "#ff4d4d",
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: "#000000",
    fontSize: 18,
    fontWeight: "bold",
    opacity: 0.8,
  },
  buttonProjects: {
    backgroundColor: "#fefff1",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#adb17f",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginBottom: 15,
  },
  buttonText1: {
    color: "#000000",
    fontSize: 18,
    fontWeight: "bold",
    opacity: 0.8,
  },
});
