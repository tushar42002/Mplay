import { Artist, Playlist, TrackWithPlaylist } from "@/helpers/types";
import { Track } from "react-native-track-player";
import { create } from "zustand";
// import library from "@/assets/data/library.json";
import { useMemo } from "react";
import { unknownTrackImageUri } from "@/constants/images";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

interface LibraryState {
	tracks: Track[];
	favorites: Track[]
	Playlists: Playlist[]
	toggleTrackFavorite: (track: Track) => void
	addToPlaylist: (track: Track, playlistName: string) => void
	setTracks: (tracks: Track[]) => void
	setFavoriteTracks: (tracks: Track[]) => void
	setPlaylists: (tracks: Playlist[]) => void
};

export const useLibraryStore = create<LibraryState>()((set) => ({
	tracks: [],
	favorites: [],
	Playlists: [],
	setTracks: (tracks: Track[]) => set(() => ({ tracks: tracks })),
	setFavoriteTracks: (tracks: Track[]) => set(() => ({ favorites: tracks })),
	setPlaylists: (playlist: Playlist[]) => set(() => ({ Playlists: playlist })),
	toggleTrackFavorite: async (track) => {

		console.log(track);
		const favorites = JSON.parse(await AsyncStorage.getItem('favorites') as string) as Track[];

		if (favorites.find((fTrack) => fTrack.url === track.url)) {
			await AsyncStorage.setItem('favorites', JSON.stringify(favorites.filter((fTrack) => fTrack.url !== track.url)));
			set(() => ({ favorites: favorites.filter((fTrack) => fTrack.url !== track.url) }));
		} else {
			await AsyncStorage.setItem('favorites', JSON.stringify([...favorites, track]));
		}

		console.log(JSON.parse(await AsyncStorage.getItem('favorites') as string));
		let updateFavorites = JSON.parse(await AsyncStorage.getItem('favorites') as string) as Track[];
		set(() => ({ favorites: updateFavorites }));
			
	},
	addToPlaylist: async (track, playlistName) => {

		const playlists = await AsyncStorage.getItem('playlists');

		if (playlists) {
			const parsedPlaylists = JSON.parse(playlists) as Playlist[];

			if (parsedPlaylists.find((playlist) => playlist.name === playlistName)) {

				await AsyncStorage.setItem('playlists', JSON.stringify(
					parsedPlaylists.map((playlist) => {
						if (playlist.name === playlistName) {
							return { ...playlist, tracks: [...playlist.tracks, track], artworkPreview: track.artwork ?? unknownTrackImageUri };
						}
						return playlist;
					})
				));
			}
		} else {
			Alert.alert('Please creat a playlist first');
		}
		let updatedPlaylists = JSON.parse(await AsyncStorage.getItem('playlists') as string) as Playlist[];
		set(() => ({ Playlists: updatedPlaylists }));
	}
}));

export const useTracks = () => useLibraryStore((state) => state.tracks);

export const useFavorites = () => {
	const favorites = useLibraryStore((state) => state.favorites);
	const toggleTrackFavorite = useLibraryStore((state) => state.toggleTrackFavorite);

	return { favorites, toggleTrackFavorite, };
};


export const useArtists = () => {
	const tracks = useLibraryStore((state) => state.tracks);
	const artists = useMemo(() => {
		return tracks.reduce((acc, track) => {
			const existingArtist = acc.find((artist) => artist.name === track.artist)

			if (existingArtist) {
				existingArtist.tracks.push(track)
			} else {
				acc.push({
					name: track.artist ?? 'Unknown',
					tracks: [track],
				})
			}

			return acc
		}, [] as Artist[])
	}, [tracks])

	return { artists }
};

export const usePlaylists = () => {
	const playlists = useLibraryStore((state) => state.Playlists);
	const addToPlaylist = useLibraryStore((state) => state.addToPlaylist);
	const setPlaylist = useLibraryStore((state) => state.setPlaylists);

	return { playlists, addToPlaylist,setPlaylist }
};