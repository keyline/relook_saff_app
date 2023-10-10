import { StyleSheet, View, ActivityIndicator } from 'react-native'
import React, { useContext } from 'react'
import AuthContext from '../../Services/Context'

const LoaderNew = ({ loading }) => {

    const context = useContext(AuthContext)
    const appData = context.allData.appData

    return (
        <View style={styles.container}>
            <ActivityIndicator size={'large'} animating={loading} color={appData?.color_theme} />
        </View>
    )
}

export default LoaderNew

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'rgba(0,0,0,0.1)'
    }
})