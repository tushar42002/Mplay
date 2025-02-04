# Mplay / SoundLoome

Mplay/SoundLoome is a React Native music application that offers users an intuitive interface to explore and enjoy their music collection. The app features multiple screens, including Songs, Playlists, Artists, and Favorites, providing an organized and user-friendly experience.

## Features

- **Songs**: Browse and play all available tracks.
- **Playlists**: Create, edit, and manage custom playlists.
- **Artists**: View songs categorized by artists.
- **Favorites**: Mark and quickly access your favorite tracks.

## Technologies Used

- **React Native**: For building the cross-platform mobile application.
- **Zustand**: State management library for React.
- **TypeScript**: Ensuring type safety and enhancing code quality.
- **Expo Router**: Simplifying navigation within the app.


## Installation and Usage
To run the project, follow these steps:
1. Clone the repository:
 `git clone https://github.com/tushar42002/Mplay.git`
2. Navigate to the project directory:
`cd musicapp`
3. Install dependencies:
`yarn install`
4. Run the application:
 `yarn start`


## File Structure
```
app.json
package.json
tsconfig.json

assets/
    ├── unknownArtist.png
    ├── unknownTrack.png
    └── data/
        └── library.json
output/
    ├── soundloomev3.aab
    └── soundloomev3universal.apk
src/
    ├── app/
    │   ├── _layout.tsx
    │   ├── player.tsx
    │   └── (modals)/
    │   └── (tabs)/
    ├── components/
    │   ├── ArtistTracksList.tsx
    │   ├── FloatingPlayer.tsx
    │   ├── MovingText.tsx
    │   ├── PlayerControls.tsx
    │   ├── PlayerProgressbar.tsx
    │   ├── PlayerRepeatToggle.tsx
    │   ├── PlayerVolumeBar.tsx
    │   ├── PlaylistListItem.tsx
    │   ├── PlaylistsList.tsx
    │   ├── PlaylistTracksList.tsx
    │   ├── QueueControls.tsx
    │   ├── TrackListItem.tsx
    │   ├── TrackShortcutsMenu.tsx
    │   └── TracksList.tsx
    ├── components/
               utils/
    │                ├── GetlocalTracks.tsx
    │                └── StopPropagation.tsx
    ├── constants/
    │   ├── images.ts
    │   ├── layout.ts
    │   ├── playbackService.tsx
    │   └── tokens.ts
    ├── helpers/
    │   ├── filter.tsx
    │   ├── miscellaneous.ts
    │   └── types.ts
    ├── hooks/
    │   ├── useLastActiveTrack.tsx
    │   ├── useLogTrackPlayerState.tsx
    │   ├── useNavigationSearch.tsx
    │   ├── usePlayerBackground.tsx
    │   ├── useSetupTrackPlayer.tsx
    │   ├── useTrackPlayerFavorite.tsx
    │   ├── useTrackPlayerRepeatMode.tsx
    │   └── useTrackPlayerVolume.tsx
    ├── store/
    │   ├── library.tsx
    │   └── queue.tsx
    ├── styles/
    │   └── index.ts
    └── types/
        └── index.d.ts
```

 thankyou for read this readme.md and my project explation if anyone want to make chnages please create new brach. And to contect me please go to my portfolio contact section thankyou a
 link for portfolio <a href="https://tushar42002.github.io/portfolio/" target="_blank">visit my portfolio</a>
