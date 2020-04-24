import * as React from 'react';
import { Button, Select, Input, Form, DatePicker } from 'antd';
import _ from 'lodash'


const { RangePicker, MonthPicker } = DatePicker;

const { Option } = Select;

class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                let form = {}
                for (let i = 0; i < this.props.filters.length; i++) {
                    if (values[this.props.filters[i].key] === undefined) {
                        form[this.props.filters[i].key] = ''
                    }
                    else {
                        if (this.props.filters[i].type === 'rangePicker') {
                            form['start_createdAt'] = values[this.props.filters[i].key][0].format('YYYY-MM-DD')
                            form['end_createdAt'] = values[this.props.filters[i].key][1].format('YYYY-MM-DD')
                        } else if (this.props.filters[i].type === 'monthPicker') {
                            let date = new Date(values[this.props.filters[i].key]).setDate(1) // set 1 day
                            date = new Date(date).toJSON().split('T')[0].concat('T00:00:00.000Z')  // set time 0
                            form[this.props.filters[i].key] = date
                        } else {
                            form[this.props.filters[i].key] = values[this.props.filters[i].key]
                        }
                    }
                }

                delete form.rangePicker
                this.props.onFilter(form)
            }
        });
    };


    renderFromItems(filters) {
        const { getFieldDecorator } = this.props.form;
        return (
            filters.map((item, index) => (
                <Form.Item label={item.label} key={index}>
                    {item.type === 'input' &&
                        <>
                            {getFieldDecorator(item.key, {})(
                                <Input
                                    style={{ width: 190 }}
                                    placeholder={item.placeholder}
                                />,
                            )}
                        </>
                    }
                    {item.type === 'select' &&
                        <>
                            {getFieldDecorator(item.key, {})(
                                <Select
                                    style={{ width: 190 }}
                                    placeholder={item.placeholder}
                                    allowClear
                                >
                                    {item.data.map((itemJ, indexJ) => (
                                        <Option key={indexJ} value={itemJ.value}>{itemJ.name}</Option>
                                    ))}
                                </Select>
                            )}
                        </>
                    }
                    {item.type === 'rangePicker' &&
                        <>
                            {getFieldDecorator(item.key, {})(
                                <RangePicker style={{ width: 220 }} placeholder={item.placeholder} format="YYYY-MM-DD" />
                            )}
                        </>
                    }
                    {item.type === 'monthPicker' &&
                        <>
                            {getFieldDecorator(item.key, {})(
                                <MonthPicker style={{ width: 220 }} placeholder={item.placeholder} />
                            )}
                        </>
                    }
                    {item.type === 'selectSuggestion' &&
                        <>
                            {getFieldDecorator(item.key, {})(
                                <Select
                                    style={{ width: 220 }}
                                    showSearch
                                    placeholder={`Select a ${item.key}`}
                                    optionFilterProp="children"
                                    allowClear
                                    onSearch={
                                        _.debounce((event) => {
                                            item.getSuggestions(event)
                                        }, 685)
                                    }
                                >
                                    {item.suggestions.map((suggest, index) => (
                                        <Option value={suggest.id} key={index}>{suggest[item.value]}</Option>
                                    ))}
                                </Select>
                            )}
                        </>
                    }
                </Form.Item>
            ))
        )
    }

    clearForm() {
        let form = {}
        for (let i = 0; i < this.props.filters.length; i++) {
            form[this.props.filters[i].key] = ''
        }
        this.props.form.setFieldsValue(form);
        this.props.onFilter(form)
    }

    render() {
        const { generator, total, downloadUrl } = this.props
        return (
            <div>
                {this.props.filters.length > 0 && <div>
                    <span className="list-filter-title">
                        Filter List Options
                </span>
                    <div className="list-filter-container">
                        <Form layout="inline" onSubmit={this.handleSubmit}>
                            {this.renderFromItems(this.props.filters)}
                            <div className="list-filter-actions">
                                {generator &&
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        {downloadUrl && <Form.Item>
                                            <Button href={downloadUrl} style={{ backgroundColor: '#ccff01' }} icon="download" className="login-form-button">
                                                {`Download Generated report`}
                                            </Button>
                                        </Form.Item>}
                                        <Form.Item>
                                            <Button onClick={() => this.props.generateReport()} style={{ backgroundColor: 'yellow' }} loading={this.props.loading_api} className="login-form-button">
                                                {`Generate REPORT of ${total} items`}
                                            </Button>
                                        </Form.Item>
                                    </div>
                                }
                                <Form.Item>
                                    <Button icon="filter" loading={this.props.loading_api} type="primary" htmlType="submit" className="login-form-button">
                                        {'Submit Filters'}
                                    </Button>
                                </Form.Item>
                                <Form.Item>
                                    <Button onClick={() => this.clearForm()} loading={this.props.loading_api} ghost type="primary" className="login-form-button">
                                        {'Clear Filters'}
                                    </Button>
                                </Form.Item>
                            </div>
                        </Form>
                    </div>
                </div>}
            </div>
        )
    }
}


const WrappedForm = Form.create({ name: 'filter-from' })(Filter);
export default WrappedForm

Filter.defaultProps = {
    downloadUrl: null,
    total: 0,
    filters: [],
    generator: false
}
