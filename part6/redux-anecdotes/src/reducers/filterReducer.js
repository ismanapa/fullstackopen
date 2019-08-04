const initialFilter = '';

const filterReducer = (state = initialFilter, action) => {
    switch(action.type) {
        case 'SET_FILTER':
            return action.data;
        default:
            return state;
    }
};

const setFilter = filter => {
    return {
        type: 'SET_FILTER',
        data: filter
    };
};

export default filterReducer;

export {
    setFilter
};