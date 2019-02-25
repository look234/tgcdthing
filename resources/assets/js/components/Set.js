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
        // fontSize:  16,
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

function Set(props) {
    const {classes, id, setData} = props;
    console.log('Card component');
    console.log(setData);

    let content = null;
    let cardContent = null;

    if (setData.cards) {
        cardContent = setData.cards.map((data) => {
            const primaryText = `${data.card_number ? data.card_number : ''} ${data.printed_name ? data.printed_name : ''}`;
            const secondaryText = `${data.language ? data.language : ''}`;
            return (
                <ListItem button component="a" href={`/card/${data.id}`}>
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
            )
        });
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
                <Card className={classes.card}>
                    <CardContent>
                        Cards found in set: {setData.cards ? setData.cards.length : 0}
                    </CardContent>
                    <List>
                        {cardContent}
                    </List>
                </Card>
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