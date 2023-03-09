import React, { useState, useEffect } from "react";

const Plateau = (props) => {
  const [xAxis, setXAxis] = useState([]);
  const [yAxis, setYAxis] = useState([]);

  useEffect(() => {
    if (props) {
      if (props.xAxis && props.xAxis.length > -1) {
        setXAxis(props.xAxis)
      }
      if (props.yAxis && props.yAxis.length > -1) {
        setYAxis(props.yAxis)
      }
    }
  }, [props])


  return (
    <table className="tbl_plataeu">
      <tbody>
        {xAxis && xAxis.map(function (xAxisItem, i) {
          return <tr key={i}>
            {yAxis && yAxis.map(function (yAxisItem, j) {
              return <td key={j} height={`${(Number(document.getElementsByClassName("tbl_plataeu")[0].offsetWidth) / yAxis.length).toString()}px`}></td>
            })}
          </tr>
        })}
      </tbody>
    </table>
  )
}
export default Plateau;