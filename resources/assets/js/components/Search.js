import React from 'react';
import ReactTable from 'react-table';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import matchSorter from 'match-sorter';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import { withStyles } from '@material-ui/core/styles';
import debounce from 'lodash/debounce';

import * as tgcdtActions from '../redux/tgcdt/actions';
import {getSearchData, getSearchStatuses} from './redux/reducer';
import CardNumberWithIcon from "./common/cardNumberWithIcon";

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
class Search extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
            pages: 0,
            loading: false,
        };

        this.filtering = false;

        this.onFilteredChange = this.onFilteredChange.bind(this);
        this.fetchStrategy = this.fetchStrategy.bind(this);

        this.fetchData = this.fetchData.bind(this);
        this.fetchDataWithDebounce = debounce(this.fetchData, 700);
        // ^ debounced version of "fetchData"

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
        this.setState({
            data: nextProps.data,
            pages: nextProps.statuses.lastPage,
            // loading: nexProps.statuses.fetching,
        });
    }

    fetchStrategy(tableState) {
        if(this.filtering) {
            return this.fetchDataWithDebounce(tableState)
        } else {
            return this.fetchData(tableState);
        }
    }

    onFilteredChange(column, value) {
        this.filtering = true; // when the filter changes, that means someone is typing
    }

    fetchData(state) {
        this.filtering = false;
        this.props.dispatch(tgcdtActions.getSearchRequest(state.pageSize, state.page, state.sorted, state.filtered));
        this.setState({
            // loading: true,
        });
    }

    render() {
        const { data, pages, loading } = this.state;
        const { classes, handleFollowUpClick } = this.props;

        //const formattedData = Object.keys(data).map((key) => data[key]);
        //console.log(data);
        return (
            <div>
                <ReactTable
                    manual
                    data={data}
                    pages={pages}
                    loading={loading}
                    onFetchData={this.fetchStrategy}
                    filterable
                    onFilteredChange={this.onFilteredChange}
                    defaultPageSize={50}
                    className="-striped -highlight"
                    // getTrProps={(state, rowInfo) => {
                    //     if (rowInfo && rowInfo.row) {
                    //         console.log(rowInfo);
                    //         return {
                    //             style: {
                    //                 background: rowInfo.index === this.state.selected ? '#00afec' : 'white',
                    //                 color: rowInfo.index === this.state.selected ? 'white' : 'black'
                    //             }
                    //         }
                    //     }else{
                    //         return {}
                    //     }
                    // }}
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
                            Header: "Data",
                            id: "raw_data",
                            accessor: "raw_data",
                            maxWidth: 50,
                            Cell: row => <div onClick={() => handleFollowUpClick(row.original.id, row.original.game.id, row.original.language)}>{row.value ? <CheckCircleIcon className={classes.goodIcon} /> : <CancelIcon className={classes.badIcon} />}</div>,
                        },
                        {
                            Header: "Image",
                            id: "images",
                            accessor: "images",
                            maxWidth: 50,
                            Cell: row => <div>{row.value.length > 0 ? <CheckCircleIcon className={classes.goodIcon} /> : <CancelIcon className={classes.badIcon} />}</div>,
                        },
                        {
                            Header: "Card Number",
                            id: "card_number",
                            accessor: "card_number",
                            maxWidth: 125,
                            filterMethod: (filter, rows) =>
                                matchSorter(rows, filter.value, { keys: ["card_number"] }),
                            filterAll: true,
                            Cell: (row) => {
                                return <CardNumberWithIcon iconName={row.original.set_icon}
                                                           cardNumber={row.original.card_number}/>;
                            },
                        },
                        {
                            Header: "Printed Name",
                            id: "printed_name",
                            accessor: "printed_name",
                            filterMethod: (filter, rows) =>
                                matchSorter(rows, filter.value, { keys: ["printed_name"] }),
                            filterAll: true,
                            Cell: row => row.value ? <Link to={`/card/${row.original.id}`} target="_blank">{row.value}</Link>: '',
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
                            Header: "Edition",
                            id: "edition",
                            accessor: "edition",
                            maxWidth: 150,
                            filterMethod: (filter, rows) =>
                                matchSorter(rows, filter.value, { keys: ["edition"] }),
                            filterAll: true,
                        },
                        {
                            Header: "Rarity",
                            id: "rarity",
                            accessor: "rarity",
                            maxWidth: 125,
                            filterMethod: (filter, rows) =>
                                matchSorter(rows, filter.value, { keys: ["rarity"] }),
                            filterAll: true,
                        },
                        {
                            Header: "Foil",
                            id: "foil_type",
                            accessor: "foil_type",
                            maxWidth: 125,
                            filterMethod: (filter, rows) =>
                                matchSorter(rows, filter.value, { keys: ["foil_type"] }),
                            filterAll: true,
                        },
                        {
                            Header: "Stamps",
                            id: "stamps",
                            accessor: "stamps",
                            maxWidth: 125,
                            filterMethod: (filter, rows) =>
                                matchSorter(rows, filter.value, { keys: ["stamps"] }),
                            filterAll: true,
                        },
                        {
                            Header: "Artist",
                            id: "artist",
                            accessor: "artist",
                            maxWidth: 50,
                            filterMethod: (filter, rows) =>
                                matchSorter(rows, filter.value, { keys: ["artist"] }),
                            filterAll: true,
                        },
                        {
                            Header: "Copyright",
                            id: "copyright",
                            accessor: "copyright",
                            maxWidth: 50,
                            filterMethod: (filter, rows) =>
                                matchSorter(rows, filter.value, { keys: ["copyright"] }),
                            filterAll: true,
                        },
                        {
                            Header: "Set",
                            id: "set",
                            accessor: (d) => (d.sets.length > 0 ? (<Link to={`/set/${d.sets[0].id}`} target="_blank">{d.sets[0].eng_name}</Link>) : ''),
                        },
                        {
                            Header: "Release Date",
                            id: "release_date",
                            maxWidth: 100,
                            accessor: (d) => (d.sets.length > 0 ? d.sets[0].release_date : ''),
                        },
                        {
                            Header: "Game",
                            id: "game",
                            maxWidth: 100,
                            accessor: (d) => d.game.en_name,
                            Cell: (row) => {
                                //console.log(row.original.game.logo);
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
    data: getSearchData(state),
    statuses: getSearchStatuses(state),
});

const mapDispatchToProps = (dispatch) => ({
    dispatch,
});

Search.propTypes = {
    classes: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
    data: PropTypes.array,
    statuses: PropTypes.object,
    handleFollowUpClick: PropTypes.func,
};

Search.defaultProps = {
    classes: {},
    data: [],
    statuses: {},
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Search));
