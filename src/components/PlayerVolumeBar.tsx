import { colors } from "@/constants/tokens";
import { View, ViewProps } from "react-native";
import { useDerivedValue, useSharedValue } from "react-native-reanimated";
import { Ionicons } from '@expo/vector-icons';
import { utilsStyles } from "@/styles";
import { useTrackPlayerVolume } from "@/hooks/useTrackPlayerVolume";
import { Slider } from "react-native-awesome-slider";


export const PlayerVolumeBar = ({ style }: ViewProps) => {

    const { volume, updateVolume } = useTrackPlayerVolume();

    const progress = useSharedValue(0);
    const min = useSharedValue(0);
    const max = useSharedValue(1);

    useDerivedValue(() => {
        progress.value = volume ?? 0;
    });

    return (
        <View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                <Ionicons name="volume-low" size={24} color={colors.icon} style={{ opacity: 0.8 }} />
                <Slider
                    progress={progress}
                    minimumValue={min}
                    maximumValue={max}
                    containerStyle={utilsStyles.slider}
                    onValueChange={(value) => {
                        updateVolume(value);
                    }}
                    renderBubble={() => null}
                    theme={{
                        minimumTrackTintColor: colors.minimumTrackTintColor,
                        maximumTrackTintColor: colors.maximumTrackTintColor,
                    }}
                    thumbWidth={0}

                />
                <Ionicons name="volume-high" size={24} color={colors.icon} style={{ opacity: 0.8 }} />
            </View>
        </View>
    )
}