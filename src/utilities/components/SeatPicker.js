import * as React from "react";
import { Spin } from "antd";

class SeatPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}
  handleClick = (e) => {
    const { id, value } = e.target.dataset;
    this.props.handleChangeStatus(value, id);

    // if (state !== '1' && state !== '5') {
    //   return
    // }

    // const { addSeat, removeSeat, selectSeats } = this.props;
    // const isSelectBefore = selectSeats.find((item) => item.id === id);
    // if (!isSelectBefore) {
    //   addSeat(JSON.parse(seat), () => { });
    // } else {
    //   removeSeat(JSON.parse(seat), () => console.log('remove call back'))
    // }
  };

  renderState = (state, id) => {
    switch (state) {
      case 0:
        return "disable";
      case 1:
        return "blue";
      case 2:
        return "yellow";
      case 4:
      case 3:
        return "red";
      case 5:
        return "blue";
      case "0":
        return "red";
      case "1":
        return "blue";
      case "2":
        return "green";
      case "7":
        return "separator";
      default:
        return "default";
    }
  };

  // NOT_AVAILABLE = 0
  //   AVAILABLE = 1
  //   BOOKING = 2
  //   BOOKED = 3
  //   BOOKED_BY_YOU = 4
  //   BOOKING_BY_YOU = 5
  //   RESERVED = 6

  /*
		Seat status proposal
		0: Not available (Red)
		1: Available (blue)
		2: Reserved (Payment process) (Yellow)
		3: Sold ( Red ) book
		5: selected !!( Orang )
  */

  renderTooltip = (seat) => {
    return (
      <div class="tooltip-box">
        <div className="tooltip-container">
          <div>
            name: {seat.name} price : {seat.price}$
          </div>
          <div className="tooltip-item" data-id={seat.id} data-value="1">
            <input
              type="radio"
              name={`state${seat.id}`}
              value="1"
              checked={seat.state == 1}
              data-id={seat.id}
              data-value="1"
            />
            Available
          </div>
          <div className="tooltip-item" data-id={seat.id} data-value="2">
            <input
              type="radio"
              name={`state${seat.id}`}
              value="2"
              checked={seat.state == 2}
              data-id={seat.id}
              data-value="2"
            />
            Reserved
          </div>
          <div className="tooltip-item" data-id={seat.id} data-value="0">
            <input
              type="radio"
              name={`state${seat.id}`}
              value="0"
              checked={seat.state == 0}
              data-id={seat.id}
              data-value="0"
            />
            Not Available
          </div>

          <div className="tooltip-item" data-id={seat.id} data-value="7">
            <input
              type="radio"
              name={`state${seat.id}`}
              value="7"
              checked={seat.state == 7}
              data-id={seat.id}
              data-value="7"
            />
            Empty
          </div>
        </div>
      </div>
    );
  };
  renderRowsName = (index, rowLength) => {
    const { isRowAlphabet, isRowRevers } = this.props;
    const alphabet = "abcdefghijklmnopqrstuvwxyz".split(""); //length 26

    if (!isRowAlphabet && !isRowRevers) {
      return index + 1 >= 10 ? index + 1 : `0${index + 1}`;
    } else if (isRowAlphabet && index < 53 && !isRowRevers) {
      return index > 25
        ? `${alphabet[index - 26].toUpperCase()}${alphabet[
            index - 26
          ].toUpperCase()}`
        : alphabet[index].toUpperCase();
    }
    if (!isRowAlphabet && isRowRevers) {
      return (rowLength) - index >= 10 ? (rowLength) - index : `0${(rowLength) - index}`;
    } else if (isRowAlphabet && index < 53 && isRowRevers) {
      console.log((rowLength - index) >26 )
      console.log(alphabet[(rowLength - index) - 27] )
      // console.log(alphabet[index - 26].toUpperCase())
      // `${alphabet[index - 26].toUpperCase()}${alphabet[
      //   index - 26
      //   ].toUpperCase()}`

      return (rowLength - index) >26
        ? `${alphabet[(rowLength - index) - 27].toUpperCase()}${alphabet[
          (rowLength - index) - 27
          ].toUpperCase()}`
        : alphabet.reverse()[26 - (rowLength - index )].toUpperCase();
    }
  };

  render() {
    const { rows, loading } = this.props;
    return (
      <>
        {loading ? (
          <div className="seat-picker">
            <Spin
              size="large"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
              }}
            />
          </div>
        ) : (
          <>
            <div className="seat-picker" onClick={(e) => this.handleClick(e)}>
              {rows.map((row, index) => {
                return (
                  <div className="row" key={index}>
                    {row.map((seat, seatIndex) => {
                      if (seatIndex === 0) {
                        return (
                          <>
                            <div
                              className="seat-name"
                              data-disable={true}
                              key={seatIndex}
                            >
                              {this.renderRowsName(index, rows.length)}

                              {/* {index + 1 >= 10 ? index + 1 : `0${index + 1}`} */}
                            </div>
                            {seat == null ? (
                              <div
                                className="seat tooltip separator"
                                key={seatIndex}
                              >
                                00
                                {this.renderTooltip(seat)}
                              </div>
                            ) : (
                              <div
                                className={`seat tooltip ${this.renderState(
                                  seat.state,
                                  seat.id
                                )}`}
                              >
                                {seat.name}
                                {this.renderTooltip(seat)}
                              </div>
                            )}
                          </>
                        );
                      }
                      if (seat == null)
                        return (
                          <div className="seat separator" key={seatIndex}>
                            00
                          </div>
                        );
                      return (
                        <div
                          className={`seat tooltip ${this.renderState(
                            seat.state,
                            seat.id
                          )}`}
                          data-id={seat.id}
                          data-seat={JSON.stringify(seat)}
                          data-state={seat.state}
                          key={seat.id}
                        >
                          {seat.name}
                          {this.renderTooltip(seat)}{" "}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </>
    );
  }
}
SeatPicker.defaultProps = {
  rows: [[{ state: "dd", id: 1, number: 1 }]],
  state: "",
  addSeat: () => console.log(),
  removeSeat: () => console.log(),
};

export default SeatPicker;
