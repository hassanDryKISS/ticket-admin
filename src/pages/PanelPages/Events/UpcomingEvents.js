
import { Button, Table, Typography, Tooltip, Badge } from 'antd';

import * as React from 'react';
import { EditFilled, UnorderedListOutlined, FolderViewOutlined, DashboardOutlined, EnvironmentFilled, PlusCircleFilled } from '@ant-design/icons';


const { Title } = Typography;

class UpcomingEvents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageSize: 5,
      current: 1,
      total: 1,
      data: [
        {
          key: '1',
          id: '1',
          event: 'test Shabnam',
          address: 'New York No. 1 Lake Park',
          date: 'Thu. 30 Apr, 2020 at 12:00am',
          sold: '3',
          total: '9',
        }, {
          key: '2',
          id: '2',
          event: 'test Shabnam',
          address: 'New York No. 1 Lake Park',
          date: 'Thu. 30 Apr, 2020 at 12:00am',
          sold: '33',
          total: '99',
        }, {
          key: '3',
          id: '3',
          event: 'test Shabnam',
          address: 'New York No. 1 Lake Park',
          date: 'Thu. 30 Apr, 2020 at 12:00am',
          sold: '98',
          total: '999',
        },

      ]
    };

  }

  changeDate(date) {
    let output = new Date(date)
    return output.toDateString()
  }


  getColumns() {
    return [
      {
        title: 'ID',
        dataIndex: 'id',
        sorter: (a, b) => a.id - b.id,
      }, {
        title: 'EVENT',
        dataIndex: 'event',
        sorter: (a, b) => a.event - b.event,

        render: (event, data) => (
          <div>
            <div>{event}</div>
            <EnvironmentFilled style={{ marginRight: '3px' }} />{data.address}</div>
        )
      },
      {
        title: 'DATE & TIME',
        dataIndex: 'date',
        sorter: (a, b) => a.date - b.date,

      }, {
        title: 'TICKETS',
        dataIndex: 'sold',
        sorter: (a, b) => a.sold - b.sold,
        render: (sold, data) => (
          <div>
            <div><Badge className="site-badge-count-109" count={sold} style={{ backgroundColor: '#52c41a' }} />/99</div>
          </div>
        )
      },
      {
        title: 'MANAGE',
        key: 'action',
        render: (text, record) => (
          <span>
            <Tooltip title="Overview">
              <Button onClick={() => {

              }} style={{ marginRight: 10 }} type="primary" shape="circle">
                <DashboardOutlined style={{ fontSize: '18px' }} />
              </Button>
            </Tooltip>
            <Tooltip title="Edit">
              <Button onClick={() => {

              }} style={{ marginRight: 10 }} type="primary" shape="circle">
                <EditFilled style={{ fontSize: '18px' }} />
              </Button>
            </Tooltip>
            <Tooltip title="Guest List">
              <Button onClick={() => {

              }} style={{ marginRight: 10 }} type="primary" shape="circle">
                <UnorderedListOutlined style={{ fontSize: '18px' }} />
              </Button>
            </Tooltip>
            <Tooltip title="View  ">
              <Button onClick={() => {

              }} style={{ marginRight: 10 }} type="primary" shape="circle">
                <FolderViewOutlined style={{ fontSize: '18px' }} />
              </Button>
            </Tooltip>

          </span>
        ),
      },
    ];
  }



  onChange(pagination, filters, sorter, extra) {
    console.log('params', pagination, filters, sorter, extra);
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

    return (
      <div>
          <Title level={2}>Upcoming Events</Title>
        <div style={{ display: 'flex', justifyContent: ' space-between' }}>
          <div style={{ marginBottom: '15px' }}>
            <Button type="primary">Create Event <PlusCircleFilled /></Button>
            <Button style={{ marginLeft: '5px' }} >View All Upcoming Events</Button>
          </div>
          <div style={{ marginBottom: '15px ' }}>
            {/* <Button onClick={this.setAgeSort}>Sort age</Button>
            <Button onClick={this.clearFilters}>Clear filters</Button>
            <Button onClick={this.clearAll}>Clear filters and sorters</Button> */}
          </div>
        </div>
        <Table
          columns={this.getColumns()}
          pagination={{
            showSizeChanger: true,
            pageSizeOptions: ['5', '25', '50', '100'],
            defaultCurrent: 1,
            defaultPageSize: 10,
            pageSize: this.state.pageSize,
            total: this.state.total,
          }}
          loading={this.props.loading_api}
          dataSource={this.state.data}
          onChange={this.onChange}
        />
      </div>
    );
  }
}


export default UpcomingEvents
