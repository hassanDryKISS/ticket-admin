import ClientApis from '../../../api/componentApi/ClientApis'
import * as React from 'react';
import {
  Form,
  Input, Button
} from 'antd';

class EditEventInventoryList extends React.Component {
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

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item label="Name">
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Please input name of Client' }],
          })(
            <Input disabled
              placeholder="Name"
            />,
          )}
        </Form.Item>
        <Form.Item label="Description">
          {getFieldDecorator('description', {
            rules: [{ required: true, message: 'Please Add description' }],
          })(
            <Input
              placeholder="Add Description"
            />,
          )}
        </Form.Item>
        <Form.Item label="Min. Tickets per Order ">
          {getFieldDecorator('description', {
            rules: [{ required: true, message: 'Please Add Min. Tickets per Order ' }],
          })(
            <Input
              placeholder="Add Description"
            />,
          )}
        </Form.Item>
        <Form.Item label="Price (Online) ">
          {getFieldDecorator('description', {
            rules: [{ required: true, message: 'Please Price (Online) ' }],
          })(
            <Input addonBefore="AUD $"
              placeholder=""
            />,
          )}
        </Form.Item>  
         <Form.Item label="Price (Box Office)*">
          {getFieldDecorator('description', {
            rules: [{ required: true, message: 'Please Price (Online) ' }],
          })(
            <Input addonBefore="AUD $"
              placeholder=""
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Button loading={this.props.loading_api} type="primary" htmlType="submit" className="login-form-button">
            {'Save Price Level'}
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
const WrappedEditForm = Form.create({ name: 'client-edit-detail' })(EditEventInventoryList);

export default WrappedEditForm