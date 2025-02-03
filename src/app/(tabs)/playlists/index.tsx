import { PlaylistsList } from '@/components/PlaylistsList'
import { unknownTrackImageUri } from '@/constants/images'
import { colors, screenPadding } from '@/constants/tokens'
import { playlistNameFilter } from '@/helpers/filter'
import { Playlist } from '@/helpers/types'
import { useNavigationSearch } from '@/hooks/useNavigationSearch'
import { usePlaylists } from '@/store/library'
import { defaultStyles } from '@/styles'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router'
import React, { useMemo, useState } from 'react'
import {
	ScrollView,
	View,
	Modal,
	TextInput,
	Button,
	StyleSheet,
	TouchableOpacity,
	Text
} from 'react-native'
import { useActiveTrack } from 'react-native-track-player'

const PlaylistsScreen = () => {
	const activetrack = useActiveTrack();
	const router = useRouter()
	const [modalVisible, setModalVisible] = useState(false)
	const [newPlaylistName, setNewPlaylistName] = useState('')
	const setPlaylists = usePlaylists().setPlaylist;

	const search = useNavigationSearch({
		searchBarOptions: {
			placeholder: 'Find in playlists',
		},
	})

	const { playlists } = usePlaylists()

	const filteredPlaylists = useMemo(() => {
		return playlists.filter(playlistNameFilter(search))
	}, [playlists, search])

	const handlePlaylistPress = (playlist: Playlist) => {
		router.push(`/(tabs)/playlists/${playlist.name}`)
	}

	const handleCreatePlaylist = async () => {
		if (newPlaylistName.trim()) {
			// Implement the playlist creation logic here
			console.log('New playlist created:', newPlaylistName)


			const newPlaylist = [...playlists, { name: newPlaylistName, tracks: [], artworkPreview: unknownTrackImageUri }];

			await AsyncStorage.setItem('playlists', JSON.stringify(newPlaylist));

			setPlaylists(newPlaylist);

			setNewPlaylistName('')
			setModalVisible(false)

		} else {
			alert('Please enter a name for the new playlist');
		}
	}

	return (
		<View style={defaultStyles.container}>
			<ScrollView
				contentInsetAdjustmentBehavior="automatic"
				style={{
					paddingHorizontal: screenPadding.horizontal,
				}}
			>
				<PlaylistsList
					scrollEnabled={false}
					playlists={filteredPlaylists}
					onPlaylistPress={handlePlaylistPress}
				/>
			</ScrollView>

			{/* Floating Button */}
			<TouchableOpacity
				style={[styles.floatingButton, {bottom: activetrack ? 150 : 80}]}
				onPress={() => setModalVisible(true)}
			>
				<Text style={styles.buttonText}>+</Text>
			</TouchableOpacity>

			{/* Modal for New Playlist */}
			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => setModalVisible(false)}
			>
				<View style={styles.modalContainer}>
					<View style={styles.modalContent}>
						<TextInput
							placeholder="Enter playlist name"
							value={newPlaylistName}
							onChangeText={setNewPlaylistName}
							style={styles.textInput}
							placeholderTextColor={colors.text}
						/>
						<View style={styles.buttonGroup}>
							<Button title="Cancel" onPress={() => setModalVisible(false)} color={colors.primary} />
							<Button title="Create" onPress={handleCreatePlaylist} color={'green'} />
						</View>
					</View>
				</View>
			</Modal>
		</View>
	)
}

const styles = StyleSheet.create({
	floatingButton: {
		position: 'absolute',
		bottom:  80,
		right: 20,
		backgroundColor: colors.primary,
		borderRadius: 30,
		width: 40,
		height: 40,
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonText: {
		fontSize: 28,
		color: 'white',
		fontWeight: 'bold',
	},
	modalContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
	modalContent: {
		backgroundColor: colors.textMuted,
		padding: 20,
		borderRadius: 10,
		width: '80%',
	},
	textInput: {
		borderWidth: 1,
		borderColor: '#ccc',
		padding: 10,
		borderRadius: 5,
		marginBottom: 10,
		color: colors.text,
	},
	buttonGroup: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
})

export default PlaylistsScreen
