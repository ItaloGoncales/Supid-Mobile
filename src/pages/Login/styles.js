import { StyleSheet, Dimensions } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch'
        opacity: 25
    },
    logoImage: {
        width: screenWidth * 0.8,
        height: screenWidth * 0.22,
        alignSelf: 'center',
        resizeMode: 'stretch', // or 'stretch'
    },
    profile: {
        marginTop: '10%',
        width: screenWidth * 0.3,
        height: screenWidth * 0.3,
        borderRadius: 25,
        alignSelf: 'center',
        resizeMode: 'stretch',
    },
    heading: {
        color: "#FFF",
        // fontSize: Platform.OS == 'ios' ? 30 : width*0.08,
        fontSize: screenWidth * 0.08,
        paddingLeft: 30,
        paddingRight: 30,
        textAlign: 'center',
        marginTop: 30
    },
    loginInfo: {
        color: "#FFF",
        fontSize: screenWidth * 0.05,
        textAlign: 'center',
        marginTop: screenWidth * 0.03
    },
    customerInfo: {
        color: "#FFF",
        fontSize: screenWidth * 0.05,
        textAlign: 'center',
        marginTop: screenWidth * 0.09,
        marginBottom: 0
    },
    facebookLoginButton: {
        backgroundColor: '#4267b2',
    },
    googleLoginButton: {
        backgroundColor: '#4285f4',
    },
    signUpButton: {
        backgroundColor: '#40AC59',
    },
    facebookLogoutButton: {
        backgroundColor: 'grey',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        position: "absolute",
        bottom: 0
    },
    buttonText: {
        color: "#FFF",
        textAlign: "center",
        textAlignVertical: "center"
    },
    privacyAndPolicy: {
        marginTop: screenWidth * 0.05,
        alignItems: 'center',
        justifyContent: 'center'
    },
    privacyAndPolicyText: {
        color: "#FFF",
        textDecorationLine: "underline",
        marginTop: screenWidth * 0.02,
        fontSize: screenWidth * 0.03
    }
});