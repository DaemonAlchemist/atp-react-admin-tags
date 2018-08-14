
import React from "react";
import {Icon} from "react-font-awesome-5";
import {Button, ListGroup, ListGroupItem} from "react-bootstrap";
import {identity} from 'atp-pointfree';

export default ({onChange, onKeyDown, allTags, tag, selectedTagIndex, selectedTag, hideTagEditor, isEditing, showTagEditor, children, onSelectTag}) =>
    isEditing ? <span style={{position: "relative"}}>
        <input autoFocus onChange={onChange} onKeyDown={onKeyDown(selectedTag, allTags.length)} />&nbsp;
        <div style={{position: "absolute", top: "calc(100% + 5px)", left: "0"}}>
            <ListGroup>
                {allTags.map((tag, index) =>
                    <ListGroupItem
                        key={tag.id}
                        onClick={onSelectTag(tag.tag)}
                        style={{
                            width: "100%",
                        }}
                        className={index+1 === selectedTagIndex ? "active" : ""}
                    >
                        {tag.tag}
                    </ListGroupItem>
                )}
            </ListGroup>
        </div>
        <span className="text-danger"><Icon.Times onClick={hideTagEditor} /></span>
    </span>
    : <Button bsStyle="link" onClick={showTagEditor}>
        {React.Children.map(children, identity)}
    </Button>;