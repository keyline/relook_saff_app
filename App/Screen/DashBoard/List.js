import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { styles } from './styles'
import ValueText from '../../Component/ValueText'
import { CommonStyle } from '../../Utils/CommonStyle'
import { Colors } from '../../Utils/Colors'
import AuthContext from '../../Services/Context'

const List = ({ item, onUpdateStatus }) => {

    const context = useContext(AuthContext);
    const { appData, accesstoken, isLogin, userProfile } = context.allData

    const onCheckStatus = (status) => {
        if (status == "0") {
            return 'Ordered'
        } else if (status == "1") {
            return 'Processing'
        } else if (status == "2") {
            return 'Delivered'
        } else {
            return ''
        }
    }

    return (
        <View style={styles.listContainer}>
            <ValueText name={'Room No'} value={item?.room_no} />
            <ValueText name={'Request'} value={item?.name} />
            <ValueText name={'Quantity'} value={item?.item_count} />
            <ValueText name={'Date'} value={item?.order_date} />
            <ValueText name={'Time'} value={item?.order_on} />
            <View style={styles.flex}>
                <Text style={CommonStyle.boldtextgrey}>Status :</Text>
                {(item?.status == "0") && (
                    <Text style={[CommonStyle.boldtext, { color: Colors.grey }]}>{onCheckStatus(item.status)}</Text>
                )}
                {(item?.status == "1") && (
                    <Text style={[CommonStyle.boldtext, { color: '#ff9400' }]}>{onCheckStatus(item.status)}</Text>
                )}
                {(item?.status == "2") && (
                    <Text style={[CommonStyle.boldtext, { color: '#01a10d' }]}>{onCheckStatus(item.status)}</Text>
                )}
            </View>
            {(item.status == "0") && (
                <>
                    <View style={styles.border} />
                    {/* <View style={styles.btnContent}>
                        <TouchableOpacity activeOpacity={0.5} style={[styles.btnContainer,{backgroundColor:appData?.color_reject_button}]}>
                            <Text style={[CommonStyle.boldtext, { color: Colors.highlight }]}>Reject</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.5} style={[styles.btnContainer, { backgroundColor: appData?.color_transfer_button }]}>
                            <Text style={[CommonStyle.boldtext, { color: Colors.highlight }]}>Transfer</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.5} style={[styles.btnContainer, { backgroundColor: appData?.color_accept_button }]}>
                            <Text style={[CommonStyle.boldtext, { color: Colors.highlight }]}>Accept</Text>
                        </TouchableOpacity>
                    </View> */}
                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => onUpdateStatus(item)} disabled={!onUpdateStatus} activeOpacity={0.5} style={[styles.btnContainer, { backgroundColor: appData?.color_accept_button }]}>
                            <Text style={[CommonStyle.boldtext, { color: Colors.highlight }]}>Accept</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}
            {(item.status == "1") && (
                <>
                    <View style={styles.border} />
                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => onUpdateStatus(item)} disabled={!onUpdateStatus} activeOpacity={0.5} style={[styles.btnContainer, { backgroundColor: appData?.color_complete_button }]}>
                            <Text style={[CommonStyle.boldtext, { color: Colors.highlight }]}>Mark Complete</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}
        </View>
    )
}

export default List