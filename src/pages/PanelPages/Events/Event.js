
import { Button, Table, Row, Col, Typography, Steps, Popover, Form,
  Input } from 'antd';

import * as React from 'react';
import {  CalendarOutlined, ContainerOutlined, SettingOutlined } from '@ant-design/icons';
import EventDetailsForm from './EventDetailsForm'
import EventInventoryForm from './EventInventoryForm'

import { Link } from 'react-router-dom'
const { Step } = Steps;

const { Title } = Typography;

const customDot = (dot, { status, index }) => (
  <Popover
    content={
      <span>
        step {index} status: {status}
      </span>
    }
  >
    {dot}
  </Popover>
);
const steps = [
  {
    title: 'First',
    content:  <EventDetailsForm />,
  },
  {
    title: 'Second',
    content: <EventInventoryForm />,
  },
  {
    title: 'Last',
    content: 'Last-content',
  }, {
    title: 'Last',
    content: 'Last-content',
  },
];

class CreatePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 1,
    }

  }
  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }
  
  render() {
    const { current } = this.state;

    return (
      <div>
        <Row gutter={[8, 8]}>
          <Col xs={24}>
            <Steps current={current} >
              <Step title=" Details" icon={<CalendarOutlined />} />
              <Step title=" Inventory " icon={<ContainerOutlined />} />
              <Step title=" Checkout " icon={<SettingOutlined />} />
              <Step title="Listing" icon={<ContainerOutlined />} />
            </Steps>
          </Col>
          <Col xs={24}>
            <div className="steps-content">{steps[current].content}</div>
          </Col>
          <Col xs={24}>
            <div className="steps-action">
              {current >= 0 && (
                <Button type="primary" onClick={() => this.next()}>
                  Next
            </Button>
              )}

              {current > 0 && (
                <Button style={{ margin: 8 }} onClick={() => this.prev()}>
                  Previous
            </Button>
              )}
            </div>
          </Col>

        </Row>
      </div>
    );
  }
}



export default CreatePage
