import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useState, useCallback, useEffect, useContext } from 'react'
import { CommonStyle } from '../../Utils/CommonStyle'
import { styles } from './styles'
import { ImagePath } from '../../Utils/ImagePath'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import { Colors } from '../../Utils/Colors'
import SingleBottom from '../../Component/SingleBottom'
import AuthContext from '../../Services/Context'
import { ToastError, ToastMessage } from '../../Services/CommonFunction'
import Apis from '../../Services/Apis'
import { KEY, SOURCE } from '../../Services/Constant'
import LoaderNew from '../../Component/LoaderNew'

const OtpVerify = ({ navigation, route }) => {

    const context = useContext(AuthContext);
    const { appData, accesstoken, isLogin, userProfile } = context.allData
    const params = route?.params?.data;

    const [state, setState] = useState({
        loading: false,
        btnLoading: false,
        otp: '',
        otpErr: ''
    })
    const [timer, setTimer] = useState(60)


    useEffect(() => {
        const interval = setInterval(() => {
            if (timer > 0) {
                setTimer(lastTimerCount => {
                    lastTimerCount <= 1 && clearInterval(interval)
                    return lastTimerCount - 1
                })
            }
        }, 1000) //each count lasts for a second
        return () => clearInterval(interval)
    }, []);

    const onBack = useCallback(async () => {
        navigation.goBack();
    })

    const onChangeOtp = useCallback(async (val) => {
        setState(prev => ({
            ...prev,
            otp: val,
            otpErr: ''
        }))
    }, [state.otp])

    const onResendOtp = useCallback(async () => {
        try {
            setState(prev => ({
                ...prev,
                loading: true
            }))
            let datas = {
                key: KEY,
                source: SOURCE,
                email: params?.email
            }
            const response = await Apis.forgot_password(datas)
            if (__DEV__) {
                console.log('ResendOtp', JSON.stringify(response))
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
                console.log('error', error.message)
            }
            ToastError();
        }
    })

    const onSubmit = useCallback(async () => {
        if (state?.otp == '') {
            ToastMessage('Enter OTP');
            return
        } else if (state.otp.length < 6) {
            ToastMessage('Invalid OTP');
            return
        } else {
            try {
                setState(prev => ({
                    ...prev,
                    btnLoading: true
                }))
                let datas = {
                    key: KEY,
                    source: SOURCE,
                    id: params?.id,
                    otp: Number(state.otp)
                }
                const res = await Apis.otp_validate(datas)
                if (__DEV__) {
                    console.log('OTPValidate', JSON.stringify(res))
                }
                if (res.status) {
                    navigation.replace('ResetPassword', { data: params });
                }
                setState(prev => ({
                    ...prev,
                    btnLoading: false
                }))
                ToastMessage(res?.message);
            } catch (error) {
                setState(prev => ({
                    ...prev,
                    btnLoading: false
                }))
                if (__DEV__) {
                    console.log('error', error.message)
                }
                ToastError();
            }
        }
    })

    return (
        <SafeAreaView style={CommonStyle.container}>
            <TouchableOpacity style={styles.backContainer} onPress={onBack} activeOpacity={0.5}>
                <Image source={ImagePath.back} style={[styles.backicon, { tintColor: appData?.color_theme }]} />
            </TouchableOpacity>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.content}>
                    <View style={styles.logoContainer}>
                        <Image source={{ uri: appData?.site_logo }} style={styles.logo} />
                    </View>
                    <View style={styles.mainContent}>
                        <Text style={[CommonStyle.headingText, { marginBottom: '1%', textAlign: 'center', color: appData?.color_theme }]}>OTP</Text>
                        <Text style={styles.subtext}>Check Your Mobile/Email for OTP</Text>
                        <View style={{ flex: 1 }}>
                            <Text style={[CommonStyle.boldtext, { marginBottom: '4%', color: appData?.color_theme }]}>Enter OTP :</Text>
                            <OTPInputView
                                pinCount={6}
                                code={state.otp}
                                autoFocusOnLoad
                                onCodeChanged={code => onChangeOtp(code)}
                                style={styles.otp}
                                codeInputFieldStyle={[styles.underlineStyleBase, { borderColor: appData?.color_theme }]}
                                codeInputHighlightStyle={styles.underlineStyleHighLighted}
                                placeholderTextColor={Colors.black}
                            // onCodeFilled={(code) => onSubmitOtp(code)}
                            />
                        </View>
                        <View style={styles.resendContainer}>
                            {(timer > 0) ?
                                <Text style={styles.resendTimer}>Resend OTP in <Text style={{ color: appData?.color_theme }}>{timer} Sec</Text></Text>
                                :
                                <Text onPress={onResendOtp} style={[styles.resendText, { color: appData?.color_theme }]}>Resend OTP</Text>
                            }
                        </View>
                        <View style={styles.btnContainer}>
                            <SingleBottom
                                name={'Submit'}
                                loading={state.btnLoading}
                                onPress={onSubmit}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
            {(state.loading) && (
                <LoaderNew loading={state.loading} />
            )}
        </SafeAreaView>
    )
}

export default OtpVerify