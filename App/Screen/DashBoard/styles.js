import { StyleSheet } from "react-native";
import { Colors } from "../../Utils/Colors";


export const styles = StyleSheet.create({

    listContainer: {
        borderWidth: 1.5,
        borderRadius: 5,
        paddingHorizontal: '2%',
        paddingVertical: '2%',
        borderColor: Colors.light_gery,
        // elevation:2
    },
    btnContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    border: {
        borderColor: Colors.light_gery,
        borderWidth: 1,
        marginVertical: '2%',
        // width:'1%'
    },
    btnContainer: {
        backgroundColor: Colors.them_color,
        marginVertical: '2%',
        paddingHorizontal: '6%',
        paddingVertical: '2%',
        borderRadius: 5,
        alignItems: 'center'
    }
})