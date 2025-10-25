import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, Link } from "expo-router";

export default function HomeScreen() {
    const router = useRouter();

    const handlePressButton = () => {
        Alert.alert("First Text", "It's a live!");
    };

    return (
        <LinearGradient
            colors={['#0f2027', '#203a43', '#2c5364']}
            style={styles.container}
        >
            <View style={styles.card}>
                <Text style={styles.title}>👋 Вітаю у додатку!</Text>
                <Text style={styles.subtitle}>Оберіть розділ для продовження</Text>

                <TouchableOpacity onPress={handlePressButton} style={styles.btnPrimary}>
                    <Text style={styles.btnText}>Натисни мене</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnSecondary} onPress={() => router.push("/products")}>
                    <Text style={styles.btnText}>Перейти до продуктів</Text>
                </TouchableOpacity>

                <View style={styles.linksContainer}>
                    <Link style={styles.link} href={"/products"}>🛍️ Продукти</Link>
                    <Link style={styles.link} href={"/sidebar"}>📂 Sidebar</Link>
                    <Link style={styles.link} href={"/sliders"}>🎚️ Повзунки</Link>
                    <Link style={styles.link} href={"/bottomSheet"}>📄 Bottom Sheet</Link>
                    <Link style={styles.link} href={"/collapsible"}>⬇️ Випадні списки</Link>
                    <Link style={styles.link} href={"/carousels"}>🎠 Карусель</Link>
                </View>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        width: '85%',
        paddingVertical: 30,
        paddingHorizontal: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 20,
        backdropFilter: 'blur(10px)',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
    },
    title: {
        fontSize: 26,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#ddd',
        marginBottom: 25,
        textAlign: 'center',
    },
    btnPrimary: {
        backgroundColor: '#ff6f61',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 12,
        shadowColor: '#ff6f61',
        shadowOpacity: 0.4,
        shadowRadius: 6,
        marginBottom: 12,
    },
    btnSecondary: {
        backgroundColor: '#ffd166',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 12,
        shadowColor: '#ffd166',
        shadowOpacity: 0.4,
        shadowRadius: 6,
        marginBottom: 20,
    },
    btnText: {
        fontWeight: '600',
        color: '#1a1a1a',
        textAlign: 'center',
        fontSize: 16,
    },
    linksContainer: {
        width: '100%',
        marginTop: 15,
    },
    link: {
        textAlign: 'center',
        color: '#fff',
        backgroundColor: 'rgba(255,255,255,0.1)',
        paddingVertical: 10,
        borderRadius: 10,
        marginVertical: 5,
        fontWeight: '500',
    },
});
