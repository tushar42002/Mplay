import { TracksList } from '@/components/TracksList'
import { screenPadding } from '@/constants/tokens'
import { useNavigationSearch } from '@/hooks/useNavigationSearch'
import { defaultStyles } from '@/styles'
import { ScrollView, View } from 'react-native'
import { useTracks } from '@/store/library'
import { generateTracksListId } from '@/helpers/miscellaneous'

const SongsScreen = () => {
	const search = useNavigationSearch({
		searchBarOptions: {
			placeholder: 'Find in songs',
		}
	})

	const tracks = useTracks()

	return (
		<View style={defaultStyles.container}>
			<ScrollView
				contentInsetAdjustmentBehavior='automatic'
				style={{ paddingHorizontal: screenPadding.horizontal}}
			>
				<TracksList id={generateTracksListId('Songs', search)} scrollEnabled={false} tracks={tracks} />
			</ScrollView>
		</View>
	)
}

export default SongsScreen
