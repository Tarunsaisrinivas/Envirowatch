import React, { useRef, useState, useEffect } from 'react';
import { View, FlatList, Image, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const { width } = Dimensions.get('window');

const images = [
  { id: '1', uri:  require('../assets/pic1.jpg') },
  { id: '2', uri:  require('../assets/pic2.jpg') },
  { id: '3', uri:  require('../assets/pic3.jpg') },
  { id: '4', uri:  require('../assets/pic4.jpg') },
];

const SlideShow = () => {
    const navigation = useNavigation();
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleLogin = () =>{
    navigation.replace('login');
  }
  const handleRegister = () =>{
    navigation.replace('register');
  }
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % images.length;
        flatListRef.current.scrollToIndex({ animated: true, index: nextIndex });
        return nextIndex;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const renderItem = ({ item }) => (
    <Image source={item.uri} style={styles.image} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={images}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleRegister} style={[styles.button, styles.registerButton]}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5E8D8',
    justifyContent: 'center',
  },
  image: {
    width,
    height: '80%',
    marginVertical:30,
    marginHorizontal:"auto",
    resizeMode: 'cover',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  button: {
    borderWidth: 2,
    borderColor: '#2a9d8f',
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 25,
    backgroundColor: '#2a9d8f',
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  registerButton: {
    backgroundColor: '#2a9d8f', // Change the background color for the register button
    borderColor: '#2a9d8f',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
  },
});

export default SlideShow;
