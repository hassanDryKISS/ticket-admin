
import { AnimatedWayPointDiv } from '../../../utilities/components/AnimatedWayPoint'
import { Drawer, Table, Button, Tooltip, Icon, Popconfirm, Tabs, Row, Col, Typography } from 'antd';
import AreaChart from './AreaChart'
import DashboardDescription from './DashboardDescription'
import DashboardList from './DashboardList'

import notif from '../../../utilities/Functions/Notification'
import ClientApis from '../../../api/componentApi/ClientApis'
import * as Param from '../../../redux/Param'
import { connect } from 'react-redux'
import { queryString } from 'query-string'
import * as React from 'react';

const { TabPane } = Tabs;
const { Text } = Typography;






class ClientList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
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

  cancelDelete(e) {
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

        <Row >
          <Col xs={24}>
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
    

        <Row gutter={[8,8]} style={{marginTop: '20px'}}>
          <Col xs={24} md={18}>
            <DashboardList />
          </Col>
          <Col xs={24} md={6}>
            <DashboardDescription />
          </Col>
        </Row>
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

export default connect(mapStateToProps, mapDispatchToProps)(ClientList)
