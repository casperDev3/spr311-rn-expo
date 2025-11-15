import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image,
    Alert
} from "react-native";
import { FC } from "react";
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';

// Налаштування сповіщень
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

const SystemsView: FC = () => {
    // Стани для галереї
    const [galleryImages, setGalleryImages] = useState<string[]>([]);

    // Стани для геолокації
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [locationError, setLocationError] = useState<string | null>(null);

    // Стани для сповіщень
    const [notificationToken, setNotificationToken] = useState<string | null>(null);
    const [notificationsLog, setNotificationsLog] = useState<string[]>([]);

    // Запит дозволів при завантаженні
    useEffect(() => {
        requestPermissions();
    }, []);

    const requestPermissions = async (): Promise<void> => {
        try {
            // Дозвіл на сповіщення - обходимо помилку projectId в Expo Go
            try {
                const { status: notifStatus } = await Notifications.getPermissionsAsync();
                if (notifStatus !== 'granted') {
                    await Notifications.requestPermissionsAsync();
                }
                // У Expo Go getExpoPushTokenAsync може викликати помилку
                const token = (await Notifications.getExpoPushTokenAsync()).data;
                setNotificationToken(token);
            } catch (notifError) {
                console.log('Push notifications not available in Expo Go');
                setNotificationToken('Доступно тільки в development build');
            }

            // Дозвіл на локацію
            const { status: locationStatus } = await Location.requestForegroundPermissionsAsync();
            if (locationStatus !== 'granted') {
                setLocationError('Дозвіл на локацію не надано');
            }
        } catch (error) {
            console.error('Permission error:', error);
        }
    };

    // === КАМЕРА через ImagePicker ===
    const takePhoto = async (): Promise<void> => {
        try {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();

            if (status !== 'granted') {
                Alert.alert('Потрібен дозвіл для використання камери');
                return;
            }

            const result = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            if (!result.canceled && result.assets && result.assets[0]) {
                const newImage = result.assets[0].uri;
                setGalleryImages(prev => [newImage, ...prev]);
            }
        } catch (error) {
            Alert.alert('Помилка', 'Не вдалося зробити фото');
        }
    };

    // === ГАЛЕРЕЯ ===
    const pickImage = async (): Promise<void> => {
        try {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (status !== 'granted') {
                Alert.alert('Потрібен дозвіл для доступу до фото');
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            if (!result.canceled && result.assets && result.assets[0]) {
                const newImage = result.assets[0].uri;
                setGalleryImages(prev => [newImage, ...prev]);
            }
        } catch (error) {
            Alert.alert('Помилка', 'Не вдалося вибрати зображення');
        }
    };

    const clearImages = (): void => {
        setGalleryImages([]);
    };

    // === ГЕОЛОКАЦІЯ ===
    const getCurrentLocation = async (): Promise<void> => {
        try {
            const { status } = await Location.getForegroundPermissionsAsync();

            if (status !== 'granted') {
                const { status: newStatus } = await Location.requestForegroundPermissionsAsync();
                if (newStatus !== 'granted') {
                    setLocationError('Дозвіл на локацію не надано');
                    return;
                }
            }

            const currentLocation = await Location.getCurrentPositionAsync({});
            setLocation(currentLocation);
            setLocationError(null);
        } catch (error) {
            setLocationError('Помилка отримання локації');
        }
    };

    // === СПОВІЩЕННЯ ===
    const sendTestNotification = async (): Promise<void> => {
        try {
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: 'Тестове сповіщення 📱',
                    body: 'Це сповіщення з вашого додатку!',
                },
                trigger: { seconds: 1 },
            });
            setNotificationsLog(prev => ['Надіслано тестове сповіщення', ...prev]);
        } catch (error) {
            Alert.alert('Помилка', 'Не вдалося надіслати сповіщення');
        }
    };

    const sendDelayedNotification = async (): Promise<void> => {
        try {
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: 'Нагадування ⏰',
                    body: 'Це сповіщення прийшло через 3 секунди',
                },
                trigger: { seconds: 3 },
            });
            setNotificationsLog(prev => ['Заплановано сповіщення через 3с', ...prev]);
        } catch (error) {
            Alert.alert('Помилка', 'Не вдалося запланувати сповіщення');
        }
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <Text style={styles.title}>📱 Нативні можливості телефону</Text>

            {/* СЕКЦІЯ КАМЕРИ */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>📷 Камера та Галерея</Text>
                <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.smallButton} onPress={takePhoto}>
                        <Text style={styles.buttonText}>📸 Зробити фото</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.smallButton} onPress={pickImage}>
                        <Text style={styles.buttonText}>🖼️ Вибрати фото</Text>
                    </TouchableOpacity>
                </View>

                {galleryImages.length > 0 && (
                    <TouchableOpacity style={styles.clearButton} onPress={clearImages}>
                        <Text style={styles.buttonText}>❌ Очистити всі фото</Text>
                    </TouchableOpacity>
                )}

                {galleryImages.length > 0 && (
                    <View style={styles.galleryContainer}>
                        <Text style={styles.countText}>Зображень: {galleryImages.length}</Text>
                        <ScrollView horizontal style={styles.horizontalScroll}>
                            {galleryImages.slice(0, 5).map((uri, index) => (
                                <Image key={index} source={{ uri }} style={styles.galleryImage} />
                            ))}
                        </ScrollView>
                    </View>
                )}
            </View>

            {/* СЕКЦІЯ ГЕОЛОКАЦІЇ */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>📍 Геолокація</Text>
                <TouchableOpacity style={styles.button} onPress={getCurrentLocation}>
                    <Text style={styles.buttonText}>🌍 Отримати поточну локацію</Text>
                </TouchableOpacity>

                {locationError ? (
                    <Text style={styles.errorText}>{locationError}</Text>
                ) : location ? (
                    <View style={styles.locationInfo}>
                        <Text style={styles.locationText}>
                            📍 Широта: {location.coords.latitude.toFixed(6)}
                        </Text>
                        <Text style={styles.locationText}>
                            📍 Довгота: {location.coords.longitude.toFixed(6)}
                        </Text>
                        <Text style={styles.locationText}>
                            🎯 Точність: ±{Math.round(location.coords.accuracy)}м
                        </Text>
                        <Text style={styles.locationText}>
                            ⏰ Оновлено: {new Date(location.timestamp).toLocaleTimeString()}
                        </Text>
                    </View>
                ) : (
                    <Text style={styles.placeholderText}>Локація ще не отримана</Text>
                )}
            </View>

            {/* СЕКЦІЯ СПОВІЩЕНЬ */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>🔔 Сповіщення</Text>

                <Text style={styles.infoText}>
                    💡 У Expo Go сповіщення можуть мати обмежену функціональність
                </Text>

                <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.smallButton} onPress={sendTestNotification}>
                        <Text style={styles.buttonText}>🔔 Тестове сповіщення</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.smallButton} onPress={sendDelayedNotification}>
                        <Text style={styles.buttonText}>⏰ Через 3 секунди</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.tokenText}>
                    🔑 Token: {notificationToken ? `${notificationToken}` : 'Завантаження...'}
                </Text>

                <View style={styles.notificationsLog}>
                    <Text style={styles.logTitle}>📋 Лог сповіщень:</Text>
                    {notificationsLog.length === 0 ? (
                        <Text style={styles.placeholderText}>Сповіщень поки немає</Text>
                    ) : (
                        notificationsLog.slice(0, 5).map((log, index) => (
                            <Text key={index} style={styles.logEntry}>• {log}</Text>
                        ))
                    )}
                </View>
            </View>

            {/* ІНФОРМАЦІЯ ПРО EXPO GO */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>ℹ️ Інформація</Text>
                <Text style={styles.infoText}>
                    • Камера: Використовує системний інтерфейс{'\n'}
                    • Геолокація: Повна підтримка{'\n'}
                    • Сповіщення: Обмежена підтримка в Expo Go{'\n'}
                    • Для повного функціоналу використовуйте Development Build
                </Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8f9fa",
    },
    contentContainer: {
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 24,
        marginTop: 16,
        color: "#333",
    },
    section: {
        backgroundColor: "#fff",
        padding: 16,
        marginBottom: 16,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 12,
        color: "#333",
    },
    button: {
        backgroundColor: "#007AFF",
        padding: 16,
        borderRadius: 8,
        alignItems: "center",
        marginBottom: 12,
    },
    smallButton: {
        backgroundColor: "#007AFF",
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
        flex: 1,
        marginHorizontal: 4,
    },
    clearButton: {
        backgroundColor: "#FF3B30",
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
        marginVertical: 8,
    },
    buttonRow: {
        flexDirection: "row",
        marginBottom: 12,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 14,
    },

    // Галерея
    galleryContainer: {
        marginTop: 12,
    },
    countText: {
        fontSize: 14,
        color: "#666",
        marginBottom: 8,
        textAlign: 'center',
    },
    horizontalScroll: {
        flexDirection: "row",
    },
    galleryImage: {
        width: 100,
        height: 100,
        borderRadius: 8,
        marginRight: 8,
    },

    // Локація
    locationInfo: {
        backgroundColor: "#f0f8ff",
        padding: 12,
        borderRadius: 8,
        marginTop: 8,
    },
    locationText: {
        fontSize: 14,
        color: "#333",
        marginBottom: 4,
    },
    errorText: {
        color: "#FF3B30",
        fontSize: 14,
        marginTop: 8,
        textAlign: 'center',
    },
    placeholderText: {
        color: "#999",
        fontSize: 14,
        fontStyle: "italic",
        textAlign: "center",
        marginTop: 8,
    },
    infoText: {
        color: "#666",
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 12,
    },

    // Сповіщення
    tokenText: {
        fontSize: 10,
        color: "#666",
        backgroundColor: "#f0f0f0",
        padding: 8,
        borderRadius: 4,
        marginBottom: 12,
        textAlign: "center",
    },
    notificationsLog: {
        backgroundColor: "#f8f8f8",
        padding: 12,
        borderRadius: 8,
    },
    logTitle: {
        fontSize: 14,
        fontWeight: "bold",
        marginBottom: 8,
        color: "#333",
    },
    logEntry: {
        fontSize: 12,
        color: "#666",
        marginBottom: 4,
    },
});

export default SystemsView;
