import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!username || !email || !password) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    try {
      const user = { username, email, password };
      await AsyncStorage.setItem("user", JSON.stringify(user));
      Alert.alert("Sucesso", "Conta criada com sucesso!");
      setIsLogin(true);
      setUsername("");
      setEmail("");
      setPassword("");
    } catch (error) {
      Alert.alert("Erro", "Falha ao salvar dados do usuário.");
    }
  };

  const handleLogin = async () => {
    try {
      const storedUser = await AsyncStorage.getItem("user");

      if (!storedUser) {
        Alert.alert("Erro", "Nenhum usuário encontrado. Cadastre-se primeiro.");
        return;
      }

      const user = JSON.parse(storedUser);

      if (user.email === email && user.password === password) {
        Alert.alert("Bem-vindo!", `Olá, ${user.username}!`);
      } else {
        Alert.alert("Erro", "E-mail ou senha incorretos.");
      }
    } catch (error) {
      Alert.alert("Erro", "Falha ao verificar login.");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("./assets/logo.jpg")}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>{isLogin ? "Bem-vindo de volta!" : "Crie sua conta"}</Text>

      {!isLogin && (
        <TextInput
          style={styles.input}
          placeholder="Nome de usuário"
          placeholderTextColor="#7a7a7a"
          value={username}
          onChangeText={setUsername}
        />
      )}

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor="#7a7a7a"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#7a7a7a"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={isLogin ? handleLogin : handleRegister}
      >
        <Text style={styles.buttonText}>{isLogin ? "Entrar" : "Cadastrar"}</Text>
      </TouchableOpacity>

      {isLogin && (
        <TouchableOpacity>
          <Text style={styles.forgot}>Esqueci minha senha</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
        <Text style={styles.switchText}>
          {isLogin ? "Ainda não tem conta? " : "Já tem conta? "}
          <Text style={styles.switchLink}>{isLogin ? "Crie uma!" : "Entre!"}</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF8E1",
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },
  logo: {
    width: 180,
    height: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: "#3A5A40",
    marginBottom: 25,
  },
  input: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 14,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#dcdcdc",
  },
  button: {
    backgroundColor: "#81B622",
    width: "100%",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  forgot: {
    color: "#3A5A40",
    marginTop: 5,
    marginBottom: 10,
  },
  switchText: {
    color: "#555",
    fontSize: 15,
  },
  switchLink: {
    color: "#81B622",
    fontWeight: "600",
  },
});