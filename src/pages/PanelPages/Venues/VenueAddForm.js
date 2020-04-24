import ClientApis from '../../../api/componentApi/ClientApis'
import * as React from 'react';
import {
  Form,
  Input, Button
} from 'antd';

class VenueAddForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.VenueServices = new ClientApis()
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.VenueServices.create(values, (response) => {
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
            {'Create Venue'}
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
const WrappedCreateForm = Form.create({ name: 'venue-add' })(VenueAddForm);

export default WrappedCreateForm