import _ from 'lodash';

const initialStore = {
    tags:     [],
    archives: [],
    user:     '',
    banner:   {},
    page:     0
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
        case 'CLEAR_ARCHIVES': {
            return {
                ...state,
                archives: []
            };
        }
        case 'CLEAR_TAGS': {
            return {
                ...state,
                tags: []
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
        case 'NEW_PAGE': {
            return {
                ...state,
                page: state.page + 1
            };
        }
        case 'OLD_PAGE': {
            return {
                ...state,
                page: state.page - 1
            };
        }
        case 'RESET_PAGE': {
            return {
                ...state,
                page: 0
            };
        }
        default: {
            return state;
        }
    }
};

export default reducer;
