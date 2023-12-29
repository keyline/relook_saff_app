import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { memo, useCallback, useContext } from 'react'
import { styles } from './styles'
import { ImagePath } from '../../Utils/ImagePath'
import { useNavigation } from '@react-navigation/native'
import AuthContext from '../../Services/Context'

const Header = ({ leftIcon, leftonPress, rightIcon, rightonPress }) => {

    const navigation = useNavigation();

    const context = useContext(AuthContext);
    const { appData, accesstoken, isLogin, userProfile } = context.allData

    const onPressLogo = useCallback(async () => {
        navigation.navigate('DashBoard');
    })

    const onRightPress = useCallback(async () => {
        navigation.navigate('MyProfile');
    })

    const onNotiPress = useCallback(async () => {

    })

    return (
        <View style={[styles.container, { borderColor: appData?.color_theme }]}>
            <View style={styles.flex}>
                {(leftIcon) && (
                    <TouchableOpacity onPress={() => leftonPress()} disabled={!leftonPress} activeOpacity={0.5}>
                        <Image source={leftIcon} style={[styles.lefticon, { tintColor: appData?.color_theme }]} />
                    </TouchableOpacity>
                )}
                {/* <Text>{userProfile}</Text> */}
                <TouchableOpacity onPress={onPressLogo} activeOpacity={0.5}>
                    <Image source={{ uri: appData?.site_logo }} style={styles.logo} />
                </TouchableOpacity>
            </View>
            <View style={styles.flex}>
                {/* <TouchableOpacity onPress={onNotiPress} activeOpacity={0.5}>
                <Image source={ImagePath.bell} style={[styles.righticon, { tintColor: appData?.color_theme }]} />
                </TouchableOpacity> */}
                {(userProfile) && (
                    <View>
                        <Text style={[styles.nametext, { color: appData?.color_theme }]}>Hi, {userProfile?.name}</Text>
                        <Text style={[styles.desctext, { color: appData?.color_theme }]}>{userProfile?.hotel?.name}, {userProfile?.staff_type}</Text>
                    </View>
                )}
                <TouchableOpacity style={{ marginLeft: 15 }} onPress={onRightPress} activeOpacity={0.5}>
                    <Image source={ImagePath.user_round} style={[styles.righticon, { tintColor: appData?.color_theme }]} />
                </TouchableOpacity>
            </View>
            {/* {(rightIcon) && (
                <TouchableOpacity onPress={() => rightonPress()} disabled={!rightonPress} activeOpacity={0.5}>
                    <Image source={rightIcon} style={styles.righticon} />
                </TouchableOpacity>
            )} */}
        </View>
    )
}

export default memo(Header)