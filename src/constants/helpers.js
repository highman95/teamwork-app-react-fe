export const storageId = 'qoqxTMwk';

export const isLoggedIn = (localStorage.getItem(storageId) !== null);

export const fetchToken = () => (isLoggedIn ? JSON.parse(localStorage.getItem(storageId)).token : null);

export const fetchFirstName = () => (isLoggedIn ? JSON.parse(localStorage.getItem(storageId)).firstName : null);

export const registerAuth = ({ token, firstName = '' }) => {
    try {
        localStorage.setItem(storageId, JSON.stringify({ token, firstName }));
        return true;
    } catch (error) {
        return false;
    }
};

export const handleErrorResult = (error) => {
    const isJWTExpired = (['expired', 'invalid'].includes(error) && ['token', 'jwt'].includes(error.toLowerCase()));

    if (!isJWTExpired) {
        throw new Error(error);
    }

    signOut();
};

export const fetchBot = async (endPoints, options) => {
    const response = await fetch(endPoints, options);
    const result = await response.json();

    if (result.status === 'error') {
        handleErrorResult(result.error);
    }

    return result;
};

export const signOut = () => {
    localStorage.removeItem(storageId);
    window.location = '/';
};
