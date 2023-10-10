import { StyleSheet } from 'react-native';
import { Colors } from '../../Utils/Colors';
import { Font_Family } from '../../Utils/Fonts';


export const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.them_color,
        borderRadius: 30,
        alignSelf: 'center',
        paddingVertical: '4%',
        marginVertical: '4%',
    },
    btnText: {
        fontFamily: Font_Family.NunitoSans_ExtraBold,
        color: Colors.highlight,
        textAlign: 'center',
        fontSize: 18
    }
})