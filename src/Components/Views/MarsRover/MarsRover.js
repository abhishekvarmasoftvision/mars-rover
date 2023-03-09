import React, { useState, useEffect, useMemo } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FloatingControl from '../../Common/FloatingLabels/FloatingLabels'
import MultiText from '../../Common/MultiText/MultiText'
import Plateau from '../../Common/Plateau/Plateau'
import MultiCommand from "../../Common/MultiCommand/MultiCommand";
import Form from 'react-bootstrap/Form';

import './MarsRover.css'

const MarsRover = () => {

    const [xAxis, setXAxis] = useState([]);
    const [yAxis, setYAxis] = useState([]);
    const [rovers, setRovers] = useState([]);
    const [roverCount, setRoverCount] = useState([]);
    const [show, setShow] = useState(false);
    const [errorText, setErrorText] = useState('');

    const directions = useMemo(() => {
        return ['N', 'S', 'E', 'W'];
    }, []);


    function drawPlateau(value) {
        let co_Ordinates = value.split(' ');
        fillXAxis(co_Ordinates)
        fillYAxis(co_Ordinates)
    }

    function buttonClick(controlValue, totalControl) {
        let roverPos = rovers;
        if (totalControl) {
            const control = totalControl[totalControl.length - 1];
            if (control) {
                let rover_co_Ordinates = control.roverPosition.split(' ');

                if (rover_co_Ordinates.length === 3) {
                    if (!isNaN(rover_co_Ordinates[0]) && !isNaN(rover_co_Ordinates[1]) && directions.indexOf(rover_co_Ordinates[2].toUpperCase()) > -1) {
                        roverPos.push({
                            roverXAxis: Number(rover_co_Ordinates[0].trim()),
                            roverYAxis: Number(rover_co_Ordinates[1].trim()),
                            roverDirection: rover_co_Ordinates[2].trim().toUpperCase()
                        });
                    }
                }
            }

            setRovers(roverPos);
            setRoverCount(roverPos.length);
        }
    }

    function fillXAxis(xAxisUpperBoundValue) {
        setShow(true);
        setErrorText('')
        if (xAxisUpperBoundValue.length > 0) {
            if (!isNaN(xAxisUpperBoundValue[0].trim()) && Number(xAxisUpperBoundValue[0].trim() > 0)) {
                let xAxisUpperBound = Number(xAxisUpperBoundValue[0].trim()) - 1;
                let xAxisArr = []
                while (xAxisUpperBound >= 0) {
                    xAxisArr.push(xAxisUpperBound);
                    xAxisUpperBound = xAxisUpperBound - 1;
                }
                setXAxis(xAxisArr);
            }
            else {
                if (xAxisUpperBoundValue[0].trim() !== '') {
                    setErrorText("Incorrect X-Axis value provided.")
                    setXAxis(-1);
                }
                else {
                    setXAxis(-1);
                }
            }
        }
        else {
            setXAxis(-1);
            setShow(false);
        }
    }

    function fillYAxis(yAxisUpperBoundValue) {
        if (yAxisUpperBoundValue.length > 1) {
            if (!isNaN(yAxisUpperBoundValue[1].trim()) && Number(yAxisUpperBoundValue[1].trim() > 0)) {
                let yAxisUpperBound = Number(yAxisUpperBoundValue[1].trim()) - 1;
                let yAxisArr = []
                let initialCounter = 0;
                while (initialCounter <= yAxisUpperBound) {
                    yAxisArr.push(initialCounter);
                    initialCounter = initialCounter + 1;
                }
                setYAxis(yAxisArr);
                setShow(false);
            }
            else {
                if (yAxisUpperBoundValue[1].trim() !== '') {
                    setErrorText("Incorrect Y-Axis value provided.")
                    setYAxis(-1);
                    setShow(true);
                }
                else {
                    setYAxis(-1);
                    setShow(true);
                }
            }
        }
        else {
            setYAxis(-1);
            setShow(true);
        }
    }

    useEffect(() => {
        if (rovers && roverCount > 0) {
            rovers.map(function (rover, index) {
                if (rover.roverXAxis >= 0 && rover.roverYAxis >= 0 && directions.indexOf(rover.roverDirection) > -1) {
                    const tbl = Array.from(document.getElementsByClassName("tbl_plataeu"));
                    let tbody = tbl[0].getElementsByTagName('tbody');
                    if (tbl && tbl.length > 0) {
                        if (tbody && tbody.length > 0) {
                            Array.prototype.forEach.call(tbody[0].getElementsByTagName('td'), function (previousRover, previousRoverIndex) {
                                if (previousRover.innerHTML === 'Rover ' + (index + 1)) {
                                    previousRover.classList.remove("rover_direction_n");
                                    previousRover.classList.remove("rover_direction_s");
                                    previousRover.classList.remove("rover_direction_e");
                                    previousRover.classList.remove("rover_direction_w");
                                    previousRover.innerHTML = "";
                                }
                            });
                            const x_axis = ((xAxis.length) - Number(rover.roverXAxis));
                            const y_axis = Number(rover.roverYAxis + 1);
                            let yAxis = tbl[0].querySelector('tr:nth-child(' + x_axis + ')>td:nth-child(' + y_axis + ')')
                            if (yAxis) {
                                yAxis.classList.add("rover_direction_" + rover.roverDirection.toLowerCase());
                                yAxis.innerHTML = "Rover " + (index + 1);
                            }
                        }
                    }
                }
                return true;
            })
        }
    }, [directions, xAxis, rovers, roverCount]);

    function roverCommand(command, roverId) {
        changeRoverPosition(command, roverId)
    }

    function changeRoverPosition(roverCommand, roverId) {
        let newCommand = roverCommand.toUpperCase().substr(roverCommand.length - 1)
        let updatedRovers = rovers;

        if (newCommand === 'L') {
            if (updatedRovers[roverId].roverDirection === 'N') {
                updatedRovers[roverId].roverDirection = 'W'
                //setRoverDirection('W');
            }
            else if (updatedRovers[roverId].roverDirection === 'W') {
                updatedRovers[roverId].roverDirection = 'S'
            }
            else if (updatedRovers[roverId].roverDirection === 'S') {
                updatedRovers[roverId].roverDirection = 'E'
            }
            else if (updatedRovers[roverId].roverDirection === 'E') {
                updatedRovers[roverId].roverDirection = 'N'
            }
        }
        else if (newCommand === 'R') {
            if (updatedRovers[roverId].roverDirection === 'N') {
                updatedRovers[roverId].roverDirection = 'E'
            }
            else if (updatedRovers[roverId].roverDirection === 'E') {
                updatedRovers[roverId].roverDirection = 'S'
            }
            else if (updatedRovers[roverId].roverDirection === 'S') {
                updatedRovers[roverId].roverDirection = 'W'
            }
            else if (updatedRovers[roverId].roverDirection === 'W') {
                updatedRovers[roverId].roverDirection = 'N'
            }
        }
        else if (newCommand === 'M') {
            if (updatedRovers[roverId].roverDirection === 'N' && updatedRovers[roverId].roverXAxis < xAxis.length - 1) {
                updatedRovers[roverId].roverXAxis = updatedRovers[roverId].roverXAxis + 1;
            }
            else if (updatedRovers[roverId].roverDirection === 'S' && updatedRovers[roverId].roverXAxis > 0) {
                updatedRovers[roverId].roverXAxis = updatedRovers[roverId].roverXAxis - 1;
            }
            else if (updatedRovers[roverId].roverDirection === 'W' && updatedRovers[roverId].roverYAxis > 0) {
                updatedRovers[roverId].roverYAxis = updatedRovers[roverId].roverYAxis - 1;
            }
            else if (updatedRovers[roverId].roverDirection === 'E' && updatedRovers[roverId].roverYAxis < yAxis.length - 1) {
                updatedRovers[roverId].roverYAxis = updatedRovers[roverId].roverYAxis + 1;
            }
        }
        setRovers(updatedRovers);
        setRoverCount(roverCount + 1);
    }

    return (
        <Container>
            <h2 className="app_heading">Welcome to Mars rover technical challenge</h2>

            <Row className="details_row">
                <Col>
                    <FloatingControl
                        controlId="plateau_size"
                        label="Enter Plateau size"
                        changeText={drawPlateau}
                        textLabel="Enter Plateau size"
                        supportText="Please enter X and Y co-ordinates of plateau seperated by space. Example: 5 5"
                        errorText={errorText}
                        show={show}
                        xAxis={xAxis}
                        yAxis={yAxis}
                    ></FloatingControl>
                    {console.log(xAxis)}
                </Col>
                <Col>
                    <MultiText
                        controlId="rover_position"
                        placeholder="2 1 N"
                        textLabel="Please enter X and Y co-ordinate of rover's initial position along with it's direction seperated by space. Example: 2 1 N"
                        supportText="Please enter X and Y co-ordinate of rover's initial position along with it's direction seperated by space. Example: 2 1 N"
                        buttonClick={buttonClick}
                        buttonText="Add Rover"
                        xAxis={xAxis.length}
                        yAxis={yAxis.length}
                    ></MultiText>
                </Col>
            </Row>
            <Row>
                <Col className="mb-3">
                    <MultiCommand
                        changeText={roverCommand}
                        controlId="roverCommand"
                        label="Enter Command"
                        textLabel="Enter Command"
                        rovers={rovers}
                        supportText="Please enter command for rover to move in the plateau. \n
                Example for commands below : \n
                L : Turns the rover 90 degree left. \n
                R : Turns the rover 90 degree right. \n
                M : Moves the rover forward one grid point and maintain the same heading.">
                    </MultiCommand>
                </Col>
                <Col className="mb-3">
                    {rovers && rovers.map(function (rover, index) {
                        return <Row key={index} className="current_position">
                            <Col className="col-xl-5">
                                <Form.Text className="text-muted">
                                    <strong>Current Position of Rover {index + 1} :</strong>
                                </Form.Text>
                            </Col>
                            <Col>
                                <Form.Text className="text-muted current_position_text">
                                    <strong>{rover.roverXAxis}&nbsp;{rover.roverYAxis}&nbsp;{rover.roverDirection}</strong>
                                </Form.Text>
                            </Col>
                        </Row>
                    }
                    )}
                </Col>
            </Row>
            <Row>
                <Plateau
                    xAxis={xAxis}
                    yAxis={yAxis}
                ></Plateau>
            </Row>
        </Container >
    );
};

export default MarsRover;
