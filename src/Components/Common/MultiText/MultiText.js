import React, { useState, useMemo, useRef } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';

import './MultiText.css'


const MultiText = (props) => {
    const [totalControls, setTotalControl] = useState([])
    const [controlValue, setControlValue] = useState('')

    const [x_Axis, setX_Axis] = useState('')
    const [y_Axis, setY_Axis] = useState('')
    const [directn, setDirectn] = useState('')
    const [show, setShow] = useState(false);
    const [errorText, setErrorText] = useState('');
    const target = useRef(null);

    const directions = useMemo(() => {
        return ['N', 'S', 'E', 'W'];
    }, []);

    function buttonClick(event) {
        if (validateInitialPosition(controlValue)) {
            let cntrls = totalControls;
            cntrls.push({ roverPosition: controlValue })
            setTotalControl(cntrls);
            setControlValue('');
            setShow(false);
            props.buttonClick(controlValue, totalControls);
        }
    }

    function handleChange(event) {
        setControlValue(event.target.value);
        validateInitialPosition(event.target.value);
    }

    function validateInitialPosition(initialPosition) {
        let isValid = true;
        let displayError = true;
        setErrorText('');
        if (initialPosition !== '') {
            let rover_co_Ordinates = initialPosition.split(' ');
            if (rover_co_Ordinates.length > 0) {
                if (!isNaN(rover_co_Ordinates[0])) {
                    if (Number(rover_co_Ordinates[0].trim()) < props.xAxis) {
                        setX_Axis(rover_co_Ordinates[0].trim());
                    }
                    else {
                        setErrorText('Incorrect value for x-axis.')
                        setX_Axis('');
                        isValid = false;
                    }
                }
                else {
                    setErrorText('Incorrect value for x-axis.')
                    setX_Axis('');
                    isValid = false;
                }
            }
            else {
                isValid = false;
            }

            if (rover_co_Ordinates.length > 1) {
                if (!isNaN(rover_co_Ordinates[1])) {
                    if (Number(rover_co_Ordinates[1].trim()) < props.xAxis) {
                        setY_Axis(rover_co_Ordinates[1].trim());
                    }
                    else {
                        setErrorText('Incorrect value for y-axis.')
                        setY_Axis('');
                        isValid = false;
                    }
                }
                else {
                    setErrorText('Incorrect value for y-axis.')
                    setY_Axis('');
                    isValid = false;
                }
            }
            else {
                isValid = false;
            }

            if (rover_co_Ordinates.length > 2) {
                if (directions.indexOf(rover_co_Ordinates[2].toUpperCase()) > -1) {
                    setDirectn(rover_co_Ordinates[2].trim().toUpperCase());
                }
                else {
                    if (rover_co_Ordinates[2].trim().toUpperCase() !== '') {
                        setErrorText('Incorrect direction.')
                    }
                    setDirectn('');
                    isValid = false;
                }
            }
            else {
                isValid = false;
            }

            if (displayError) {
                setShow(true);
            }
        }
        else {
            setShow(true);
            setErrorText('No data provided.')
            isValid = false;
        }
        return isValid;
    }

    function handleEnter(event) {
        if (event.charCode === 13) {
            buttonClick(event);
        }
    }

    return (
        <>
            {console.log(props)}
            <InputGroup className="mb-3 input_control">
                <Form.Control
                    placeholder={props.placeholder}
                    aria-label={props.placeholder}
                    aria-describedby={props.controlId}
                    value={controlValue}
                    onChange={handleChange}
                    onKeyPress={handleEnter}
                    ref={target}
                />
                <Button variant="outline-secondary" id={props.controlId} onClick={buttonClick}>
                    {props.buttonText}
                </Button>
            </InputGroup>

            <Form.Text className="text-muted">
                {props.supportText}
            </Form.Text>

            <Overlay target={target.current} show={show} placement="bottom">
                {(props) => (
                    (errorText && errorText !== '') ?
                        <Tooltip id="overlay-example" {...props}>
                            <br></br>
                            {`${errorText}`}
                            <br></br>
                            <br></br>
                        </Tooltip>
                        :
                        <Tooltip id="overlay-example" {...props}>
                            Initial Position of Rover :<br></br>
                            <br></br>
                            X-Axis : {x_Axis}<br></br>
                            Y-Axis : {y_Axis}<br></br>
                            Direction : {directn}<br></br>
                        </Tooltip>
                )}
            </Overlay>

            {totalControls && totalControls.map(function (control, index) {
                return <div key={index}>
                    <Row>
                        <Col xl={5}>
                            <Form.Text className="text-muted">
                                <strong>Initial Position of Rover {index + 1} :</strong>
                            </Form.Text>
                        </Col>
                        <Col>
                            <Form.Text className="text-muted">
                                <strong>{control.roverPosition.toUpperCase()}</strong>
                            </Form.Text>
                        </Col>
                    </Row>
                </div>
            })}
        </>
    )
}
export default MultiText;