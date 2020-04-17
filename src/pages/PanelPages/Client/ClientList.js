
import { AnimatedWayPointDiv } from '../../../utilities/components/AnimatedWayPoint'
import { Drawer, Table, Button, Tooltip, Icon, Popconfirm } from 'antd';
import notif from '../../../utilities/Functions/Notification'
import ClientApis from '../../../api/componentApi/ClientApis'
import * as Param from '../../../redux/Param'
import ClientAddForm from './ClientAddForm'
import ClientEditForm from './ClientEditForm'
import { connect } from 'react-redux'
import * as React from 'react';







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
      visible: false,type : ''
    });
  };


  render() {
    return (
      <AnimatedWayPointDiv>
        <Button onClick={() => {
          this.setState({ type: 'add' })
          this.showDrawer()
        }} style={{ marginBottom: 20 }} type="primary" icon="plus">Add Client</Button>
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
          onChange={this.onChange} />
        <Drawer
          width={320}
          title={this.state.type === 'add' ? "Create a new Client" : "Edit existing Client"}
          onClose={this.onClose}
          visible={(this.state.visible)}
          bodyStyle={{ paddingBottom: 80 }}
        >
          {this.state.type === 'add' && <ClientAddForm
            loading_api={this.props.loading_api}
            success={() => {
              notif('success'
                , 'Success',
                'Client Successfully added')
              this.getClients(this.state.current, this.state.pageSize)
              this.onClose()
            }}
          />}
          {this.state.type === 'edit' && <ClientEditForm
            loading_api={this.props.loading_api}
            id={this.state.id}
            success={() => {
              notif('success'
                , 'Success',
                'Client Successfully edited')
              this.getClients(this.state.current, this.state.pageSize)
              this.onClose()
            }}
          />}
        </Drawer>
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
