import ClientApis from '../../../api/componentApi/ClientApis'
import * as React from 'react';
import {
  Form,
  Input, Button, Select, Radio
} from 'antd';

const { Option } = Select;
const { TextArea } = Input;


class EditEventCheckout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.ClientServices = new ClientApis()
  }

  componentDidMount() {
    // this.ClientServices.getById(this.props.id, (response) => {
    //   this.props.form.setFieldsValue({
    //     name: response.data.name,
    //   });
    // })
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.ClientServices.edit(this.props.id, values, (response) => {
          this.props.form.setFieldsValue({
            name: '',
          });
          this.props.success()
        })
      }
    });
  };
  onGenderChange = value => {
    // switch (value) {
    //   case 'male':
    //     form.setFieldsValue({
    //       note: 'Hi, man!',
    //     });
    //     return;

    //   case 'female':
    //     form.setFieldsValue({
    //       note: 'Hi, lady!',
    //     });
    //     return;

    //   case 'other':
    //     form.setFieldsValue({
    //       note: 'Hi there!',
    //     });
    // }
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item label="Fee ">
          {getFieldDecorator('fee', {
            rules: [{ required: true, message: 'Please Add Fee ' }],
          })(
            <Input disabled
              placeholder="Fee"
            />,
          )}
        </Form.Item>

        <Form.Item label="Description">
          {getFieldDecorator('description', {
            rules: [{ required: true, message: 'Please Add description' }],
          })(
            <TextArea
              placeholder="Add Description"
            />,
          )}
        </Form.Item>
        <Form.Item label="Mod">
          {getFieldDecorator('mod', {
            rules: [{ required: true, message: 'Please Add Mod   ' }],
          })(
            <Select
              placeholder="Select a mod"
              onChange={this.onGenderChange}
              allowClear
            >
              <Option value="online">Online</Option>
              <Option value="box-office">Box Office</Option>
              <Option value="both">Both</Option>
            </Select>,
          )}
        </Form.Item>
        <Form.Item name="radio-group" label="">
          <Radio.Group defaultValue={`a`}>
            <Radio value="a">Always Available</Radio>
            <Radio value="b">Never Available</Radio>
            <Radio value="c">Set Available Dates</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item>
          <Button loading={this.props.loading_api} type="primary" htmlType="submit" className="login-form-button">
            {'Save Delivery Method'}
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
const WrappedEditForm = Form.create({ name: 'client-edit-detail' })(EditEventCheckout);

export default WrappedEditForm