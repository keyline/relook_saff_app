import { StyleSheet } from "react-native";
import { Colors } from "../../Utils/Colors";


export const styles = StyleSheet.create({
    content: {
        flex: 1,
        marginTop: '3%',
        marginBottom: '4%'
    },
    backContainer: {
        marginTop: '2%'
    },
    backicon: {
        width: 50,
        height: 50,
        tintColor: Colors.them_color,
    },
    logoContainer: {
        // marginTop: '8%',
        marginBottom: '6%'
    },
    logo: {
        width: '50%',
        height: 100,
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    mainContent: {
        paddingHorizontal: '6%',
        marginTop: '12%'
    },
    btnContainer: {
        marginTop: '4%'
    },
})