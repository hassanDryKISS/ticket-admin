
import {
  Button, Modal, Row, Col, Typography, Steps, Select, Form, Table, Card, Tooltip, Drawer, Checkbox,
  Input,
  InputNumber
} from 'antd';
import notif from '../../../utilities/Functions/Notification'


import * as React from 'react';
import { CalendarOutlined, ContainerOutlined, SettingOutlined, QuestionCircleOutlined, QuestionCircleFilled, PlusCircleFilled, ArrowRightOutlined, EditFilled, DashboardOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import  EditEventInventoryList  from './EditEventInventoryList'
const { Step } = Steps;
const { Option } = Select;

const { Title } = Typography;

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
const config = {
  rules: [{ type: 'object', required: true, message: 'Please select time!' }],
};

const type = 'DragbleBodyRow';

const DragableBodyRow = ({ index, moveRow, className, style, ...restProps }) => {
  const ref = React.useRef();
  const [{ isOver, dropClassName }, drop] = useDrop({
    accept: type,
    collect: monitor => {
      const { index: dragIndex } = monitor.getItem() || {};
      if (dragIndex === index) {
        return {};
      }
      return {
        isOver: monitor.isOver(),
        dropClassName: dragIndex < index ? ' drop-over-downward' : ' drop-over-upward',
      };
    },
    drop: item => {
      moveRow(item.index, index);
    },
  });
  const [, drag] = useDrag({
    item: { type, index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drop(drag(ref));
  return (
    <tr
      ref={ref}
      className={`${className}${isOver ? dropClassName : ''}`}
      style={{ cursor: 'move', ...style }}
      {...restProps}
    />
  );
};

class EventInventoryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleSetPrice: false,
      visibleDrawer: false,
      type: 'edit',
      data: [
        {
          key: '1',
          id: 1,
          name: 'John Brown',
          type: 'free',
          inventory: '22',
          onlinePrice: '2.2$',
          boxOfficePrice: '2.2$',
        }, {
          key: '2',
          id: 2,
          name: 'hassn Brown',
          type: 'free',
          inventory: '2222',
          onlinePrice: '2.2$',
          boxOfficePrice: '2.2$',
        }, {
          key: '3',
          id: 3,
          name: 'Johtestn Brown',
          type: 'free',
          inventory: '225',
          onlinePrice: '2.2$',
          boxOfficePrice: '2.2$',
        },
      ],
    }

  }

  getColumns() {
    return [
      {
        title: '',
        key: 'action',
        render: (text, record) => (
          <UnorderedListOutlined style={{ fontSize: '18px' }} />
        ),
      },
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'NAME',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'TYPE',
        dataIndex: 'type',
        key: 'type',
      }, {
        title: 'INVENTORY',
        dataIndex: 'inventory',
        key: 'inventory',
      }, {
        title: 'ONLINE PRICE',
        dataIndex: 'onlinePrice',
        key: 'onlinePrice',
      }, {
        title: 'BOX OFFICE PRICE',
        dataIndex: 'boxOfficePrice',
        key: 'boxOfficePrice',
      },
      {
        title: '',
        key: 'action',
        render: (text, record) => (
          <span>
            <Tooltip title="Edit">
              <Button type="link" onClick={() => {
                    this.setState({ type: 'edit', id: record.id })
                    this.showDrawer()
                  }} style={{ marginRight: 10 }}  >
                <EditFilled style={{ fontSize: '18px' }} />
              </Button>
            </Tooltip>
            {/* <Tooltip title="Edit">
              <Button onClick={() => {
    
              }} style={{ marginRight: 10 }}  >
                <EditFilled style={{ fontSize: '18px' }} />
              </Button>
            </Tooltip> */}
          </span>
        ),
      },
    ];
  }

  components = {
    body: {
      row: DragableBodyRow,
    },
  };

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
      visibleDrawer: false,type : ''
    });
  };



  render() {
    const { getFieldDecorator } = this.props.form

    return (<>
      <Form {...layout} onSubmit={this.handleSubmit}>
        <Title>Inventory</Title>
        <Row gutter={[16]}>
          <Col xs={24} md={8}><Form.Item label="Event Capacity" labelCol={{ space: 24 }} wrapperCol={{ space: 24 }}>
            {getFieldDecorator('event-capacity', {
              rules: [{ required: false, message: 'Please input Event Capacity' }],
            })(
              <Input disabled
                placeholder="Enter Event Capacity"
              />,
            )}
          </Form.Item></Col>
          <Col xs={24} md={8}><Form.Item labelCol={{ space: 24 }} wrapperCol={{ space: 24 }} label={<>
            Max. Tickets per Transaction
            <Tooltip placement="max-ticket" title="The maximum number of tickets that can be purchased in a single order.">
              <QuestionCircleFilled style={{ marginTop: '10px', }} />
            </Tooltip></>}  >
            {getFieldDecorator('max-ticket', {
              rules: [{ required: true, message: 'Please input name of your event', }], initialValue: 10

            })(
              <Input type="number"
                placeholder="Enter the name of your event"
              />,
            )}
          </Form.Item></Col>
        </Row>
        <Card title="" size="small" type="inner" extra={<Button type="primary" onClick={() => this.setState({ visibleSetPrice: true })}>
          {'Set price for all'}
        </Button>} style={{ marginBottom: '20px' }}>
          <DndProvider backend={HTML5Backend}>
            <Table
              columns={this.getColumns()}
              pagination={false}
              dataSource={this.state.data}
              components={this.components}
              onRow={(record, index) => ({
                index,
                moveRow: this.moveRow,
              })}
            />
          </DndProvider>
          <Modal
            title="Set price for all levels"
            visible={this.state.visibleSetPrice}
            onOk={this.handleSetPriceOk}
            onCancel={this.handleCancelSetPrice}
            okText={`Save`}
          >
            <div style={{display: 'flex'}}>
              <div style={{ margin: 16,width:'40%' }}>
{`Price`}
                <Input addonBefore="$" />
              </div>
              <div style={{ margin: 16,width:'40%' }}>
             {`Box Office Price`}
                <Input addonBefore="$" />
              </div>
            </div>
          </Modal>
        </Card>

        <Card title="Discount Levels" size="small" type="inner" style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <p>{`Some seated venues offer discounted price levels for their events (e.g. Student or Senior Citizen price levels).`}</p>
            <Button >
              {' Add Discount Level '}
            </Button>
          </div>
        </Card>


        <Card title="Products" size="small" type="inner" style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <p>{`Allow customers to purchase merchandise or other non-ticket items in the checkout process.`}</p>
            <Button >
              {' Add Products '}
            </Button>
          </div>
        </Card>

        <Form.Item labelCol={{ span: 18 }} wrapperCol={{ span: 4 }}>
          <Button loading={this.props.loading_api} type="primary" htmlType="submit" className="login-form-button">
            {' Save and Continuedsd '} <ArrowRightOutlined />
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
          {this.state.type === 'edit' && <EditEventInventoryList
            loading_api={this.props.loading_api}
            success={() => {
              notif('success'
                , 'Success',
                ' Successfully eDit')
              this.getClients(this.state.current, this.state.pageSize)
              this.onClose()
            }}
          />}
          {/* {this.state.type === 'edit' && <ClientEditForm
            loading_api={this.props.loading_api}
            id={this.state.id}
            success={() => {
              notif('success'
                , 'Success',
                'Client Successfully edited')
              this.getClients(this.state.current, this.state.pageSize)
              this.onClose()
            }}
          />} */}
        </Drawer></>
    )
  }
}


const WrappedCreateForm = Form.create({ name: 'event-details' })(EventInventoryForm);

export default WrappedCreateForm
