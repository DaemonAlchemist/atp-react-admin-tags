
import {connectWithLifecycle} from 'react-lifecycle-component';
import TagList from "../components/tags";
import {TagEntity} from "../reducer/tag-entity";
import {get} from 'atp-pointfree';

export default connectWithLifecycle(
    (state, {entityType, entityId}) => ({
        entityTags: TagEntity().select.byList(get(state), {entityType, entityId}),
        selectorId: `${entityType}:${entityId}`
    }),
    (dispatch, {entityType, entityId}) => ({
        componentDidMount: () => {
            dispatch(TagEntity().action.collection.get({entityType, entityId}));
        },
        componentWillReceiveProps: function(newProps) {
            if(newProps.entityType !== this.props.entityType || newProps.entityId !== this.props.entityId) {
                dispatch(TagEntity().action.collection.get({entityType: newProps.entityType, entityId: newProps.entityId}));
            }
        },
        onAddTag: tag => {
            dispatch(TagEntity().action.create({entityType, entityId, tag}, () => {
                dispatch(TagEntity().action.collection.get({entityType, entityId}));
            }));
        },
        onDeleteTag: id => () => {
            dispatch(TagEntity().action.delete(id, () => {
                dispatch(TagEntity().action.collection.get({entityType, entityId}));
            }));
        }
    })
)(TagList);