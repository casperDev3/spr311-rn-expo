import React, {useEffect, useState} from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';

export default function CustomSidebar() {
    const [slideAnim] = useState(new Animated.Value(-250));
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        Animated.timing(slideAnim, {
            toValue: isOpen ? -250 : 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
        setIsOpen(!isOpen);
    };



    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={toggleSidebar}>
                <Text style={styles.buttonText}>☰ Меню</Text>
            </TouchableOpacity>

            <Animated.View
                style={[styles.sidebar, { transform: [{ translateX: slideAnim }] }, isOpen ? {} : { display: 'none' }]}
            >
                <Text style={styles.sidebarTitle}>Бічне меню</Text>
                <TouchableOpacity style={styles.menuItem}>
                    <Text style={styles.menuText}>Головна</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem}>
                    <Text style={styles.menuText}>Налаштування</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem}>
                    <Text style={styles.menuText}>Про додаток</Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    button: { margin: 20, padding: 15, backgroundColor: '#007AFF', borderRadius: 8 },
    buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
    sidebar: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: 250,
        backgroundColor: '#333',
        padding: 20,
    },
    sidebarTitle: { color: 'white', fontSize: 24, marginBottom: 30 },
    menuItem: { paddingVertical: 15 },
    menuText: { color: 'white', fontSize: 18 },
});
