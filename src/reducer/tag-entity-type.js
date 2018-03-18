
import {entityBoilerplate} from "atp-redux-entity";
import {switchOn} from 'atp-pointfree';

export const tagEntityTypeType = 'tagEntityType';

//Reducer
export default (state, action) => switchOn(action.type, {
    default: () => state
});

//Standard REST entity selectors and actions
export const TagEntityType = () => entityBoilerplate(tagEntityTypeType, 'tagEntityType');
