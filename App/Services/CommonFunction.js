import Toast from 'react-native-simple-toast';


export const ToastMessage = (message) => {
    Toast.show(message, Toast.SHORT);
}

export const ToastError = () => {
    Toast.show('Something Went Wrong', Toast.SHORT);
}