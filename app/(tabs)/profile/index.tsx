import {
    Text,
    View,
    ScrollView,
    StyleSheet,
    Image,
    TouchableOpacity,
    Alert,
    Modal
} from 'react-native';
import {FC, useState} from 'react';
import {Ionicons} from '@expo/vector-icons';
import {SafeAreaView} from "react-native-safe-area-context";

const ProfileScreen: FC = () => {
    const [avatar, setAvatar] = useState('https://via.placeholder.com/120');
    const [isImagePickerVisible, setImagePickerVisible] = useState(false);

    const handleImageSelect = async (source: 'camera' | 'gallery') => {
        try {
            // Тут буде логіка вибору фото з галереї або камери
            // Для прикладу - просто змінюємо на тестове фото
            setAvatar('https://via.placeholder.com/120/4CAF50/ffffff?text=New+Photo');
            setImagePickerVisible(false);
        } catch (error) {
            Alert.alert('Помилка', 'Не вдалося вибрати фото');
        }
    };

    return (
        <>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                {/* Хедер з градієнтом */}
                <View style={styles.header}>
                    <View style={styles.avatarSection}>
                        <View style={styles.avatarContainer}>
                            <Image
                                source={{uri: avatar}}
                                style={styles.avatar}
                            />
                            <TouchableOpacity
                                style={styles.cameraButton}
                                onPress={() => setImagePickerVisible(true)}
                            >
                                <Ionicons name="camera" size={20} color="white"/>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.name}>Косач Л. П.</Text>
                        <Text style={styles.group}>Група: ІПЗ-21-1</Text>
                    </View>
                </View>

                {/* Інформаційні картки з сучасним дизайном */}
                <View style={styles.content}>
                    <View style={styles.card}>
                        <View style={styles.cardHeader}>
                            <Ionicons name="book" size={24} color="#6366f1"/>
                            <Text style={styles.cardTitle}>Тема роботи</Text>
                        </View>
                        <Text style={styles.cardText}>
                            Розробка крос-платформного мобільного додатку для навчального закладу
                        </Text>
                    </View>

                    <View style={styles.card}>
                        <View style={styles.cardHeader}>
                            <Ionicons name="code-slash" size={24} color="#10b981"/>
                            <Text style={styles.cardTitle}>Технології</Text>
                        </View>
                        <View style={styles.techList}>
                            <View style={styles.techItem}>
                                <Text style={styles.techText}>React Native</Text>
                            </View>
                            <View style={styles.techItem}>
                                <Text style={styles.techText}>TypeScript</Text>
                            </View>
                            <View style={styles.techItem}>
                                <Text style={styles.techText}>Firebase</Text>
                            </View>
                            <View style={styles.techItem}>
                                <Text style={styles.techText}>Redux</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.card}>
                        <View style={styles.cardHeader}>
                            <Ionicons name="person" size={24} color="#f59e0b"/>
                            <Text style={styles.cardTitle}>Інформація про студента</Text>
                        </View>
                        <View style={styles.infoGrid}>
                            <View style={styles.infoRow}>
                                <Ionicons name="school" size={16} color="#6b7280"/>
                                <Text style={styles.infoLabel}>Спеціальність:</Text>
                                <Text style={styles.infoValue}>121 ІПЗ</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Ionicons name="business" size={16} color="#6b7280"/>
                                <Text style={styles.infoLabel}>Факультет:</Text>
                                <Text style={styles.infoValue}>ФІКТ</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Ionicons name="layers" size={16} color="#6b7280"/>
                                <Text style={styles.infoLabel}>Курс:</Text>
                                <Text style={styles.infoValue}>3</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Ionicons name="mail" size={16} color="#6b7280"/>
                                <Text style={styles.infoLabel}>Email:</Text>
                                <Text style={styles.infoValue}>student@univ.edu.ua</Text>
                            </View>
                        </View>
                    </View>
                </View>


                {/* Модальне вікно для вибору фото */}
                <Modal
                    visible={isImagePickerVisible}
                    transparent={true}
                    animationType="slide"
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Оберіть фото</Text>

                            <TouchableOpacity
                                style={styles.modalOption}
                                onPress={() => handleImageSelect('camera')}
                            >
                                <Ionicons name="camera" size={24} color="#6366f1"/>
                                <Text style={styles.modalOptionText}>Зробити фото</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.modalOption}
                                onPress={() => handleImageSelect('gallery')}
                            >
                                <Ionicons name="images" size={24} color="#6366f1"/>
                                <Text style={styles.modalOptionText}>Обрати з галереї</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.modalCancel}
                                onPress={() => setImagePickerVisible(false)}
                            >
                                <Text style={styles.modalCancelText}>Скасувати</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
            <View style={styles.bottomSpace}></View>
        </>
    )
        ;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    header: {
        backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        paddingTop: 60,
        paddingBottom: 40,
    },
    bottomSpace: {
        height: 80,
    },
    avatarSection: {
        alignItems: 'center',
    },
    avatarContainer: {
        position: 'relative',
        marginBottom: 16,
    },
    avatar: {
        width: 140,
        height: 140,
        borderRadius: 70,
        borderWidth: 4,
        borderColor: 'rgba(94,93,93,0.44)',
    },
    cameraButton: {
        position: 'absolute',
        bottom: 8,
        right: 8,
        backgroundColor: '#6366f1',
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    name: {
        fontSize: 26,
        fontWeight: '700',
        color: 'black',
        marginBottom: 4,
        letterSpacing: 0.5,
    },
    group: {
        fontSize: 16,
        color: 'black',
        opacity: 0.9,
        fontWeight: '500',
    },
    content: {
        padding: 16,
        marginTop: -20,
    },
    card: {
        backgroundColor: 'white',
        marginBottom: 16,
        padding: 20,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 5,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.9)',
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1f2937',
        marginLeft: 12,
    },
    cardText: {
        fontSize: 16,
        color: '#4b5563',
        lineHeight: 24,
        fontWeight: '500',
    },
    techList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    techItem: {
        backgroundColor: '#f0f9ff',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e0f2fe',
    },
    techText: {
        color: '#0369a1',
        fontSize: 14,
        fontWeight: '600',
    },
    infoGrid: {
        gap: 12,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    infoLabel: {
        width: '35%',
        fontSize: 14,
        color: '#6b7280',
        fontWeight: '500',
    },
    infoValue: {
        flex: 1,
        fontSize: 14,
        color: '#1f2937',
        fontWeight: '600',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: 'white',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 24,
        paddingBottom: 40,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1f2937',
        textAlign: 'center',
        marginBottom: 24,
    },
    modalOption: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 8,
        borderRadius: 12,
        marginBottom: 8,
    },
    modalOptionText: {
        fontSize: 16,
        color: '#374151',
        fontWeight: '600',
        marginLeft: 12,
    },
    modalCancel: {
        paddingVertical: 16,
        alignItems: 'center',
        borderRadius: 12,
        marginTop: 8,
        backgroundColor: '#f3f4f6',
    },
    modalCancelText: {
        fontSize: 16,
        color: '#6b7280',
        fontWeight: '600',
    },
});

export default ProfileScreen;
