import { AnimatedWayPointDiv } from "../../../utilities/components/AnimatedWayPoint";
import {
  Drawer,
  Table,
  Button,
  Tooltip,
  Icon,
  Typography,
  Tabs,
  Row,
  Col,
  Card,
  Avatar,
} from "antd";
import { Link } from "react-router-dom";

import * as Param from "../../../redux/Param";
import { connect } from "react-redux";
import * as React from "react";
import {
  ShoppingOutlined,
  FolderOutlined,
  UserOutlined,
  BarcodeOutlined,
  DollarOutlined,
  FileDoneOutlined,
  ShakeOutlined,
  RightOutlined,
} from "@ant-design/icons";

const { Title } = Typography;
const { TabPane } = Tabs;
const { Meta } = Card;

class CreateReports extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      tabs: [],
      contentTickets: [
        {
          title: "Ticket Detail Report",
          description:
            "List of all tickets (live and void) for selected event(s) and date range.",
          link: "",
        },
        {
          title: "Ticket Counts by Price Level",
          description:
            "Counts of tickets (live and void) for each price level.",
          link: "",
        }, {
          title: "Ticket Counts by Date",
          description:
            "Counts of tickets (live and void) for each price level organized by date of purchase.",
          link: "",
        }, {
          title: "Ticket Report with Question Responses",
          description:
            "List of all tickets (live and void) including customer question responses.",
          link: "",
        },{
          title: "Discount Coupon Summary",
          description:
            "Summary of total tickets and discounts organized by each discount coupon.",
          link: "",
        },
      ],
      contentOrders: [
        {
          title: "Order Detail Report",
          description:
            "List of all orders for selected event(s) and date range.",
          link: "",
        },
        {
          title: "Order Summary by Date",
          description:
            "Summary of orders organized by date of purchase.",
          link: "",
        }, {
          title: "Order Summary by City",
          description:
            "Summary of orders organized by the customer's city (and state, where applicable).",
          link: "",
        }, {
          title: "Orders with Tickets and Products",
          description:
            "List of all orders that include products.",
          link: "",
        },{
          title: "Legacy Order Report",
          description:
            "List of all orders. (Features same breakdown as legacy Report Builder.)",
          link: "",
        },
      ],
      contentFinanceItems: [
        {
          title: "Finance Detail Report",
          description:
            "List of all transactions that have occurred within selected event(s) and date range.",
          link: "",
        },
        {
          title: "Ticket Revenue Summary",
          description:
            "Summary of all ticket, donation, and service fee revenue organized by event.",
          link: "",
        }, {
          title: "Event Revenue and Ticket Counts",
          description:
            "Ticket, product, and fee revenue organized by price level and product. Includes ticket counts, as well as delivery and custom fees.",
          link: "",
        }
      ],
      contentScanLogs: [
        {
          title: "Scan Detail Report",
          description:
            "Counts of total scans in and scans out of selected event(s).",
          link: "",
        },
        {
          title: "Scan Overview",
          description:
            "Summary of all ticket, donation, and service fee revenue organized by event.",
          link: "",
        }, {
          title: "Ticket Scans By Hour",
          description:
            "Counts of scans in and scans out of an event organized by hour.",
          link: "",
        } ,{
          title: "Tickets Scanned in by Price Level",
          description:
            "Counts of tickets scanned in, organized by each price level.",
          link: "",
        } ,{
          title: "Tickets Scanned in by User",
          description:
            "Counts of tickets scanned in, organized by each scanner user.",
          link: "",
        }
      ],
      contentCustomers: [
        {
          title: "Customer Detail Report",
          description:
            "List of customers including email, location, and a summary of purchase behavior.",
          link: "",
        },
        {
          title: "Email Opt-In Summary",
          description:
            "List of customers organized by marketing opt-in status.",
          link: "",
        }, {
          title: "Customer Segments",
          description:
            "Open the Customer Segments tool in a new tab for more advanced customer filter options.",
          link: "",
        }
      ],
      contentProducts: [
        {
          title: "Product Detail Report",
          description:
            "List of all products sold for selected event(s) and date range.",
          link: "",
        },
        {
          title: "Product Configuration Summary",
          description:
            "Product totals and revenue organized by configuration (e.g., size).",
          link: "",
        }, {
          title: "Product Summary by Event",
          description:
            "Product totals and revenue organized by event.",
          link: "",
        },{
          title: "Product Sales Channel Summary",
          description:
            "Summary of products sold, organized by sales channel (e.g., online, box office).",
          link: "",
        },{
          title: "Product Summary by Date",
          description:
            "Summary of products sold, organized by date of purchase.",
          link: "",
        }
      ],
      contentSummeryExport: [
        {
          title: "Summary Exports",
          description:"Open the Summary Exports menu.",
          link: "",
        },
      ],
    };
  }

  renderContent = (contents = []) => {
    
    return (
      <Row gutter={[16,16]} style={{display: 'flex', flexWrap : 'wrap'}} >
        {contents.map((item) => (
          <Col xs={8}>
            <Link to={item.link}>
              <Card
                hoverable
                title={item.title}
                size="small"
                extra={<RightOutlined />}
                style={{height: '100%'}}
              >
                <p>{item.description}</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    );
  };
  setupContents = () => {
    this.setState({
      tabs: [
        {
          title: (
            <div style={{ textAlign: "center" }}>
              <div>
                <ShakeOutlined style={{ fontSize: "32px" }} />
              </div>
              Tickets
            </div>
          ),
          description : 'View information for every ticket sold, including barcodes, ticket IDs, and associated customer information. Recommended for event summaries and reporting on tickets only. (Does not include products.)',
          content: this.renderContent(this.state.contentTickets),
          key: "1",
        },
        {
          title: (
            <div style={{ textAlign: "center" }}>
              <div>
                <FileDoneOutlined style={{ fontSize: "32px" }} />
              </div>
              Orders
            </div>
          ),
          description : 'View complete information for all orders, including products and all additional order-level items, such as donations and delivery fees. ',
          content: this.renderContent(this.state.contentOrders),
          key: "2",
        },
        {
          title: (
            <div style={{ textAlign: "center" }}>
              <div>
                <DollarOutlined style={{ fontSize: "32px" }} />
              </div>
              Finance Items
            </div>
          ),
          description : 'View a breakdown of each individual line item for every payment or transaction — such as fees, ticket costs, donations, and refunds. Designed for accountants and financial teams, and used for reconciliations and settlements. ',
          content: this.renderContent(this.state.contentFinanceItems),
          key: "3",
        },
        {
          title: (
            <div style={{ textAlign: "center" }}>
              <div>
                <BarcodeOutlined style={{ fontSize: "32px" }} />
              </div>
              Scan Logs
            </div>
          ),
          description : `View a custom, downloadable version of the scanner's scan logs report.Includes admissions information such as barcodes, scan time, and scanner user`,
          content: this.renderContent(this.state.contentScanLogs),
          key: "4",
        },
        {
          title: (
            <div style={{ textAlign: "center" }}>
              <div>
                <UserOutlined style={{ fontSize: "32px" }} />
              </div>
              Customers
            </div>
          ),
          description : ' View customer details like contact information, email opt-in status, and lifetime ticket totals. (Does not include individual order details.) ',
          content: this.renderContent(this.state.contentCustomers),
          key: "5",
        },
        {
          title: (
            <div style={{ textAlign: "center" }}>
              <div>
                <ShoppingOutlined style={{ fontSize: "32px" }} />
              </div>
              Products
            </div>
          ),
          description : 'View information for product orders, including product configuration details. (Does not include unsold inventory.)',
          content: this.renderContent(this.state.contentProducts),
          key: "6",
        },
        {
          title: (
            <div style={{ textAlign: "center" }}>
              <div>
                <FolderOutlined style={{ fontSize: "32px" }} />
              </div>
              Summery Export
            </div>
          ),
          description : 'Visit Summary Exports to access and download a variety of pre-formatted reports.',
          content: this.renderContent(this.state.contentSummeryExport),
          key: "7",
        },
      ],
    });
  };

  componentDidMount() {
    this.setupContents();
  }

  render() {
    return (
      <>
        <Card style={{ width: "100%", minHeight: '510px' }} title="Create Reports">
          <Tabs>
            {this.state.tabs.map((tab) => (
              <TabPane tab={tab.title} key={tab.key}>
                <p>{tab.description}</p>
                {tab.content}
              </TabPane>
            ))}
          </Tabs>
        </Card>
      </>
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateReports);
