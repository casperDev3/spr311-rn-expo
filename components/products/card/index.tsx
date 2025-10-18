import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import {useRouter} from "expo-router";

interface IProductCardProps {
    item: any;
}

const handlePress = (id: number, router: any) => {
    router.push(`/products/${id}`);
}

const ProductCard = ({item}: IProductCardProps) => {
    //init
    const router = useRouter();
    return (
        <TouchableOpacity onPress={() => {
            handlePress(item.id, router);
        }}>
            <View style={s.card}>
                <Text style={s.title}>
                    {item.name}
                </Text>
                <Text style={s.category}>
                    Category: {item.category}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const s = StyleSheet.create({
    card: {
        padding: 10,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    category: {
        fontSize: 14,
        color: '#666',
    }
})

export default ProductCard;
