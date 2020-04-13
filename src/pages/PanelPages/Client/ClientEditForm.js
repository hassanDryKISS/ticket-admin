import ClientApis from '../../../api/componentApi/ClientApis'
import * as React from 'react';
import {
  Form,
  Input, Button
} from 'antd';

class ClientEditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.ClientServices = new ClientApis()
  }

  componentDidMount() {
    this.ClientServices.getById(this.props.id, (response) => {
      this.props.form.setFieldsValue({
        name: response.data.name,
      });
    })
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
        <Form.Item>
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Please input name of Client' }],
          })(
            <Input
              placeholder="Client name"
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Button loading={this.props.loading_api} type="primary" htmlType="submit" className="login-form-button">
            {'Edit Client'}
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
const WrappedEditForm = Form.create({ name: 'client-edit-detail' })(ClientEditForm);

export default WrappedEditForm