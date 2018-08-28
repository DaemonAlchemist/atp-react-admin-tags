
import React from 'react';
import {Panel, Badge, Button} from 'react-bootstrap';
import {Icon} from 'react-font-awesome-5';
import {HasPermission} from "atp-uac";
import TagSelector from "../containers/selector";

export default ({entityTags, selectorId, onDeleteTag, onAddTag}) =>
    <Panel>
        <Panel.Heading>
            <Icon.Tags /> Tags
        </Panel.Heading>
        <Panel.Body>
            {entityTags.map(tag =>
                <Badge key={tag.id} style={{marginRight: "8px"}}>
                    {tag &&
                        <span>
                            {tag.tag}&nbsp;
                            <Icon.Times onClick={onDeleteTag(tag.id)}/>
                        </span>
                    }
                </Badge>
            )}
            <HasPermission permissions={["tag.tag.create"]}>
                <TagSelector id={selectorId} onAdd={onAddTag}>
                    <Icon.Plus /> Add tags
                </TagSelector>
            </HasPermission>
        </Panel.Body>
    </Panel>;
