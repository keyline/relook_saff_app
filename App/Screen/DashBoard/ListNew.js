import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { styles } from './styles'
import { CommonStyle } from '../../Utils/CommonStyle'
import { Colors } from '../../Utils/Colors'
import AuthContext from '../../Services/Context'

const ListNew = ({ items, onUpdateStatus }) => {

    const context = useContext(AuthContext);
    const { appData, accesstoken, isLogin, userProfile } = context.allData

    const RenderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Text style={[CommonStyle.lightText, { color: Colors.black }]}>{item?.name}</Text>
            <Text style={[CommonStyle.lightText, { color: Colors.black }]}>{item?.item_count}</Text>
        </View>
    )

    const Footer = () => (
        <>
            {(items.status == "0") && (
                <View style={{ alignItems: 'center', marginVertical: '1%' }}>
                    <TouchableOpacity onPress={() => onUpdateStatus(items)} disabled={!onUpdateStatus} activeOpacity={0.5} style={[styles.btnContainer, { backgroundColor: appData?.color_accept_button }]}>
                        <Text style={[CommonStyle.boldtext, { color: Colors.highlight }]}>Accept</Text>
                    </TouchableOpacity>
                </View>
            )}
            {(items.status == "1") && (
                <View style={{ alignItems: 'center', marginVertical: '1%' }}>
                    <TouchableOpacity onPress={() => onUpdateStatus(items)} disabled={!onUpdateStatus} activeOpacity={0.5} style={[styles.btnContainer, { backgroundColor: appData?.color_complete_button }]}>
                        <Text style={[CommonStyle.boldtext, { color: Colors.highlight }]}>Mark Complete</Text>
                    </TouchableOpacity>
                </View>
            )}
        </>
    )

    return (
        <View style={items?.status == 0 ? styles.orlistContainer : styles.prlistContainer}>
            <View style={items?.status == 0 ? styles.orderHeader : styles.processHeader}>
                <Text style={[CommonStyle.boldtext, { color: items?.status == 0 ? Colors.black : Colors.white }]}>Room No : {items?.room_no}</Text>
                <Text style={[CommonStyle.boldtext, { color: items?.status == 0 ? Colors.black : Colors.white }]}>{items?.order_on}</Text>
            </View>
            <View>
                <FlatList
                    data={items?.item}
                    keyExtractor={(item, index) => index}
                    renderItem={({ item }) =>
                        <RenderItem item={item} />
                    }
                    // ItemSeparatorComponent={ItemSeperatorNew}
                    style={{ paddingVertical: '1%' }}
                    ListFooterComponent={Footer}
                />
            </View>
        </View>
    )
}

export default ListNew