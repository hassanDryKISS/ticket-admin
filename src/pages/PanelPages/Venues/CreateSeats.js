import * as React from 'react';
import {
    Input,
    InputNumber,
    Row, Col,
    Button, Form, Radio
} from 'antd';
import SeatPicker from '../../../utilities/components/SeatPicker'

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
            blockName: '',
            row: 1,
            col: 1,
            price: 0,
            state: '1',
            loading: true,
            rows: [[]]
        };
    }
    formRef = React.createRef();


    onChangePrice = price => {
        this.setState({ price })
    }
    onChangeRow = row => {
        this.setState({ row })
    }
    onChangeCol = col => {
        this.setState({ col })
    }
    onChangeState = e => {
        this.setState({ state: e.target.value })
    }

    createRowsArray = async () => {
        const { row, col, price, state } = this.state;
        let rows = Array(row).fill([]);

        await rows.map((row, index) => {
            return rows[index] = Array(col).fill({}).map((seat, ind) => {
                return seat[ind] = { id: `${index + 1}-${ind + 1}`, name: ind + 1, state, price }
            })
        })
        this.setState({
            rows,
            loading: false
        },()=> console.log(this.state.loading))
    }

    componentDidMount() {
        this.createRowsArray()
    }
    // componentDidUpdate(prevProps, prevState) {
    //     if (this.state.row !== prevState.row || this.state.col !== prevState.col) {
    //         this.createRowsArray()
    //     }
    // }



    handleSubmit = e => {
        e.preventDefault();

    };
    handleChangeStatus = (value, id) => {
        const { rows } = this.state;

        let newRows = rows.map((row, index) => {

            let newRow = row.map(seat => {
                if (seat && seat.id === id) {
                    seat.state = value
                } else {
                    return seat
                }
            })
            return newRow
        })
        this.setState({
            rows
        })

    }

    onReset = () => {
        this.setState({
            row: 1,
            col: 1,
            price: 0,
            state: '1'
        }, () => this.createRowsArray())
    };

    render() {
        return (
            <div className="create-seat">
                <Row gutter={[8, 8]}>
                    <Col xs={9}>

                    </Col>
                    <Col xs={16}>
                        <div className="create-seat-box">
                            <div className="space"></div>
                            <SeatPicker rows={this.state.rows} handleChangeStatus={this.handleChangeStatus} loading={this.state.loading} />
                        </div>
                    </Col>
                    <Col xs={8}>
                        <div className="create-seat-side-bar">
                            <Form {...layout} ref={this.formRef} name="control-ref" size="small">
                                <Form.Item name="block-name" label="Block Name">
                                    <Input value={this.state.blockName} onChange={(e) => this.setState({ blockName: e.target.value })} placeholder="Enter Block Name" />
                                </Form.Item>

                                <Form.Item name="row" label="Row">
                                    <InputNumber min={1} value={this.state.row} onChange={this.onChangeRow} />
                                </Form.Item>
                                <Form.Item name="column" label="Column" >
                                    <InputNumber min={1} value={this.state.col} onChange={this.onChangeCol} />
                                </Form.Item>
                                <Form.Item name="price" label="Price">
                                    <InputNumber
                                        defaultValue={this.state.price}
                                        formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                        onChange={this.onChangePrice}
                                    />
                                </Form.Item>

                                <Form.Item name="state" label="State Seats"
                                    labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}

                                >
                                    <Radio.Group onChange={this.onChangeState}
                                        value={this.state.state}>
                                        <Radio value="1">Available</Radio>
                                        <Radio value="2">Reserved</Radio>
                                        <Radio value="0">Not Available</Radio>
                                        <Radio value="7">Empty</Radio>
                                    </Radio.Group>
                                </Form.Item>


                                <Form.Item>
                                    <Button type="primary" onClick={()=> {
                                        this.createRowsArray()
                                        this.setState({loading :true})
                                    }}>
                                        {'Create Seat'}
                                    </Button>
                                    <Button htmlType="button" onClick={this.onReset}>
                                        Reset
                                    </Button>

                                </Form.Item>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </div >
        );
    }
}

export default CreateSeats