import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Search from './Search';
import CardContainer from '../containers/CardContainer';
import SetContainer from '../containers/SetContainer';
import SetSearch from './SetSearch';
import ImageGallery from '../containers/ImageContainer';

const BasicExample = () => (
    <Router>
        <div>
            <Route exact path="/" component={Home} />
            <Route path="/card/:id" component={CardHolder} />
            <Route exact path="/set" component={SetSearchContainer} />
            <Route path="/set/:id" component={SetHolder} />
            <Route path="/image/gallery" component={ImageGallery} />
        </div>
    </Router>
);

const Home = () => (
    <Search/>
);

const CardHolder = ({ match }) => (
    <CardContainer id={parseInt(match.params.id)} />
);

const SetSearchContainer = () => (
    <SetSearch />
);

const SetHolder = ({ match }) => (
    <SetContainer id={parseInt(match.params.id)} />
);

export default BasicExample;