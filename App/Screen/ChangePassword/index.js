import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useContext, useState, useCallback } from 'react'
import { CommonStyle } from '../../Utils/CommonStyle'
import { styles } from './styles'
import { ImagePath } from '../../Utils/ImagePath'
import InputField from '../../Component/InputField'
import AuthContext from '../../Services/Context'
import SingleBottom from '../../Component/SingleBottom'
import { ToastError, ToastMessage } from '../../Services/CommonFunction'
import { KEY, SOURCE } from '../../Services/Constant'
import Apis from '../../Services/Apis'

const ChangePassword = ({ navigation }) => {

    const context = useContext(AuthContext);
    const { appData, accesstoken, isLogin, userProfile } = context.allData

    const [state, setState] = useState({
        loading: false,
        data: null,
        oldPassword: '',
        oldPasswordErr: '',
        oldPasswordVisible: false,
        password: '',
        passwordErr: '',
        passwordVisible: false,
        cnfPassword: '',
        cnfPasswordErr: '',
        cnfPasswordVisible: false
    })

    const onBack = useCallback(async () => {
        navigation.goBack();
    })

    const onChangeoldPassword = useCallback(async (val) => {
        setState(prev => ({
            ...prev,
            oldPassword: val,
            oldPasswordErr: ''
        }))
    }, [state.oldPassword])

    const onChangeoldPassvisible = useCallback(async () => {
        setState(prev => ({
            ...prev,
            oldPasswordVisible: !state.oldPasswordVisible
        }))
    }, [state.oldPasswordVisible])

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

    const onChangecnfPassword = useCallback(async (val) => {
        setState(prev => ({
            ...prev,
            cnfPassword: val,
            cnfPasswordErr: ''
        }))
    }, [state.cnfPassword])

    const onChangecnfPassvisible = useCallback(async () => {
        setState(prev => ({
            ...prev,
            cnfPasswordVisible: !state.cnfPasswordVisible
        }))
    }, [state.cnfPasswordVisible])

    const onSubmit = useCallback(async () => {
        if (state.oldPassword.trim() == '') {
            setState(prev => ({
                ...prev,
                oldPasswordErr: 'Enter Old Password'
            }))
            return
        } else if (state.password.trim() == '') {
            setState(prev => ({
                ...prev,
                passwordErr: 'Enter New Password'
            }))
            return
        } else if (state.cnfPassword.trim() == '') {
            setState(prev => ({
                ...prev,
                cnfPasswordErr: 'Enter Confirm Password'
            }))
            return
        } else if (state.password != state.cnfPassword) {
            ToastMessage('Password Mismatch');
            return
        } else {
            try {
                setState(prev => ({
                    ...prev,
                    loading: true
                }))
                let datas ={
                    key:KEY,
                    source:SOURCE,
                    old_password:state.oldPassword,
                    new_password:state.password,
                    confirm_password:state.cnfPassword
                }
                const response = await Apis.change_password(datas);
                if(__DEV__){
                    console.log('ChangePassword',JSON.stringify(response))
                }
                if(response.status){
                    navigation.goBack();
                }
                setState(prev =>({
                    ...prev,
                    loading:false
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
            <TouchableOpacity style={styles.backContainer} onPress={onBack} activeOpacity={0.5}>
                <Image source={ImagePath.back} style={[styles.backicon, { tintColor: appData?.color_theme }]} />
            </TouchableOpacity>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.content}>
                    <Text style={[CommonStyle.headingText, { marginBottom: '6%', textAlign: 'center', color: appData?.color_theme }]}>Change Password</Text>
                    <InputField
                        name={'Old Password'}
                        value={state.oldPassword}
                        onChangeText={onChangeoldPassword}
                        leftIcon={ImagePath.lock}
                        secureTextEntry={!state.oldPasswordVisible}
                        rightIcon={state.oldPasswordVisible ? ImagePath.eye_off : ImagePath.eye_on}
                        rightonPress={onChangeoldPassvisible}
                        error={state.oldPasswordErr}
                    />
                    <InputField
                        name={'New Password'}
                        value={state.password}
                        onChangeText={onChangePassword}
                        leftIcon={ImagePath.lock}
                        secureTextEntry={!state.passwordVisible}
                        rightIcon={state.passwordVisible ? ImagePath.eye_off : ImagePath.eye_on}
                        rightonPress={onChangePassvisible}
                        error={state.passwordErr}
                    />
                    <InputField
                        name={'Confirm Password'}
                        value={state.cnfPassword}
                        onChangeText={onChangecnfPassword}
                        leftIcon={ImagePath.lock}
                        secureTextEntry={!state.cnfPasswordVisible}
                        rightIcon={state.cnfPasswordVisible ? ImagePath.eye_off : ImagePath.eye_on}
                        rightonPress={onChangecnfPassvisible}
                        error={state.cnfPasswordErr}
                    />
                    <View style={styles.btnContainer}>
                        <SingleBottom
                            name={'Submit'}
                            loading={state.loading}
                            onPress={onSubmit}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ChangePassword