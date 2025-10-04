import {StyleSheet, View, Text, Button, Alert, TouchableOpacity} from 'react-native';
import {Image} from "expo-image";

export default function TabTwoScreen() {
  return (
     <>
         <View style={styles.explore}>
             <Text>Test</Text>
             <Button title={"Press Me!!"} onPress={()=>{
                 Alert.alert("Hello World!");
             }} color={"#f00"}/>
             <TouchableOpacity onPress={()=>{}}>
                 <Text>
                     Press Mee ! TOp
                 </Text>
             </TouchableOpacity>
             <TouchableOpacity onPress={()=>{
                 Alert.alert("Press on picture!");
             }}>
                 <Image style={{
                     width: "100%",
                     height: 400,
                 }} source={require('@/assets/images/img.png')} />
             </TouchableOpacity>
             {/*<Image style={{*/}
             {/*    width: "100%",*/}
             {/*    height: 400,*/}
             {/*}} source={require('@/assets/images/img.png')} />*/}
         </View>
     </>
  );
}

const styles = StyleSheet.create({
    explore: {
        flex: 1,
        paddingVertical: 40,
        paddingHorizontal: 20,
        backgroundColor: '#115a41',
    }
});
