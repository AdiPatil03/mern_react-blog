import _ from 'lodash';

const initialStore = {
    tags:     [],
    archives: [],
    user:     '',
    banner:   {}
};

const reducer = (state = initialStore, action) => {
    switch (action.type) {
        case 'ADD_ARCHIVES': {
            return {
                ...state,
                archives: _.uniq(state.archives.concat(action.item))
            };
        }
        case 'ADD_TAGS': {
            return {
                ...state,
                tags: _.uniq(state.tags.concat(action.item))
            };
        }
        case 'SET_USER': {
            return {
                ...state,
                user: action.item
            };
        }
        case 'SET_BANNER': {
            return {
                ...state,
                banner: action.item
            };
        }
        default: {
            return state;
        }
    }
};

export default reducer;
