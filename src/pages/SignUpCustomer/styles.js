import { StyleSheet, Dimensions } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flex: 1
    },
    inner: {
        flex: 1,
        justifyContent: "space-between",
        paddingBottom: 50
    },
    privacyAndPolicyText: {
        textDecorationLine: "underline",
        marginTop: screenWidth * 0.2,
    },
    checkBoxMessage: {
        paddingHorizontal: 10
    }
})