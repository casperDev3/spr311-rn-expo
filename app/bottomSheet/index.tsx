import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Animated } from 'react-native';

export default function BottomSheet() {
    const [visible, setVisible] = useState(false);

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.openButton}
                onPress={() => setVisible(true)}
            >
                <Text style={styles.buttonText}>Відкрити Bottom Sheet</Text>
            </TouchableOpacity>

            <Modal
                visible={visible}
                transparent
                animationType="slide"
                onRequestClose={() => setVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <TouchableOpacity
                        style={styles.backdrop}
                        activeOpacity={1}
                        onPress={() => setVisible(false)}
                    />
                    <View style={styles.bottomSheet}>
                        <View style={styles.handle} />
                        <Text style={styles.sheetTitle}>Опції</Text>

                        <TouchableOpacity style={styles.option}>
                            <Text style={styles.optionText}>📷 Камера</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.option}>
                            <Text style={styles.optionText}>🖼️ Галерея</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.option}>
                            <Text style={styles.optionText}>📁 Файли</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setVisible(false)}
                        >
                            <Text style={styles.closeText}>Закрити</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    openButton: { backgroundColor: '#007AFF', padding: 15, borderRadius: 10 },
    buttonText: { color: 'white', fontSize: 18, fontWeight: '600' },
    modalOverlay: { flex: 1, justifyContent: 'flex-end' },
    backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' },
    bottomSheet: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        minHeight: 300,
    },
    handle: {
        width: 40,
        height: 5,
        backgroundColor: '#ccc',
        borderRadius: 3,
        alignSelf: 'center',
        marginBottom: 20,
    },
    sheetTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
    option: { paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#eee' },
    optionText: { fontSize: 18 },
    closeButton: { marginTop: 20, padding: 15, backgroundColor: '#f0f0f0', borderRadius: 10 },
    closeText: { textAlign: 'center', fontSize: 16, fontWeight: '600' },
});
