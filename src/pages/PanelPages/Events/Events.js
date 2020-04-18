
import { AnimatedWayPointDiv } from '../../../utilities/components/AnimatedWayPoint'
import { Row, Col } from 'antd';
import * as Param from '../../../redux/Param'
import UpcomingEvents from './UpcomingEvents'
import PastEvents from './PastEvents'

import { connect } from 'react-redux'
import * as React from 'react';







class Events extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };

  }








  render() {
    return (
      <AnimatedWayPointDiv>
        <Row>
          <Col xs={24}>
            <UpcomingEvents />
          </Col>
          <Col xs={24}>
            <PastEvents />
          </Col>
        </Row>
      </AnimatedWayPointDiv>
    );
  }
}



const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch
  }
}
const mapStateToProps = (state) => ({
  loading_api: state.param[Param.LOADING_API]
});

export default connect(mapStateToProps, mapDispatchToProps)(Events)
