import React from "react";
import Form from 'react-bootstrap/Form';

const FormText = (props) => {

    function textChanged(event) {
        props.callParent(event.target.value);
    }

    return (
        <Form>
            <Form.Group className="mb-3" controlId={props.controlId}>
                <Form.Label>{props.textLabel}</Form.Label>
                <Form.Control type="text" placeholder={props.placeholder} onChange={textChanged} />
                <Form.Text className="text-muted">
                    {props.supportText}
                </Form.Text>
            </Form.Group>
        </Form>
    )
}
export default FormText;