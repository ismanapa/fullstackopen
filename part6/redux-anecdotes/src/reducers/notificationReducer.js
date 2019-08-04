const initialNotification = '';

const notificationReducer = (state = initialNotification, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.data;
        case 'RESET_NOTIFICATION':
            return initialNotification;
        default:
            return state;
    }
};

const setNotification = notification => {
    return {
        type: 'SET_NOTIFICATION',
        data: notification
    }
};

const resetNotification = notification => {
    return {
        type: 'RESET_NOTIFICATION',
    }
};

export default notificationReducer;

export {
    setNotification,
    resetNotification
};