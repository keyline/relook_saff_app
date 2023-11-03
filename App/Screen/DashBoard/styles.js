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
        marginVertical: '1%',
        // paddingHorizontal: '6%',
        width: '40%',
        paddingVertical: '2%',
        borderRadius: 5,
        alignItems: 'center'
    },
    modalStyle: {
        margin: 0,
    },
    flex: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '2%'
    },
    orlistContainer: {
        backgroundColor: '#F6F7F6',
        borderWidth: 1,
        borderColor: '#C5CAC5',
        borderRadius: 5
    },
    prlistContainer: {
        backgroundColor: '#F9F8E8',
        borderWidth: 1,
        borderColor: '#cfad6f',
        borderRadius: 5
    },
    processHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#ff9400',
        paddingHorizontal: '2%',
        paddingVertical: '2%'
    },
    orderHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#C5CAC5',
        paddingHorizontal: '2%',
        paddingVertical: '2%'
    },
    itemContainer:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingHorizontal: '2%',
        paddingVertical: '1%',
        borderBottomWidth:0.5,
        borderColor:Colors.grey
    }
})