const storageId = 'qoqxTMwk';

export const isLoggedIn = (localStorage.getItem(storageId) !== null);

export const fetchToken = () => {
    return (isLoggedIn ? JSON.parse(localStorage.getItem(storageId)).token : null);
}

export const fetchFirstName = () => {
    return (isLoggedIn ? JSON.parse(localStorage.getItem(storageId)).firstName : null);
}

export const registerAuth = ({ token, firstName = '' }) => {
    try {
        localStorage.setItem(storageId, JSON.stringify({ token, firstName }));
        return true;
    } catch (error) {
        return false;
    }
}
