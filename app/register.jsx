import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, Image, TouchableOpacity, Alert, View } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import axios from "axios";
import { Link } from "expo-router";
import { Ionicons } from '@expo/vector-icons';

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const validateUsername = (username) => {
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    return usernameRegex.test(username);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleRegister = async () => {
    if (!validateUsername(username)) {
      Alert.alert("Invalid username", "Username should not contain spaces or special symbols.");
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert("Invalid email", "Email must end with @gmail.com.");
      return;
    }

    if (!validatePassword(password)) {
      Alert.alert("Invalid password", "Password must be at least 8 characters long and include at least one capital letter and one special character.");
      return;
    }

    try {
      const response = await axios.post("https://ngo-mauve-mu.vercel.app/api/register", {
        username,
        email,
        password,
      });

      if (response.status === 201) {
        Alert.alert("Registration successful");
        setUsername("");
        setEmail("");
        setPassword("");
      } else {
        Alert.alert("Registration failed");
      }
    } catch (error) {
      // console.error("Error registering:", error);
      Alert.alert(error);
    }
  };

  return (
    <LinearGradient
      colors={['#faedcd','#faedcd']}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Register</Text>
        <Image
          style={styles.image}
          source={require("../assets/reg.png")}
        />
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          placeholderTextColor="#888"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#888"
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.inputPassword}
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
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>REGISTER</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Link href="/login" style={styles.link}>Already have an account? Login</Link>
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
    resizeMode:"cover",
    marginBottom: 20,
    borderWidth: 1,
    // borderColor: "#ddd",
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
  passwordContainer: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 25,
    marginBottom: 12,
    paddingLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  inputPassword: {
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
  },
});
