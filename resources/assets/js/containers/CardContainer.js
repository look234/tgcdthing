import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import * as tgcdtActions from '../redux/tgcdt/actions';
import {getCardData, getCardStatuses} from '../components/redux/reducer';
import Card from '../components/Card';

/* An example React component */
class CardContainer extends React.Component {
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
        this.props.dispatch(tgcdtActions.getCardRequest(this.props.id));
        //this.props.dispatch(tgcdtActions.getSearchRequest({search: ''}));
        // this.setState({
        //     data: this.props.data,
        //     pages: this.props.statuses.lastPage,
        //     // loading: this.props.statuses.fetching,
        // });
    }
    //
    // componentWillReceiveProps(nextProps) {
    //     console.log(this.state);
    //     console.log(nextProps.statuses);
    //     this.setState({
    //         data: nextProps.data,
    //         pages: nextProps.statuses.lastPage,
    //         // loading: nexProps.statuses.fetching,
    //     });
    // }

    render() {
        return <Card id={this.props.id} cardData={this.props.cardData}/>;
    }
}
const mapStateToProps = (state, ownProps) => ({
    cardData: getCardData(state, ownProps.id),
    statuses: getCardStatuses(state),
});

const mapDispatchToProps = (dispatch) => ({
    dispatch,
});

CardContainer.propTypes = {
    dispatch: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    cardData: PropTypes.object,
    statuses: PropTypes.object,
};

CardContainer.defaultProps = {
    cardData: {},
    statuses: {},
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CardContainer);
