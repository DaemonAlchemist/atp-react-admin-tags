
import {connectWithLifecycle} from 'react-lifecycle-component';
import TagSelector from "../components/selector";
import {Tag} from "../reducer/tag";
import {get} from "atp-pointfree";
import {toggle, counter, input} from "basic-reducers";
import keycode from 'keycode';

const toggleId = id => `tagEditor:${id}`;
const tagsToShow = 10;

export default connectWithLifecycle(
    (state, {id}) => {
        const tag = input.value(get(state), toggleId(id)) || "";
        const allTags = Tag().select.all(get(state))
            .filter(curTag =>
                tag.length > 0 &&
                curTag.tag.toLocaleLowerCase().indexOf(tag.toLocaleLowerCase()) !== -1
            ).slice(0, tagsToShow);
        const selectedTagIndex = counter.value(get(state), toggleId(id));

        return {
            allTags,
            isEditing: toggle.isVisible(get(state), toggleId(id)),
            tag: input.value(get(state), toggleId(id)),
            selectedTagIndex,
            selectedTag: selectedTagIndex > 0 && selectedTagIndex <= allTags.length
                ? allTags[selectedTagIndex - 1].tag
                : ""
        }
    },
    (dispatch, {id, onAdd}) => ({
        componentDidMount: () => {
        },
        showTagEditor: () => {
            dispatch(toggle.show(toggleId(id)));
            dispatch(Tag().action.collection.get({}));
            dispatch(input.clear(toggleId(id)));
            dispatch(counter.reset(toggleId(id)));
        },
        hideTagEditor: () => {
            dispatch(toggle.hide(toggleId(id)));
        },
        onKeyDown: (selectedTag, maxCount) => function(e) {
            e.persist();
            setTimeout(() => {
                console.log("selected tag: " + selectedTag);
                const tag = selectedTag || e.target.value || "";
                switch(keycode(e)) {
                    case 'esc':
                        dispatch(toggle.hide(toggleId(id)));
                        break;
                    case 'enter':
                        //TODO:  Add option to disallow new tags
                        dispatch(input.clear(toggleId(id)));
                        dispatch(toggle.hide(toggleId(id)));
                        dispatch(counter.reset(toggleId(id)));
                        setTimeout(() => {
                            dispatch(toggle.show(toggleId(id)));
                        }, 0);
                        onAdd(tag);
                        break;
                    case 'down':
                        dispatch(counter.increment(toggleId(id), maxCount));
                        break;
                    case 'up':
                        dispatch(counter.decrement(toggleId(id), 0))
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
            dispatch(counter.reset(toggleId(id)));
            setTimeout(() => {
                dispatch(toggle.show(toggleId(id)));
            }, 0);
            onAdd(tag);
        }
    })
)(TagSelector);
