
import {  Descriptions } from 'antd';
import * as React from 'react';


class DashboardDescription extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };

    }




    render() {
        return (
            <>
                <Descriptions title="24 Hours" size="small" bordered style={{ textAlign: 'center', background: 'white', paddingTop: '10px', marginBottom: 0 }}>
                    <Descriptions.Item label="Tickets Sold" span={3}>0</Descriptions.Item>
                    <Descriptions.Item label="Ticket Revenue" span={3}>0</Descriptions.Item>
                    <Descriptions.Item label="Conversion Rate" span={3}>0.0 %</Descriptions.Item>
                </Descriptions>
                <Descriptions title="7 Days" size="small" bordered style={{ textAlign: 'center', background: 'white', paddingTop: '10px', marginBottom: 0 }}>
                    <Descriptions.Item label="Tickets Sold" span={3}>0</Descriptions.Item>
                    <Descriptions.Item label="Ticket Revenue" span={3}>0</Descriptions.Item>
                    <Descriptions.Item label="Conversion Rate" span={3}>0.0%</Descriptions.Item>
                </Descriptions>
                <Descriptions title="30 Days" size="small" bordered style={{ textAlign: 'center', background: 'white', paddingTop: '10px', marginBottom: 0 }}>
                    <Descriptions.Item label="Tickets Sold" span={3}>0</Descriptions.Item>
                    <Descriptions.Item label="Ticket Revenue" span={3}>0</Descriptions.Item>
                    <Descriptions.Item label="Conversion Rate" span={3}>0.0%</Descriptions.Item>
                </Descriptions>
            </>
        );
    }
}


export default DashboardDescription
