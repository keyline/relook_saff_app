import { View, Text, SafeAreaView, FlatList, RefreshControl, AppState } from 'react-native'
import React, { useCallback, useContext, useState, useEffect, useRef } from 'react'
import Header from '../../Component/Header'
import { ImagePath } from '../../Utils/ImagePath'
import { CommonStyle } from '../../Utils/CommonStyle'
import AuthContext from '../../Services/Context'
import { useFocusEffect } from '@react-navigation/native'
import { ToastError, ToastMessage } from '../../Services/CommonFunction'
import LoaderNew from '../../Component/LoaderNew'
import { KEY, SOURCE } from '../../Services/Constant'
import Apis from '../../Services/Apis'
import { getUserData } from '../../Services/AsyncStorage'
import EmptyContent from '../../Component/EmptyContent'
import messaging from '@react-native-firebase/messaging';
import ListNew from './ListNew'

const DashBoard = ({ navigation }) => {

    const context = useContext(AuthContext);
    const { appData, accesstoken, isLogin, userProfile } = context.allData

    const [state, setState] = useState({
        loading: false,
        userID: '',
        data: [],
    })
    const appState = useRef(AppState.currentState);

    useEffect(() => {
        const subscription = AppState.addEventListener('change', nextAppState => {
            if (
                appState.current.match(/inactive|background/) &&
                nextAppState === 'active'
            ) {
                // console.log('App has come to the foreground!');
                onGetData();
            }
            appState.current = nextAppState;
        });

        return () => subscription.remove();
    }, []);

    useEffect(() => {
        const unsubscribes = messaging().onMessage(async remoteMessage => {
            if (__DEV__) {
                console.log('ForgroundMessagedash', JSON.stringify(remoteMessage));
            }
            onGetData(true);
        })
        return () => unsubscribes
    }, [])

    useFocusEffect(
        useCallback(() => {
            const unsubscribe = onGetData();
            return () => unsubscribe
        }, [navigation])
    )

    const onGetData = useCallback(async (loading = true) => {
        try {
            let userdata = await getUserData();
            // if (loading) {
            setState(prev => ({
                ...prev,
                // userID: userdata?.user_id,
                loading: true
            }))
            // }
            let datas = {
                key: KEY,
                source: SOURCE
            }
            const response = await Apis.order_list(datas)
            if (__DEV__) {
                console.log('ORDERLIST', JSON.stringify(response))
            }
            if (response.status) {
                let filterdata = response?.data.filter(obj => obj.status != '2')
                let filter2data = filterdata.filter(obj => obj?.staff_id == userdata?.user_id || obj?.staff_id == null)
                setState(prev => ({
                    ...prev,
                    data: filter2data,
                    loading: false
                }))
            } else {
                setState(prev => ({
                    ...prev,
                    data: [],
                    loading: false
                }))
                ToastMessage(response?.message);
            }
        } catch (error) {
            setState(prev => ({
                ...prev,
                loading: false
            }))
            if (__DEV__) {
                console.log(error)
            }
            ToastError();
        }
    })

    const onLeftMenu = useCallback(async () => {
        navigation.openDrawer();
    })

    const ItemSeperator = () => (
        <View style={{ marginVertical: '2%' }} />
    )

    const onUpdateStatus = useCallback(async (item) => {
        try {
            let userdata = await getUserData();
            setState(prev => ({
                ...prev,
                loading: true
            }))
            let datas = {
                key: KEY,
                source: SOURCE,
                order_id: item?.order_id,
                status: item?.status == "0" ? "1" : "2"
            }
            const res = await Apis.update_order_status(datas);
            if (__DEV__) {
                console.log('UpdateOrder', JSON.stringify(res))
            }
            if (res.status) {
                // let findIndex = state.data.findIndex(obj => obj?.ordered_item_id === item?.ordered_item_id)
                // if (findIndex !== -1) {
                //     if (item?.status == "0") {
                //         state.data[findIndex].status = "1"
                //         state.data[findIndex].staff_id = userdata?.user_id
                //     } else if (item?.status == "1") {
                //         state.data[findIndex].status = "2"
                //         state.data[findIndex].staff_id = userdata?.user_id
                //     }
                // }
                let updateArray = state.data.map(obj => {
                    if (obj.order_id === item.order_id) {
                        return { ...obj, status: item?.status == "0" ? "1" : "2", staff_id: userdata?.user_id }
                    }
                    return obj;
                });
                // console.log('updateArray', JSON.stringify(updateArray))
                setState(prev => ({
                    ...prev,
                    data: updateArray,
                    loading: false
                }))
            } else {
                if (res?.message == 'Order has been accepted by another staff member') {
                    onGetData();
                } else if (res?.message == 'Order has been completed by another staff member') {
                    onGetData();
                }
                setState(prev => ({
                    ...prev,
                    loading: false
                }))
            }
            ToastMessage(res?.message);
        } catch (error) {
            setState(prev => ({
                ...prev,
                loading: false
            }))
            if (__DEV__) {
                console.log(error)
            }
            ToastError();
        }
    })

    return (
        <SafeAreaView style={CommonStyle.container}>
            <Header
                // leftIcon={ImagePath.menu}
                // leftonPress={onLeftMenu}
                rightIcon={ImagePath.bell}
            />
            <View style={{ flex: 1, marginVertical: '2%' }}>
                <Text style={[CommonStyle.headingText, { textAlign: 'center', color: appData?.color_theme }]}>Request List</Text>
                <View style={{ flex: 1, marginTop: '4%', paddingHorizontal: '4%' }}>
                    <FlatList
                        data={state.data.filter(obj => obj?.status != "2")}
                        keyExtractor={(item, index) => item.order_id}
                        renderItem={({ item }) =>
                            // <List item={item} onUpdateStatus={onUpdateStatus} />
                            <ListNew items={item} onUpdateStatus={onUpdateStatus} />
                        }
                        ItemSeparatorComponent={ItemSeperator}
                        showsVerticalScrollIndicator={false}
                        style={{ marginBottom: '15%', flex: 1 }}
                        refreshControl={<RefreshControl refreshing={false} onRefresh={onGetData} />}
                        ListEmptyComponent={<EmptyContent word={'No Order Found'} />}
                    />
                </View>
            </View>
            {(state.loading) && (
                <LoaderNew loading={state.loading} />
            )}
        </SafeAreaView>
    )
}

export default DashBoard