import { Text, View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import React, {useEffect, useState} from "react";
import ApiService from "@/services/ApiService";
import {BASE_API_POSTS_URL} from "@/app/constants";

const PostsView: React.FC = () => {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const api = ApiService.getInstance(BASE_API_POSTS_URL);

    useEffect(() => {
        const fetchData = async () => {
            const data = await api.getData('/posts');
            console.log(data);
            setPosts(data);
            setLoading(false);
        };
        fetchData().then(r => null);
    }, [api]);

    if (loading) return <ActivityIndicator size="large" style={{marginTop: 100}} />;

    return (
        <View style={styles.container}>
            <Text style={styles.header}>🤖 AI Chat Posts</Text>
            <FlatList
                data={posts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.postContainer}>
                        <Text style={styles.postTitle}>{item.title}</Text>
                        <Text style={styles.postBody}>{item.body}</Text>
                    </View>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    postContainer: {
        marginBottom: 16,
        padding: 12,
        borderRadius: 8,
        backgroundColor: '#f9f9f9',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
    },
    postTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    postBody: {
        fontSize: 14,
        color: '#333',
    },
});

export default PostsView;
