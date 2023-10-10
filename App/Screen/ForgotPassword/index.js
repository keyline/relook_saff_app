import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useCallback, useState, useContext } from 'react'
import { CommonStyle } from '../../Utils/CommonStyle'
import { styles } from './styles'
import { ImagePath } from '../../Utils/ImagePath'
import InputField from '../../Component/InputField'
import SingleBottom from '../../Component/SingleBottom'
import AuthContext from '../../Services/Context'
import { isValidEmail } from '../../Services/Valid'
import { ToastError, ToastMessage } from '../../Services/CommonFunction'
import { KEY, SOURCE } from '../../Services/Constant'
import Apis from '../../Services/Apis'

const ForgotPassword = ({ navigation }) => {

    const context = useContext(AuthContext);
    const { appData, accesstoken, isLogin, userProfile } = context.allData

    const [state, setState] = useState({
        loading: false,
        email: '',
        emailErr: ''
    })

    const onChangeemail = useCallback(async (val) => {
        setState(prev => ({
            ...prev,
            email: val,
            emailErr: ''
        }))
    }, [state.email])

    const onBack = useCallback(async () => {
        navigation.goBack();
    })

    const onSubmit = useCallback(async () => {
        if (state.email.trim() == '') {
            setState(prev => ({
                ...prev,
                emailErr: 'Enter Email'
            }))
        } else if (!isValidEmail(state.email)) {
            setState(prev => ({
                ...prev,
                emailErr: 'Enter Valid Email'
            }))
        } else {
            try {
                setState(prev => ({
                    ...prev,
                    loading: true
                }))
                let datas = {
                    key: KEY,
                    source: SOURCE,
                    email: state.email
                }
                const response = await Apis.forgot_password(datas)
                if (__DEV__) {
                    console.log('ForgotPassword', JSON.stringify(response))
                }
                if (response.status) {
                    navigation.navigate('OtpVerify', { data: response?.data })
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
        }
    })

    return (
        <SafeAreaView style={CommonStyle.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.content}>
                    <TouchableOpacity onPress={onBack} activeOpacity={0.5}>
                        <Image source={ImagePath.back} style={[styles.backicon, { tintColor: appData?.color_theme }]} />
                    </TouchableOpacity>
                    <View style={styles.logoContainer}>
                        <Image source={{uri:appData?.site_logo}} style={styles.logo} />
                    </View>
                    <View style={styles.mainContent}>
                        <Text style={[CommonStyle.headingText, { marginBottom: '3%', textAlign: 'center', color: appData?.color_theme }]}>Forgot Password</Text>
                        <InputField
                            name={'Email'}
                            value={state.email}
                            onChangeText={onChangeemail}
                            leftIcon={ImagePath.email}
                            keyboardType={'email-address'}
                            error={state.emailErr}
                        />
                        <View style={styles.btnContainer}>
                            <SingleBottom
                                name={'Submit'}
                                loading={state.loading}
                                onPress={onSubmit}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView >
    )
}

export default ForgotPassword