import * as React from 'react';
import {
    Input,
    InputNumber,
    Row, Col, 
} from 'antd';
import SeatPicker from '../../../utilities/components/SeatPicker'



class CreateSeats extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            blockName: '',
            row: 2,
            col: 1,
            price: 0,
            rows: [[]]
        };
    }

    onChangePrice = price => {
        this.setState({ price })
    }
    onChangeRow = row => {
        this.setState({ row })
    }
    onChangeCol = col => {
        this.setState({ col })
    }

    createRowsArray = () => {
        const { row, col } = this.state;
        let rows = Array(row).fill([]);
       

        rows.map((row, index) => {
            return rows[index] = Array(col).fill({}).map((seat, ind) => {
                return seat[ind] = { id: `${index + 1}-${ind + 1}`, name: ind + 1, state: 1, price : this.state.price }
            })
        })
        this.setState({
            rows
        }, () => console.log(this.state.rows))
    }

    componentDidMount() {
        this.createRowsArray()
    }
    componentDidUpdate(prevProps, prevState) {
        console.log(prevProps)
        console.log(prevState)
        if (this.state.row !== prevState.row || this.state.col !== prevState.col) {
            this.createRowsArray()
        }

    }



    handleSubmit = e => {
        e.preventDefault();

    };
    handleChangeStatus = (value, id) => {
        const {rows} = this.state;
        // rows.find(()=> )
        // updateRows()
        console.log(value)
        console.log(rows)
        
          }

    render() {
        return (
            <div className="create-seat">
                <Row gutter={[8, 8]}>
                    <Col xs={12}>
                        <Input value={this.state.blockName} onChange={(e) => this.setState({ blockName: e.target.value })} placeholder="Enter Block Name" />
                    </Col>
                    <Col xs={16}>
                        <div className="create-seat-box">
                            <SeatPicker rows={this.state.rows} handleChangeStatus={this.handleChangeStatus} />
                        </div>
                    </Col>
                    <Col xs={8}>
                        <div className="create-seat-side-bar">
                            <div>Row : <InputNumber min={1} value={this.state.row} onChange={this.onChangeRow} /></div>
                            <div>Column : <InputNumber min={1} value={this.state.col} onChange={this.onChangeCol} /></div>
                            <div>Price :
                        <InputNumber
                                    defaultValue={this.state.price}
                                    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                    onChange={this.onChangePrice}
                                />
                            </div>

                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default CreateSeats