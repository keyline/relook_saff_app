import { View, Text } from 'react-native'
import React,{useContext} from 'react'
import { styles } from './styles'
import { CommonStyle } from '../../Utils/CommonStyle'
import AuthContext from '../../Services/Context'

const ValueText = ({ name, value }) => {

    const context = useContext(AuthContext);
    const { appData, accesstoken, isLogin, userProfile } = context.allData

    return (
        <View style={styles.flex}>
            <Text style={CommonStyle.boldtextgrey}>{name} :</Text>
            <Text style={[CommonStyle.boldtext,{color:appData?.color_theme}]}>{value}</Text>
        </View>
    )
}

export default ValueText