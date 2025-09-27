
import {StyleSheet, View, Text, TouchableOpacity, Alert} from 'react-native';


export default function HomeScreen() {
  const handlePressButton = () => {
    Alert.alert("First Text", "It's a live!")
  }
  return (
    <View style={styles.container}>
      <Text style={{
        fontSize: 24,
        fontWeight: 'bold',
        color: "#fff",
        marginBottom: 10
      }}>
        Hello World!
      </Text>
      <TouchableOpacity onPress={handlePressButton} style={styles.btn}>
        <Text>
          Press me!
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#532929',
  },
  btn: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  }
});
