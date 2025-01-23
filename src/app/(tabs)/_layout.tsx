import { FloatingPlayer } from '@/components/FloatingPlayer'
import { colors, fontSize } from '@/constants/tokens'
import { FontAwesome, FontAwesome6, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { BlurView } from 'expo-blur'
import { Tabs } from 'expo-router'
import { StyleSheet } from 'react-native'

const TabsNavigation = () => {
	return (

		<>
			<Tabs
				screenOptions={{
					tabBarActiveTintColor: colors.primary,
					tabBarLabelStyle: {
						fontSize: fontSize.xs,
						fontWeight: '500',
					},
					headerShown: false,
					// headerSearchBarOptions: {
					// 	placeholder: 'Search',
					// },
					tabBarStyle: {
						position: 'absolute',
						height: 68,
						// borderTopLeftRadius: 20,
						// borderTopRightRadius: 20,
						borderTopWidth: 0,
						paddingTop: 8,
						// backgroundColor: '#000',
					},
					tabBarBackground: () => (
						<BlurView
							intensity={20}
							style={{
								...StyleSheet.absoluteFillObject,
								overflow: 'hidden',
								borderTopLeftRadius: 20,
								borderTopRightRadius: 20,
								backgroundColor: '#000',
							}}
						/>
					),
				}}
			>
				<Tabs.Screen
					name="favorites"
					options={{
						title: 'Favorites',
						tabBarIcon: ({ color }) => <FontAwesome name="heart" size={24} color={color} />,
					}}
				/>
				<Tabs.Screen
					name="playlists"
					options={{
						title: 'Playlists',
						tabBarIcon: ({ color }) => (
							<MaterialCommunityIcons name="playlist-play" size={28} color={color} />
						),
					}}
				/>
				<Tabs.Screen
					name="(songs)"
					options={{
						title: 'Songs',
						tabBarIcon: ({ color }) => (
							<Ionicons name="musical-notes-sharp" size={24} color={color} />
						),
					}}
				/>
				<Tabs.Screen
					name="artists"
					options={{
						title: 'Artists',
						tabBarIcon: ({ color }) => <FontAwesome6 name="users-line" size={24} color={color} />,
					}}
				/>
			</Tabs>

			<FloatingPlayer style={{
				 position: 'absolute', 
				 bottom: 70, 
				 right: 8 ,
				 left: 8
				 }}  />
		</>
	)
}

export default TabsNavigation
