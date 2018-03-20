
import {connectWithLifecycle} from 'react-lifecycle-component';
import Tags from "../components/tags";
import {TagEntity} from "../reducer/tag-entity";
import {get} from 'atp-pointfree';
import {toggle} from 'atp-ui';
import keycode from 'keycode';

export default connectWithLifecycle(
    (state, {entityType, entityId}) => ({
        entityTags: TagEntity().select.byList(get(state), {entityType, entityId}),
        isEditing: toggle.isVisible(get(state), `tagEditor:${entityType}:${entityId}`)
    }),
    (dispatch, {entityType, entityId}) => {
        const id = `tagEditor:${entityType}:${entityId}`;
        return {
            componentDidMount: () => {
                dispatch(TagEntity().action.collection.get({entityType, entityId}));
            },
            componentWillReceiveProps: function(newProps) {
                if(newProps.entityType !== this.props.entityType || newProps.entityId !== this.props.entityId) {
                    dispatch(TagEntity().action.collection.get({entityType: newProps.entityType, entityId: newProps.entityId}));
                }
            },
            showTagEditor: () => {
                dispatch(toggle.show(id));
            },
            hideTagEditor: () => {
                dispatch(toggle.hide(id));
            },
            onKeyDown: function(e) {
                switch(keycode(e)) {
                    case 'esc':
                        dispatch(toggle.hide(id));
                        break;
                    case 'enter':
                        const tag = e.target.value;
                        e.target.value = "";
                        dispatch(TagEntity().action.create({entityType, entityId, tag}, () => {
                            dispatch(TagEntity().action.collection.get({entityType, entityId}));
                        }));
                        break;
                    default:
                        //Do nothing
                        break;
                }
            },
            onChange: function(e) {
                //TODO: show autocomplete options
            },
            deleteTag: id => () => {
                dispatch(TagEntity().action.delete(id, () => {
                    dispatch(TagEntity().action.collection.get({entityType, entityId}));
                }));
            }
        }
    }
)(Tags);