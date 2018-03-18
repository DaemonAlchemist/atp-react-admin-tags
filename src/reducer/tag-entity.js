
import {entityBoilerplate} from "atp-redux-entity";
import {switchOn} from 'atp-pointfree';

export const tagEntityType = 'tagEntity';

//Reducer
export default (state, action) => switchOn(action.type, {
    default: () => state
});

//Standard REST entity selectors and actions
export const TagEntity = () => entityBoilerplate(tagEntityType, 'tagEntity');
