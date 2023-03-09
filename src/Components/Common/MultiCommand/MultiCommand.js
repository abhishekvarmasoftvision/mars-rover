import React, { useRef, useState, useMemo } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';

import './MultiCommand.css'

function MultiCommand(props) {

    const [show, setShow] = useState(false);
    const [providedCommand, setProvidedCommand] = useState('')
    const target = useRef(null);
    const allowedCommands = useMemo(() => {
        return ['L', 'R', 'M'];
    }, []);

    function textChanged(text) {
        var roverPos = text.target.id.replace('roverCommand', '');
        props.changeText(text.target.value, roverPos);

    }
    function handleEnter(event) {
        setProvidedCommand(event.key.toUpperCase());
        if (allowedCommands.indexOf(event.key.toUpperCase()) > -1) {
            setShow(false);
        }
        else {
            setShow(true);
        }
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
                                ref={target}
                                onKeyPress={handleEnter}
                                onPaste={(e) => e.preventDefault()}
                            />
                        </FloatingLabel>

                        <Overlay target={target.current} show={show} placement="bottom">
                            {(props) => (
                                <Tooltip id="overlay-example" {...props} html={true}>
                                    <br></br>
                                    Your provided <strong>'{providedCommand}'</strong> is not a valid command.<br></br>
                                    <br></br>
                                    Please enter command for rover to move in the plateau.<br></br>
                                    Example for commands below :<br></br>
                                    L : Turns the rover 90 degree left.<br></br>
                                    R : Turns the rover 90 degree right.<br></br>
                                    M : Moves the rover forward one grid point and maintain the same heading.
                                    <br></br>
                                </Tooltip>
                            )}
                        </Overlay>
                    </Col>
                </Row>);
            })}
            {props && props.rovers && props.rovers.length > 0 &&
                <Form.Text className="text-muted rover_command">
                    Please enter command for rover to move in the plateau.<br></br>
                    Example for commands below :<br></br>
                    L : Turns the rover 90 degree left.<br></br>
                    R : Turns the rover 90 degree right.<br></br>
                    M : Moves the rover forward one grid point and maintain the same heading.
                </Form.Text>
            }
        </>
    );
}

export default MultiCommand;