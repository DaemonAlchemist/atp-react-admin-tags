
import React from 'react';
import {Panel} from 'react-bootstrap';
import {Icon} from 'react-font-awesome-5';

export default props =>
    <Panel>
        <Panel.Heading>
            <Icon.Tags /> Tags
        </Panel.Heading>
        <Panel.Body>
            Tags go here.
        </Panel.Body>
    </Panel>;
