import * as React from 'react';
import { Layout, Menu, Icon, Avatar, Dropdown } from 'antd';
import { logout } from '../../../utilities/Functions/SetupFunctions'

const { Header } = Layout;

class HeaderContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    const { user, toggle, collapsed } = this.props

    const userAction = (
      <div className="profile-container">
        <Menu>
          <Menu.Item style={{ minWidth: 200 }} onClick={() => {
            logout('success', 'Success', 'You have successfully loged out')
          }}>
            <span >
              <Icon style={{ fontSize: '15px', marginRight: 10 }} type={'poweroff'} />
              <span className="user-text">{'Logout'}</span>
            </span>
          </Menu.Item>
        </Menu>
      </div>
    );

    return (
      <Header>
        <Icon
          style={{ fontSize: '20px', color: collapsed ? 'white' : 'white' }}
          className={"trigger"}
          type={collapsed ? 'menu' : 'close'}
          onClick={toggle}
        />
        <Dropdown overlay={userAction}>
          <div className="user-action">
            <span style={{ marginRight: 10 }}>{user !== undefined ? user.name : ''}</span>
            <Avatar icon="user" src={user !== undefined ? user.image : ''} />
          </div>
        </Dropdown>
      </Header>
    );
  }
}

export default HeaderContainer;
