import React from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

import './MultiCommand.css'

function MultiCommand(props) {

    function textChanged(text) {
        var roverPos = text.target.id.replace('roverCommand', '');
        props.changeText(text.target.value, roverPos);
    }
    return (
        <>
            {props.rovers && props.rovers.map(function (control, index) {
                return (<Row key={index}>
                    <Col className="command_row">
                        <FloatingLabel
                            controlId={props.controlId + index}
                            label={`${props.label} for Rover - ${index + 1}`}
                            className={props.className}
                        >
                            <Form.Control
                                type={props.type}
                                placeholder={`${props.placeholder} for Rover - ${index + 1}`}
                                onChange={textChanged}
                                onPaste={(e) => e.preventDefault()}
                            />
                        </FloatingLabel>
                    </Col>
                </Row>);
            })}
            {props && props.rovers && props.rovers.length > 0 &&
                <Form.Text className="text-muted rover_command">
                    Please enter command for rover to move in the plateau.<br></br>
                    Example for commands below :<br></br>
                    L : Turn the rover 90 degree left.<br></br>
                    R : Turn the rover 90 degree right.<br></br>
                    M : Move the rover forward one grid point and maintain the same heading.
                </Form.Text>
            }
        </>
    );
}

export default MultiCommand;