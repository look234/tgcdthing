import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import * as tgcdtActions from '../redux/tgcdt/actions';
import {getSetData, getSetStatuses} from '../components/redux/reducer';
import Set from '../components/Set';

/* An example React component */
class SetContainer extends React.Component {
    constructor() {
        console.log('foo');
        super();
        this.state = {
            data: [],
            pages: 0,
            loading: false,
        };
    }
    //
    componentWillMount() {
        console.log(this.props);
        this.props.dispatch(tgcdtActions.getSetRequest(this.props.id));
    }

    render() {
        return <Set id={this.props.id} setData={this.props.setData}/>;
    }
}
const mapStateToProps = (state, ownProps) => ({
    setData: getSetData(state, ownProps.id),
    statuses: getSetStatuses(state),
});

const mapDispatchToProps = (dispatch) => ({
    dispatch,
});

SetContainer.propTypes = {
    dispatch: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    setData: PropTypes.object,
    statuses: PropTypes.object,
};

SetContainer.defaultProps = {
    setData: {},
    statuses: {},
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SetContainer);
