import { Tabs } from 'expo-router';
import React from 'react';
import {View, StyleSheet, Animated, Platform, Dimensions} from 'react-native';
import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const {width, height} = Dimensions.get('window');

export default function TabLayout() {
    const colorScheme = useColorScheme();
    const activeColor = Colors[colorScheme ?? 'light'].tint;
    const inactiveColor = colorScheme === 'dark' ? '#999' : '#666';
    const bgColor = colorScheme === 'dark' ? '#101820' : '#f9f9fb';

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarButton: HapticTab,
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 20,
                    // left: width * 0.05,
                    // right: 0,
                    height: 60,
                    borderRadius: 25,
                    width: width * 0.84,
                    backgroundColor: bgColor,
                    shadowColor: '#000',
                    shadowOpacity: 0.15,
                    shadowRadius: 12,
                    shadowOffset: { width: 0, height: 5 },
                    elevation: 8,
                    borderTopWidth: 0,
                    paddingBottom: Platform.OS === 'ios' ? 15 : 10,
                    paddingTop: 5,
                    marginHorizontal: width * 0.08,
                },
                tabBarIconStyle: { marginTop: 5 },
                tabBarActiveTintColor: activeColor,
                tabBarInactiveTintColor: inactiveColor,
            }}>

            <Tabs.Screen
                name="index"
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon name="house.fill" color={color} focused={focused} />
                    ),
                }}
            />
            <Tabs.Screen
                name="favorite/index"
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon name="heart.fill" color={color} focused={focused} />
                    ),
                }}
            />
            <Tabs.Screen
                name="cart/index"
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon name="cart.fill" color={color} focused={focused} />
                    ),
                }}
            />
            <Tabs.Screen
                name="notifications/index"
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon name="bell.badge.fill" color={color} focused={focused} />
                    ),
                }}
            />
        </Tabs>
    );
}

function TabIcon({ name, color, focused }: { name: string; color: string; focused: boolean }) {
    return (
        <View style={[styles.iconContainer, focused && styles.activeIcon]}>
            <IconSymbol size={26} name={name} color={color} />
        </View>
    );
}

const styles = StyleSheet.create({
    iconContainer: {
        width: 55,
        height: 45,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        transitionDuration: '0.3s',
    },
    activeIcon: {
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        transform: [{ scale: 1.1 }],
    },
});
