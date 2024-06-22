import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, RefreshControl, ActivityIndicator, Image, TouchableOpacity, Modal, Pressable } from 'react-native';
import axios from 'axios';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const Index = () => {
  const [dataList, setDataList] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [commentItemId, setCommentItemId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('https://ngo-mauve-mu.vercel.app/api/data');
      setDataList(response.data);
    } catch (error) {
      console.error('Error:', error.message);
      setError('Error fetching data: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  }, []);

  const handleComment = async (itemId) => {
    try {

      const response = await axios.post(`https://ngo-mauve-mu.vercel.app/api/data/${itemId}/comment`, { comment: commentText});
      console.log("item",itemId);
      console.log(response.data);
      await fetchData();
      // const updatedDataList = dataList.map(item => {
      //   if (item._id === itemId) {
      //     return { ...item, comments: [...item.comments, { text: commentText }] };
      //   }
      //   return item;
      // });
      // setDataList(updatedDataList);
      setCommentText('');
      setCommentItemId(null);
    } catch (error) {
      console.error('Error commenting on the post:', error);
      alert('Error commenting on the post: ' + error.message);
    }
    
  };
  
  
  const handleImagePress = (image) => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  const filteredData = dataList.filter(item =>
    item.location.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <LinearGradient
      colors={['#fff1e6', '#fff1e6', '#fff1e6']}
      style={styles.gradient}
    >
      <View style={styles.container}>
        <Text style={styles.header}>Posts</Text>

        <TextInput
          style={styles.input}
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Search for an area"
          placeholderTextColor="#888"
        />
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
            data={filteredData}
            renderItem={({ item }) => (
              <View style={styles.dataItem}>
                <Text style={styles.title}>Title: {item.title}</Text>
                <Text>Description: {item.description}</Text>
                <Text>Location: {item.location}</Text>
                {/* <Text>Mandal: {item.mandal}</Text> */}
                <Text>District: {item.district}</Text>
                {item.image ? (
                  <TouchableOpacity onPress={() => handleImagePress(item.image)}>
                    <Image
                      source={{ uri: item.image }}
                      style={styles.image}
                      onError={(error) => console.log(`Image load error for URL: ${item.image}`, error)}
                    />
                  </TouchableOpacity>
                ) : (
                  <Text>No image available</Text>
                )}
                <View style={styles.buttonContainer}>
                  <TouchableOpacity onPress={() => setCommentItemId(item._id)} style={styles.iconButton}>
                    <FontAwesome name="comment" size={24} color="#9d6b53" />
                    <Text style={styles.iconText}>Comment ({item.comments.length})</Text>
                  </TouchableOpacity>
                </View>
                {commentItemId === item._id && (
                  <View style={styles.commentBox}>
                    <TextInput
                      style={styles.commentInput}
                      placeholder="Enter your comment"
                      placeholderTextColor="#888"
                      value={commentText}
                      onChangeText={text => setCommentText(text)}
                    />
                    <TouchableOpacity
                      style={styles.submitButton}
                      onPress={() => {
                        handleComment(item._id);
                      }}
                    >
                      <Text style={styles.submitButtonText}>Submit</Text>
                    </TouchableOpacity>
                  </View>
                )}
                {item.comments.map((comment)=>(
                  console.log(comment)
                ))}
                <View style={styles.commentsContainer}>
                  {item.comments.map((comment, index) => (
                    
                    <View key={index} style={styles.comment}>
                      <Text style={styles.commentUser}>{comment.user}:</Text>
                      <Text style={styles.commentText}>{comment.comment}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
            keyExtractor={item => item._id}
            contentContainerStyle={styles.list}
          />
        )}
        {selectedImage && (
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalView}>
                <Image source={{ uri: selectedImage }} style={styles.fullImage} />
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Close</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        )}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  dataItem: {
    marginBottom: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  list: {
    flexGrow: 1,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
    backgroundColor: '#fff',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  image: {
    width: '100%',
    height: 200,
    marginTop: 10,
    borderRadius: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconText: {
    marginLeft: 5,
    color: '#333',
  },
  commentBox: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentInput: {
    flex: 1,
    height: 40,
    borderColor: 'blue',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  submitButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginLeft: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  commentsContainer: {
    marginTop: 10,
  },
  comment: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  commentUser: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  commentText: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  fullImage: {
    width: '100%',
    height: 300,
    marginBottom: 15,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Index;
