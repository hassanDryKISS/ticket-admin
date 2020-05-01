
import { AnimatedWayPointDiv } from '../../../utilities/components/AnimatedWayPoint'
import { Drawer, Table, Button, Tooltip, Icon, Modal, Form, Input, Radio } from 'antd';
import Filter from '../../../utilities/Functions/ListDynamicFilter'
import { Link } from 'react-router-dom'
import notif from '../../../utilities/Functions/Notification'
import VenueApis from '../../../api/componentApi/ClientApis'
import * as Param from '../../../redux/Param'
import VenueAddForm from './VenueAddForm'
import VenueEditForm from './VenueEditForm'
import { connect } from 'react-redux'
import * as React from 'react';
import { EnvironmentFilled, CopyOutlined } from '@ant-design/icons';







class VenueList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleDuplicateModal: false,
      type: 'add',
      data: [
        {
          key: '1',
          id: '1',
          name: 'Collingwood Hall (SEATED (PERSIANGULF STYLE ))',
          address: 'New York No. 1 Lake Park',
          type: 'Seated',
        },
        {
          key: '2',
          id: '2',
          name: 'Collingwood Hall (SEATED (PERSIANGULF STYLE ))',
          address: 'New York No. 1 Lake Park',
          type: 'Seated',
        },
        {
          key: '3',
          id: '3',
          name: 'Collingwood Hall (SEATED (PERSIANGULF STYLE ))',
          address: 'New York No. 1 Lake Park',
          type: 'Seated',
        },
      ],
      id: -1,
      pageSize: 5,
      current: 1,
      total: 1,
      filterValues: {},
      filters: []
    };


    this.onChange = this.onChange.bind(this)
    this.VenueServices = new VenueApis()
  }

  setupFilters() {
    this.setState({
      filters: [
        {
          type: 'input',
          key: 'keyword',

          placeholder: 'keyword'
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
      ], filterValues: {}
    })
  }

  componentDidMount() {
    // this.getClients(1, 5)
    this.setupFilters()

  }



  getColumns() {
    return [
      {
        title: 'ID',
        dataIndex: 'id'
      },
      {
        title: 'Venue',
        dataIndex: 'name',
        render: (event, data) => (
          <div>
            <div>{event}</div>
            <EnvironmentFilled style={{ marginRight: '3px' }} />{data.address}</div>
        )
      },
      {
        title: 'Manage',
        key: 'action',
        render: (text, record) => (
          <span>
            <Tooltip title="Edit">
              <Button onClick={() => {
                this.setState({ type: 'edit', id: record.id })
                this.showDrawer()
              }} style={{ marginRight: 10 }} type="primary" shape="circle">
                <Icon style={{ fontSize: '18px' }} type={'edit'} />
              </Button>
            </Tooltip>
            <Tooltip title="Duplicate">
              <Button onClick={() => {
                this.setState({ id: record.id, visibleDuplicateModal: true })
              }} style={{ marginRight: 10 }} type="primary" shape="circle">
                <CopyOutlined />
              </Button>
            </Tooltip>
          </span>
        ),
      },
      {
        title: 'Type',
        dataIndex: 'type',
      }
    ];
  }


  onChange(pagination, filters, sorter, extra) {
    if (pagination.pageSize !== this.state.pageSize) {
      this.setState({ pageSize: pagination.pageSize })
      this.getVenues(this.state.current, pagination.pageSize)
    }
    if (pagination.current !== this.state.current) {
      this.setState({ current: pagination.current })
      this.getVenues(pagination.current, this.state.pageSize)
    }
  }

  getVenues(current, pageSize) {
    this.VenueServices.get({
      limit: pageSize,
      skip: (current - 1) * pageSize
    }, (response) => {
      // for (let i = 0; i < response.data.Clients.length; i++) {
      //   response.data.Venue[i].createdAt = this.changeDate(response.data.Clients[i].createdAt)
      // }
      this.setState({ data: response.data.Clients, total: response.data.count })
    })
  }

  changeDate(date) {
    let output = new Date(date)
    return output.toDateString()
  }

  confirmDelete(e, record) {
    this.VenueServices.delete(record.id, (response) => {
      notif('success'
        , 'Success',
        'Venue Successfully deleted')
      this.getVenues(this.state.current, this.state.pageSize)
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
        <Link to="/venues/create">
          <Button onClick={() => {
            // this.setState({ type: 'add' })
            // this.showDrawer()
          }} style={{ marginBottom: 20 }} type="primary" icon="plus">Create Venue</Button>
        </Link>

        <Filter
          filters={this.state.filters}
          onFilter={(filterValues) => {
            this.setState({ filterValues })
            this.getVenues(this.state.current, this.state.pageSize, filterValues)
          }}
        />
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
          width={this.state.type === 'add' ? '100%' : '600'}
          title={this.state.type === 'add' ? "Create a new Venue" : "Edit Venue"}
          onClose={this.onClose}
          visible={(this.state.visible)}
          bodyStyle={{ paddingBottom: 80 }}
        >
          {this.state.type === 'add' && <VenueAddForm
            loading_api={this.props.loading_api}
            success={() => {
              notif('success'
                , 'Success',
                'Venue Successfully added')
              this.getVenues(this.state.current, this.state.pageSize)
              this.onClose()
            }}
          />}
          {this.state.type === 'edit' && <VenueEditForm
            loading_api={this.props.loading_api}
            id={this.state.id}
            success={() => {
              notif('success'
                , 'Success',
                'Venue Successfully edited')
              this.getVenues(this.state.current, this.state.pageSize)
              this.onClose()
            }}
          />}
        </Drawer>
        <Modal
          title=""
          visible={this.state.visibleDuplicateModal}
          footer={null}
          // onOk={this.handleOk}
          onCancel={() => this.setState({ visibleDuplicateModal: false })}
        >
          <Form onSubmit={this.handleSubmit}>
            <Form.Item label="Name" >
              {this.props.form.getFieldDecorator('name', {
                rules: [{ required: true, message: 'Please input name of Venue' }],
              })(
                <Input
                  placeholder="Venue Name"
                />,
              )}
            </Form.Item>
            <Form.Item label="Seating Chart Name " >
              {this.props.form.getFieldDecorator('name', {
                rules: [{ required: true, message: 'Please input Seating Chart Name ' }],
              })(
                <Input
                  placeholder="Seating Chart Name "
                />,
              )}
            </Form.Item>

            <Form.Item layout="inline" name="radio-button" label="Link to same sellers?">
              <Radio.Group>
                <Radio value="a">Yes</Radio>
                <Radio value="b">No</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item >
              <Button loading={this.props.loading_api} type="primary" htmlType="submit" className="">
                {'Submit Duplicated Venue'}
              </Button>
              <Button style={{ marginLeft: '10px' }} loading={this.props.loading_api} className="" onClick={() => this.setState({ visibleDuplicateModal: false })}>
                {'Cancel'}
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
    dispatch: dispatch
  }
}
const mapStateToProps = (state) => ({
  loading_api: state.param[Param.LOADING_API]
});


export default connect(mapStateToProps, mapDispatchToProps)(Form.create({ name: 'venue-Duplicated' })(VenueList))
