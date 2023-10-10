import { StyleSheet } from "react-native";
import { Colors } from "../../Utils/Colors";
import { Font_Family } from "../../Utils/Fonts";

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
    subtext: {
        marginBottom: '10%',
        textAlign: 'center',
        fontFamily:Font_Family.NunitoSans_Black,
        // color: Colors.black
    },
    otp: {
        width: '95%',
        alignSelf: 'center',
        height: '40%',
    },
    underlineStyleBase: {
        width: 30,
        height: 45,
        borderWidth: 0,
        borderBottomWidth: 1.5,
        // borderColor: Colors.them_color,
        color: Colors.black,
    },
    underlineStyleHighLighted: {
        // borderColor: Colors.them_color,
    },
    resendContainer: {
        marginTop: '6%',
        marginBottom:'2%',
        alignSelf: 'flex-end'
    },
    resendText: {
        fontFamily: Font_Family.NunitoSans_Bold,
        color: Colors.them_color

    },
    resendTimer: {
        fontFamily: Font_Family.NunitoSans_Bold,
        color: Colors.black

    }
})