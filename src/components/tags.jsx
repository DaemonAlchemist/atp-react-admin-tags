
import React from 'react';
import {Panel, Badge, Button} from 'react-bootstrap';
import {Icon} from 'react-font-awesome-5';
import {HasPermission} from "atp-uac";

export default ({entityTags, isEditing, showTagEditor, onKeyDown, hideTagEditor, deleteTag, onChange}) =>
    <Panel>
        <Panel.Heading>
            <Icon.Tags /> Tags
        </Panel.Heading>
        <Panel.Body>
            {entityTags.map(tag =>
                <Badge style={{marginRight: "8px"}}>
                    {tag &&
                        <span>
                            {tag.tag}&nbsp;
                            <Icon.Times onClick={deleteTag(tag.id)}/>
                        </span>
                    }
                </Badge>
            )}
            <HasPermission permissions={["tag.tag.create"]}>
                {isEditing
                    ? <span>
                        <input autoFocus onChange={onChange} onKeyDown={onKeyDown} />&nbsp;
                        <span className="text-danger"><Icon.Times onClick={hideTagEditor} /></span>
                      </span>
                    : <Button bsStyle="link" onClick={showTagEditor}>
                        <Icon.Plus /> Add tags
                      </Button>
                }
            </HasPermission>
        </Panel.Body>
    </Panel>;
