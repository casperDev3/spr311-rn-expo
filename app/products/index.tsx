import React, { useEffect, useState } from "react";
import { ScrollView, Text, View, ActivityIndicator, StyleSheet, RefreshControl } from "react-native";
import { useRouter } from "expo-router";
import ProductCard from "@/components/products/card";

const Products: React.FC = () => {
    const router = useRouter();
    const BASE_URL = "https://valentinos-coffee.herokuapp.com";

    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [refreshing, setRefreshing] = useState<boolean>(false);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${BASE_URL}/products?limit=30`);
            const json = await response.json();
            setProducts(json?.products || []);
        } catch (error) {
            console.error("❌ Error fetching products:", error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const onRefresh = () => {
        setRefreshing(true);
        fetchProducts();
    };

    return (
        <View style={styles.container}>

            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#b86b3d" />
                    <Text style={styles.loadingText}>Завантаження...</Text>
                </View>
            ) : (
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scroll}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                >
                    <Text style={styles.header}>☕ Наші продукти</Text>

                    {products.length > 0 ? (
                        products.map((product) => (
                            <ProductCard
                                key={product.id}
                                item={product}
                                onPress={() => router.push(`/products/${product.id}`)}
                            />
                        ))
                    ) : (
                        <Text style={styles.noData}>Немає доступних продуктів 😔</Text>
                    )}
                </ScrollView>
            )}
        </View>
    );
};

export default Products;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f3f0",
        paddingHorizontal: 16,
        paddingTop: 10,
    },
    header: {
        fontSize: 28,
        fontWeight: "700",
        textAlign: "center",
        marginBottom: 20,
        color: "#2b1d0e",
    },
    scroll: {
        paddingBottom: 100,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 50,
    },
    loadingText: {
        marginTop: 10,
        color: "#6b5e52",
    },
    noData: {
        textAlign: "center",
        fontSize: 18,
        color: "#777",
        marginTop: 30,
    },
});
