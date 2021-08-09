import { StyleSheet, Dimensions } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        backgroundColor: "#FFF",

    },
    address: {
        flexDirection: "row",
        borderTopWidth: 1,
        borderColor: "#F1F1F1",
        alignItems: "center"
    },
    currentLocationMarker: {
        paddingLeft: 15,
        paddingRight: 5,
        paddingVertical: 10
    },
    currentLocation: {
        justifyContent: "center",
        paddingRight: 30
    },
    currentLocationText: {
        fontSize: screenWidth * 0.03,
        color: "#5a5a5a"
    },
    pageContainer: {
        paddingBottom: 80,
    },
    filtersContainer: {
        height: screenHeight * 0.15
    },
    filtersContainerContent: {
        flexDirection: "row",
        paddingLeft: 10,
        paddingVertical: 10,
        justifyContent: "space-around",
    },
    card: {
        flex: 1,
        backgroundColor: "#FFF",
        width: screenWidth * 0.3,
        borderWidth: 1,
        borderColor: "#c3c3c3",
        elevation: 5,
        marginRight: 10,
        borderRadius: 5,
    },
    cardImage: {
        flex: 1,
    },
    imageOpacity: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 5,
        flex: 1
    },
    cardText: {
        fontSize: screenWidth * 0.03,
        textAlignVertical: "bottom",
        color: "#FFF",
        fontWeight: "bold",
        padding: 5,
        position: 'absolute',
        bottom: 0
    },
    placesContainer: {
        marginHorizontal: 10,
    },
    placesHeader: {
        fontSize: 15,
        marginVertical: 5,
    },
    placeCard: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "#FFF",
        width: "100%",
        height: screenHeight * 0.15,
        borderWidth: 1,
        borderColor: "#c3c3c3",
        elevation: 1,
        borderRadius: 5,
        marginBottom: 10,
    },
    placeImage: {
        width: "20%",
        height: "40%",
        margin: 20,
        alignSelf: "center"
    },
    placeDetailsContainer: {
        margin: 10,
        paddingRight: 100,
        alignSelf: "center"
    },
    placeTitle: {
        fontSize: (screenWidth) * 0.05,
    },
    placeCategory: {
        color: "#c3c3c3",
        fontSize: screenWidth * 0.035
    },
    placeInfo: {
        color: "#c3c3c3",
        fontSize: screenWidth * 0.03
    },
})