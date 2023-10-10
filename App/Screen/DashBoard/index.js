import { View, Text, SafeAreaView, FlatList } from 'react-native'
import React, { useCallback, useContext } from 'react'
import Header from '../../Component/Header'
import { ImagePath } from '../../Utils/ImagePath'
import { CommonStyle } from '../../Utils/CommonStyle'
import List from './List'
import AuthContext from '../../Services/Context'


const list = [
    { id: 1, rm_no: '122', task: 'Clean Room', status: 'Pending', time: '10.12' },
    { id: 2, rm_no: '126', task: 'Extra Pillow X 2', status: 'Accepted', time: '12.12' },
    { id: 3, rm_no: '145', task: 'Extra Blanket X 1', status: 'Rejected', time: '18.12' },
    { id: 4, rm_no: '528', task: 'Extra Bedsheet X 2', status: 'Completed', time: '15.12' },
    { id: 5, rm_no: '428', task: 'Extra Pillow X 1', status: 'Pending', time: '22.12' },
    { id: 6, rm_no: '222', task: 'Clean Room', status: 'Accepted', time: '21.12' },

]

const DashBoard = ({ navigation }) => {

    const context = useContext(AuthContext);
    const { appData, accesstoken, isLogin, userProfile } = context.allData

    const onLeftMenu = useCallback(async () => {
        navigation.openDrawer();
    })

    const ItemSeperator = () => (
        <View style={{ marginVertical: '2%' }} />
    )

    return (
        <SafeAreaView style={CommonStyle.container}>
            <Header
                // leftIcon={ImagePath.menu}
                // leftonPress={onLeftMenu}
                rightIcon={ImagePath.bell}
            />
            <View style={{ flex: 1, marginVertical: '2%' }}>
                <Text style={[CommonStyle.headingText, { textAlign: 'center', color: appData?.color_theme }]}>Request List</Text>
                <View style={{ marginTop: '4%', paddingHorizontal: '4%' }}>
                    <FlatList
                        data={list}
                        keyExtractor={(item, index) => item.id}
                        renderItem={({ item }) =>
                            <List item={item} />
                        }
                        ItemSeparatorComponent={ItemSeperator}
                        showsVerticalScrollIndicator={false}
                        style={{ marginBottom: '15%', }}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default DashBoard