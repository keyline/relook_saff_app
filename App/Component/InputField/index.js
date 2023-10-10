import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { memo, useContext } from 'react'
import { styles } from './styles'
import { Colors } from '../../Utils/Colors'
import { CommonStyle } from '../../Utils/CommonStyle'
import AuthContext from '../../Services/Context'

const InputField = ({ name, headingColor, width, value, keyboardType, secureTextEntry, multiline, onChangeText, editable, leftIcon, rightIcon, rightonPress, placeholder, error }) => {

    const context = useContext(AuthContext);
    const { appData, accesstoken, isLogin, userProfile } = context.allData

    return (
        <View style={[styles.container, { width: width ? width : '100%' }]}>
            {(name) && (
                <Text style={[CommonStyle.boldtext, { color: headingColor ? headingColor : appData?.color_theme }]}>{name} :</Text>
            )}
            <View style={[styles.inputContent, { borderBottomColor: appData?.color_theme }]}>
                {(leftIcon) && (
                    <Image source={leftIcon} style={[styles.leftlogo, { marginRight: '2%', tintColor: appData?.color_theme }]} />
                )}
                <TextInput
                    value={value}
                    onChangeText={(e) => onChangeText(e)}
                    placeholder={placeholder ? placeholder : `Enter ${name}`}
                    editable={editable}
                    multiline={multiline ? multiline : false}
                    secureTextEntry={secureTextEntry ? secureTextEntry : false}
                    keyboardType={keyboardType ? keyboardType : 'default'}
                    style={styles.input}
                    placeholderTextColor={'grey'}
                />
                {(rightIcon) && (
                    <TouchableOpacity onPress={() => rightonPress()} disabled={rightonPress ? false : true} activeOpacity={0.5} style={{ alignItems: 'center' }}>
                        <Image source={rightIcon} style={[styles.leftlogo, { tintColor: appData?.color_theme }]} />
                    </TouchableOpacity>
                )}
            </View>
            {(error) && (
                <Text style={CommonStyle.errortxt}>{error}</Text>
            )}
        </View>
    )
}

export default memo(InputField)