
import React from "react";
import {Icon} from "react-font-awesome-5";
import {Button} from "react-bootstrap";
import {identity} from 'atp-pointfree';

export default ({onChange, onKeyDown, allTags, tag, hideTagEditor, isEditing, showTagEditor, children, onSelectTag}) =>
    isEditing ? <span style={{position: "relative"}}>
        <input autoFocus onChange={onChange} onKeyDown={onKeyDown} />&nbsp;
        <div style={{position: "absolute", top: "calc(100% + 5px)", left: "0"}}>
            {allTags.map(tag =>
                <div
                    key={tag.id}
                    onClick={onSelectTag(tag.tag)}
                    style={{
                        color: "#000",
                        background: "#fff",
                        width: "100%",
                        padding: "4px",
                        border: "solid 1px",
                        borderTop: "none"
                    }}
                >
                    {tag.tag}
                </div>
            )}
        </div>
        <span className="text-danger"><Icon.Times onClick={hideTagEditor} /></span>
    </span>
    : <Button bsStyle="link" onClick={showTagEditor}>
        {React.Children.map(children, identity)}
    </Button>;