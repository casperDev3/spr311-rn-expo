import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import {useState, FC, useEffect} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useSelector, useDispatch} from "react-redux";
import {increment, decrement, setValue} from "@/store/counterSlice";


const Cart: FC = () => {
    // init
    const [count, setCount] = useState(0);
    const countR = useSelector((state: any) => state.counter.value);
    const dispatch = useDispatch();
    // handlers
    const handleIncrement = async () => {
        setCount(count + 1);
        await AsyncStorage.setItem('cartCount', (count + 1).toString());
        // Redux increment
        dispatch(increment());
    }
    const handleDecrement = async () => {
        setCount(count - 1);
        await AsyncStorage.setItem('cartCount', (count - 1).toString());
        // Redux decrement
        dispatch(decrement());
    }

    // mount
    useEffect(() => {
        AsyncStorage.getItem('cartCount').then(value => {
            if (value !== null) {
                setCount(parseInt(value));
                dispatch(setValue(parseInt(value)));
            }
        });
    }, []);
    return (
        <SafeAreaView>
            <Text>
                Cart Screen
            </Text>
            <View style={styles.container}>
                <Text style={{
                    fontSize: 36,
                    fontWeight: 'bold',
                }}>
                    {count} -- Redux: {countR}
                </Text>
            </View>

            <View style={styles.container}>
                <TouchableOpacity onPress={handleIncrement} style={styles.button}>
                    <Text>+1</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleDecrement} style={styles.button}>
                    <Text>-1</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 5,
    },
})

export default Cart;
