import { StyleSheet } from "react-native";
import { Colors } from "./Colors";
import { Font_Family } from "./Fonts";

export const CommonStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.highlight
    },
    boldtext: {
        fontFamily: Font_Family.NunitoSans_Bold,
        color: Colors.them_color
    },
    boldtextgrey: {
        fontFamily: Font_Family.NunitoSans_Bold,
        color: Colors.textColor
    },
    headingText: {
        fontFamily: Font_Family.NunitoSans_Bold,
        color: Colors.them_color,
        fontSize: 20,
        // fontWeight:'bold'
    },
    errortxt: {
        color: 'red',
        fontFamily: Font_Family.NunitoSans_Italic,
        paddingLeft: 4
    }

})