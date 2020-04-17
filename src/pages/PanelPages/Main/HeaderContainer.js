import * as React from 'react';
import { Layout, Menu, Icon, Avatar, Dropdown } from 'antd';
import { logout } from '../../../utilities/Functions/SetupFunctions'

const { Header } = Layout;
  const { SubMenu } = Menu;


class HeaderContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  menuType(item, index) {
    if (item.subMenu.length > 0) {
      console.log('if')
      return <SubMenu
        selectedKeys={[this.props.subPageIndex]}
        key={index}
        title={
          <span>
            {/* <Icon style={{ fontSize: '22px', marginLeft: -4 }} type={item.icon} /> */}
            {item.icon}
            <span className="menu-text">{item.text}</span>
          </span>
        }
      >
        {item.subMenu.map((itemJ, indexJ) => (
          <Menu.Item className="menu-sub-text" key={(index + indexJ).toString()}>{itemJ.text}</Menu.Item>
        ))}
      </SubMenu>
    }
    else {
      return <Menu.Item onClick={() => this.props.history.push(item.page)} key={index}>
        {/* <Icon style={{ fontSize: '22px', marginLeft: -4 }} type={item.icon} /> */}
        {item.icon}
        <span className="menu-text">{item.text}</span>
      </Menu.Item>
    }
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
    console.log('this.props.pageIndex',this.props.pageIndex)

    return (
      <Header>
        {/* <Icon
          style={{ fontSize: '20px', color: collapsed ? 'white' : 'white' }}
          className={"trigger"}
          type={collapsed ? 'menu' : 'close'}
          onClick={toggle}
        /> */}
        <din>
        <Menu theme="dark" selectedKeys={[this.props.pageIndex]} mode="horizontal">
          {this.props.menu.map((item, index) => (
            this.menuType(item, index)
          ))}
        </Menu>
        </din>
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
