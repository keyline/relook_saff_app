import { StyleSheet } from "react-native";
import { Colors } from "../../Utils/Colors";
import { Font_Family } from "../../Utils/Fonts";

export const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        marginTop: '4%'
    },
    inputContent: {
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-between',
        borderBottomWidth: 1,
        paddingHorizontal: '1%',
        borderBottomColor: Colors.them_color
    },
    leftlogo: {
        width: 20,
        height: 20,
        tintColor: Colors.them_color
    },
    input: {
        fontFamily: Font_Family.NunitoSans_Regular,
        width: '80%',
        marginVertical: -2,
        color:Colors.black
    }
})