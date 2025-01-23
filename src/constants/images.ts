import unknownArtistImage from '@/assets/unknownArtist.png'
import unknownTrackImage from '@/assets/unknownTrack.png'
import { Image } from 'react-native'

export const unknownArtistImageUri = Image.resolveAssetSource(unknownArtistImage).uri
export const unknownTrackImageUri = Image.resolveAssetSource(unknownTrackImage).uri