import { StyleSheet, Dimensions } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flex: 1,
        marginTop: screenWidth * -0.1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
    },
    inner: {
        flex: 1,
        justifyContent: "center",
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch'
    },
    logoImage: {
        width: screenWidth * 0.8,
        height: screenWidth * 0.22,
        alignSelf: 'center',
        resizeMode: 'stretch', // or 'stretch'
        marginBottom: screenWidth * 0.1
    },
    heading: {
        color: "#FFF",
        // fontSize: Platform.OS == 'ios' ? 30 : width*0.08,
        fontSize: screenWidth * 0.08,
        paddingLeft: 30,
        paddingRight: 30,
        textAlign: 'center',
    },
    signUpButton: {
        backgroundColor: '#40AC59',
    },
    labelStyle: {
        color: "#FFF",
        fontSize: screenWidth * 0.03
    },
    inputStyle: {
        color: "#FFF",
        fontSize: screenWidth * 0.05
    }
});