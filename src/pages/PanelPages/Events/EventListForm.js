import {
  Button, Typography, Form, Card, Tooltip,
  Input,
  Divider, Upload
} from 'antd';


import * as React from 'react';
import {  EditFilled, DeleteOutlined, UploadOutlined } from '@ant-design/icons';

import update from 'immutability-helper';

const { TextArea } = Input;

const { Title } = Typography;

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 10 },
};

const config = {
  rules: [{ type: 'object', required: true, message: 'Please select time!' }],
};


class EventListForm extends React.Component {
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
  normFile = e => {
    console.log('Upload event:', e);

    if (Array.isArray(e)) {
      return e;
    }

    return e && e.fileList;
  };

  getColumns() {
    return [
      {
        title: 'DELIVERY OPTION',
        dataIndex: 'option',
        key: 'option',
        render: (option, data) => (
          <>
            <div style={{ marginBottom: '10px' }}>{data.type}</div>
            {`Available:`}&nbsp;&nbsp;<Button onClick={() => {
              this.setState({ type: 'edit', id: data.id })
              this.showDrawer()
            }}>{option}</Button>
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
              <Button onClick={() => {
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

    return (
      <Form {...layout} onSubmit={this.handleSubmit}>
        <Title>Listing</Title>

        <Card title="Event Listing" size="small" type="inner" style={{ marginBottom: '20px' }}>
          <Form.Item name="event-description" label="Event Description" {...config} >
            {getFieldDecorator('event-description', {
              rules: [{ required: false, message: 'Please event-description' }],
            })(
              <TextArea />,
            )}

          </Form.Item>
          <Divider />
            <Form.Item name="Event Website" label="Event Website" {...config} >
            {getFieldDecorator('event-description', {
              rules: [{ required: false, message: 'Please event-description' }],
            })(
              <Input placeholder="http://" />,
            )}

          </Form.Item>
          <Divider />
          <Form.Item
            name="upload"
            label="Upload"
            valuePropName="fileList"
            getValueFromEvent={this.normFile}
            extra={`Your image thumbnail is used in your event listing,
             search results and where applicable is displayed when shared through social media outlets.`}
          >
            <Upload name="logo" action="/upload.do" listType="picture">
              <Button>
                <UploadOutlined /> Click to upload
        </Button>
            </Upload>
          </Form.Item>

        </Card>
      </Form>


    )
  }
}


const WrappedCreateForm = Form.create({ name: 'event-details' })(EventListForm);

export default WrappedCreateForm
