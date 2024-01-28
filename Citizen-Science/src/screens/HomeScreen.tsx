import React, { useState } from 'react';
import { StyleSheet, Image, Text, View, TouchableOpacity, Button, TextInput, FlatList } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

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
            setPosts([newPost, ...posts]);
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

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.postBox} onPress={() => setIsPosting(true)}>
                <Text style={styles.postBoxText}>Make a Post!</Text>
            </TouchableOpacity>
            {isPosting && (
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Write your post here"
                        value={postText}
                        onChangeText={setPostText}
                    />
                    <Button title="Upload Image" onPress={pickImage} />
                    {postImage && <Image source={{ uri: postImage}} style={styles.previewImage} />}
                    <Button title="Submit" onPress={handleSubmit} />
                    {error ? <Text style={styles.errorText}>{error}</Text> : null}
                </View>
            )}
            <FlatList
                data={posts}
                keyExtractor={(item) => item.id} // id as a key
                renderItem={({ item }) => (
                    <View style={styles.post}>
                        {item.text ? <Text style={styles.postText}>{item.text}</Text> : null}
                        {item.image ? <Image source={{ uri: item.image }} style={styles.postImage} /> : null}
                    </View>
                )}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
        alignItems: 'center',
    },
    postBox: {
        borderWidth: 1,
        borderColor: '#ccd0d5',
        borderRadius: 20,
        padding: 15,
        marginBottom: 10,
        backgroundColor: '#f0f2f5',
        alignSelf: 'stretch',
        marginHorizontal: 10,
    },
    post: {
        borderWidth: 1,
        borderColor: '#ccd0d5',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#fff',
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
    inputContainer: {
        width: '80%',
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        marginBottom: 10,
    },
    previewImage: {
        width: 100,
        height: 100,
        marginBottom: 10,
    },
    errorText: {
        color: 'red',
        marginTop: 10,
    },
    postBoxText: {
        color: '#65676b',
    },
});

export default HomeScreen;