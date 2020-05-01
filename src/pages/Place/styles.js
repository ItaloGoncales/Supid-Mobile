import { StyleSheet, Dimensions } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flex: 1
    },
    placeHeader: {
        backgroundColor: "#fff",
        flexDirection: "row",
        padding: 10,
    },
    placeImage: {
        width: 80,
        height: 80,
        borderWidth: 1,
        borderColor: "#f0f0f0",
        borderRadius: 50,
        overflow: 'hidden',
        justifyContent: "center",
    },
    placeDetailsContainer: {
        justifyContent: "center",
        marginLeft: 30
    },
    placeTitle: {
        fontSize: screenWidth * 0.05
    },
    placeInfo: {
        fontSize: screenWidth * 0.033,
        color: "#a3a3a3"
    },
    productContainer: {
        paddingTop: 10,
        marginHorizontal: 10,
    },
    productCard: {
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
    productDetailsContainer: {
        margin: 10,
        paddingRight: 50,
        alignSelf: "center"
    },
    productTitle: {
        fontSize: (screenWidth) * 0.05,
    },
    productCategory: {
        color: "#c3c3c3",
        fontSize: screenWidth * 0.035
    },
    productPrice: {
        color: "#40AC59",
        fontSize: screenWidth * 0.04,
        marginTop: 5
    },
});