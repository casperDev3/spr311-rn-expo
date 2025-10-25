import {createDrawerNavigator} from "@react-navigation/drawer";
import {View, Text, StyleSheet} from "react-native";
import Cart from "@/app/(tabs)/cart";


const Drawer = createDrawerNavigator();

function FavoriteScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>This is the Favorite Screen</Text>
        </View>
    );
}

function SettingsScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>This is the Settings Screen</Text>
        </View>
    );
}

function FHome() {
    return (
        // <NavigationContainer>
            <Drawer.Navigator initialRouteName="Favorite">
                <Drawer.Screen name="Favorite" component={FavoriteScreen} />
                <Drawer.Screen name="Settings" component={SettingsScreen} />
                <Drawer.Screen name="Cart" component={Cart} />
            </Drawer.Navigator>
        // </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});


export default FHome;
