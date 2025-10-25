import { Text, View, StyleSheet } from 'react-native';
import {useEffect, useState} from "react";
import Slider from '@react-native-community/slider';

const BasicSlider = () => {
    // states
    const [volume, setVolume] = useState(50);
    const [brightness, setBrightness] = useState(0.5);
    const [highVolumeAlertShown, setHighVolumeAlertShown] = useState(false);
    const [minPrice, setMinPrice] = useState(100);
    const [maxPrice, setMaxPrice] = useState(900);

    // watchers
    useEffect(() => {
        console.log(volume)
        if (volume >= 95 && !highVolumeAlertShown) {
            alert('Гучність занадто висока!')
            setHighVolumeAlertShown(true);
        } else if (volume < 95 && highVolumeAlertShown) {
            setHighVolumeAlertShown(false);
        }
    }, [volume]);

    return (
        <View style={styles.container}>
            {/* ---- Гучність ------ */}
            <Text style={styles.label}>Гучність: {volume}</Text>
            <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={100}
                value={volume}
                onValueChange={setVolume}
                minimumTrackTintColor="#1EB1FC"
                maximumTrackTintColor="#d3d3d3"
                thumbTintColor="#1EB1FC"
                step={1}
            />

            {/* ---- Яскравість ------ */}
            <Text style={styles.label}>Яскравість: {Math.round(brightness * 100)}%</Text>
            <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={1}
                value={brightness}
                onValueChange={setBrightness}
                minimumTrackTintColor="#FF9500"
                maximumTrackTintColor="#d3d3d3"
                thumbTintColor="#FF9500"
            />

        {/* ---- Діапазон цін -----   */}
            <Text>Діапазон цін</Text>
            <Text style={styles.label}>Від {minPrice} до {maxPrice}</Text>
            <View style={styles.slider}>
                <Text>Мінімум</Text>
                <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={maxPrice - 50}
                    value={minPrice}
                    onValueChange={value => setMinPrice(Math.round(value))}
                    minimumTrackTintColor="#34C759"
                    step={10}
                />
            </View>
            <View style={styles.slider}>
                <Text>Максимум</Text>
                <Slider
                    style={styles.slider}
                    minimumValue={minPrice + 50}
                    maximumValue={1000}
                    value={maxPrice}
                    onValueChange={value => setMaxPrice(Math.round(value))}
                    minimumTrackTintColor="#FF3B30"
                    step={10}
                />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
    },
    slider: {
        width: '100%',
        height: 40,
        marginBottom: 30,
    },
})

export default BasicSlider;
