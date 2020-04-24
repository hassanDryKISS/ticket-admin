import { checkUserAuthorized } from '../../../utilities/Functions/SetupFunctions'
import HeaderContainer from './HeaderContainer'
import * as Param from '../../../redux/Param'
import { connect } from 'react-redux'
import SideMenu from './SideMenu'
import * as React from 'react';
import { Layout, Menu, Icon } from 'antd';
import {
  MailOutlined,
  DashboardFilled,
  CalendarFilled,
  SettingFilled,
} from '@ant-design/icons';

const { Content } = Layout;


class MainContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      subPage: '',
      page: '',
      menu: [
        {
          text: 'Dashboard',
          page: '/dashboard',
          icon: <DashboardFilled />,
          subMenu: []
        },

        {
          text: 'Events',
          page: '/events-dashboard',
          icon: <CalendarFilled />,
          subMenu: [
           
          ]
        },
        {
          text: 'Manage',
          page: '/manage',
          icon: <SettingFilled />,
          subMenu: []
        },

      ],
      pageIndex: 0,
      subPageIndex: 0
    };
  }

  componentDidMount() {
    // checkUserAuthorized()
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }


  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };


  updateDimensions() {
    if (window.innerWidth > 992) {
      this.setState({ collapsed: false });
    }
    else {
      this.setState({ collapsed: true });
    }
  }

  componentDidUpdate() {
    if (this.state.page !== this.props.page) {
      this.setState({ page: this.props.page })
      if (this.state.menu.find(x => x.text === this.props.page) !== undefined) {
        this.setState({ pageIndex: this.state.menu.findIndex(x => x.text === this.props.page) })
      }
    }
    if (this.state.subPage !== this.props.subPage) {
      this.setState({ subPage: this.props.subPage })
      if
        (this.state.menu.find(x => x.text === this.state.page) !== undefined
        && this.state.menu.find(x => x.text === this.state.page).subMenu.length > 0) {
        this.setState({
          subPageIndex: this.state.menu
            .find(x => x.text === this.state.page).subMenu
            .findIndex(x => x.text === this.props.page)
        })
      }
    }
  }




  render() {
    console.log('________', this.props.children)
    return (
      <Layout className="full-window">
        <SideMenu
          pageIndex={this.state.pageIndex.toString()}
          subPageIndex={this.state.subPageIndex.toString()}
          history={this.props.history}
          menu={this.state.menu}
          collapsed={this.state.collapsed}>

            ''
          </SideMenu>
        <Layout className="main-style">
          <HeaderContainer
            history={this.props.history}
            user={this.props.user_information}
            collapsed={this.state.collapsed}
            toggle={() => this.toggle()}
            menu={this.state.menu}
            pageIndex={this.state.pageIndex.toString()}

          />
          <Content className="content-container">
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch
  }
}
const mapStateToProps = (state) => ({
  user_information: state.param[Param.USER_INFO]
});

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer)
