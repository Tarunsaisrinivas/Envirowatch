import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue',tabBarStyle: { backgroundColor: '#606c38' },
  }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Posts',
          headerStyle: { backgroundColor: '#9d6b53' },
          headerTintColor:"#fff", 
          tabBarStyle: { backgroundColor: '#9d6b53' },
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="address-card" color={color} />,
        }}
      />
      <Tabs.Screen
        name="Posts"
        options={{
          title: 'Create',
          headerStyle: { backgroundColor: '#9d6b53' },
          headerTintColor:"#fff", 
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="pencil" color={color} />,
          tabBarStyle: { backgroundColor: '#9d6b53' },
        }}
      />
      <Tabs.Screen
      name='(details)'
      options={{
        title: 'Profile',
        headerStyle: { backgroundColor: '#9d6b53' },
        headerTintColor:"#fff", 
        tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        tabBarStyle: { backgroundColor: '#9d6b53' },
      }}
      />
    </Tabs>
)};