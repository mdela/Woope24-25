import React, { useState, useEffect, useRef} from 'react';
import { StyleSheet, Image, Text, View, TouchableOpacity, TextInput} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';
type Post = {
    image: string;
    text: string;
    id: string;
};
const HomeScreen = () => {
    const [isPosting, setIsPosting] = useState(false);
    const [postText, setPostText] = useState('');
    const [postImage, setPostImage] = useState<string | null>(null);
    const [posts, setPosts] = useState<Post[]>([]);
    const [error, setError] = useState("");
    const flatListRef = useRef<any>();

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled && result.assets && result.assets.length > 0) {
            const uri = result.assets[0].uri;
            setPostImage(uri as string);
        }
    };
    const handleSubmit = () => {
        setError("");
        // Check if at least postText or postImage is provided
        if (postText || postImage) {
            // Generate a unique id for the new post, josue, you'll do our backend database
            const uniqueId = Date.now().toString();
            // Create a new post object with the unique id
            // Although, I know that this is basically for an API, but we can use it like this too!
            // After each id, we'll have our text and image for the bundle.
            const newPost: Post = {
                id: uniqueId,
                text: postText,
                image: postImage || '' // this is being used so that we can also post only a text too!
            };
            // Add the new post to the posts array
            setPosts(prevPosts => [newPost, ...prevPosts]);
            // Reset the input states for the next post
            setPostText('');
            setPostImage(null);
            // Hide the post submission form
            setIsPosting(false);
        } else {
            // If neither text nor image is provided, we'll show an error
            setError("Please provide text or an image.");
        }
    };
    useEffect(() => {
        if (posts.length > 0) {
            flatListRef.current?.scrollToEnd({animated: true});
        }
    }, [posts]);
    return (
        <View style={styles.flexContainer}>
            <KeyboardAwareFlatList
                ref={flatListRef}
                data={posts}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => (
                    <View style={styles.post}>
                        {item.text ? <Text style={styles.postText}>{item.text}</Text> : null}
                        {item.image ? <Image source={{uri: item.image}} style={styles.postImage}/> : null}
                    </View>
                )}
                ListHeaderComponent={
                    <>
                        <TouchableOpacity style={styles.postBox} onPress={() => setIsPosting(true)}>
                            <View style={styles.postBoxInner}>
                                <Text style={styles.postBoxText}>What's on your mind?</Text>
                            </View>
                        </TouchableOpacity>
                        {isPosting && (
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Describe here the details of your post"
                                    value={postText}
                                    onChangeText={setPostText}
                                    multiline
                                    numberOfLines={4}
                                />
                                <View style={styles.iconsContainer}>
                                    <TouchableOpacity onPress={pickImage}>
                                        <Text>🖼️</Text>
                                    </TouchableOpacity>
                                </View>
                                {postImage && <Image source={{ uri: postImage }} style={styles.previewImage} />}
                                <TouchableOpacity style={styles.postButton} onPress={handleSubmit}>
                                    <Text style={styles.postButtonText}>POST</Text>
                                </TouchableOpacity>
                                {error ? <Text style={styles.errorText}>{error}</Text> : null}
                            </View>
                        )}
                    </>
                }
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    flexContainer: {
        flex: 1,
        padding: 24,
    },
    postBox: {
        backgroundColor: '#B4D7EE',
        borderRadius: 30,
        paddingVertical: 20,
        paddingHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch',
        marginHorizontal: 10,
        marginBottom: 30,
        borderWidth: 1,
        borderColor: '#E7F3FD',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 5,
        marginTop: 30,
    },
    postBoxInner: {
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'transparent',
        alignSelf: 'stretch',
        borderBottomWidth: 1,
        borderBottomColor: '#D1E3FA',
    },
    postBoxText: {
        fontSize: 16,
        color: '#333',
        padding: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 18,
        overflow: 'hidden',
        textAlign: 'center',
    },
    inputContainer: {
        width: '90%',
        alignSelf: 'center',
        paddingHorizontal: 15,
        paddingVertical: 20,
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginBottom: 20,
        marginTop: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#D1E3FA',
        borderRadius: 20,
        padding: 15,
        width: '100%',
        marginBottom: 10,
    },
    previewImage: {
        width: '100%',
        height: undefined,
        aspectRatio: 4 / 3,
        borderRadius: 10,
        marginBottom: 10,
    },
    postButton: {
        backgroundColor: '#007AFF',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 30,
        marginTop: 10,
        width: '36%',
        alignSelf: 'flex-end',
    },
    postButtonText: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontSize: 16,
    },
    iconsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'flex-start',
        marginBottom: 10,
    },
    post: {
        borderWidth: 1,
        borderColor: '#ccd0d5',
        borderRadius: 10,
        padding: 20,
        backgroundColor: '#fff',
        width: '100%',
        marginBottom: 10,
    },
    postText: {
        marginBottom: 10,
        color: '#1c1e21',
    },
    postImage: {
        width: '100%',
        borderRadius: 10,
        aspectRatio: 4 / 3,
    },
    errorText: {
        color: 'red',
        marginTop: 10,
    },
});

export default HomeScreen;