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
  Popconfirm,
  Menu,
  List,
  Checkbox,
  Skeleton,
  Modal,
  Form,
  Alert,
  Select,
  Divider,
  
  Collapse,
} from "antd";

import * as Param from "../../../redux/Param";
import { connect } from "react-redux";
import * as React from "react";
import {
  EnvironmentFilled,
  CopyOutlined,
  DownOutlined,
  SearchOutlined,
  EditOutlined,
  CaretRightOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const { TextArea } = Input;
const { Option } = Select;
const { Panel } = Collapse;

const count = 3;

const { Title,Text } = Typography;

class OrderDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: "",
      initLoading: true,
      loading: false,
      visibleEdit: false,
      dataInfo: [
        {
          title: "Name",
          value: "Hassan Sarabli",
        },
        {
          title: "Address",
          value: "AU",
        },
        {
          title: "Phone",
          value: "00989999654212",
        },
        {
          title: "Email",
          value: "hassan@gmail.com",
        },
        {
          title: "Application Forms",
          value: "No Submissions Found",
        },
      ],
      data: [
        {
          id: 123132,
          name: "Hassan Sarabli",
          barcode: "14785698547",
          event: `GOOGOOSH in Melbourne Convention Centre`,
          address: " Sun. 13 Dec, 2015 7:30pm - 11:45pm AEDT",
          eventId: "40285465",
          level: "Section 16: Enter via Door 6, Row M Seat 166",
          price: "AUD $125.79",
          service_fee: "AUD $1.95",
        },
      ],
      dataPayment: [
        {
          id: "FZUUF8Y7R6042824",
          type: "Hassan Sarabli",
          paid_by: "Hassan Sarabi",
          amount: `AUD $667.00`,
          date: "Sat. 12 Sep, 2015 at 5:55pm",
        },
      ],
      dataAdditionalFees: [
        {
          name: "Admin + Ticketing Fees + CC transaction Fees",
          fee_total: "AUD $28.30	",
          buyer: "AUD $28.30",
          seller: "AUD $0.00",
        },
      ],
    };
  }
  setupMenuSort = () => {
    this.setState({
      menu: (
        <Menu onClick={this.handleMenuClick}>
          <Menu.Item key="1"> Order </Menu.Item>
          <Menu.Item key="2"> Event </Menu.Item>
        </Menu>
      ),
    });
  };
  handleMenuClick(e) {
    // message.info('Click on menu item.');
    console.log("click", e);
  }

  componentDidMount() {
    this.setupMenuSort();
  }

  getColumns() {
    return [
      {
        title: "NAME ON TICKET",
        dataIndex: "name",
        key: "name",
        render: (name) => <>{name}</>,
      },
      {
        title: "BARCODE",
        dataIndex: "barcode",
        key: "barcode",
      },
      {
        title: "EVENT",
        dataIndex: "event",
        key: "event",
        render: (event, data) => (
          <>
            {event}
            <address>{data.address}</address>
            <span>EVENT ID: {data.eventId}</span>
          </>
        ),
      },
      {
        title: "LEVEL",
        dataIndex: "level",
        key: "level",
      },
      {
        title: "PRICE",
        dataIndex: "price",
        key: "price",
      },
      {
        title: "SERVICE FEE",
        dataIndex: "service_fee",
        key: "service_fee",
      },
      {
        title: "MANAGE",
        dataIndex: "",
        key: "x",
        render: () => (
          <Popconfirm
            title="Are you sure you want to void this ticket?
            Voiding will not process a refund.
            Voiding a ticket cannot be undone."
            onConfirm={this.confirm}
            onCancel={this.cancel}
            okText="OK"
            cancelText="Cancel"
          >
            <Button>Void Ticket</Button>,
          </Popconfirm>
        ),
      },
    ];
  }
  getColumnsAdditionalFees() {
    return [
      {
        title: "NAME",
        dataIndex: "name",
        key: "name",
        render: (name) => <>{name}</>,
      },
      {
        title: "FEE TOTAL",
        dataIndex: "fee_total",
        key: "fee_total",
        repayment: 45,
      },
      {
        title: "BUYER OBLIGATION",
        dataIndex: "buyer",
        key: "buyer",
        repayment: 45,

      },
      {
        title: "SELLER OBLIGATION",
        dataIndex: "seller",
        key: "seller",
        repayment: 45,

      },
    ];
  }

  getColumnsPayment() {
    return [
      {
        title: "TRANSACTION ID",
        dataIndex: "id",
        key: "id",
        render: (name) => <>{name}</>,
      },
      {
        title: "TYPE",
        dataIndex: "type",
        key: "type",
        render: () => <>PayPal</>,
      },
      {
        title: "PAID BY",
        dataIndex: "paid_by",
        key: "paid_by",
      },
      {
        title: "AMOUNT",
        dataIndex: "amount",
        key: "amount",
      },
      {
        title: "DATE PAID",
        dataIndex: "date",
        key: "date",
      },
    ];
  }
  confirm = (e) => {
    console.log(e);
  };

  cancel = (e) => {
    console.log(e);
  };

  render() {
    const {} = this.state;

    return (
      <AnimatedWayPointDiv className="customer">
        <Title level={3}>Order Details</Title>
        <Row gutter={[16, 16]}>
          <Col xs={24}>
            <div
              style={{
                backgroundColor: "#fff",
                padding: "10px",
                marginBottom: "15px",
              }}
            >
              <Button type="primary">All Order</Button>
            </div>
          </Col>
          <Col xs={24} sm={7}>
            <Title level={4}>Order #45454545</Title>
            <Alert message="Completed - Paid in Full" type="success" showIcon />

            <Collapse
              bordered={false}
              defaultActiveKey={["1"]}
              expandIcon={({ isActive }) => (
                <CaretRightOutlined rotate={isActive ? 90 : 0} />
              )}
              className="site-collapse-custom-collapse"
            >
              <Panel
                header="Customer Information"
                key="1"
                className="site-collapse-custom-panel"
              >
                <ul className="list-customer-info">
                  <li>
                    Member Name:
                    <div> Hasssan Sarabli</div>
                  </li>
                  <li>
                    Name on Order:
                    {!this.state.editOrderName ? (
                      <div>
                        <span>Hasssan Sarabli</span>
                        <Button
                          type="link"
                          key="edit"
                          onClick={() => this.setState({ editOrderName: true })}
                        >
                          {<EditOutlined />}
                        </Button>
                      </div>
                    ) : (
                      <div>
                        <Input type="text" value="Hasssan Sarabli" />
                        <Button
                          type="link"
                          key="edit"
                          onClick={() =>
                            this.setState({ editOrderName: false })
                          }
                        >
                          {<EditOutlined />}
                        </Button>
                      </div>
                    )}
                  </li>

                  <li>
                    Email on Order:
                    <div>
                      <span>hassan.ada@gmail.com</span>
                      <Button
                        type="link"
                        key="edit"
                        onClick={() => this.setState({ editEmailName: true })}
                      >
                        {<EditOutlined />}
                      </Button>
                    </div>
                  </li>
                </ul>
              </Panel>
              <Panel
                header="Order Information"
                key="2"
                className="site-collapse-custom-panel"
                showArrow={false}
              >
                <ul className="list-customer-info">
                  <li>
                    <div>
                      <span>Current Order Total:</span>
                      <span>AUD $667.00</span>
                    </div>
                  </li>
                  <li>
                    Event:
                    <div>GOOGOOSH in Melbourne Convention Centre (4028427)</div>
                  </li>
                  <li>
                    Order Started:
                    <div>Sat. Sep 12, 2015 at 5:52pm</div>
                  </li>
                  <li>
                    Order Completed:
                    <div>Sat. Sep 12, 2015 at 5:55pm</div>
                  </li>{" "}
                  <li>
                    Confirmation ID
                    <div>F87GY51T14069260</div>
                  </li>
                </ul>
              </Panel>
              <Panel
                header="Receipt Details"
                key="3"
                className="site-collapse-custom-panel"
              >
                <ul className="list-customer-info">
                  <li>
                    <div>
                      <span>TicketsAUD</span>
                      <span> $638.70</span>
                    </div>
                    <div>
                      <span>All TicketsAUD</span>
                      <span> $628.95</span>
                    </div>
                    <div>
                      <span>Service FeesAUD</span>
                      <span> $9.75</span>
                    </div>
                  </li>
                  <li>
                    <div>
                      <span>Additional Fees</span>
                      <span> $638.70</span>
                    </div>
                  </li>
                  <li>
                    <div>
                      <span>Total</span>
                      <span> $638.70</span>
                    </div>
                  </li>
                  <li>
                    <div>
                      <span>Amount Paid</span>
                      <span> $638.70</span>
                    </div>
                  </li>
                </ul>
              </Panel>
              <Panel
                header="Delivery Information"
                key="4"
                className="site-collapse-custom-panel"
              >
                <ul className="list-customer-info">
                  <li>
                    Delivery Method:
                    <div> Print At Home</div>
                  </li>
                </ul>
              </Panel>
              <Panel
                header="Order Notes (0)"
                key="5"
                className="site-collapse-custom-panel"
              >
                <p>note</p>
              </Panel>
            </Collapse>
          </Col>
          <Col xs={24} sm={17}>
            <Title level={4}>Tickets</Title>

            <div
              style={{
                backgroundColor: "#fff",
                padding: "10px",
                marginBottom: "15px",
              }}
            >
              GOOGOOSH in Melbourne Convention Centre <br />
              <strong>Section 16: Enter via Door 6 x 5 for AUD $628.95</strong>
            </div>
            <span> Denotes a ticket has been scanned in.</span>
            <Table
              columns={this.getColumns()}
              pagination={false}
              loading={this.props.loading_api}
              dataSource={this.state.data}
              onChange={this.onChange}
            />

            <Title level={4}>Additional Fees</Title>
            <Table
              size="small"
              columns={this.getColumnsAdditionalFees()}
              pagination={false}
              dataSource={this.state.dataAdditionalFees}
              bordered
              summary={pageData => {
                let totalBorrow = 0;
                let totalRepayment = 0;
        
                pageData.forEach(({ borrow, repayment }) => {
                  totalBorrow += 2;
                  totalRepayment += 2;
                });
        
                return (
                  <>
                    <Table.Summary.Row>
                      <Table.Summary.Cell>Total</Table.Summary.Cell>
                      <Table.Summary.Cell>
                        <Text type="danger">{totalBorrow}</Text>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell>
                        <Text>{totalRepayment}</Text>
                      </Table.Summary.Cell> 
                      
                      <Table.Summary.Cell>
                        <Text>{totalRepayment}</Text>
                      </Table.Summary.Cell>
                    </Table.Summary.Row>
                   
                  </>
                );
              }}
            />

            <Title level={4}>Payments</Title>
            <div>AUD $667.00 paid toward the order total of AUD $667.00.</div>
            <Table
              columns={this.getColumnsPayment()}
              pagination={false}
              loading={this.props.loading_api}
              dataSource={this.state.dataPayment}
            />
          </Col>
        </Row>

        <Modal
          title="Edit"
          visible={this.state.visibleEdit}
          footer={null}
          // onOk={this.handleOk}
          onCancel={() => this.setState({ visibleEdit: false })}
        >
          <Form
            onSubmit={this.handleSubmit}
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 16,
            }}
            layout="horizontal"
            size="small"
          >
            <Form.Item label="Firs Name">
              {this.props.form.getFieldDecorator("name", {
                rules: [
                  {
                    required: false,
                    message: "Please input ",
                  },
                ],
              })(<Input placeholder="First Name" />)}
            </Form.Item>
            <Form.Item label="Last Name">
              {this.props.form.getFieldDecorator("last-name", {
                rules: [
                  {
                    required: false,
                    message: "Please input ",
                  },
                ],
              })(<Input placeholder="Last Name" />)}
            </Form.Item>
            <Form.Item label="Address">
              {this.props.form.getFieldDecorator("address", {
                rules: [
                  {
                    required: false,
                    message: "Please input ",
                  },
                ],
              })(<Input placeholder="" />)}
            </Form.Item>
            <Form.Item label="Address 2">
              {this.props.form.getFieldDecorator("address2", {
                rules: [
                  {
                    required: false,
                    message: "Please input ",
                  },
                ],
              })(<Input placeholder="" />)}
            </Form.Item>
            <Form.Item label="Suburb">
              {this.props.form.getFieldDecorator("Suburb", {
                rules: [
                  {
                    required: false,
                    message: "Please input ",
                  },
                ],
              })(<Input placeholder="" />)}
            </Form.Item>
            <Form.Item
              name="state"
              label="State"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please select State!",
                },
              ]}
            >
              <Select placeholder="Please select State">
                <Option value="1">Australian Capital Territory</Option>
                <Option value="2">Northern Territory</Option>
                <Option value="3">Queensland</Option>
                <Option value="3">South Australia</Option>
                <Option value="3">Tasmania</Option>
                <Option value="3">Victoria</Option>
                <Option value="3">Western Australia</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Postcode">
              {this.props.form.getFieldDecorator("Postcode", {
                rules: [
                  {
                    required: false,
                    message: "Please input ",
                  },
                ],
              })(<Input placeholder="" />)}
            </Form.Item>
            <Form.Item
              name="country"
              label="Country"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please select Country!",
                },
              ]}
            >
              <Select placeholder="Please select Country">
                <Option value="1">Australian</Option>
                <Option value="2">Iran</Option>
                <Option value="3">USA</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Note">
              {this.props.form.getFieldDecorator("note", {
                rules: [
                  {
                    required: false,
                    message: "Please input ",
                  },
                ],
              })(<TextArea rows={4} />)}
            </Form.Item>
            <Form.Item>
              <Button
                loading={this.props.loading_api}
                type="primary"
                htmlType="submit"
                className=""
              >
                {"Update"}
              </Button>
              <Button
                style={{ marginLeft: "10px" }}
                loading={this.props.loading_api}
                className=""
                onClick={() => this.setState({ visibleEdit: false })}
              >
                {"Cancel"}
              </Button>
            </Form.Item>
          </Form>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create({ name: "venue-Duplicated" })(OrderDetails));
