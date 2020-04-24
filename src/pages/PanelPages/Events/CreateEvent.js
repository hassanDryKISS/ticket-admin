
import {  Row,Col,Typography, Card, Avatar } from 'antd';

import * as React from 'react';
import {Link} from 'react-router-dom'
import {  CalendarOutlined, DatabaseOutlined, BorderOuterOutlined } from '@ant-design/icons';
const { Meta } = Card;

const { Title } = Typography;

class CreatePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }

  }


  render() {

    return (
      <div>
        <Title level={2}>Create Events</Title>
            <Row gutter={[8,8]}>
              <Col xs={8}>
                <Link to="/event">
                      <Card
                        hoverable
                      >
                        <Meta
                          avatar={<Avatar size={50} icon={<CalendarOutlined />} />}
                          title="Single Event"
                          description="
                          Create a new one-time event. Edit ticket inventory and details."
                        />
                      </Card>
                  </Link>
              </Col>
              <Col xs={8}>
                <Link to="/event">
                      <Card
                        hoverable
                      >
                        <Meta
                          avatar={<Avatar size={50} icon={<DatabaseOutlined />} />}
                          title="Event Series"
                          description="Create a recurring event and determine a schedule."
                        />
                      </Card>
                  </Link>
              </Col>
              <Col xs={8}>
                <Link to="/event">
                      <Card
                        hoverable
                      >
                        <Meta
                          avatar={<Avatar size={50} icon={<BorderOuterOutlined />} />}
                          title="Event Package"
                          description=" Create a single listing for a multi-event package of tickets."
                        />
                      </Card>
                  </Link>
              </Col>
            </Row>
      </div>
    );
  }
}


export default CreatePage
