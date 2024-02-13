import React, { useState } from 'react';
import { StyleSheet, Image, Text, View, TouchableOpacity, TextInput, Alert} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';
import * as DocumentPicker from 'expo-document-picker';
import { MaterialIcons } from '@expo/vector-icons';
import * as Sharing from 'expo-sharing';

type PdfFile = {
    uri: string;
    name: string;
};
type Post = {
    image: string;
    text: string;
    id: string;
    pdfs: PdfFile[];
};
const HomeScreen = () => {
    const [isPosting, setIsPosting] = useState(false);
    const [postText, setPostText] = useState('');
    const [postImage, setPostImage] = useState<string | null>(null);
    const [posts, setPosts] = useState<Post[]>([]);
    const [error, setError] = useState("");
    const [postPdfs, setPostPdfs] = useState<PdfFile[]>([]);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled && result.assets && result.assets.length > 0) {
            const uri = result.assets[0].uri;
            setPostImage(uri);
        }
    };
    const pickPdf = async () => {
        try {
            if (postPdfs.length < 10) {
                const result = await DocumentPicker.getDocumentAsync({
                    type: 'application/pdf',
                    copyToCacheDirectory: true,
                    multiple: true,
                });

                if (!result.canceled && result.assets) {
                    const newPdfFiles = result.assets.map(asset => ({
                        uri: asset.uri,
                        name: asset.name || 'Unknown Name',
                    }));

                    setPostPdfs(prev => [...prev, ...newPdfFiles]);
                } else {
                    console.log('No PDF was selected.');
                }
            } else {
                Alert.alert('Limit Reached', 'You can only select up to ten PDF files.');
            }
        } catch (error) {
            console.error('Error picking PDFs:', error);
        }
    };
    const handleOpenPdf = async (pdfUri: string) => {
        try {
            const isAvailable = await Sharing.isAvailableAsync();
            if (isAvailable) {
                await Sharing.shareAsync(pdfUri);
            } else {
                alert('Sharing is not available');
            }
        } catch (error) {
            alert('An error occurred while trying to share the PDF.');
            console.error(error);
        }
    };
    const handleSubmit = () => {
        setError("");
        if (postText || postImage || postPdfs.length) {
            const uniqueId = Date.now().toString();
            const newPost: Post = {
                id: uniqueId,
                text: postText,
                image: postImage || '',
                pdfs: postPdfs,
            };
            setPosts(prevPosts => [newPost, ...prevPosts]);
            // Reset the form the discussion post
            setPostText('');
            setPostImage(null);
            setPostPdfs([]); // Reset to an empty array for the next post
            setIsPosting(false);
        } else {
            setError("Please provide text, an image, or a PDF.");
        }
    };
    return (
        <View style={styles.flexContainer}>
            <KeyboardAwareFlatList
                data={posts}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => (
                    <View style={styles.post}>
                        <View style={styles.headerRow}>
                            <Image source={{uri: 'https://wallpapercave.com/wp/wp4008083.jpg'}} style={styles.avatar}/>
                            <Text style={styles.userName}>User Name</Text>
                        </View>
                        {item.text && <Text style={styles.postText}>{item.text}</Text>}
                        {item.image && <Image source={{uri: item.image}} style={styles.postImage}/>}
                        {item.pdfs.map((pdf: PdfFile, index: number) => (
                            <View key={index} style={styles.pdfItem}>
                                <TouchableOpacity onPress={() => handleOpenPdf(pdf.uri)}>
                                    <MaterialIcons name="picture-as-pdf" size={24} color="red" />
                                    <Text style={styles.pdfName}>{pdf.name}</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
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
                                    <TouchableOpacity onPress={pickPdf}>
                                        <Text>📄</Text>
                                    </TouchableOpacity>
                                    {postPdfs.map((pdf: PdfFile, index: number) => (
                                        <View key={index}>
                                            <Text>PDF {index + 1}: {pdf.name}</Text>
                                        </View>
                                    ))}
                                </View>
                                {postImage && <Image source={{uri: postImage}} style={styles.previewImage}/>}
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
}

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
        marginBottom: 40,
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
        marginBottom: 10,
        alignItems: 'flex-start',
        width: '100%',
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
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginBottom: 20,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    userName: {
        fontSize: 16,
        marginLeft: 10,
        marginBottom: 10,
    },
    pdfAttachedText: {
        marginTop: 10,
        color: '#007AFF',
        fontWeight: 'bold',
    },
    pdfItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    pdfName: {
        marginLeft: 10,
    },
})

export default HomeScreen;