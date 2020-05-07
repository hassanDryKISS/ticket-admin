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
  Badge,
  Select,
  Menu, Dropdown,Rate
} from "antd";
import { Link } from "react-router-dom";
import Filter from "../../../utilities/Functions/ListDynamicFilter";
import * as Param from "../../../redux/Param";
import { connect } from "react-redux";
import * as React from "react";
import {
  DownOutlined, UserOutlined ,
  ShoppingOutlined,
  FolderOutlined,
  BarcodeOutlined,
  DollarOutlined,
  FileDoneOutlined,
  ShakeOutlined,
  RightOutlined,
} from "@ant-design/icons";

const { TabPane } = Tabs;
const { Option } = Select;



class Reportslist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      tabs: [],
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
          description: 'List of customers organized by marketing opt-in status.',
          date: "Thu. 30 Apr, 2020 at 12:00am",
         type: "Ticket report",
         author : 'You'
        },
        {
          key: "2",
          id: 2,
          name: "Hard Tickets for Luna Park",
          description: '',
          date: "Thu. 30 Apr, 2020 at 12:00am",
         type: "Customer Report",
         author : 'You'
        },
        
      ],
      menu : (
        <Menu onClick={this.handleMenuClick}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            Share
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            Rename
          </Menu.Item>
          <Menu.Item key="3" icon={<UserOutlined />}>
            Delete
          </Menu.Item>
        </Menu>
      )
    };
  }

  setupContents = () => {
    this.setState({
      tabs: [
        {
          title: "Save Reports",
          key: "1",
        },
        {
          title: "Reports Queue",
          key: "2",
        },
      ],
    });
  };

  componentDidMount() {
    this.setupContents();
    this.setupFilters();
  }

  setupFilters() {
    this.setState({
      filters: [
        {
          type: "input",
          key: "keyword",

          placeholder: "keyword",
        },
        // {
        //   type: 'input',
        //   key: 'email',
        //   label: 'Client email',
        //   placeholder: 'email'
        // },
        // {
        //   type: 'input',
        //   key: 'company',
        //   label: 'Company name',
        //   placeholder: 'company name'
        // },
        // {
        //   type: 'select',
        //   key: 'status',
        //   label: 'Client status',
        //   placeholder: 'status',
        //   data: [
        //     {
        //       name: 'Active',
        //       value: 'active'
        //     },
        //     {
        //       name: 'Deactive',
        //       value: 'deactive'
        //     },
        //   ]
        // }
      ],
      filterValues: {},
    });
  }

  getColumns() {
    return [
      {
        title: "",
        dataIndex: "",
        render: (_, data) => <div>
         {data.id === 1 ? <ShakeOutlined style={{ fontSize: "32px" }}/> : <UserOutlined style={{ fontSize: "32px" }}/>} 
        </div>,
      },
      {
        title: (<Rate count="1" defaultValue={1} disabled />),
        dataIndex: "name",
        sorter: (a, b) => a.name - b.name,
        render: (name, data) => (
          <div>
            <Rate count="1"/>
            </div>
        )
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
        )
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
      {
        title: "",
        key: "action",
        render: (text, record) => (
          <span>
            <Dropdown.Button onClick={this.handleButtonClick} overlay={this.state.menu} icon={<DownOutlined />}>
              Run Report
            </Dropdown.Button>
          </span>
        ),
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

  handleMenuClick=(e) =>{
    // message.info('Click on menu item.');
    console.log('click', e);
  }

  render() {
    return (
      <>
        <Card style={{ width: "100%", minHeight: "510px" }} title="">
          <Tabs>
            <TabPane tab={`Save Report`} key="1">
              <Filter
                filters={this.state.filters}
                onFilter={(filterValues) => {
                  this.setState({ filterValues });
                  // this.getVenues(
                  //   this.state.current,
                  //   this.state.pageSize,
                  //   filterValues
                  // );
                }}
              />
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
            </TabPane>
            <TabPane tab={`Reports Queue`} key="2">
              list
            </TabPane>
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

export default connect(mapStateToProps, mapDispatchToProps)(Reportslist);
