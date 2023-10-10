import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { styles } from './styles'
import ValueText from '../../Component/ValueText'
import { CommonStyle } from '../../Utils/CommonStyle'
import { Colors } from '../../Utils/Colors'
import AuthContext from '../../Services/Context'

const List = ({ item }) => {

    const context = useContext(AuthContext);
    const { appData, accesstoken, isLogin, userProfile } = context.allData

    return (
        <View style={styles.listContainer}>
            <ValueText name={'Room No'} value={item.rm_no} />
            <ValueText name={'Request'} value={item.task} />
            <ValueText name={'Time'} value={item.time} />
            <ValueText name={'Status'} value={item.status} />
            {(item.status == 'Pending') && (
                <>
                    <View style={styles.border} />
                    <View style={styles.btnContent}>
                        <TouchableOpacity activeOpacity={0.5} style={[styles.btnContainer,{backgroundColor:appData?.color_reject_button}]}>
                            <Text style={[CommonStyle.boldtext, { color: Colors.highlight }]}>Reject</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.5} style={[styles.btnContainer, { backgroundColor: appData?.color_transfer_button }]}>
                            <Text style={[CommonStyle.boldtext, { color: Colors.highlight }]}>Transfer</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.5} style={[styles.btnContainer, { backgroundColor: appData?.color_accept_button }]}>
                            <Text style={[CommonStyle.boldtext, { color: Colors.highlight }]}>Accept</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}
            {(item.status == 'Accepted') && (
                <>
                    <View style={styles.border} />
                    <View style={{ alignSelf: 'center' }}>
                        <TouchableOpacity activeOpacity={0.5} style={[styles.btnContainer, { backgroundColor: appData?.color_complete_button }]}>
                            <Text style={[CommonStyle.boldtext, { color: Colors.highlight }]}>Mark Complete</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}
        </View>
    )
}

export default List