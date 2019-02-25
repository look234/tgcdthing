import React from 'react';
import ReactTable from 'react-table';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import matchSorter from 'match-sorter';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import { withStyles } from '@material-ui/core/styles';

import * as tgcdtActions from '../redux/tgcdt/actions';
import {getSetSearchData, getSetSearchStatuses} from './redux/reducer';

const styles = theme => ({
    icon: {
        margin: theme.spacing.unit,
    },
    goodIcon: {
        color: 'green',
    },
    badIcon: {
        color: 'red',
    }
});

/* An example React component */
class SetSearch extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
            pages: 0,
            loading: false,
        };

        this.fetchData = this.fetchData.bind(this);
    }

    componentWillMount() {
        //this.props.dispatch(tgcdtActions.getSearchRequest({search: ''}));
        this.setState({
            data: this.props.data,
            pages: this.props.statuses.lastPage,
            // loading: this.props.statuses.fetching,
        });
    }

    componentWillReceiveProps(nextProps) {
        console.log(this.state);
        console.log(nextProps.statuses);
        this.setState({
            data: nextProps.data,
            pages: nextProps.statuses.lastPage,
            // loading: nexProps.statuses.fetching,
        });
    }

    fetchData(state) {
        console.log(state.page);
        this.props.dispatch(tgcdtActions.getSetSearchRequest(state.pageSize, state.page, state.sorted, state.filtered));
        this.setState({
            // loading: true,
        });
    }

    render() {
        const { data, pages, loading } = this.state;
        const { classes } = this.props;

        //const formattedData = Object.keys(data).map((key) => data[key]);
        console.log(data);
        return (
            <div>

                <h3>Set Search</h3>
                <ReactTable
                    manual
                    data={data}
                    pages={pages}
                    loading={loading}
                    onFetchData={this.fetchData}
                    filterable
                    defaultPageSize={50}
                    className="-striped -highlight"
                    columns={[
                        {
                            Header: "id",
                            id: "id",
                            accessor: "id",
                            maxWidth: 75,
                            filterMethod: (filter, rows) =>
                                matchSorter(rows, filter.value, { keys: ["id"] }),
                            filterAll: true,
                        },
                        {
                            Header: "Cards",
                            id: "cards_count",
                            accessor: "cards_count",
                            maxWidth: 100,
                            Cell: row => row.value ? <div><CheckCircleIcon className={classes.goodIcon} />{row.value}</div> : <div><CancelIcon className={classes.badIcon} />{row.value}</div>,
                        },
                        {
                            Header: "Lang",
                            id: "language",
                            accessor: "language",
                            maxWidth: 50,
                            filterMethod: (filter, rows) =>
                                matchSorter(rows, filter.value, { keys: ["language"] }),
                            filterAll: true,
                        },
                        {
                            Header: "English Name",
                            id: "eng_name",
                            accessor: "eng_name",
                            filterMethod: (filter, rows) =>
                                matchSorter(rows, filter.value, { keys: ["eng_name"] }),
                            filterAll: true,
                            Cell: row => row.value ? <Link to={`/set/${row.original.id}`} target="_blank">{row.value}</Link>: '',
                        },
                        {
                            Header: "Product Type",
                            id: "product_type",
                            accessor: "product_type",
                            maxWidth: 250,
                            filterMethod: (filter, rows) =>
                                matchSorter(rows, filter.value, { keys: ["product_type"] }),
                            filterAll: true,
                        },
                        {
                            Header: "Release Date",
                            id: "release_date",
                            accessor: "release_date",
                            maxWidth: 100,
                            filterMethod: (filter, rows) =>
                                matchSorter(rows, filter.value, { keys: ["cards_count"] }),
                            filterAll: true,
                        },
                        {
                            Header: "Game",
                            id: "game",
                            maxWidth: 100,
                            accessor: (d) => d.game.en_name,
                            Cell: (row) => {
                                console.log(row.original.game.logo);
                                var logo = (row.original.game.logo != null ? <img src={row.original.game.logo} style={{maxWidth: 55, maxHeight: 25}} /> : '');
                                return <div>{logo}{row.original.game.en_name}</div>;
                            }
                        },
                    ]}
                />
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    data: getSetSearchData(state),
    statuses: getSetSearchStatuses(state),
});

const mapDispatchToProps = (dispatch) => ({
    dispatch,
});

SetSearch.propTypes = {
    classes: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
    data: PropTypes.array,
    statuses: PropTypes.object,
};

SetSearch.defaultProps = {
    classes: {},
    data: [],
    statuses: {},
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(SetSearch));
