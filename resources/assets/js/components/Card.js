import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ImageIcon from '@material-ui/icons/Image';

const styles = (theme) => ({
    root: {
        fontSize: 16,
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
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
});

function SimpleCard(props) {
    const {classes, id, cardData} = props;
    console.log('Card component');
    console.log(cardData);

    let content = null;
    let setContent = null;

    if (cardData.sets) {
        setContent = cardData.sets.map((data) => {
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
    }

    if (cardData) {
        content = (
            <div>
                <Typography variant="display2">
                    {cardData ? cardData.printed_name : ''} ({cardData ? cardData.card_number : ''}) [{id}]
                </Typography>
                <Typography variant="headline">
                    {cardData ? cardData.language : ''} {cardData && cardData.edition ? ` • ${cardData.edition}` : ''} {cardData ? ` • ${cardData.rarity}` : ''}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    Artist: {cardData ? cardData.artist : ''}
                </Typography>
                <Typography component="p">
                    {cardData ? cardData.copyright : ''}
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
                <Card className={classes.card}>
                    <CardContent>
                        Found in these sets:
                    </CardContent>
                    <List>
                        {setContent}
                    </List>
                </Card>
            </Grid>
        </Grid>
    );
}

SimpleCard.propTypes = {
    classes: PropTypes.object.isRequired,
    id: PropTypes.number.isRequired,
    cardData: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);