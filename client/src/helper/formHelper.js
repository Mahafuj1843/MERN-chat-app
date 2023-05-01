import toast from 'react-hot-toast';

let EmailRegx =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
let PassRegx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/
class FormHelper {

    IsEmpty(value) {
        return value.length === 0;
    }
    IsEmail(value) {
        return !EmailRegx.test(value);
    }
    IsPassword(value) {
        return !PassRegx.test(value);
    }
    ErrorToast(msg) {
        toast.error(msg);
    }
    SuccessToast(msg) {
        toast.success(msg);
    }
    getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    }
}

export const {
    IsEmpty,
    IsEmail,
    IsPassword,
    ErrorToast,
    getBase64,
    SuccessToast
} = new FormHelper();