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
  Form,
  Alert,
  Select,
  Divider,
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
} from "@ant-design/icons";
import {Link} from 'react-router-dom'


const { TextArea } = Input;
const { Option } = Select;

const count = 3;

const { Title } = Typography;

class CustomerResults extends React.Component {
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
          status: "Completed - Paid in Full",
          reserved: 'Fri. 13 Dec, 2013 at 5:37pm',
          ticket_summery: 'summery',
          total: 'AUD $182.00',
          confId : '37171RZT2555104'
        }
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
        title: 'ORDER ID',
        dataIndex: 'id',
        key: 'id',
        render: (id)=> <Link to="/order/909">{id}</Link>
      },
   {
        title: 'STATUS',
        dataIndex: 'status',
        key: 'status',
      }, {
        title: 'RESERVED',
        dataIndex: 'reserved',
        key: 'reserved',
      },{
        title: 'TICKET SUMMARY',
        dataIndex: 'ticket_summery',
        key: 'ticket_summery',
      },{
        title: 'CONFIRMATION ID',
        dataIndex: 'confId',
        key: 'confId',
      },{
        title: 'TOTAL',
        dataIndex: 'total',
        key: 'total',
      },
  
    ];
  }

  render() {
    const {} = this.state;

    return (
      <AnimatedWayPointDiv>
        <Title level={3}>Customer Info</Title>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={7}>
            <List
              style={{ backgroundColor: "#fff" }}
              size="small"
              header={<div>Hassan Sarabi</div>}
              bordered
              dataSource={this.state.dataInfo}
              renderItem={(item, index) => (
                <List.Item
                  actions={[
                    <>
                      {index < 4 && (
                        <Button
                          type="link"
                          key="edit"
                          onClick={() => this.setState({ visibleEdit: true })}
                        >
                          {<EditOutlined />}
                        </Button>
                      )}
                    </>,
                  ]}
                >
                  <List.Item.Meta
                    title={<div>{item.title}</div>}
                    description={item.value}
                  />
                </List.Item>
              )}
            />
            <TextArea rows={4} style={{ margin: "15px 0" }} placeholder="Note" />
            <Button type="primary">Create Note >></Button>
          </Col>
          <Col xs={24} sm={17}>
            <div
              style={{
                backgroundColor: "#fff",
                padding: "10px",
                marginBottom: "15px",
              }}
            >
              <Button>Resend Customer Password</Button>
            </div>
            Orders
            <div
              style={{
                backgroundColor: "#fff",
                padding: "10px",
                marginBottom: "15px",
                display: "flex",
                flexDirection: "row-reverse",
                alignItems: "center",
              }}
            >
              <Button size="small" style={{ marginLeft: "10px" }}>
                Reverse Results
              </Button>
              <Dropdown
                overlay={this.state.menu}
                placement="bottomCenter"
                trigger={["click"]}
              >
                <Button size="small">
                  Sort By <DownOutlined />
                </Button>
              </Dropdown>
            </div>
            <Table
              columns={this.getColumns()}
              pagination={false}
              loading={this.props.loading_api}
              dataSource={this.state.data}
              onChange={this.onChange}
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
)(Form.create({ name: "venue-Duplicated" })(CustomerResults));
