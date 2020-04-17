
import { List, Avatar, Button, Badge, Typography } from 'antd';

import * as React from 'react';
import { EnvironmentFilled, DashboardFilled, EditFilled, UnorderedListOutlined, FolderViewOutlined } from '@ant-design/icons';

const {Text} = Typography;

const data = [
  {
    title: 'test shabnam',
    description: 'Shabnam Ataei in Mainz, FL',
  }, {
    title: 'test shabnam',
    description: 'Shabnam Ataei in Mainz, FL',
  }, {
    title: 'test shabnam',
    description: 'Shabnam Ataei in Mainz, FL',
  },

];


class DashboardList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };

  }



  render() {
    return (
      <List
        itemLayout="horizontal"
        bordered={true}
        size="small"
        dataSource={data}
        renderItem={item => (
          <List.Item actions={[<a key="list-loadmore-edit"><DashboardFilled /></a>, <a key="list-loadmore-more"><EditFilled /></a>,<a key="list-loadmore-more"> <UnorderedListOutlined /></a>,<a key="list-loadmore-more"><FolderViewOutlined /></a>]}>
            <List.Item.Meta
              avatar={<Avatar  size={50}icon={<div style={{fontSize: "12px"}}>30 April</div>} title="30 April" />}
              title={<a href="/event">{item.title}</a>}
              description={<div><EnvironmentFilled style={{marginRight : '3px'}} />Shabnam Ataei in Mainz, FL</div>}
            />
            <div>
              <div><Badge className="site-badge-count-109" count={33} style={{ backgroundColor: '#52c41a' }} /></div>
              <div>999</div>
            </div>
          </List.Item>
        )}
      />
    );
  }
}


export default DashboardList
