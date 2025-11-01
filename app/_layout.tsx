import {Stack} from "expo-router";
import {Provider} from "react-redux";
import store from "@/store";

export default function RootLayout() {
    return (
        <Provider store={store}>
            <Stack>
                {/* For tabs */}
                <Stack.Screen name={"(tabs)"} options={{headerShown: false}}/>

                {/* For different archive page */}
                <Stack.Screen name={"products/index"} options={{title: "Products"}}/>
                <Stack.Screen name={"sidebar/index"} options={{title: "Sidebar"}}/>

                {/* For single page */}
                <Stack.Screen name={"products/[id]"} options={{title: "Product Details"}}/>
            </Stack>
        </Provider>
    )
}
