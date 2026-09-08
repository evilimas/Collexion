import { Tabs } from 'expo-router';
import React from 'react';

import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'light' ? 'light' : 'dark';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[theme].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="consoles"
        options={{
          title: 'Consoles',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="console.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="handhelds"
        options={{
          title: 'Handhelds',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="handheld.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="controllers"
        options={{
          title: 'Controllers',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="controller.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="add-item"
        options={{
          title: 'Add Item',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="plus.circle.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="person.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="console-details"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
