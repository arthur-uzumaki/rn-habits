import { View } from 'react-native'
import { Tabs } from 'expo-router'

import { FontAwesome } from '@expo/vector-icons'

import { useAuth } from '~/hooks/auth-hook'

import colors from 'tailwindcss/colors'
import clsx from 'clsx'

import { Avatar } from '~/components/avatar'

export default function TabsLayout() {
  const { user } = useAuth()

  return (
    <View className="flex-1">
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: colors.white,
          tabBarHideOnKeyboard: true,
          tabBarInactiveTintColor: colors.zinc[400],
          tabBarStyle: {
            backgroundColor: colors.zinc[800],
            borderTopWidth: 0,
            position: 'absolute',
            bottom: 50,
            transform: [{ translateX: '120%' }],
            width: '30%',
            height: 70,
            borderRadius: 99,
            paddingBottom: 30,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            tabBarIcon: ({ size = 30, color, focused }) => (
              <View
                className={clsx(
                  'h-[70px] w-[70px] items-center justify-center ',
                  {
                    'items-center justify-center rounded-full bg-zinc-950/10':
                      focused,
                  }
                )}
              >
                <FontAwesome
                  name="home"
                  size={size}
                  color={focused ? colors.white : color}
                  className="items-center justify-center"
                />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarIcon: ({ color, focused }) => (
              <View
                className={clsx(
                  'h-[70px] w-[70px] items-center justify-center ',
                  {
                    'items-center justify-center rounded-full bg-zinc-950/10':
                      focused,
                  }
                )}
              >
                <Avatar
                  source={{ uri: user?.avatarUrl }}
                  selected={color === colors.white}
                />
              </View>
            ),
          }}
        />
      </Tabs>
    </View>
  )
}
