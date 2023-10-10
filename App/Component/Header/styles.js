import { StyleSheet } from "react-native";
import { Colors } from "../../Utils/Colors";

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: '2%',
        paddingVertical: '2%',
        borderBottomWidth: 1.5,
        borderColor: Colors.them_color
    },
    lefticon: {
        width: 35,
        height: 35,
        tintColor: Colors.them_color
    },
    righticon: {
        width: 30,
        height: 30,
        tintColor: Colors.them_color
    },
    flex: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    logo: {
        width: 120,
        height: 40,
        resizeMode: 'contain'
    }
})