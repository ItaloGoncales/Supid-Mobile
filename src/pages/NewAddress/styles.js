import { StyleSheet, Dimensions } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

import Constants from 'expo-constants';

export default StyleSheet.create({
    container: {
        backgroundColor: "#FFF",
        paddingBottom: 10
        
    },
    address: {
        flexDirection: "row",
        marginHorizontal: 10,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#F1F1F1",
        paddingVertical: 5
    },
    currentLocationMarker: {
        paddingHorizontal: 15,
        paddingVertical: 10
    },
    currentLocation: {
        justifyContent: "center",
        paddingRight: 30
    },
    myAddress: {
        color: "#C3C3C3",
        fontSize: screenWidth * 0.035,
    },
    header: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: "#FFF",
        justifyContent: "space-around",
        alignItems: "center"
    },
    backButton: {
        height: screenWidth * 0.12,
        marginLeft: 20,
        marginRight: 30,
        justifyContent: 'center',
        alignSelf: "center",
        alignItems: "center",
    },
    headerTitle: {
        textAlign: "center",
        width: "100%"
    },
});