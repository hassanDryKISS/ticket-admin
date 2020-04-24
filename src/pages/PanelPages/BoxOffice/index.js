import { Layout, Menu, Input, Calendar, Badge, List, Typography, Collapse, Row,Col, Button } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined, UnorderedListOutlined, CloseOutlined, DesktopOutlined, SettingFilled, LeftOutlined, HomeFilled } from '@ant-design/icons';
import { AnimatedWayPointDiv } from '../../../utilities/components/AnimatedWayPoint'

import * as Param from '../../../redux/Param'

import { connect } from 'react-redux'
import * as React from 'react';
import moment from 'moment';
const { Search } = Input;
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const { Panel } = Collapse;


const data = [

];
function getListData(value) {
  let listData;
  switch (value.date()) {
    case 8:
      listData = [
        { type: 'warning', content: 'This is warning event.' },
        { type: 'success', content: 'This is usual event.' },
      ];
      break;
    case 10:
      listData = [
        { type: 'warning', content: 'This is warning event.' },
        { type: 'success', content: 'This is usual event.' },
        { type: 'error', content: 'This is error event.' },
      ];
      break;
    case 15:
      listData = [
        { type: 'warning', content: 'This is warning event' },
        { type: 'success', content: 'This is very long usual event。。....' },
        { type: 'error', content: 'This is error event 1.' },
        { type: 'error', content: 'This is error event 2.' },
        { type: 'error', content: 'This is error event 3.' },
        { type: 'error', content: 'This is error event 4.' },
      ];
      break;
    default:
  }
  return listData || [];
}

function dateCellRender(value) {
  const listData = getListData(value);
  return (
    <ul className="events">
      {listData.map(item => (
        <li key={item.content}>
          <Badge status={item.type} text={item.content} />
        </li>
      ))}
    </ul>
  );
}

function getMonthData(value) {
  if (value.month() === 8) {
    return 1394;
  }
}

function monthCellRender(value) {
  const num = getMonthData(value);
  return num ? (
    <div className="notes-month">
      <section>{num}</section>
      <span>Backlog number</span>
    </div>
  ) : null;
}




class BoxOffice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: moment('2017-01-25'),
      selectedValue: moment('2017-01-25'),
    };

  }
  onSelect = value => {
    this.setState({
      value,
      selectedValue: value,
    });
  };

  onPanelChange = value => {
    this.setState({ value });
  };

  componentDidMount() {


  }

  render() {
    const { value, selectedValue } = this.state;
    return (
      <AnimatedWayPointDiv className="box-office">
        <Layout>
          <Header className="header" style={{ position: 'relative' }}>
            <div>
              <Button><LeftOutlined /></Button>
              <Button style={{ marginLeft: '10px' }}><HomeFilled /></Button>

            </div>
            <Typography.Title level={4}>EVENTS</Typography.Title>
            <Menu theme="light" mode="horizontal" defaultSelectedKeys={['  ']}>
              <Menu.Item key="1"><UserOutlined style={{ marginRight: '0', fontSize: '32px' }} /></Menu.Item>
              <Menu.Item key="2"><SettingFilled style={{ marginRight: '0', fontSize: '32px' }} /></Menu.Item>
              <Menu.Item key="3"><DesktopOutlined style={{ marginRight: '0', fontSize: '32px' }} /></Menu.Item>
              <Menu.Item key="4"><CloseOutlined style={{ marginRight: '0', fontSize: '32px' }} /></Menu.Item>
            </Menu>
          </Header>
          <Layout>

            <Layout style={{ padding: '0 0 24px' }}>
              <Content
                className="site-layout-background"
                style={{
                  padding: 24,
                  margin: 0,
                  minHeight: 280,
                }}
              >
                <Row gutter={[8,8]}>
                  <Col xs={2}>
                  <Button size="large" block type="primary">List</Button>
                  </Col>
                  <Col xs={12}>
                  <Search
                    placeholder="input search text"
                    enterButton="Search"
                    size="large"
                    onSearch={value => console.log(value)}
                  />
                  </Col>
                  <Col xs={4}>
                  <Button size="large" block type="primary">No Venues Selected</Button>

                  </Col>
                  <Col xs={4}>
                  
                  <Button size="large" block type="primary">Showing All Times</Button>
                  </Col>
                  
                {/* <div>{`You selected date: ${selectedValue && selectedValue.format('YYYY-MM-DD')}`}</div> */}
                </Row>
                <Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender} value={value} onSelect={this.onSelect} onPanelChange={this.onPanelChange} />
              </Content>
            </Layout>
            <Sider width={300} className="site-layout-background">
              <div style={{ background: '#001428', textAlign: 'center', padding: '20px' }}>
                <Typography.Title style={{ color: '#fff', lineHeight: 1 }}> AUD$ 0.00</Typography.Title>
                <Typography.Text style={{ color: '#fff', lineHeight: 1 }}> OrderTotal</Typography.Text>
              </div>
              <Collapse
                bordered={false}
                defaultActiveKey={['1', '2']}
                onChange={() => console.log('callback')}

              >
                <Panel header="Order Details" key="1" >
                  <div>
                    <List
                      bordered={false}
                      dataSource={data}
                      renderItem={item => (
                        <List.Item>
                          <Typography.Text mark>[ITEM]</Typography.Text> {item}
                        </List.Item>
                      )}
                    />
                  </div>
                </Panel>
                <Panel header="Totals" key="2">
                  <div><List
                    bordered={false}
                  >
                    <List.Item>
                      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <div>Delivery Fees</div>
                        <div>AUD$20.2</div>
                      </div>
                    </List.Item>
                    <List.Item>
                      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <div>Service Fees</div>
                        <div>AUD$20.2</div>
                      </div>
                    </List.Item>
                    <List.Item>
                      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <div>Total</div>
                        <div>AUD$20.2</div>
                      </div>
                    </List.Item>
                  </List></div>
                </Panel>
              </Collapse>
            </Sider>
          </Layout>
        </Layout>
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


export default connect(mapStateToProps, mapDispatchToProps)(BoxOffice)
