import { View, Text, SafeAreaView, TouchableOpacity, Image, FlatList, Alert } from 'react-native'
import React, { useContext, useCallback, useState } from 'react'
import { ImagePath } from '../../Utils/ImagePath'
import { styles } from './styles'
import { CommonStyle } from '../../Utils/CommonStyle'
import AuthContext from '../../Services/Context'
import { KEY, SOURCE } from '../../Services/Constant'
import Apis from '../../Services/Apis'
import { ToastError, ToastMessage } from '../../Services/CommonFunction'
import { useFocusEffect } from '@react-navigation/native'
import { getStoreFcmToken } from '../../Services/AsyncStorage'
import LoaderNew from '../../Component/LoaderNew'

const MyProfile = ({ navigation }) => {

    const context = useContext(AuthContext);
    const { appData, accesstoken, isLogin, userProfile } = context.allData

    const [state, setState] = useState({
        loading: false,
        data: null
    })

    const onBack = useCallback(async () => {
        navigation.goBack();
    })

    useFocusEffect(
        useCallback(() => {
            const unsubscribe = onGetData();
            return () => unsubscribe
        }, [navigation, context])
    )

    const onGetData = useCallback(async () => {
        if (userProfile) {
            setState(prev => ({
                ...prev,
                data: userProfile,
                loading: false
            }));
        } else {
            try {
                setState(prev => ({
                    ...prev,
                    loading: false
                }))
                let datas = {
                    key: KEY,
                    source: SOURCE
                }
                const response = await Apis.profile_get(datas);
                if (__DEV__) {
                    console.log('MyProfile', JSON.stringify(response))
                }
                if (response.status) {
                    setState(prev => ({
                        ...prev,
                        data: response?.data,
                        loading: false
                    }))
                } else {
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
        }
    })

    const menuList = [
        // { id: 2, name: 'Notification', screen: 'Notification', logo: ImagePath.bell },
        { id: 3, name: 'Change Password', screen: 'ChangePassword', logo: ImagePath.lock },
        { id: 4, name: 'Sign Out', screen: 'SignOut', logo: ImagePath.logout },
    ]

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => onMenuPress(item)} activeOpacity={0.5} style={styles.listcontent}>
            <View style={styles.leftcontent}>
                <Image source={item.logo} style={styles.icon} />
                <Text style={styles.boldtxt}>{item.name}</Text>
            </View>
            <Image source={ImagePath.right_arrow} style={styles.arrowicon} />
        </TouchableOpacity>
    )

    const itemSeparator = () => (
        <View style={styles.separator} />
    )

    const onMenuPress = useCallback(async (item) => {
        if (item.screen && item.screen == 'SignOut') {
            SignOutAlert();
        } else if (item.screen && item.screen == 'Notification') {
            ToastMessage('Coming Soon')
        } else if (item.screen) {
            navigation.navigate(item.screen)
        }
    })

    const SignOutAlert = useCallback(async () => {
        Alert.alert(
            'Sign Out',
            'Are you Really Want to Sign Out?',
            [
                {
                    text: 'Yes',
                    onPress: () => onSignOut()
                },
                {
                    text: 'No',
                    onPress: () => null
                }
            ],
            { cancelable: true }
        )
    })

    const onSignOut = useCallback(async () => {
        try {
            setState(prev => ({
                ...prev,
                loading: true
            }))
            let fcmtoken = await getStoreFcmToken();
            let datas = {
                key: KEY,
                source: SOURCE,
                fcm_token: fcmtoken ? fcmtoken : ""
            }
            const signOut = await Apis.sign_out(datas);
            if (__DEV__) {
                console.log('SignOutResponse', JSON.stringify(signOut))
            }
            if (signOut.status) {
                await context.onClearStoreData();
            }
            setState(prev => ({
                ...prev,
                loading: false
            }))
            ToastMessage(signOut?.message)
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
            {/* <ScrollView showsVerticalScrollIndicator={false}> */}
            <View style={styles.content}>
                <TouchableOpacity onPress={onBack} activeOpacity={0.5}>
                    <Image source={ImagePath.back} style={[styles.backicon, { tintColor: appData?.color_theme }]} />
                </TouchableOpacity>
                {(state.data) && (
                    <View style={{ marginTop: '4%', flex: 1 }}>
                        <Text style={[CommonStyle.headingText, { marginBottom: '3%', textAlign: 'center', color: appData?.color_theme }]}>My Profile</Text>
                        <Image source={state.data?.image ? { uri: state.data?.image } : ImagePath.user} style={styles.logo} />
                        <Text style={[CommonStyle.boldtext, { marginVertical: '3%', textAlign: 'center', color: appData?.color_theme }]}>{state.data?.name}</Text>
                        <View style={[styles.border, { borderColor: appData?.color_theme }]} />
                        <View style={styles.menuContainer}>
                            <FlatList
                                data={menuList}
                                keyExtractor={(item, index) => item.id}
                                renderItem={renderItem}
                                ItemSeparatorComponent={itemSeparator}
                                showsVerticalScrollIndicator={false}
                            />
                        </View>
                    </View>
                )}
            </View>
            {/* </ScrollView> */}
            {(state.loading) && (
                <LoaderNew loading={state.loading} />
            )}
        </SafeAreaView>
    )
}

export default MyProfile