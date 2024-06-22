import React from 'react'
import { StyleSheet, Text, View, Image, Button, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
const Index = () => {
    const navigation = useNavigation();
    const profilePage = () =>{
        navigation.navigate('profile');
    }
    const contactPage = () =>{
        navigation.navigate('about');
    }
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
      <View style={styles.cardContainer}>
        <TouchableOpacity style={styles.card} onPress={profilePage}>
          <Image source={require("../../../assets/profile.png")} style={styles.cardImage} />
          <Text style={styles.cardHeading}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={contactPage} >
          <Image source={require("../../../assets/aboutUS.jpg")} style={styles.cardImage} />
          <Text style={styles.cardHeading}>About us</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Index

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  logoutButton: {
    alignSelf: 'flex-end',
    padding: 10,
    backgroundColor: '#f44',
    borderRadius: 5,
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: 300,
    padding: 16,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    alignItems: 'center',
  },
  cardImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardHeading: {
    fontSize: 18,
    fontWeight: 'bold',
  },
})
