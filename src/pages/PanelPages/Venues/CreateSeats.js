import * as React from "react";
import {
  Input,
  InputNumber,
  Row,
  Col,
  Button,
  Form,
  Radio,
  Modal,
  Checkbox,
} from "antd";
import SeatPicker from "../../../utilities/components/SeatPicker";
import FormItem from "antd/lib/form/FormItem";

const layout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 16,
  },
};
class CreateSeats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blockName: "",
      row: 1,
      col: 1,
      colEnd: 2,
      colStp: 1,
      price: 0,
      state: "1",
      loading: false,
      loading: false,
      isRowAlphabet: false,
      isRowRevers: false,
      isColRevers: false,
      colRtl: false,
      numberColFormat: "default",
      openEditSeatModal: false,
      currentSeat: {
        name: "",
        price: 0,
        state: "1",
      },
      rows: [[]],
    };
  }
  formRef = React.createRef();

  // onChangePrice = (price) => {
  //   this.setState({ price });
  // };
  onChangeRow = (row) => {
    const parsRow = parseInt(row);
    this.setState({ row: parsRow });
  };
  onChangeStartCol = (col) => {
    const parsCol = parseInt(col);
    this.setState(
      { col: parsCol },
      () =>
        parsCol > this.state.colEnd && this.setState({ colEnd: parsCol + 1 })
    );
  };
  onChangeColEnd = (col) => {
    const parsCol = parseInt(col);
    this.setState({ colEnd: parsCol });
  };
  onChangeColStep = (col) => {
    const parsCol = parseInt(col);
    this.setState({ colStp: parsCol });
  };
  onChangeState = (e) => {
    this.setState({ state: e.target.value });
  };

  createRowsArray = async () => {
    console.log("start");
    const {
      row,
      col,
      colEnd,
      colStp,
      price,
      state,
      isRowAlphabet,
      isRowRevers,
      numberColFormat,
      isColRevers,
      colRtl,
    } = this.state;
    const worker = new Worker("/WebWorker.js");

    worker.postMessage({
      row,
      col,
      colEnd,
      colStp,
      price,
      state,
      isRowAlphabet,
      isRowRevers,
      numberColFormat,
      isColRevers,
      colRtl,
    });
    worker.onmessage = async (event) => {
      await this.setState({
        loading: false,
        rows: event.data,
      });
    };
  };

  handleSubmit = (e) => {
    e.preventDefault();
  };
  handleChangeStatus = (currentSeat) => {
    const { rows } = this.state;
    const { id } = this.state.currentSeat;

    let newRows = rows.map((row, index) => {
      let newRow = row.map((seat) => {
        if (seat && seat.id === id) {
          return (seat = this.state.currentSeat);
        } else {
          return seat;
        }
      });
      return newRow;
    });

    this.setState({
      rows: newRows,
      openEditSeatModal: false,
    });
  };

  onReset = () => {
    this.setState(
      {
        row: 1,
        col: 1,
        price: 0,
        state: "1",
      },
      () => this.createRowsArray()
    );
  };

  onChangeColNumberFormat = (e) => {
    this.setState({
      numberColFormat: e.target.value,
    });
  };

  handleEditSeat = () => {};
  openEditModal = (seat) => {
    this.setState({
      openEditSeatModal: true,
      currentSeat: seat,
    });
  };
  onChangeNameSeat = (e) => {
    const { value } = e.target;
    this.setState((prevState) => {
      return {
        currentSeat: {
          ...prevState.currentSeat,
          name: value,
        },
      };
    });
  };
  // onChangePriceSeat = (value) => {
  //   this.setState((prevState) => {
  //     return {
  //       currentSeat: {
  //         ...prevState.currentSeat,
  //         price: value,
  //       },
  //     };
  //   });
  // };

  onChangeStateState = (e) => {
    const { value } = e.target;
    this.setState((prevState) => {
      return {
        currentSeat: {
          ...prevState.currentSeat,
          state: value,
        },
      };
    });
  };

  render() {
    return (
      <div className="create-seat">
        <Row gutter={[8, 8]}>
          <Col xs={9}></Col>
          <Col xs={16}>
            <div className="create-seat-box">
              <div className="space"></div>
              <SeatPicker
                rows={this.state.rows}
                isRowAlphabet={this.state.isRowAlphabet}
                isRowRevers={this.state.isRowRevers}
                handleChangeStatus={this.handleChangeStatus}
                openEditModal={this.openEditModal}
                loading={this.state.loading}
              />
            </div>
          </Col>
          <Col xs={8}>
            <div className="create-seat-side-bar">
              <Form
                {...layout}
                ref={this.formRef}
                name="control-ref"
                size="small"
              >
                <Form.Item name="block-name" label="Block Name">
                  <Input
                    value={this.state.blockName}
                    onChange={(e) =>
                      this.setState({ blockName: e.target.value })
                    }
                    placeholder="Enter Block Name"
                  />
                </Form.Item>
                <Form.Item name="row" label="Row">
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div>
                      <InputNumber
                        min={1}
                        max={100}
                        pattern="\d*"
                        value={this.state.row}
                        onChange={this.onChangeRow}
                      />
                    </div>

                    <div style={{ marginLeft: "5px", marginTop: "-7px" }}>
                      <Checkbox
                        onChange={(e) =>
                          this.setState({ isRowAlphabet: e.target.checked })
                        }
                        value={this.state.isRowAlphabet}
                      >
                        Row Name Alphabet
                      </Checkbox>
                      <Checkbox
                        style={{ margin: 0 }}
                        onChange={(e) =>
                          this.setState({ isRowRevers: e.target.checked })
                        }
                        value={this.state.isRowRevers}
                      >
                        is Row Name Revers?
                      </Checkbox>
                    </div>
                  </div>
                </Form.Item>
                <Form.Item name="column" label="Column">
                  <div>
                    <div style={{ display: "flex", justifyContent: "flexEnd" }}>
                      <span> Start Col: </span>
                      <InputNumber
                        style={{ marginLeft: "7px" }}
                        min={1}
                        max={100}
                        pattern="\d*"
                        value={this.state.col}
                        onChange={this.onChangeStartCol}
                      />
                    </div>
                    <div style={{ display: "flex", justifyContent: "flexEnd" }}>
                      <span> End Col:</span>
                      <InputNumber
                        style={{ marginLeft: "12px" }}
                        min={1}
                        max={100}
                        pattern="\d*"
                        value={this.state.colEnd}
                        onChange={this.onChangeColEnd}
                      />
                    </div>
                    <div style={{ display: "flex", justifyContent: "flexEnd" }}>
                      <span> Step: </span>
                      <InputNumber
                        style={{ marginLeft: "33px" }}
                        min={1}
                        max={5}
                        pattern="\d*"
                        value={this.state.colStp}
                        onChange={this.onChangeColStep}
                      />
                    </div>
                  </div>
                  <Radio.Group
                    onChange={this.onChangeColNumberFormat}
                    value={this.state.numberColFormat}
                  >
                    <Radio value="default">default</Radio>
                    <Radio value="odd">Only Odd</Radio>
                    <Radio value="even">Only Even</Radio>
                  </Radio.Group>
                  <div>
                    <Checkbox
                      onChange={(e) =>
                        this.setState({ colRtl: e.target.checked })
                      }
                      value={this.state.colRtl}
                    >
                      Col Rtl
                    </Checkbox>
                  </div>
                </Form.Item>
                <Form.Item
                  name="state"
                  label="State Seats"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                >
                  <Radio.Group
                    onChange={this.onChangeState}
                    value={this.state.state}
                  >
                    <Radio value="1">Available</Radio>
                    {/* <Radio value="2">Reserved</Radio>
                    <Radio value="0">Not Available</Radio> */}
                    <Radio value="7">Empty</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    onClick={() => {
                      this.createRowsArray();
                      this.setState({ loading: true });
                    }}
                  >
                    {"Create Seat"}
                  </Button>
                  <Button htmlType="button" onClick={this.onReset}>
                    Reset
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Col>
        </Row>

        <Modal
          title={`Name : ${this.state.currentSeat.name}`}
          visible={this.state.openEditSeatModal}
          onOk={this.handleChangeStatus}
          onCancel={() => this.setState({ openEditSeatModal: false })}
        >
          <FormItem label="Name">
            <Input
              value={this.state.currentSeat.name}
              onChange={this.onChangeNameSeat}
            />
          </FormItem>
          <FormItem label="State">
            <Radio.Group
              value={this.state.currentSeat.state}
              onChange={this.onChangeStateState}
            >
              <Radio value="1">Available</Radio>
              <Radio value="7">Empty</Radio>
            </Radio.Group>
          </FormItem>
        </Modal>
      </div>
    );
  }
}

export default CreateSeats;
