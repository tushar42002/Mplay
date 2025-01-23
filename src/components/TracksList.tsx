import { FlatList, FlatListProps, Text, View } from "react-native"
import { TrackListItem } from "./TrackListItem"
import { utilsStyles } from "@/styles"
import TrackPlayer, { Track, useActiveTrack, useIsPlaying } from "react-native-track-player"
import FastImage from "react-native-fast-image"
import { unknownTrackImageUri } from "@/constants/images"
import { useQueue } from "@/store/queue"
import { useRef } from "react"
import { QueueControls } from "./QueueControls"

export type TrackListProps = Partial<FlatListProps<Track>> & {
    id: string
    tracks: Track[]
    hideQueueControls?: boolean
}

const ItemDivider = () => (<View style={{ ...utilsStyles.itemSeparator, marginVertical: 9, marginLeft: 60 }} />)
export const TracksList = ({ id, tracks, hideQueueControls = false, ...flatListProps }: TrackListProps) => {

    const queueOffset = useRef(0);
    const { activeQueueId, setActiveQueueId } = useQueue();

    const isActiveTrack = useActiveTrack();
    const { playing } = useIsPlaying();

    const handleTrackSelect = async (selectedTrack: Track) => {

        if (isActiveTrack?.url === selectedTrack.url) {
            { playing ? await TrackPlayer.pause() : await TrackPlayer.play() };
            return
        }

        const trackIndex = tracks.findIndex((track) => track.url === selectedTrack.url);

        if (trackIndex === -1) { return };

        const isChangingQueue = id !== activeQueueId;

        if (isChangingQueue) {
            const beforeTracks = tracks.slice(0, trackIndex);
            const afterTracks = tracks.slice(trackIndex + 1);

            await TrackPlayer.reset();

            await TrackPlayer.add(selectedTrack)
            await TrackPlayer.add(afterTracks)
            await TrackPlayer.add(beforeTracks)

            await TrackPlayer.play();

            queueOffset.current = trackIndex;
            setActiveQueueId(id);
        } else {
            const nextTrackIndex = trackIndex - queueOffset.current < 0
                ? tracks.length + trackIndex - queueOffset.current
                : trackIndex - queueOffset.current;

            await TrackPlayer.skip(nextTrackIndex);
            await TrackPlayer.play();
        }

    }

    return (
        <FlatList
            data={tracks}
            contentContainerStyle={{ paddingTop: 40, paddingBottom: 140 }}
            ListHeaderComponent={
                !hideQueueControls ? (
                    <QueueControls tracks={tracks} style={{ paddingBottom: 20 }} />
                ) : undefined
            }
            ItemSeparatorComponent={ItemDivider}
            ListEmptyComponent={<View>
                <Text style={utilsStyles.emptyContentText} >There is no tracks</Text>
                <FastImage
                    source={{ uri: unknownTrackImageUri, priority: FastImage.priority.normal }}
                    style={utilsStyles.emptyContentImage}
                />
            </View>}
            renderItem={({ item: track }) => (<TrackListItem track={track} onTrackSelect={handleTrackSelect} />
            )}
            {...flatListProps}
        />
    )
}
