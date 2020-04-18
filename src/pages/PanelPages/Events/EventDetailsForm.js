
import {
  Button, Divider, Row, Col, Typography, Steps, Select, Form, Card, Tooltip, DatePicker, Checkbox,
  Input
} from 'antd';

import * as React from 'react';
import { CalendarOutlined, ContainerOutlined, SettingOutlined, QuestionCircleOutlined, QuestionCircleFilled, PlusCircleFilled, ArrowRightOutlined } from '@ant-design/icons';

import { Link } from 'react-router-dom'
const { Step } = Steps;
const { Option } = Select;

const { Title } = Typography;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
const config = {
  rules: [{ type: 'object', required: true, message: 'Please select time!' }],
};

class EventDetailsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    }

  }

  renderDetailsHtml = () => {


  }

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



  render() {
    const { getFieldDecorator } = this.props.form

    return (
      <Form {...layout} onSubmit={this.handleSubmit}>
        <Title>Details Event</Title>
        <Card title="Name and URL" size="small" type="inner" style={{ marginBottom: '20px' }}>

          <Form.Item label="Name" extra="Maximum 50 characters.">
            {getFieldDecorator('name', {
              rules: [{ required: true, message: 'Please input name of your event' }],
            })(
              <Input
                placeholder="Enter the name of your event"
              />,
            )}
          </Form.Item>
          <Form.Item label={<>
            Event URL
            <Tooltip placement="top" title="The URL for your event listing. We will automatically check to make sure your URL is valid (unique URL, alphanumeric characters only).">
              <QuestionCircleFilled style={{ marginTop: '10px', }} />
            </Tooltip></>}  >
            {getFieldDecorator('event_url', {
              rules: [{ required: true, message: 'Please input name of your event' }],
            })(
              <Input addonBefore="http://ticket.com/event"
                placeholder=""
              />,
            )}
          </Form.Item>

        </Card>

        <Card title={<Button type="primary">Create Event <PlusCircleFilled /></Button>} size="small" type="inner" style={{ marginBottom: '20px' }}>
          <Form.Item name="venue" label="Venue" rules={[{ required: true }]}>
            <Select
              placeholder="Select a venue"
              onChange={this.onVenusChange}
              allowClear
            >
              <Option value="venue1">vaenu 1</Option>
              <Option value="venue2">vaenu 2</Option>
              <Option value="venue3">vaenu 3</Option>
              <Option value="venue4">vaenu 4</Option>

            </Select>
          </Form.Item>
        </Card>


        <Card title="Date and Time (DD/MM/YYYY)" size="small" type="inner" style={{ marginBottom: '20px' }}>
          <Form.Item name="even-start"  label="Event Starts Date" {...config} >
            {getFieldDecorator('even-start', {
              rules: [{ required: true, message: 'Please select start event' }],
            })(
              <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" placeholder="DD/MM/YYYY" />,
            )}

          </Form.Item>
          <Divider />
          <Form.Item name="even-start"  label={<>
            Online Sales Open
            <Tooltip placement="top" title="Tickets will be available for purchase online on this date/time.">
              <QuestionCircleFilled style={{ marginTop: '10px', }} />
            </Tooltip></>} {...config} >
            {getFieldDecorator('even-start', {
              rules: [{ required: true, message: 'Please select start event' }],
            })(
              <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" placeholder="DD/MM/YYYY" />,
            )}

          </Form.Item>
          <Form.Item >
            <Checkbox  >
              Go on sale immediately
        </Checkbox>
          </Form.Item>
          <Divider />

          <Form.Item name="even-start"  label={<>
            Online Sales End
            <Tooltip placement="top" title="Tickets will no longer be available for purchase on this date/time.">
              <QuestionCircleFilled style={{ marginTop: '10px', }} />
            </Tooltip></>} {...config} >
            {getFieldDecorator('even-start', {
              rules: [{ required: true, message: 'Please select start event' }],
            })(
              <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" placeholder="DD/MM/YYYY" />,
            )}

          </Form.Item>
          <Form.Item >
            <Checkbox  >
              Sales stop half an hour before the start date
        </Checkbox>
          </Form.Item>
        </Card>


        <Card title="About Your Event" size="small" type="inner" style={{ marginBottom: '20px' }}>
          <Form.Item labelCol={{ span: 4 }} wrapperCol={{ span: 8}} name="kindof" label="What kind of event is this?" rules={[{ required: true }]}>
            <Select
              placeholder="Community"
              onChange={this.onVenusChange}
              allowClear
            >
              <Option value="venue1">vaenu 1</Option>
              <Option value="venue2">vaenu 2</Option>
              <Option value="venue3">vaenu 3</Option>
              <Option value="venue4">vaenu 4</Option>

            </Select>
          </Form.Item>
        </Card>

        <Form.Item labelCol={{ span: 18 }} wrapperCol={{ span: 4}}>
          <Button loading={this.props.loading_api} type="primary" htmlType="submit" className="login-form-button">
            {' Save and Continue '} <ArrowRightOutlined />
          </Button>
        </Form.Item>
      </Form>
    )
  }
}


const WrappedCreateForm = Form.create({ name: 'event-details' })(EventDetailsForm);

export default WrappedCreateForm
