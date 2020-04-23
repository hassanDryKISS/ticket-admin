
import {
  Button, Table, Row, Col, Typography, Select, Form, Radio, Card, Tooltip, Drawer,
  Input
} from 'antd';
import notif from '../../../utilities/Functions/Notification'


import * as React from 'react';
import { ArrowRightOutlined, EditFilled, DeleteOutlined } from '@ant-design/icons';

import update from 'immutability-helper';
import EditEventCheckout from './EditEventCheckout'
import { defaults } from 'chart.js';
const { Option } = Select;

const { Title } = Typography;

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

class EventInventoryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleSetPrice: false,
      visibleDrawer: false,
      type: 'edit',
      id: '',
      data: [
        {
          key: '1',
          id: 1,
          option: 'always',
          fee: 'AUD $2.20',
          type: 'print at home',
        },
      ],
    }

  }

  getColumns() {
    return [
      {
        title: 'DELIVERY OPTION',
        dataIndex: 'option',
        key: 'option',
        render: (option, data) => (
          <>
            <div style={{marginBottom: '10px'}}>{data.type}</div>
            {`Available:`}&nbsp;&nbsp;<Button onClick={() => {
              this.setState({ type: 'edit', id: data.id })
              this.showDrawer()
            } }>{option}</Button>
          </>
        ),
      },
      {
        title: 'FEE',
        dataIndex: 'fee',
        key: 'fee',
      },
      {
        title: '',
        key: 'action',
        render: (text, record) => (
          <span>
            <Tooltip title="Edit">
              <Button  onClick={() => {
                this.setState({ type: 'edit', id: record.id })
                this.showDrawer()
              }} style={{ marginRight: 10 }}  >
                <EditFilled style={{ fontSize: '18px' }} />
                {`Edit`}
              </Button>
            </Tooltip>
            <Tooltip title="Edit">
              <Button onClick={() => {
    
              }} style={{ marginRight: 10 }}  >
                <DeleteOutlined style={{ fontSize: '18px' }} />
                {`Disable`}
              </Button>
            </Tooltip>
          </span>
        ),
      },
    ];
  }



  moveRow = (dragIndex, hoverIndex) => {
    const { data } = this.state;
    const dragRow = data[dragIndex];

    this.setState(
      update(this.state, {
        data: {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragRow],
          ],
        },
      }),
    );
  };


  onVenusChange = value => {
    const { form } = this.props;
    switch (value) {
      case "male":
        form.setFieldsValue({ note: "Hi, man!" });
        return;
      case "female":
        form.setFieldsValue({ note: "Hi, lady!" });
        return;
      case "other":
        form.setFieldsValue({ note: "Hi there!" });
        return;
        default: 
        return ''
    }
  };

  handleSetPriceOk = e => {
    console.log(e);
    this.setState({
      visibleSetPrice: false,
    });
  };

  handleCancelSetPrice = e => {
    console.log(e);
    this.setState({
      visibleSetPrice: false,
    });
  };


  showDrawer = () => {
    this.setState({
      visibleDrawer: true,
    });
  };

  onCloseDrawer = () => {
    this.setState({
      visibleDrawer: false, type: ''
    });
  };



  render() {
    const { getFieldDecorator } = this.props.form

    return (<>
      <Form {...layout} onSubmit={this.handleSubmit}>
        <Title>Checkout</Title>
        
        <Table
          columns={this.getColumns()}
          pagination={false}
          loading={this.props.loading_api}
          dataSource={this.state.data}
          onChange={this.onChange}
        />

        <Card title="Additional Checkout Settings" size="small" type="inner" style={{ margin: '20px 0' }}>
          <Row gutter={[16, 16]}>
            <Col xs={24}>
              {`Collect name on each ticket:`}&nbsp;&nbsp;&nbsp;&nbsp;
              <Radio.Group onChange={this.onChange} value={this.state.value}>
                <Radio value={1}>Yes</Radio>
                <Radio value={2}>No</Radio>
              </Radio.Group>
            </Col>
            <Col xs={24} md={8}><Form.Item label={
              <>
                Checkout Time Limit
                {/* <Tooltip placement="Checkout Time Limit"
                  title="The amount of time a customer has to complete their ticket purchase.">
                  <QuestionCircleFilled style={{ marginTop: '10px' }} />
                </Tooltip> */}
              </>
            }

              labelCol={{ space: 24 }} wrapperCol={{ space: 24 }}>
              {getFieldDecorator('event-capacity', {
                rules: [{ required: false, message: 'Please input Checkout Time Limit' }],
              })(
                <Select
                  placeholder="Select Checkout Time Limit"
                  onChange={this.onVenusChange}
                  allowClear
                >
                  <Option value="5">5 Minutes</Option>
                  <Option value="10">10 Minutes</Option>
                  <Option value="15">15 Minutes</Option>
                  <Option value="20">20 Minutes</Option>
                  <Option value="25">25 Minutes</Option>
                  <Option value="30">30 Minutes</Option>
                </Select>,
              )}
            </Form.Item></Col>
            <Col xs={24} md={8}><Form.Item labelCol={{ space: 24 }} wrapperCol={{ space: 24 }} label={<>
            
            </>

            }  >
              {getFieldDecorator('Ticket Note ', {
                rules: [{ required: true, message: 'Please inputTicket Note ', }]

              })(
                <Input
                  placeholder="Enter a Note "
                />,
              )}
            </Form.Item></Col>
            <Col xs={24}>
              {`Accept Donations:`}&nbsp;&nbsp;&nbsp;&nbsp;
              <Radio.Group onChange={this.onChange} value={this.state.value}>

                <Radio value={1}>Yes</Radio>
                <Radio value={2}>No</Radio>
              </Radio.Group>
            </Col>
          </Row>
        </Card>

        <Form.Item labelCol={{ span: 18 }} wrapperCol={{ span: 4 }}>
          <Button loading={this.props.loading_api} type="primary" htmlType="submit" className="login-form-button">
            {' Save and Continued '} <ArrowRightOutlined />
          </Button>
        </Form.Item>
      </Form>

      <Drawer
        width={320}
        title={this.state.type === 'Edit' ? "Create a new Client" : "Edit existing Client"}
        onClose={this.onCloseDrawer}
        visible={(this.state.visibleDrawer)}
        bodyStyle={{ paddingBottom: 80 }}
      >
        {this.state.type === 'edit' && <EditEventCheckout
          loading_api={this.props.loading_api}
          success={() => {
            notif('success'
              , 'Success',
              ' Successfully eDit')
            // this.getClients(this.state.current, this.state.pageSize)
            this.onClose()
          }}
        />}
      </Drawer></>
    )
  }
}


const WrappedCreateForm = Form.create({ name: 'event-details' })(EventInventoryForm);

export default WrappedCreateForm
