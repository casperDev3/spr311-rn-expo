import {StyleSheet, Text, View} from 'react-native';
import {useLocalSearchParams} from "expo-router";
import {useEffect, useState} from 'react';
import {data} from "browserslist";


// additionalText
//     :
//     "Contains caffeine"
// category
//     :
//     "coffee"
// id
//     :
//     1004
// isAvailable
//     :
//     true
// name
//     :
//     "Americano"
// product-description
// :
// "A strong and bold coffee made with a shot of espresso and hot water."

const SingleProduct = () => {
    // init
    const { id } = useLocalSearchParams<{ id: string }>();
    const BASE_URL = "https://valentinos-coffee.herokuapp.com"

    // states
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    // effect
    useEffect(() => {
        setLoading(true);
        fetch(`${BASE_URL}/products/${id}`)
            .then(res => res.json())
            .then(json => {
                setData(json);
            })
            .catch(err => {
                console.error("Error fetching product:", err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [])
    return (
        <>
            {
                loading ? (
                    <Text>
                        Loading...
                    </Text>
                ) : (
                    <>
                        {
                            data ? (
                                <View style={s.card}>
                                    <Text style={s.title}>{data.name}</Text>
                                    <Text style={s.description}>{data['product-description']}</Text>
                                    <Text style={s.category}>Category: {data.category}</Text>
                                    <Text style={{...s.availability, color: data.isAvailable ? 'green' : 'red'}}>Available: {data.isAvailable ? 'Yes' : 'No'}</Text>
                                    <Text style={s.additionalText}>{data.additionalText}</Text>
                                </View>
                            ) : (
                                <Text>
                                    Product not found.
                                </Text>
                            )
                        }
                    </>
                )
            }
        </>
    )
}

const s =  StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginVertical: 10,
        marginHorizontal: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        margin: 20,
    },
    description: {
        fontSize: 16,
        marginHorizontal: 20,
        marginBottom: 10,
    },
    category: {
        fontSize: 14,
        marginHorizontal: 20,
        marginBottom: 10,
    },
    availability: {
        fontSize: 14,
        marginHorizontal: 20,
        marginBottom: 10
    },
    additionalText: {
        fontSize: 12,
        marginHorizontal: 20,
        marginBottom: 10,
        fontStyle: 'italic',
    }
});

export default SingleProduct;
