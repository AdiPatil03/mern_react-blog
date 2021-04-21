const initialStore = {
    tags:      [],
    archives:  [],
    arcticles: []
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TAGS': {
            return {
                ...state,
                tags: action.item
            };
        }
        case 'ADD_ARCHIVES': {
            return {
                ...state,
                archives: action.item
            };
        }
        case 'ADD_ARTICLES': {
            return {
                ...state,
                arcticles: action.item
            };
        }
        default: {
            return state;
        }
    }
};

export {reducer, initialStore};
