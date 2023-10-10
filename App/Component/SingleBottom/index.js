import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useContext } from 'react'
import { styles } from './styles'
import { Colors } from '../../Utils/Colors'
import AuthContext from '../../Services/Context'

const SingleBottom = ({ name, width, loading, onPress }) => {

    const context = useContext(AuthContext);
    const { appData, accesstoken, isLogin, userProfile } = context.allData

    return (
        <TouchableOpacity onPress={() => onPress()} disabled={(loading || !onPress)} activeOpacity={0.5} style={[styles.container, { width: width ? width : '80%', backgroundColor: appData?.color_button }]}>
            {(loading) ?
                <ActivityIndicator color={Colors.highlight} animating={loading} size={'small'} />
                :
                <Text style={styles.btnText}>{name}</Text>
            }
        </TouchableOpacity>
    )
}

export default SingleBottom