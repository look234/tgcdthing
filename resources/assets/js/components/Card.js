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
import CircularProgress from '@material-ui/core/CircularProgress';
import ExpansionPanel from "@material-ui/core/ExpansionPanel/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/core/SvgIcon/SvgIcon";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails/ExpansionPanelDetails";
import CardNumberWithIcon from "./common/cardNumberWithIcon";
import CardImageWithBaseData from "./common/cardImageWithBaseData";

const styles = (theme) => ({
    root: {
        fontSize: 16,
        flexGrow: 1,
    },
    card: {
        minWidth: 275,
    },
    cardDataHolder: {
        display: 'inline-block',
        verticalAlign: 'top',
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    pos: {
        marginBottom: 12,
    },
    progress: {
        margin: theme.spacing.unit * 2,
    },
    loading: {
        width: '100%',
        textAlign: 'center',
    },
    heading: {
        fontWeight: 'bold',
    }
});

function SimpleCard(props) {
    const {classes, id, cardData, cardRelatedData} = props;

    console.log(cardData);

    const loading = (<div className={classes.loading}><CircularProgress className={classes.progress} size={50}/></div>);
    let content = loading;
    let setContent = loading;
    let cardRelatedContent = loading;

    if (cardData.sets) {
        if (cardData.sets.length > 0) {
            const setContentData = cardData.sets.map((data) => {
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
                }
            );
            setContent = (<ExpansionPanel expanded>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                    <Typography variant="headline" className={classes.heading}>Found in these
                        sets: {cardData.sets ? cardData.sets.length : 0}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <List>
                        {setContentData}
                    </List>
                </ExpansionPanelDetails>
            </ExpansionPanel>);
        } else {
            setContent = null;
        }
    }

    if (cardRelatedData.length) {
        if (cardRelatedData.length > 0) {
            const cardRelatedContentData = cardRelatedData.map((data) => {
                return (
                    <Grid item xl={1} lg={2} md={3} sm={6} xs={12}>
                        <CardImageWithBaseData cardData={data}/>
                    </Grid>
                );
            });
            cardRelatedContent = (<ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                    <Typography variant="headline" className={classes.heading}>Related
                        Cards: {cardRelatedData ? cardRelatedData.length : 0}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Grid container spacing={24}>
                        {cardRelatedContentData}
                    </Grid>
                </ExpansionPanelDetails>
            </ExpansionPanel>);
        } else {
            cardRelatedContent = null;
        }
    }

    if (cardData) {
        let divStyle = {
            height: '400px',
            width: '400px',
            display: 'inline-block',
        };
        if ('images' in cardData && cardData.images.length > 0) {
            divStyle = {
                height: '400px',
                width: '400px',
                display: 'inline-block',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundImage: 'url(https://s3-us-west-2.amazonaws.com/resources.tgcdt.org/' + cardData.images[0].image_name + ')'
            }
        }
        content = (
            <>
                <div style={divStyle}/>
                <div className={classes.cardDataHolder}>
                    <Typography variant="display2">
                        {cardData ? cardData.printed_name : ''} [{id}]
                    </Typography>
                    <Typography variant="headline">
                        <CardNumberWithIcon iconName={cardData.set_icon} cardNumber={cardData.card_number}/>&nbsp;
                        <div
                            style={{display: 'inline'}}>{cardData.language} • {cardData.edition} • {cardData.rarity}</div>
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        Artist: {cardData ? cardData.artist : ''}
                    </Typography>
                    <Typography component="p">
                        {cardData ? cardData.copyright : ''}
                    </Typography>
                </div>
            </>
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
                {setContent}
                {cardRelatedContent}
            </Grid>
        </Grid>
    );
}

SimpleCard.propTypes = {
    classes: PropTypes.object.isRequired,
    id: PropTypes.number.isRequired,
    cardData: PropTypes.object.isRequired,
    cardRelatedData: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);