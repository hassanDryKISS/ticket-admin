import { AnimatedWayPointDiv } from "../../../utilities/components/AnimatedWayPoint";
import { Drawer, Table, Button, Tooltip, Icon, Typography, Row,Col } from "antd";

import * as Param from "../../../redux/Param";
import { connect } from "react-redux";
import * as React from "react";
import CreateReports from './CreateReports';
import ReportsList from "./ReportsList";

const { Title } = Typography;


class Reports extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    
    };
  }

 


  render() {
    return <AnimatedWayPointDiv>
      <Title level={2}>Reports</Title>
      <Row gutter={[32,32]}>
        <Col xs={24}>
          <CreateReports />
        </Col>
        <Col xs={24}>
          <ReportsList />
        </Col>
      </Row>

    </AnimatedWayPointDiv>;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch,
  };
};
const mapStateToProps = (state) => ({
  loading_api: state.param[Param.LOADING_API],
});

export default connect(mapStateToProps, mapDispatchToProps)(Reports);
