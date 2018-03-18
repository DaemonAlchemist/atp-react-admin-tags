
import {entityBoilerplate} from "atp-redux-entity";
import {switchOn} from 'atp-pointfree';

export const tagType = 'tagTag';

//Reducer
export default (state, action) => switchOn(action.type, {
    default: () => state
});

//Standard REST entity selectors and actions
export const Tag = () => entityBoilerplate(tagType, 'tag');
