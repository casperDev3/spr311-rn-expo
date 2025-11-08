import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    TouchableOpacity
} from "react-native";
import ApiService from "@/services/ApiService";
import { BASE_API_AI_CHAT_URL } from "@/app/constants";

const ChatAI: React.FC = () => {
    const api = ApiService.getInstance(BASE_API_AI_CHAT_URL);
    const [messages, setMessages] = useState<Array<{ sender: "user" | "bot"; text: string }>>([]);
    const [inputText, setInputText] = useState<string>("");
    const [isThinking, setIsThinking] = useState<boolean>(false);
    const [dots, setDots] = useState<string>("");

    // Анімація "..." під час мислення
    useEffect(() => {
        if (!isThinking) return;
        const interval = setInterval(() => {
            setDots((prev) => (prev.length < 3 ? prev + "." : ""));
        }, 500);
        return () => clearInterval(interval);
    }, [isThinking]);

    const handleSend = async () => {
        if (inputText.trim() === "") return;

        setMessages((prev) => [...prev, { sender: "user", text: inputText }]);
        setInputText("");
        setIsThinking(true);

        try {
            const response = await api.postData("/ollama", { prompt: inputText, model: "llama3" });
            const botMessage = response.response || "Вибачте, я не зрозумів ваш запит.";
            setMessages((prev) => [...prev, { sender: "bot", text: botMessage }]);
        } catch (error) {
            console.error("Error sending message to AI chat:", error);
            setMessages((prev) => [
                ...prev,
                { sender: "bot", text: "Сталася помилка при обробці вашого запиту." },
            ]);
        } finally {
            setIsThinking(false);
        }
    };

    // Тест API при запуску
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await api.getData("/health");
                console.log(data);
            } catch (error) {
                console.error("Error fetching AI chat data:", error);
            }
        };
        fetchData();
    }, [api]);

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 96 : 0}
        >
            <View style={style.chatContainer}>
                <ScrollView style={style.chatFlow}>
                    {messages.map((message, index) => (
                        <View
                            key={index}
                            style={message.sender === "user" ? style.senderMessage : style.receiverMessage}
                        >
                            <Text>{message.text}</Text>
                        </View>
                    ))}

                    {/* Мигаючий індикатор */}
                    {isThinking && (
                        <View style={style.receiverMessage}>
                            <Text style={style.thinkingText}>Думаю{dots}</Text>
                        </View>
                    )}
                </ScrollView>

                <View style={style.inputArea}>
                    <TextInput
                        style={style.textInput}
                        placeholder="Введіть повідомлення..."
                        placeholderTextColor="#888"
                        value={inputText}
                        onChangeText={setInputText}
                    />
                    <TouchableOpacity onPress={handleSend}>
                        <Text style={style.btnSend}>Send</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

const style = StyleSheet.create({
    chatContainer: {
        flex: 1,
        justifyContent: "space-between",
        backgroundColor: "#f5f5f5",
    },
    chatFlow: {
        flex: 1,
        padding: 10,
    },
    inputArea: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        backgroundColor: "#e0e0e0",
    },
    textInput: {
        flex: 1,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginRight: 10,
        backgroundColor: "#fff",
    },
    btnSend: {
        color: "#007bff",
        fontWeight: "bold",
    },
    senderMessage: {
        alignSelf: "flex-end",
        backgroundColor: "#dcf8c6",
        borderRadius: 15,
        padding: 10,
        marginVertical: 5,
        maxWidth: "80%",
    },
    receiverMessage: {
        alignSelf: "flex-start",
        backgroundColor: "#fff",
        borderRadius: 15,
        padding: 10,
        marginVertical: 5,
        maxWidth: "80%",
    },
    thinkingText: {
        fontStyle: "italic",
        color: "#555",
    },
});

export default ChatAI;
