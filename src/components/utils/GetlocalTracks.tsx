import { useLibraryStore } from "@/store/library";
import {
    getAssetsAsync,
    requestPermissionsAsync,
    getPermissionsAsync,
} from "expo-music-library";
import { useEffect } from "react";
import { Track } from "react-native-track-player";




const useGetLocalTracks = () => {

    const setTracks = useLibraryStore((state) => state.setTracks);

    const loadMusicData = async () => {

        // Request permissions
        const permissions = await requestPermissionsAsync();
        console.log("Permissions:", permissions);

        // Get current permissions
        const currentPermissions = await getPermissionsAsync();
        console.log("Current Permissions:", currentPermissions);

        // Get all assets default to 20 audio files
        let data = await getAssetsAsync({
            first: 2, // Limit to 50 assets
            // sortBy: ["duration"], // Sort by duration
            // createdAfter: new Date(2020, 0, 1).getTime(), // Assets created after Jan 1, 2020
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


    useEffect(() => {
        loadMusicData();
    }, [])

}

export default useGetLocalTracks;


