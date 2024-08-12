import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, Image, TouchableOpacity, Alert, View, ToastAndroid } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import axios from "axios";
import { Link } from "expo-router";
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function Login() {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const handleLogin = async () => {
    if (username.includes(" ")) {
      Alert.alert("Username cannot contain spaces");
      return;
    }

    // const passwordRegex = /^(?=.[A-Z])(?=.[!@#$%^&])(?=.*[0-9]).{8,}$/;
    // if (!passwordRegex.test(password)) {
    //   Alert.alert("Password must contain at least 1 capital letter, 1 special character, and 1 number, and be at least 8 characters long");
    //   return;
    // }

    try {
      const response = await axios.post("https://ngo-mauve-mu.vercel.app/api/login", {
        username,
        password,
      });

      if (response.status === 200) {
        // Alert.alert("Login successful");
        ToastAndroid.show("Login successful", ToastAndroid.SHORT);
        navigation.replace("(tabs)");
      } else {
        Alert.alert("Invalid username or password");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred. Please try again.";
      Alert.alert("Error", errorMessage);
    }
  };

  return (
    <LinearGradient
      colors={['#faedcd','#faedcd']}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <Image
          style={styles.image}
          source={require("../assets/log.png")}
        />
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          placeholderTextColor="#888"
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputPass}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={secureTextEntry}
            placeholderTextColor="#888"
          />
          <TouchableOpacity onPress={() => setSecureTextEntry(!secureTextEntry)}>
            <Ionicons name={secureTextEntry ? "eye-off" : "eye"} size={24} color="gray" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Link href="/register" style={styles.link}>Don't have an account? Register</Link>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  image: {
    width: 300,
    height: 200,
    marginBottom: 20,
    borderRadius: 100,
    borderWidth: 1,
  },
  title: {
    fontSize: 32,
    color: "#333",
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 25,
    marginBottom: 12,
    paddingLeft: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 25,
    marginBottom: 12,
    paddingLeft: 20,
    paddingRight: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  inputPass: {
    flex: 1,
    height: 50,
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  link: {
    color: "#007BFF",
    fontSize: 16,
    marginTop: 10,
    textDecorationLine:"underline",
  },
});