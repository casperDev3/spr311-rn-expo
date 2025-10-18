import {StyleSheet, View, Text, TouchableOpacity, Alert} from 'react-native';
import {useRouter, Link} from "expo-router";


export default function HomeScreen() {
  const handlePressButton = () => {
    Alert.alert("First Text", "It's a live!")
  }
    const router = useRouter();
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
      <TouchableOpacity style={styles.productsBtn} onPress={()=>{
        router.push("/products")
      }}>
        <Text>
          Перейти до продуктів
        </Text>
      </TouchableOpacity>
      <Link style={styles.productsBtn} href={"/products"}>Продукти</Link>
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
  },
    productsBtn: {
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#ffcc00',
    }
});
