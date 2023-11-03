import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import AuthContext from '../../Services/Context';
import Modal from 'react-native-modal'
import { styles } from './styles';

const TransferList = ({ data, isVisible, onModalHide }) => {

    const context = useContext(AuthContext);
    const { appData, accesstoken, isLogin, userProfile } = context.allData

    return (
        <Modal
            isVisible={isVisible}
            animationInTiming={800}
            animationOutTiming={800}
            coverScreen={false}

            style={styles.modalStyle}
            onBackdropPress={() => onModalHide()}
            onBackButtonPress={() => onModalHide()}
        >

        </Modal>
    )
}

export default TransferList