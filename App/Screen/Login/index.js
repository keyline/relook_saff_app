import { View, Text, SafeAreaView, ScrollView, Image } from 'react-native'
import React, { useCallback, useState, useContext } from 'react'
import { CommonStyle } from '../../Utils/CommonStyle'
import { styles } from './styles'
import { ImagePath } from '../../Utils/ImagePath'
import InputField from '../../Component/InputField'
import SingleBottom from '../../Component/SingleBottom'
import AuthContext from '../../Services/Context'
import { ToastError, ToastMessage } from '../../Services/CommonFunction'
import { KEY, SOURCE } from '../../Services/Constant'
import { getFcmPermission, getFcmToken } from '../../Services/DeviceToken'
import DeviceInfo from 'react-native-device-info'
import Apis from '../../Services/Apis'
import { setAccessToken, setUserData } from '../../Services/AsyncStorage'

const Login = ({ navigation }) => {

    const context = useContext(AuthContext);
    const { appData, accesstoken, isLogin, userProfile } = context.allData

    const [state, setState] = useState({
        loading: false,
        username: '',
        usernameErr: '',
        password: '',
        passwordErr: '',
        passwordVisible: false
    })

    const onChangeUsername = useCallback(async (val) => {
        setState(prev => ({
            ...prev,
            username: val,
            usernameErr: ''
        }))
    }, [state.username])

    const onChangePassword = useCallback(async (val) => {
        setState(prev => ({
            ...prev,
            password: val,
            passwordErr: ''
        }))
    }, [state.password])

    const onChangePassvisible = useCallback(async () => {
        setState(prev => ({
            ...prev,
            passwordVisible: !state.passwordVisible
        }))
    }, [state.passwordVisible])

    const onForgotpass = useCallback(async () => {
        navigation.navigate('ForgotPassword')
    })

    const onSignup = useCallback(async () => {
        navigation.navigate('SignUp')
    })

    const onSubmit = useCallback(async () => {
        if (state.username.trim() == '') {
            setState(prev => ({
                ...prev,
                usernameErr: 'Enter Username'
            }));
            return;
        } else if (state.password.trim() == '') {
            setState(prev => ({
                ...prev,
                passwordErr: 'Enter Password'
            }));
            return;
        } else {
            try {
                setState(prev => ({
                    ...prev,
                    loading: true
                }))
                let deviceId = DeviceInfo.getDeviceId();
                let permission = await getFcmPermission();
                let fcmToken = await getFcmToken();
                let datas = {
                    key: KEY,
                    source: SOURCE,
                    email: state.username,
                    password: state.password,
                    device_token: deviceId,
                    fcm_token: fcmToken
                }
                const response = await Apis.sign_in(datas)
                if (__DEV__) {
                    console.log('SignInResponse', JSON.stringify(response))
                }
                if (response?.status) {
                    await setUserData(response?.data);
                    await setAccessToken(response?.data?.app_access_token);
                    await context.onGetStoreData();
                }
                setState(prev => ({
                    ...prev,
                    loading: false
                }))
                ToastMessage(response?.message);
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

    return (
        <SafeAreaView style={CommonStyle.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.content}>
                    <View style={styles.logoContainer}>
                        <Image source={{ uri: appData?.site_logo }} style={styles.logo} />
                    </View>
                    <View style={styles.mainContent}>
                        <Text style={[CommonStyle.headingText, { marginBottom: '3%', textAlign: 'center', color: appData?.color_theme }]}>Login</Text>
                        <InputField
                            name={'Username'}
                            value={state.username}
                            onChangeText={onChangeUsername}
                            leftIcon={ImagePath.user}
                            error={state.usernameErr}
                        />
                        <InputField
                            name={'Password'}
                            value={state.password}
                            onChangeText={onChangePassword}
                            leftIcon={ImagePath.lock}
                            secureTextEntry={!state.passwordVisible}
                            rightIcon={state.passwordVisible ? ImagePath.eye_off : ImagePath.eye_on}
                            rightonPress={onChangePassvisible}
                            error={state.passwordErr}
                        />
                        <Text onPress={onForgotpass} style={[styles.forgottext, { color: appData?.color_theme }]}>Forgot Password?</Text>
                        <View style={styles.btnContainer}>
                            <SingleBottom
                                name={'Login'}
                                loading={state.loading}
                                onPress={onSubmit}
                            />
                        </View>
                        {/* <Text style={styles.signuptext}>Don't have account? <Text onPress={onSignup} style={CommonStyle.boldtext}>Sign up</Text></Text> */}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Login