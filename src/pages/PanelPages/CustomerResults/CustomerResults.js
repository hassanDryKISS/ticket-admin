import { AnimatedWayPointDiv } from "../../../utilities/components/AnimatedWayPoint";
import {
  Drawer,
  Table,
  Button,
  Tooltip,
  Input,
  Typography,
  Row,
  Col,
  Dropdown,
  Menu,
  List,
  Checkbox,
  Skeleton,
  Modal,
} from "antd";
import {Link} from 'react-router-dom'

import Filter from "../../../utilities/Functions/ListDynamicFilter";

import notif from "../../../utilities/Functions/Notification";
import VenueApis from "../../../api/componentApi/ClientApis";
import * as Param from "../../../redux/Param";
import { connect } from "react-redux";
import * as React from "react";
import {
  EnvironmentFilled,
  CopyOutlined,
  DownOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import reqwest from "reqwest";

const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat&noinfo`;

const { Title } = Typography;

const options = [
  { label: 'Tickets purchased', value: 'Tickets purchased' },
  { label: 'Tickets canceled', value: 'Tickets canceled' },
  { label: 'Tickets purchased (including canceled)', value: 'Tickets purchased (including canceled)' },
  { label: 'Events w/ tickets purchased', value: 'Events w/ tickets purchased' },
  { label: 'Completed orders', value: 'Completed orders' },
  { label: 'Events attended (by tickets scanned or fulfilled on-site) ', value: ' Events attended (by tickets scanned or fulfilled on-site) ' },
  { label: 'Events attended (by tickets scanned)', value: 'Events attended (by tickets scanned)' },
  { label: ' Events attended (by tickets fulfilled on-site)', value: 'Events attended (by tickets fulfilled on-site)' },
  { label: ' Total spend', value: 'Total spend' },
  { label: 'Total donation', value: 'Total donation' },
  { label: ' Average spend ', value: 'Average spend' },
  { label: 'Average donation', value: 'Average doantion' },
  { label: ' Average ticket amount ', value: ' Average ticket amount ' },
  { label: ' Average tickets per order ', value: '  Average tickets per order ' },
  { label: ' Email opt-in ', value: '  Email opt-in ' },
];

class CustomerResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: "",
      initLoading: true,
      loading: false,
      visitModifyFields: false,
      data: [],
      list: [],
    };
  }
  setupMenuSort = () => {
    this.setState({
      menu: (
        <Menu onClick={this.handleMenuClick}>
          <Menu.Item key="1"> Customer ID </Menu.Item>
          <Menu.Item key="2"> First name </Menu.Item>
          <Menu.Item key="3">Last name</Menu.Item>
          <Menu.Item key="4">Email</Menu.Item>
          <Menu.Item key="5">Phone</Menu.Item>
          <Menu.Item key="6">Address Line 1</Menu.Item>
          <Menu.Item key="7">Address Line 2</Menu.Item>
          <Menu.Item key="8">City</Menu.Item>
          <Menu.Item key="9">State</Menu.Item>
          <Menu.Item key="10">ZIP Code</Menu.Item>
          <Menu.Item key="11">Country</Menu.Item>
          <Menu.Item key="12">Number of tickets purchased</Menu.Item>
          <Menu.Item key="13"> Total spend amount</Menu.Item>
        </Menu>
      ),
    });
  };
  handleMenuClick(e) {
    // message.info('Click on menu item.');
    console.log("click", e);
  }

  getData = (callback) => {
    reqwest({
      url: fakeDataUrl,
      type: "json",
      method: "get",
      contentType: "application/json",
      success: (res) => {
        callback(res);
      },
    });
  };

  onLoadMore = () => {
    this.setState({
      loading: true,
      list: this.state.data.concat(
        [...new Array(count)].map(() => ({ loading: true, name: {} }))
      ),
    });
    this.getData((res) => {
      const data = this.state.data.concat(res.results);
      this.setState(
        {
          data,
          list: data,
          loading: false,
        },
        () => {
          // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
          // In real scene, you can using public method of react-virtualized:
          // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
          window.dispatchEvent(new Event("resize"));
        }
      );
    });
  };
  componentDidMount() {
    this.setupMenuSort();
    this.getData((res) => {
      this.setState({
        initLoading: false,
        data: res.results,
        list: res.results,
      });
    });
  }

  render() {
    const { initLoading, loading, list } = this.state;
    const loadMore =
      !initLoading && !loading ? (
        <div
          style={{
            textAlign: "center",
            marginTop: 12,
            height: 32,
            lineHeight: "32px",
          }}
        >
          <Button onClick={this.onLoadMore}>Show More Customer</Button>
        </div>
      ) : null;
    return (
      <AnimatedWayPointDiv>
        <Title level={3}>Customers All customers</Title>
        <div
          style={{
            backgroundColor: "#fff",
            padding: "10px",
            marginBottom: "15px",
          }}
        >
          <Button type="primary">Create Segment</Button>
        </div>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={15}>
            <Input
              size="large"
              placeholder="Search..."
              prefix={<SearchOutlined />}
            />
          </Col>
          <Col xs={24} sm={3}>
            <Dropdown
              overlay={this.state.menu}
              placement="bottomCenter"
              trigger={["click"]}
            >
              <Button size="large" block>
                Sort By <DownOutlined />
              </Button>
            </Dropdown>
          </Col>
          <Col xs={24} sm={3}>
            <Button
              size="large"
              block
              onClick={() =>
                this.setState({
                  visitModifyFields: true,
                })
              }
            >
              modify Fields
            </Button>
          </Col>
          <Col xs={24} sm={3}>
            <Button size="large" block>
              Export CSV
            </Button>
          </Col>
          <Col xs={24}>
          <strong style={{fontSize: '18px'}}>102</strong> Total Customers
            <List
              loading={initLoading}
              itemLayout="horizontal"
              loadMore={loadMore}
              dataSource={list}
              bordered
              style={{ backgroundColor: "#fff" }}
              renderItem={(item) => (
                <List.Item
                  actions={[<Button key="list-loadmore-edit"><Link to="/customer/9090">Details</Link></Button>]}
                >
                  <Skeleton avatar title={false} loading={item.loading} active>
                    <List.Item.Meta
                      avatar={
                        <div style={{ fontSize: "14px" }}>
                          <a>1232123</a>
                        </div>
                      }
                      title={<a href="https://ant.design">Hassan Gheisari</a>}
                      description={
                        <div>
                          <div>gheisari.dl@gmail.com</div>
                          <div>20 Pier Lane Maribyrnong, VIC 3032 AU</div>
                          <div>0403529809</div>
                        </div>
                      }
                    />
                    <div>
                      <div style={{ minWidth: "175px" }}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <div>
                            <span> Tickets purchased </span>
                          </div>
                          <div style={{ marginLeft: "5px" }}> 5 </div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <div>
                            <span> Total spend </span>
                          </div>
                          <div style={{ marginLeft: "5px" }}>
                            {" "}
                            <span>$</span>667.00{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Skeleton>
                </List.Item>
              )}
            />
          </Col>
        </Row>

        <Modal
          title="Set Fields"
          visible={this.state.visitModifyFields}
          footer={null}
          // onOk={this.handleOk}
          // onCancel={this.onClose}
        >
          <Checkbox.Group
            options={options}
            defaultValue={["Apple"]}
            // onChange={onChange}
          />
          <Button>Done</Button>
        </Modal>
      </AnimatedWayPointDiv>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch,
  };
};
const mapStateToProps = (state) => ({
  loading_api: state.param[Param.LOADING_API],
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomerResults);
