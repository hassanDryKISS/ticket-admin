import { AnimatedWayPointDiv } from "../../../utilities/components/AnimatedWayPoint";
import queryString from "query-string";
import {
  Drawer,
  Table,
  Button,
  Tooltip,
  Icon,
  Typography,
  Row,
  Col,
  Modal,
  Form,
  Input,
  Radio,
  Alert,
  DatePicker,
  Divider,
} from "antd";
import { UserOutlined, ShakeOutlined } from "@ant-design/icons";
import * as Param from "../../../redux/Param";
import { connect } from "react-redux";
import * as React from "react";
import moment from "moment";

const { RangePicker } = DatePicker;

const dateFormat = "YYYY/MM/DD";
const monthFormat = "YYYY/MM";

const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];

const { Title } = Typography;

class DetailsReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      params: {},
      pageSize: 5,
      current: 1,
      total: 1,
      filterValues: {},
      filters: [],
      data: [
        {
          key: "1",
          id: 1,
          name: "Email Opt-In Summary",
          description:
            "List of customers organized by marketing opt-in status.",
          date: "Thu. 30 Apr, 2020 at 12:00am",
          type: "Ticket report",
          author: "You",
        },
        {
          key: "2",
          id: 2,
          name: "Hard Tickets for Luna Park",
          description: "",
          date: "Thu. 30 Apr, 2020 at 12:00am",
          type: "Customer Report",
          author: "You",
        },
      ],
    };
  }

  componentDidMount() {
    let params = queryString.parse(this.props.history.location.search);
    console.log(params);
    console.log(this.props.history.location);
  }

  getColumns() {
    return [
      {
        title: "",
        dataIndex: "",
        render: (_, data) => (
          <div>
            {data.id === 1 ? (
              <ShakeOutlined style={{ fontSize: "32px" }} />
            ) : (
              <UserOutlined style={{ fontSize: "32px" }} />
            )}
          </div>
        ),
      },

      {
        title: "Name",
        dataIndex: "name",
        sorter: (a, b) => a.name - b.name,
        render: (name, data) => (
          <div>
            <div>{name}</div>
            {data.description}
          </div>
        ),
      },
      {
        title: "Report Type",
        dataIndex: "type",
        sorter: (a, b) => a.type - b.type,
      },
      {
        title: "Author",
        dataIndex: "author",
        sorter: (a, b) => a.sold - b.sold,
      },
      {
        title: "Last Run",
        dataIndex: "date",
        sorter: (a, b) => a.date - b.date,
      },
    ];
  }

  onChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
    //  this.setState({ pageSize: pagination.pageSize })
    // this.getClients(this.state.current, pagination.pageSize)
    // if (pagination.pageSize !== this.state.pageSize) {
    //   this.setState({ pageSize: pagination.pageSize })
    //   this.getClients(this.state.current, pagination.pageSize)
    // }
    // if (pagination.current !== this.state.current) {
    //   this.setState({ current: pagination.current })
    //   this.getClients(pagination.current, this.state.pageSize)
    // }
  }

  render() {
    const { name } = this.props.match.params;
    return (
      <AnimatedWayPointDiv>
        <Title level={2}>{name}</Title>
        <Row gutter={[32, 32]}>
          <Col xs={24}>
            <Table
              columns={this.getColumns()}
              pagination={{
                showSizeChanger: true,
                pageSizeOptions: ["5", "25", "50", "100"],
                defaultCurrent: 1,
                defaultPageSize: 10,
                pageSize: this.state.pageSize,
                total: this.state.total,
              }}
              loading={this.props.loading_api}
              dataSource={this.state.data}
              onChange={this.onChange}
            />
          </Col>
        </Row>
        <Modal
          title=""
          visible={this.state.visible}
          footer={null}
          // onOk={this.handleOk}
          onCancel={() => this.setState({ visible: false })}
        >
          <div>
          <p>Order Detail Report</p>
          <small>List of all orders for selected event(s) and date range.</small>
          </div>
          <Divider />
          <Form onSubmit={this.handleSubmit}>
            <Form.Item label="Events">
              {this.props.form.getFieldDecorator("name", {
                rules: [
                  {
                    required: false,
                    message: "Please input ",
                  },
                ],
              })(
                <>
                <Button
                  
                >
                  {"Select Event"}
                </Button>
                {`   or use all event`}
                </>
              )}
            </Form.Item>
            <Divider />
            <Alert
              message={`Please limit your selection to a date range no larger than  when running on all events.`}
              type="info"
            />
            <Form.Item>
              {this.props.form.getFieldDecorator("name", {
                rules: [
                  {
                    required: false,
                    message: "Please input ",
                  },
                ],
              })(
                <RangePicker
                  defaultValue={[
                    moment("2015/01/01", dateFormat),
                    moment("2015/01/01", dateFormat),
                  ]}
                  format={dateFormat}
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button
                loading={this.props.loading_api}
                type="primary"
                htmlType="submit"
                className=""
              >
                {"Continue"}
              </Button>
              <Button
                style={{ marginLeft: "10px" }}
                loading={this.props.loading_api}
                className=""
                onClick={() => this.setState({ visibleDuplicateModal: false })}
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
)(Form.create({ name: "venue-Duplicated" })(DetailsReport));
