import { NativeStackNavigationOptions } from '@react-navigation/native-stack'
import { colors } from './tokens'
import { Platform } from 'react-native';

export const StackScreenWithSearchBar: NativeStackNavigationOptions = {


    headerLargeTitle: Platform.OS === 'ios', // Only for iOS
    headerLargeTitleStyle: {
        color: colors.text,
    },
    headerStyle: {
        backgroundColor: colors.background,
    },
    headerTitleAlign: 'left',
    headerTitleStyle: {
        fontSize: Platform.OS === 'android' ? 28 : 34, // Adjust size for Android
        fontWeight:'700',
        color: colors.text,
    },
    headerTintColor: colors.text,
    headerBlurEffect:'prominent',
    headerShadowVisible: true,
}