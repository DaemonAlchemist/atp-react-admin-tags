
import {connectWithLifecycle} from 'react-lifecycle-component';
import TagSelector from "../components/selector";
import {Tag} from "../reducer/tag";
import {get} from "atp-pointfree";
import {toggle} from "atp-ui";
import keycode from 'keycode';
import {input} from "atp-ui";

const toggleId = id => `tagEditor:${id}`;

export default connectWithLifecycle(
    (state, {id}) => {
        const tag = input.value(get(state), toggleId(id)) || "";
        console.log(tag);
        console.log(Tag().select.all(get(state))
            .filter(curTag =>
                tag.length > 0 &&
                curTag.tag.toLocaleLowerCase().indexOf(tag.toLocaleLowerCase()) !== -1
            ));
        return {
            allTags: Tag().select.all(get(state))
                .filter(curTag =>
                    tag.length > 0 &&
                    curTag.tag.toLocaleLowerCase().indexOf(tag.toLocaleLowerCase()) !== -1
                ),
            isEditing: toggle.isVisible(get(state), toggleId(id)),
            tag: input.value(get(state), toggleId(id))
        }
    },
    (dispatch, {id, onAdd}) => ({
        componentDidMount: () => {
        },
        showTagEditor: () => {
            dispatch(toggle.show(toggleId(id)));
            dispatch(Tag().action.collection.get({}));
            dispatch(input.clear(toggleId(id)));
        },
        hideTagEditor: () => {
            dispatch(toggle.hide(toggleId(id)));
        },
        onKeyDown: function(e) {
            e.persist();
            setTimeout(() => {
                const tag = e.target.value || "";
                switch(keycode(e)) {
                    case 'esc':
                        dispatch(toggle.hide(toggleId(id)));
                        break;
                    case 'enter':
                        //TODO:  Add option to disallow new tags
                        dispatch(input.clear(toggleId(id)));
                        onAdd(tag);
                        break;
                    default:
                        dispatch(input.set(toggleId(id), tag));
                        break;
                }
            }, 10);
        },
        onSelectTag: tag => () => {
            dispatch(input.clear(toggleId(id)));
            dispatch(toggle.hide(toggleId(id)));
            setTimeout(() => {
                dispatch(toggle.show(toggleId(id)));
            }, 0);
            onAdd(tag);
        }
    })
)(TagSelector);
