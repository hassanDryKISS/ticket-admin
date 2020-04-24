
import { AnimatedWayPointDiv } from '../../../utilities/components/AnimatedWayPoint'
import { Modal, PageHeader, Button, Tooltip, Icon, Popconfirm, Tabs, Row, Col, Typography } from 'antd';
import AreaChart from './AreaChart'
import DashboardDescription from './DashboardDescription'
import DashboardList from './DashboardList'

import notif from '../../../utilities/Functions/Notification'
import ClientApis from '../../../api/componentApi/ClientApis'
import * as Param from '../../../redux/Param'
import { connect } from 'react-redux'
import { queryString } from 'query-string'
import * as React from 'react';
import { ReloadOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;
const { Text } = Typography;






class ClientList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleNumbersModal: false,
      type: 'add',
      data: [],
      id: -1,
      pageSize: 5,
      current: 1,
      total: 1,
    };


    this.onChange = this.onChange.bind(this)
    this.ClientServices = new ClientApis()
  }



  componentDidMount() {
    // let params = queryString.parse(this.props.history.location.search)
    // console.log(params)
    console.log(this.props.match)
    console.log(this.props.match.params)
    // this.getClients(1, 5)
  }



  getColumns() {
    return [
      {
        title: 'Client Name',
        dataIndex: 'name'
      },
      {
        title: 'Date',
        dataIndex: 'createdAt',
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <Tooltip title="edit">
              <Button onClick={() => {
                this.setState({ type: 'edit', id: record.id })
                this.showDrawer()
              }} style={{ marginRight: 10 }} type="primary" shape="circle">
                <Icon style={{ fontSize: '18px' }} type={'edit'} />
              </Button>
            </Tooltip>
            <Popconfirm
              title={`Are you sure delete ${record.name}?`}
              onConfirm={(e) => this.confirmDelete(e, record)}
              onCancel={(e) => this.cancelDelete(e, record)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="danger" shape="circle">
                <Icon style={{ fontSize: '18px' }} type={'delete'} />
              </Button>
            </Popconfirm>
          </span>
        ),
      },
    ];
  }


  onChange(pagination, filters, sorter, extra) {
    if (pagination.pageSize !== this.state.pageSize) {
      this.setState({ pageSize: pagination.pageSize })
      this.getClients(this.state.current, pagination.pageSize)
    }
    if (pagination.current !== this.state.current) {
      this.setState({ current: pagination.current })
      this.getClients(pagination.current, this.state.pageSize)
    }
  }

  getClients(current, pageSize) {
    this.ClientServices.get({
      limit: pageSize,
      skip: (current - 1) * pageSize
    }, (response) => {
      for (let i = 0; i < response.data.Clients.length; i++) {
        response.data.Clients[i].createdAt = this.changeDate(response.data.Clients[i].createdAt)
      }
      this.setState({ data: response.data.Clients, total: response.data.count })
    })
  }

  changeDate(date) {
    let output = new Date(date)
    return output.toDateString()
  }

  confirmDelete(e, record) {
    this.ClientServices.delete(record.id, (response) => {
      notif('success'
        , 'Success',
        'Client Successfully deleted')
      this.getClients(this.state.current, this.state.pageSize)
    })
  }

  onClose=()=>{
    this.setState({
      visibleNumbersModal : false
    })
  }




  render() {
    return (
      <AnimatedWayPointDiv>

        <Row >
          <Col xs={24}>
            <div>
              
            

            <PageHeader
              className="site-page-header"
              // onBack={() => null}
              title={`Activity for 30 Days`}
              subTitle=""
              tags={[<Button type="link" key="3" size="small"><ReloadOutlined />Refresh</Button>, <span onClick={()=> this.setState({visibleNumbersModal: true})}>What are these numbers?</span>]}
              extra={[
                <Button key="3" size="small" type="primary">30 DAYS</Button>,
                <Button key="2" size="small" >7 DAYS</Button>,
                <Button key="1" size="small" >
                  24 HOURS
                </Button>,
              ]}
            />
            </div>
          <Tabs tabPosition={'left'}>
            <TabPane tab={<div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
              <Text>Tickets Sold</Text>
              <Text strong>0</Text>
              <Text>SAME AS PAST 30 Days</Text>
            </div>} key="1">
              <div>
                <AreaChart />
              </div>
            </TabPane>
            <TabPane tab={
              <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
                <Text>Ticket Revenue</Text>
                <Text strong>AUD $0.00</Text>
                <Text>SAME AS PAST 30 Days</Text>
              </div>
            } key="2">
              <div>
                <AreaChart />
              </div>

            </TabPane>
            <TabPane tab={
              <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
                <Text>Conversion Rates</Text>
                <Text strong>0.0%</Text>
                <Text>SAME AS PAST 30 Days</Text>
              </div>
            } key="3">
              <div>
                <AreaChart />
              </div>

            </TabPane>
          </Tabs>
          </Col>
        </Row>


      <Row gutter={[8, 8]} style={{ marginTop: '20px' }}>
        <Col xs={24} md={18}>
          <PageHeader
            className="site-page-header"
            // onBack={() => null}
            title={`Upcoming Events`}
            subTitle=""
            extra={[
              <Button key="3" size="small">View All Upcoming Events</Button>,

            ]}
          />
          <DashboardList />
        </Col>
        <Col xs={24} md={6}>
          <DashboardDescription />
        </Col>
      </Row>
      <Modal
                title=""
                visible={this.state.visibleNumbersModal}
                footer={null}
                // onOk={this.handleOk}
                onCancel={this.onClose}
              >

                <p>This is a snapshot of your recent ticket sales. The real-time data in this visual is current and accurate when you open the Dashboard; however, the data does not automatically reload and update as sales continue to happen.

Refresh the page to reload the visual and view up-to-the-minute information.

Note: Ticket Revenue is the amount of revenue generated after discounts from ticket sales. This total is only based on the face value of tickets sold and does not include fees</p>
              
              </Modal>
      </AnimatedWayPointDiv >
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

export default connect(mapStateToProps, mapDispatchToProps)(ClientList)
