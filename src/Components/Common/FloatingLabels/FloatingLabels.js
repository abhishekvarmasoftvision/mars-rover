import React, { useEffect, useRef, useState } from "react";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';

function FloatingControl(props) {
    const target = useRef(null);
    const [errorText, setErrorText] = useState('');
    const [xAxis, setXAxis] = useState('');
    const [yAxis, setYAxis] = useState('');
    function textChanged(text) {
        props.changeText(text.target.value);
    }

    useEffect(() => {
        if (props) {
            setErrorText(props.errorText);
            setXAxis(props.xAxis);
            setYAxis(props.yAxis);
        }
    }, [props])

    return (
        <>
            <FloatingLabel
                controlId={props.controlId}
                label={props.label}
                className={props.className}
            >
                <Form.Control type={props.type} placeholder={props.placeholder} onChange={textChanged} ref={target} />
                {props && props.mutedText &&
                    <Form.Text className="text-muted">
                        {props.mutedText}
                    </Form.Text>
                }
            </FloatingLabel>
            <Overlay target={target.current} show={props.show} placement="bottom" >
                {(props) => (
                    (errorText && errorText !== '') ?
                        <Tooltip id="plateau_overlay" {...props}>
                            <br></br>
                            {`${errorText}`}
                            <br></br>
                            <br></br>
                        </Tooltip>
                        :
                        <Tooltip id="overlay-example" {...props}>
                            Plateau Size :<br></br>
                            <br></br>
                            X-Axis : {(xAxis) ? xAxis.length : 0}<br></br>
                            Y-Axis : {(yAxis) ? yAxis.length : 0}<br></br>
                        </Tooltip>
                )}
            </Overlay>
        </>
    );
}

export default FloatingControl;