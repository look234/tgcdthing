import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import * as imageActions from '../redux/image/actions';
import { getUnsortedFoldersData, getUnsortedFoldersStatuses, getUnsortedResourcesData, getUnsortedResourcesStatuses} from '../components/redux/reducer';
import ImageGallery from '../components/Image';

/* An example React component */
class ImageContainer extends React.Component {
    constructor() {
        super();
        this.state = {
            data: {},
            lastClickedImage: '',
            currentFolder: '',
            pages: 0,
            loading: false,
            mobileOpen: false,
        };
    }

    handleDrawerToggle = () => {
        this.setState(state => ({ mobileOpen: !state.mobileOpen }));
    };

    componentDidMount() {
        this.props.dispatch(imageActions.getUnsortedFoldersRequest(''));
    }

    handleClick = (name) => {
        this.props.dispatch(imageActions.getUnsortedFoldersRequest(name));
        this.props.dispatch(imageActions.getUnsortedResourcesRequest(name));
        this.setState({currentFolder: name});
    };

    handleImageClick = (key) => {
        console.log(key);
        // if (this.state.data.indexOf(key)) {
        //     this.state.data.pop(key);
        // } else {
        //     this.state.data.push(key);
        // }
        let data = {...this.state.data};
        data[key] = [];
        this.setState({data: data, lastClickedImage: key});
    };

    handleFollowUpClick = (cardId, gameId, language) => {
        console.log({s3Path: this.state.lastClickedImage, cardId, gameId, imageType: 'Front (Scan)', language});
        let data = {...this.state.data};
        data[this.state.lastClickedImage].push({cardId, gameId, language});
        this.props.dispatch(imageActions.postLinkImageToCardRequest(this.state.lastClickedImage, gameId, cardId, 'Front (Scan)', language));
        this.setState({data: data});
    };

    render() {
        console.log(this.props.resources);
        return <ImageGallery
            folders={this.props.folders}
            foldersStatuses={this.props.foldersStatuses}
            resources={this.props.resources}
            resourcesStatuses={this.props.resourcesStatuses}
            getUnsortedResources={this.handleClick}
            handleDrawerToggle={this.handleDrawerToggle}
            mobileOpen={this.state.mobileOpen}
            handleImageClick={this.handleImageClick}
            imageState={this.state.data}
            currentFolder={this.state.currentFolder}
            handleFollowUpClick={this.handleFollowUpClick}
        />;
    }
}

const mapStateToProps = (state, ownProps) => ({
    folders: getUnsortedFoldersData(state),
    foldersStatuses: getUnsortedFoldersStatuses(state),
    resources: getUnsortedResourcesData(state),
    resourcesStatuses: getUnsortedResourcesStatuses(state),
});

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
    };
};

ImageContainer.propTypes = {
    dispatch: PropTypes.func.isRequired,
    folders: PropTypes.array,
    foldersStatuses: PropTypes.object,
    resources: PropTypes.object,
    resourcesStatuses: PropTypes.object,
};

ImageContainer.defaultProps = {
    folders: {},
    foldersStatuses: {},
    resources: {},
    resourcesStatuses: {},
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ImageContainer);
