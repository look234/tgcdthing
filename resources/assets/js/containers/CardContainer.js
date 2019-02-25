import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import * as tgcdtActions from '../redux/tgcdt/actions';
import {getCardData, getCardStatuses, getCardRelatedData, getCardRelatedStatuses} from '../components/redux/reducer';
import Card from '../components/Card';

/* An example React component */
class CardContainer extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
            pages: 0,
            loading: false,
        };
    }

    componentDidMount() {
        this.props.dispatch(tgcdtActions.getCardRequest(this.props.id));
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('componentDidUpdate');
        if (this.props.cardData.id !== undefined && this.props.statuses.lastUpdated !== 0 && this.props.statuses.fetching === false
            && prevProps.cardRelatedStatuses.lastUpdated === 0 && this.props.cardRelatedStatuses.fetching === false
            && prevProps.cardRelatedStatuses.fetching === false
        ) {
            this.props.getCardRelatedDataRequest(
                this.props.cardData.printed_name,
                this.props.cardData.game.id,
                this.props.cardData.language,
                'exact',
                1,
                50
            );
        }
    }

    render() {
        return <Card id={this.props.id} cardData={this.props.cardData} cardRelatedData={this.props.cardRelatedData}/>;
    }
}

const mapStateToProps = (state, ownProps) => ({
    cardData: getCardData(state, ownProps.id),
    statuses: getCardStatuses(state),
    cardRelatedData: getCardRelatedData(state),
    cardRelatedStatuses: getCardRelatedStatuses(state),
});

const mapDispatchToProps = (dispatch) => {
    return {
        getCardRelatedDataRequest: (name, gameId, language, option, page, pageSize) =>
            dispatch(tgcdtActions.getCardRelatedRequest(name, gameId, language, option, page, pageSize)),
        dispatch,
    };
};

CardContainer.propTypes = {
    dispatch: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    cardData: PropTypes.object,
    statuses: PropTypes.object,
    cardRelatedData: PropTypes.array,
    cardRelatedStatuses: PropTypes.object,
    getCardRelatedDataRequest: PropTypes.func,
};

CardContainer.defaultProps = {
    cardData: {},
    statuses: {},
    cardRelatedData: [],
    cardRelatedStatuses: {},
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CardContainer);
