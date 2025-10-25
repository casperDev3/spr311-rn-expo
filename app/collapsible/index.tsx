import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

function CollapsibleItem({ title, children }: any) {
    const [expanded, setExpanded] = useState(false);

    return (
        <View style={styles.item}>
            <TouchableOpacity
                style={styles.header}
                onPress={() => setExpanded(!expanded)}
            >
                <Text style={styles.headerText}>{title}</Text>
                <Text style={styles.arrow}>{expanded ? '▲' : '▼'}</Text>
            </TouchableOpacity>
            {expanded && (
                <View style={styles.content}>
                    <Text style={styles.contentText}>{children}</Text>
                </View>
            )}
        </View>
    );
}

export default function CollapsibleList() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>FAQ</Text>

            <CollapsibleItem title="Що таке React Native?">
                React Native - це фреймворк для створення мобільних додатків
                використовуючи React та JavaScript.
            </CollapsibleItem>

            <CollapsibleItem title="Що таке Expo?">
                Expo - це набір інструментів та сервісів для розробки на React Native,
                який спрощує процес створення додатків.
            </CollapsibleItem>

            <CollapsibleItem title="Як встановити залежності?">
                Використовуйте команду: npx expo install назва-пакету
            </CollapsibleItem>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
    title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
    item: { backgroundColor: 'white', marginBottom: 10, borderRadius: 8, overflow: 'hidden' },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#fff',
    },
    headerText: { fontSize: 18, fontWeight: '600', flex: 1 },
    arrow: { fontSize: 16, color: '#007AFF' },
    content: { padding: 15, backgroundColor: '#f9f9f9', borderTopWidth: 1, borderTopColor: '#eee' },
    contentText: { fontSize: 16, lineHeight: 24, color: '#333' },
});
