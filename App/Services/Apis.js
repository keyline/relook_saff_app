import { Network } from "./Network"


export default class Apis {

    static app_setting = (data) => {
        return Network('post', 'get-app-setting', data)
    }

    static sign_in = (data) => {
        return Network('post', 'signin', data)
    }

    static forgot_password = (data) => {
        return Network('post', 'forgot-password', data)
    }

    static otp_validate = (data) => {
        return Network('post', 'validate-otp', data)
    }

    static reset_password = (data) => {
        return Network('post', 'reset-password', data)
    }

    static sign_out = (data) => {
        return Network('post', 'signout', data)
    }

    static profile_get = (data) => {
        return Network('post', 'get-profile', data)
    }

    static change_password = (data) => {
        return Network('post', 'change-password', data)
    }

}