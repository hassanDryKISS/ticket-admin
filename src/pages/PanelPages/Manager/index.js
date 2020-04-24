
import { AnimatedWayPointDiv } from '../../../utilities/components/AnimatedWayPoint'
import { Drawer, Button, Row, Col, Card, Typography, Avatar } from 'antd';
import { Link } from 'react-router-dom'
import * as Param from '../../../redux/Param'
import { connect } from 'react-redux'
import * as React from 'react';
import { CalendarOutlined, DatabaseOutlined, BorderOuterOutlined, UploadOutlined, HomeOutlined, HomeFilled } from '@ant-design/icons';
const { Meta } = Card;

const { Title } = Typography;

class Manager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };

  }



  componentDidMount() {
    // this.getClients(1, 5)
  }



  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false, type: ''
    });
  };


  render() {
    return (
      <AnimatedWayPointDiv>
      
        <Title level={2}>Manage</Title>
        <Row gutter={[8, 8]}>
          <Col xs={8}>
            <Link to="/event">
              <Card
                hoverable
                actions={[
                  <Link to="/manage">
                    <Button onClick={() => {
                    }} icon="plus">
                      Create Form
                  </Button>
                  </Link>
                ]}
              >
                <Meta
                  avatar={<Avatar size={50} icon={<UploadOutlined />} />}
                  title="Application Form"
                  description="Forms that allow customers to apply for tickets, which can be reviewed and sent as invitations."
                />
              </Card>
            </Link>
          </Col>
          <Col xs={8} >
            <Link to="/venues">
              <Card
                hoverable
                actions={[
                  <Link to="/venues?add">
                    <Button onClick={() => {
                    }} type="primary">
                      24 venues
                  </Button>
                  </Link>,
                  <Link to="/">
                    <Button onClick={() => {
                    }} icon="plus">
                      Create venues
                  </Button>
                  </Link>
                ]}
              >
                <Meta
                  avatar={<Avatar size={50} icon={<HomeFilled />} />}
                  title="Venues"
                  description="Location information for events (incl. name, address, time zone, etc.)."
                />
              </Card>
            </Link>
          </Col>
          {/* <Col xs={8}>
            <Link to="/venues">
            <Card
                hoverable
                actions={[
                  <Link to="/venues?add">
                    <Button onClick={() => {
                    }} type="primary">
                      24 venues
                  </Button>
                  </Link>,
                  <Link to="/">
                    <Button onClick={() => {
                    }} icon="plus">
                      Create venues
                  </Button>
                  </Link>
                ]}
              >
                <Meta
                  avatar={<Avatar size={50} icon={<HomeFilled />} />}
                  title="Venues"
                  description="Location information for events (incl. name, address, time zone, etc.)."
                />
              </Card>
            </Link>
          </Col> */}
        </Row>

        <Drawer
          width={320}
          title={this.state.type === 'add' ? "Create a new Client" : "Edit existing Client"}
          onClose={this.onClose}
          visible={(this.state.visible)}
          bodyStyle={{ paddingBottom: 80 }}
        >

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
        </Drawer>
      </AnimatedWayPointDiv>
    );
  }
}



const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch
  }
}
const mapStateToProps = (state) => ({
  loading_api: state.param[Param.LOADING_API]
});

export default connect(mapStateToProps, mapDispatchToProps)(Manager)
