
import {connectWithLifecycle} from 'react-lifecycle-component';
import Tags from "../components/tags";
import {Tag} from '../reducer/tag';
import {TagEntity} from "../reducer/tag-entity";
import {TagEntityType} from "../reducer/tag-entity-type";
import {get} from 'atp-pointfree';

export default connectWithLifecycle(
    (state, {entityType, entityId}) => ({
        tags: TagEntity().select.byList(get(state), {entityType, entityId})
    }),
    (dispatch, {entityType, entityId}) => ({
        componentDidMount: () => {
            dispatch(TagEntity().action.collection.get({entityType, entityId}));
        }
    })
)(Tags);