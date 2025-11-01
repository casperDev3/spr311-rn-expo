import { Text } from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import {useEffect, useState, FC} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector, useDispatch } from 'react-redux';
import { setValue } from '@/store/counterSlice';

const Notifications: FC = () => {
    const [count, setCount] = useState(0);
    const dispatch = useDispatch();
    const countR = useSelector((state: any) => state.counter.value);
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
                Notifications Screen
            </Text>
            <Text>
                Count: {count} -- Redux: {countR}
            </Text>
        </SafeAreaView>
    )
}

export default Notifications;
