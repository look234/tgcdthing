import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Search from './Search';
import CardContainer from '../containers/CardContainer';
import SetContainer from '../containers/SetContainer';
import SetSearch from './SetSearch';

const BasicExample = () => (
    <Router>
        <div>
            <Route exact path="/" component={Home} />
            <Route path="/topics" component={Topics} />
            <Route path="/card/:id" component={CardHolder} />
            <Route exact path="/set" component={SetSearchContainer} />
            <Route path="/set/:id" component={SetHolder} />
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

const Topics = ({ match }) => (
    <div>
        <h2>Topics</h2>
        <ul>
            <li>
                <Link to={`${match.url}/rendering`}>Rendering with React</Link>
            </li>
            <li>
                <Link to={`${match.url}/components`}>Components</Link>
            </li>
            <li>
                <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
            </li>
        </ul>

        <Route path={`${match.url}/:topicId`} component={Topic} />
        <Route
            exact
            path={match.url}
            render={() => <h3>Please select a topic.</h3>}
        />
    </div>
);

const Topic = ({ match }) => (
    <div>
        <h3>{match.params.topicId}</h3>
    </div>
);

export default BasicExample;