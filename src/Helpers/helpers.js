import { stubString } from 'lodash';
import { PermissionsAndroid } from 'react-native';

export const requestPermission = async () => {
    try {
        const granted = await PermissionsAndroid.requestMultiple(
            [
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            ],
            {
                title: 'Permission',
                message: 'Storage access is required',
                buttonPositive: 'OK',
            },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            alert('You can use the package');
        } else {
            requestPermission();
        }
    } catch (err) {
        alert(err);
    }
};

export const formatTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = Math.ceil(time - minutes * 60);

    if(seconds < 10) seconds = `0${seconds}`;

    return `${minutes}:${seconds}`;
}

export const stubStringText = (val) => {
    let text;
    if(val.length > 23) {
        text = val.substring(0, 23) + '...';
    } else {
        text = val;
    }

    return `${text}`;
}