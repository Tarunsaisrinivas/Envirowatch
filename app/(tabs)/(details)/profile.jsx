import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Import icons as needed

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      // Replace with your backend URL
      const response = await fetch('https://ngo-mauve-mu.vercel.app/api/user');
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const userData = await response.json();
      setUserData(userData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        userData && (
          <View style={styles.profileContainer}>
            <View style={styles.header}>
              <Text style={styles.title}>Profile</Text>
              {/* <TouchableOpacity onPress={() => handleEditProfile()}>
                <FontAwesome name="edit" size={24} color="#333" />
              </TouchableOpacity> */}
            </View>
            <View style={styles.userInfo}>
              <View style={styles.infoItem}>
                <Text style={styles.label}>Username</Text>
                <Text style={styles.text}>{userData.username}</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.label}>Email</Text>
                <Text style={styles.text}>{userData.email}</Text>
              </View>
            </View>
          </View>
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff1e6',
    padding: 20,
  },
  profileContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  userInfo: {
    marginTop: 10,
  },
  infoItem: {
    marginBottom: 15,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
  },
  text: {
    fontSize: 18,
    color: '#444',
  },
});

export default Profile;
