import { unknownTrackImageUri } from "@/constants/images";
import { Playlist } from "@/helpers/types";
import { useLibraryStore } from "@/store/library";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    getAssetsAsync,
    requestPermissionsAsync,
    getPermissionsAsync,
} from "expo-music-library";
import { useEffect } from "react";
import { Track } from "react-native-track-player";




const useGetLocalTracks = () => {

    const setTracks = useLibraryStore((state) => state.setTracks);
    const setFavoriteTracks = useLibraryStore((state) => state.setFavoriteTracks);
    const setPlaylists = useLibraryStore((state) => state.setPlaylists);

    const loadMusicData = async () => {

        // Request permissions
        const permissions = await requestPermissionsAsync();
        console.log("Permissions:", permissions);

        // Get current permissions
        const currentPermissions = await getPermissionsAsync();
        console.log("Current Permissions:", currentPermissions);

        // Get all assets default to 20 audio files
        let data = await getAssetsAsync({
            first: 2,
        });

        //   console.log("Assets:", data.assets);
        data = await getAssetsAsync({
            first: data.totalCount,
            sortBy: ["creationTime"],
        })
        console.log("Assets:", data.assets[0].artwork);

        const tracks: Track[] = data.assets.map((asset) => ({
            url: asset.uri,
            title: asset.title,
            artist: asset.artist,
            genre: asset.genreId,
            duration: asset.duration,
            artwork: asset.artwork,
        }));

        setTracks(tracks);
    }

    const getPlaylists = async () => {
		const allPlaylists = await AsyncStorage.getItem('playlists');
		console.log(allPlaylists);

		if (allPlaylists) {
			console.log(allPlaylists);
			setPlaylists( JSON.parse(allPlaylists) as Playlist[]);
		}else{
			await AsyncStorage.setItem('playlists', JSON.stringify([{name: 'playlist1', tracks: [], artworkPreview: unknownTrackImageUri}]));
            setPlaylists([{name: 'playlist1', tracks: [], artworkPreview: unknownTrackImageUri}]);
		}
	}

    const getFavorites = async () => {
		const favoritesTracks = await AsyncStorage.getItem('favorites');

		if (favoritesTracks) {
			setFavoriteTracks(JSON.parse(favoritesTracks) as Track[]);
		} else {
			await AsyncStorage.setItem('favorites', JSON.stringify([]));
			setFavoriteTracks([]);
		}
	};

    useEffect(() => {
        loadMusicData();
        getFavorites();
        getPlaylists();
    }, []);

};

export default useGetLocalTracks;


