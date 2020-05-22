import * as React from "react";
import {
  Input,
  InputNumber,
  Row,
  Col,
  Button,
  Form,
  Radio,
  Checkbox,
} from "antd";
import SeatPicker from "../../../utilities/components/SeatPicker";

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
      price: 0,
      state: "1",
      loading: false,
      isRowAlphabet: false,
      isRowRevers: false, 
      isColRevers: false,
      isColOdd: false,
      rows: [[]],
    };
  }
  formRef = React.createRef();

  onChangePrice = (price) => {
    this.setState({ price });
  };
  onChangeRow = (row) => {
    const parsRow = parseInt(row);
    this.setState({ row: parsRow });
  };
  onChangeCol = (col) => {
    const parsCol = parseInt(col);
    this.setState({ col: parsCol });
  };
  onChangeState = (e) => {
    this.setState({ state: e.target.value });
  };

  createRowsArray = async () => {
    console.log("start");
    const { row, col, price, state,isRowAlphabet,isRowRevers, isColOdd,isColRevers } = this.state;
    const worker = new Worker("/WebWorker.js");

    worker.postMessage({ row, col, price, state,isRowAlphabet,isRowRevers, isColOdd,isColRevers});
    worker.onmessage = async (event) => {
      await this.setState(
        {
          loading: false,
          rows: event.data,
        },
        () => console.log("this.state.loading")
      );
    };
    return;

    // const { row, col, price, state } = this.state;
    let newRows = [];

    for (let i = 0; i < row; i++) {
      newRows[i] = [];
      console.log("fooor");
      for (let j = 0; j < col; j++) {
        await newRows[i].push({
          id: `${i + 1}-${j + 1}`,
          name: j + 1,
          state,
          price,
        });
      }
    }
    console.log("befor set state");
    await this.setState(
      {
        loading: false,
        rows: newRows,
      },
      () => console.log("this.state.loading")
    );
  };

  // componentDidMount() {
  //   this._isMounted = true;

  //   this.createRowsArray();
  // }
  // componentWillUnmount() {
  //   this._isMounted = false;
  // }

  // componentDidUpdate(prevProps, prevState) {
  //     if (this.state.row !== prevState.row || this.state.col !== prevState.col) {
  //         this.createRowsArray()
  //     }
  // }

  handleSubmit = (e) => {
    e.preventDefault();
  };
  handleChangeStatus = (value, id) => {
    const { rows } = this.state;

    let newRows = rows.map((row, index) => {
      let newRow = row.map((seat) => {
        if (seat && seat.id === id) {
          seat.state = value;
        } else {
          return seat;
        }
      });
      return newRow;
    });
    this.setState({
      rows,
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
                  <InputNumber
                    min={1}
                    max={100}
                    pattern="\d*"
                    value={this.state.row}
                    onChange={this.onChangeRow}
                  />

                  <div>
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
                </Form.Item>

                <Form.Item name="column" label="Column">
                  <InputNumber
                    min={1}
                    max={100}
                    pattern="\d*"
                    value={this.state.col}
                    onChange={this.onChangeCol}
                  />
                  <div>
                    <Checkbox
                      onChange={(e) =>
                        this.setState({ isColRevers: e.target.checked })
                      }
                      value={this.state.isColRevers}
                    >
                      Column Name revers
                    </Checkbox>
                    <Checkbox
                      style={{ margin: 0 }}
                      onChange={(e) =>
                        this.setState({ isColOdd: e.target.checked })
                      }
                      value={this.state.isColOdd}
                    >
                      is Column Odd?
                    </Checkbox>
                
                  </div>
                </Form.Item>
                {/* <Form.Item name="price" label="Price">
                  <InputNumber
                    defaultValue={this.state.price}
                    formatter={(value) =>
                      `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                    parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                    onChange={this.onChangePrice}
                  />
                </Form.Item> */}

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
      </div>
    );
  }
}

export default CreateSeats;
