import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

interface ProductCardProps {
    item: {
        id: number;
        name: string;
        category?: string;
        price?: number;
        image?: string;
    };
    onPress?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ item, onPress }) => {
    // резервне фото з Unsplash
    const image =
        item.image ||
        `https://source.unsplash.com/600x400/?coffee,latte,beans,barista,cup&sig=${item.id}`;


    return (
        <TouchableOpacity activeOpacity={0.9} onPress={onPress} style={styles.card}>
            <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />
            <View style={styles.info}>
                <Text style={styles.title}>{item.name}</Text>
                {item.category && (
                    <Text numberOfLines={2} style={styles.description}>
                        {item.category}
                    </Text>
                )}
                <View style={styles.bottom}>
                    <Text style={styles.price}>
                        {item.price ? `${item.price.toFixed(2)} ₴` : "Ціна уточнюється"}
                    </Text>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Додати</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default ProductCard;

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        borderRadius: 16,
        overflow: "hidden",
        marginBottom: 20,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
        elevation: 2,
    },
    image: {
        width: "100%",
        height: 190,
    },
    info: {
        padding: 14,
    },
    title: {
        fontSize: 18,
        fontWeight: "600",
        color: "#2b1d0e",
        marginBottom: 6,
    },
    description: {
        fontSize: 14,
        color: "#6b5e52",
        marginBottom: 10,
    },
    bottom: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    price: {
        fontSize: 16,
        fontWeight: "700",
        color: "#b86b3d",
    },
    button: {
        backgroundColor: "#b86b3d",
        paddingVertical: 6,
        paddingHorizontal: 16,
        borderRadius: 10,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "600",
    },
});
