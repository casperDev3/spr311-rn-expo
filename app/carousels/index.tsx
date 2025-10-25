import React, {useState} from 'react';
import {
    FlatList, ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

type ItemData = {
    id: string;
    title: string;
};

const DATA: ItemData[] = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
];

type ItemProps = {
    item: ItemData;
    onPress: () => void;
    backgroundColor: string;
    textColor: string;
};

const Item = ({item, onPress, backgroundColor, textColor}: ItemProps) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, {backgroundColor}]}>
        <Text style={[styles.title, {color: textColor}]}>{item.title}</Text>
    </TouchableOpacity>
);

const App = () => {
    const [selectedId, setSelectedId] = useState<string>();

    const renderItem = ({item}: {item: ItemData}) => {
        const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
        const color = item.id === selectedId ? 'white' : 'black';

        return (
            <Item
                item={item}
                onPress={() => setSelectedId(item.id)}
                backgroundColor={backgroundColor}
                textColor={color}
            />
        );
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={DATA}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    extraData={selectedId}
                    horizontal={true}
                    style={{
                        maxHeight: 200
                    }}
                    showsHorizontalScrollIndicator={false}
                />
                <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={styles.scrollView}>
                    {
                        DATA.map((item, index) => (
                            <Text key={item.id} style={{
                                color: 'white',
                                backgroundColor: "#c51f1f",
                                marginVertical: 10,
                                padding: 10,
                                fontSize: 18,
                                height: 50,
                                textAlignVertical: 'center',
                                marginRight: 10
                            }}>{index + 1}. {item.title}</Text>
                        ))
                    }
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
    scrollView: {
        marginVertical: 20,
    },
});

export default App;
