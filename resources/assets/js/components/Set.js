import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ImageIcon from '@material-ui/icons/Image';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import CardImageWithBaseData from "./common/cardImageWithBaseData";

const styles = (theme) => ({
    root: {
        // fontSize:  16,
        flexGrow: 1,
    },
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    pos: {
        marginBottom: 12,
    },
    heading: {
        fontWeight: 'bold',
    },
    dropzone: {
        border: 'solid 1px #000000',
        height: 150,
        width: 150,
        display: 'inline-block',
        margin: 5,
        '& div': {
            width: '100%',
            height: '100%',
            '& p': {
                paddingTop: '40%',
                textAlign: 'center',
            }
        }
    },
});

function Set(props) {
    const {classes, id, setData} = props;
    const loading = (<div className={classes.loading}><CircularProgress className={classes.progress} size={50} /></div>);

    let content = null;
    let cardContent = loading;
    let parentSets = loading;
    let childSets = loading;

    if (setData.cards) {
        if (setData.cards.length > 0) {
            console.log(setData.cards);
            const cardContentData = setData.cards.map((data) => {
                return (
                    <Grid item xl={1} lg={2} md={3} sm={6} xs={12}>
                        <CardImageWithBaseData cardData={data}/>
                    </Grid>
                );
            });
            cardContent = (<ExpansionPanel expanded>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="headline" className={classes.heading}>Cards found in set: {setData.cards ? setData.cards.length : 0}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Grid container spacing={24}>
                        {cardContentData}
                    </Grid>
                </ExpansionPanelDetails>
            </ExpansionPanel>);
        } else {
            cardContent = null;
        }
    }

    if (setData.parent_sets) {
        if (setData.parent_sets.length > 0) {
            const parentSetsData = setData.parent_sets.map((data) => {
                const primaryText = `${data.release_date ? data.release_date : ''} • ${data.eng_name ? data.eng_name : ''}`;
                const secondaryText = `${data.language ? data.language : ''}`;
                return (
                    <ListItem button component="a" href={`/set/${data.id}`}>
                        <ListItemIcon>
                            <ImageIcon/>
                        </ListItemIcon>
                        <ListItemText
                            disableTypography
                            inset
                            primary={<Typography variant="title">{primaryText}</Typography>}
                            secondary={<Typography variant="subheading">{secondaryText}</Typography>}
                        />
                    </ListItem>
                );
            });
            parentSets = (<ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="headline" className={classes.heading}>Found in these sets: {setData.parent_sets ? setData.parent_sets.length : 0}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <List>
                        {parentSetsData}
                    </List>
                </ExpansionPanelDetails>
            </ExpansionPanel>);
        } else {
            parentSets = null;
        }
    }

    if (setData.child_sets) {
        if (setData.child_sets.length > 0) {
            const childSetsData = setData.child_sets.map((data) => {
                const primaryText = `${data.release_date ? data.release_date : ''} • ${data.eng_name ? data.eng_name : ''}`;
                const secondaryText = `${data.language ? data.language : ''}`;
                return (
                    <ListItem button component="a" href={`/set/${data.id}`}>
                        <ListItemIcon>
                            <ImageIcon/>
                        </ListItemIcon>
                        <ListItemText
                            disableTypography
                            inset
                            primary={<Typography variant="title">{primaryText}</Typography>}
                            secondary={<Typography variant="subheading">{secondaryText}</Typography>}
                        />
                    </ListItem>
                );
            });

            childSets = (<ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="headline" className={classes.heading}>Contains these sets: {setData.child_sets ? setData.child_sets.length : 0}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <List>
                        {childSetsData}
                    </List>
                </ExpansionPanelDetails>
            </ExpansionPanel>);
        } else {
            childSets = null;
        }
    }

    if (setData) {
        content = (
            <div>
                <Typography variant="display2">
                    {setData ? setData.eng_name : ''} [{id}]
                </Typography>
                <Typography variant="headline">
                    {setData ? setData.language : ''}
                </Typography>
            </div>
        );
    }

    return (
        <Grid container className={classes.root} spacing={24}>
            <Grid item xs={12}>
                <Card className={classes.card}>
                    <CardContent>
                        {content}
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12}>
                {parentSets}
                {childSets}
                {cardContent}
            </Grid>
        </Grid>
    );
}

Set.propTypes = {
    classes: PropTypes.object.isRequired,
    id: PropTypes.number.isRequired,
    setData: PropTypes.object.isRequired,
};

export default withStyles(styles)(Set);