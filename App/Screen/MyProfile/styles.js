import {StyleSheet} from 'react-native'
import { Colors } from '../../Utils/Colors'


export const styles = StyleSheet.create({
    content: {
        flex:1,
        marginTop: '3%',
        marginBottom: '4%'
    },
    backicon: {
        width: 50,
        height: 50,
        tintColor: Colors.them_color,
    },
    logoContainer: {
        marginTop: '8%',
        marginBottom: '6%'
    },
    logo: {
        width: 100,
        height: 100,
        borderRadius: 50,
        alignSelf:'center'
    },
    mainContent: {
        paddingHorizontal: '6%',
        marginTop: '12%'
    },
    btnContainer: {
        marginTop: '4%'
    },
    separator: {
        height: 1,
        backgroundColor: 'gray',
    },
    menuContainer: {
        flex: 1,
        marginHorizontal: '4%',
        marginTop:'2%',
        marginBottom: '4%'
    },
    listcontent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: '4%',
        paddingHorizontal: '2%'
    },
    leftcontent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
        tintColor: Colors.grey
    },
    arrowicon: {
        width: 15,
        height: 15,
        resizeMode: 'contain',
        tintColor: Colors.grey
    },
    boldtxt: {
        fontWeight: 'bold',
        color: Colors.grey,
        marginLeft: 15,
        // fontSize:16
    },
    border: {
        width: '60%',
        alignSelf:'center',
        borderWidth: 0.5,
        borderColor: Colors.them_color,
        marginVertical: '5%'
    }
})