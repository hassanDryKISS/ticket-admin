import ClientApis from '../../../api/componentApi/ClientApis'
import * as React from 'react';
import {
  Form,
  Input, Button,
  InputNumber,
  Upload,
  Select, Typography,
  Row, Col, Drawer
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import CreateSeats from './CreateSeats';

const { Option } = Select;
const { Title } = Typography;

const normFile = e => {
  console.log('Upload event:', e);
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};
class VenueAddForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleBlockDrawer: false
    };
    this.VenueServices = new ClientApis()
  }



  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.VenueServices.create(values, () => {
          this.props.form.setFieldsValue({
            name: ''
          });
          this.props.success()
        })
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="full-window">
        <div className="main-style" style={{ maxWidth: '1024px', margin: '0 auto' }}>
          <div className="content-container">
            <Row>
              <Col>
                <Form {...layout} onSubmit={this.handleSubmit}>
                  <Title level={2}>Create Venue</Title>
                  <Form.Item label="name" >
                    {getFieldDecorator('name', {
                      rules: [{ required: true, message: 'Please input name of Venue' }],
                    })(
                      <Input
                        placeholder="Venue Name"
                      />,
                    )}
                  </Form.Item>
                  <Form.Item
                    name="type"
                    label="Venue Type"
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: 'Please select Venue Type!',
                      },
                    ]}
                  >
                    <Select placeholder="Please select a Venue">
                      <Option value="1">Seated</Option>
                      <Option value="2">General Admission</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="country"
                    label="Country"
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: 'Please select Country!',
                      },
                    ]}
                  >
                    <Select placeholder="Please select Country">
                      <Option value="1">Australian</Option>
                      <Option value="2">Iran</Option>
                      <Option value="3">USA</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item label="address">
                    {getFieldDecorator('address', {
                      rules: [{ required: true, message: 'Please input Address' }],
                    })(
                      <Input
                        placeholder="Address"
                      />,
                    )}
                  </Form.Item>
                  <Form.Item label="city">
                    {getFieldDecorator('city', {
                      rules: [{ required: true, message: 'Please input City' }],
                    })(
                      <Input
                        placeholder="city"
                      />,
                    )}
                  </Form.Item>
                  <Form.Item
                    name="state"
                    label="State"
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: 'Please select State!',
                      },
                    ]}
                  >
                    <Select placeholder="Please select State">
                      <Option value="ACT">Australian Capital Territory</Option>
                      <Option value="NSW">New South Wales</Option>
                      <Option value="NT">Northern Territory</Option>
                      <Option value="QLD">Queensland</Option>
                      <Option value="SA">South Australia</Option>
                      <Option value="TAS">Tasmania</Option>
                      <Option value="VIC">Victoria</Option>
                      <Option value="WA">Western Australia</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item label="zipCode">
                    {getFieldDecorator('zipCode', {
                      rules: [{ required: true, message: 'Please input ZipCode' }],
                    })(
                      <Input
                        placeholder="ZipCode"
                      />,
                    )}
                  </Form.Item>
                  <Form.Item
                    name="timezoneName"
                    label="Timezone Name"
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: 'Please select Timezone Name',
                      },
                    ]}
                  >
                    <Select placeholder="Please select Timezone Name">
                      <Option value="Australia/ACT">ACT (EST)</Option>
                      <Option value="Australia/North">NT (CST)</Option>
                      <Option value="Australia/NSW" selected="selected">NSW (EST)</Option>
                      <Option value="Australia/Queensland">QLD (EST)</Option>
                      <Option value="Australia/South">SA (CST)</Option>
                      <Option value="Australia/Tasmania">TAS (EST)</Option>
                      <Option value="Australia/West">WA (WST)</Option>
                      <Option value="Australia/Victoria">VIC (EST)</Option>
                    </Select>
                  </Form.Item>


                  <Form.Item label="contactName">
                    {getFieldDecorator('contactName', {
                      rules: [{ required: true, message: 'Please input Contact Name' }],
                    })(
                      <Input
                        placeholder="Contact Name"
                      />,
                    )}
                  </Form.Item>

                  <Form.Item label="description">
                    {getFieldDecorator('description', {
                      rules: [{ required: true, message: 'Please input Description' }],
                    })(
                      <Input.TextArea placeholder="Description"
                      />,
                    )}
                  </Form.Item>

                  <Form.Item label="capacity">
                    {getFieldDecorator('capacity', {
                      rules: [{ required: true, message: 'Please input Capacity' }],
                    })(
                      <InputNumber
                        placeholder="Capacity"
                      />,
                    )}
                  </Form.Item>

                  <Form.Item label="Url">
                    {getFieldDecorator('url', {
                      rules: [{ required: true, message: 'Please input URL' }],
                    })(
                      <Input
                        placeholder="URL"
                      />,
                    )}
                  </Form.Item>

                  <Form.Item label="fax">
                    {getFieldDecorator('fax', {
                      rules: [{ required: true, message: 'Please input Fax' }],
                    })(
                      <Input
                        placeholder="Fax"
                      />,
                    )}
                  </Form.Item>

                  <Form.Item label="email">
                    {getFieldDecorator('email', {
                      rules: [{ required: true, message: 'Please input Email' }],
                    })(
                      <Input
                        placeholder="Email"
                      />,
                    )}
                  </Form.Item>

                  <Form.Item label="Create Block Seat">
                    <Button onClick={() => {
                      this.setState({ visibleBlockDrawer: true })
                    }} style={{ marginBottom: 20 }} type="primary" icon="plus">Add Block</Button>
                  </Form.Item>

                  <Form.Item
                    name="upload"
                    label="Image"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    extra=""
                  >
                    <Upload name="logo" action="/upload.do" listType="picture">
                      <Button>
                        <UploadOutlined /> Click to upload
          </Button>
                    </Upload>
                  </Form.Item>




                  <Form.Item>
                    <Button loading={this.props.loading_api} type="primary" htmlType="submit" className="">
                      {'Create Venue'}
                    </Button>
                    <Button loading={this.props.loading_api} style={{ marginLeft: '10px' }} className="">
                      {'Back'}
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
              <Drawer
                width={'100%'}
                height={'100%'}
                title={"Add Block"}
                placement={'bottom'}
                onClose={() => this.setState({ visibleBlockDrawer: false })}
                visible={(this.state.visibleBlockDrawer)}
                bodyStyle={{ paddingBottom: 80 }}
              >
                <Row>
                  <Col xs={24}>
                    <CreateSeats />

                  </Col>
                  <Col xs={24}>
                    <Button type="primary">
                      {'Add Block'}
                    </Button>
                    <Button style={{ marginLeft: '10px' }} onClick={() => this.setState({ visibleBlockDrawer: false })}>
                      {'Cancel'}
                    </Button>
                  </Col>
                </Row>
              </Drawer>
            </Row>
          </div>
        </div>


      </div>

    );
  }
}
const WrappedCreateForm = Form.create({ name: 'venue-add' })(VenueAddForm);

export default WrappedCreateForm