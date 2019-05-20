import React from "react";
import {withStyles} from "@material-ui/core";
import PropTypes from "prop-types";
import CardNumberWithIcon from "./cardNumberWithIcon";
import Card from "@material-ui/core/Card/Card";
import CardActionArea from "@material-ui/core/CardActionArea/CardActionArea";
import LazyLoad from "react-lazyload";
import CardMedia from "@material-ui/core/CardMedia/CardMedia";
import CardContent from "@material-ui/core/CardContent/CardContent";
import Typography from "@material-ui/core/Typography/Typography";

const styles = (theme) => ({
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    media: {
        height: 400,
        backgroundSize: 'contain',
    },
});

function CardImageWithBaseData(props) {
    const {classes, cardData} = props;

    const primaryText = (
        <div>
            {cardData.printed_name}
            <br/>
            <CardNumberWithIcon iconName={cardData.set_icon} cardNumber={cardData.card_number}/>
        </div>);
    const secondaryText = (<div>
        {cardData.rarity ? cardData.rarity : ''}{cardData.rarity && cardData.edition ? ' • ' : ''}{cardData.edition ? cardData.edition : ''}
        <br/>
        {cardData.language ? cardData.language : ''}</div>);

    let url = null;

    if ('images' in cardData && cardData.images.length > 0) {
        const image = cardData.images.filter(value => value.dimension >= 100);
        if (image.length > 0) {
            url = 'https://s3-us-west-2.amazonaws.com/resources.tgcdt.org/' + image[0].image_name;
        }
    }

    return (
        <Card className={classes.paper}>
            <CardActionArea component="a" href={`/card/${cardData.id}`}>
                <LazyLoad height={200}>
                    <CardMedia
                        className={classes.media}
                        image={`${url}`}
                        title={cardData.printed_name}
                    />
                </LazyLoad>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {primaryText}
                    </Typography>
                    <Typography component="p">
                        {secondaryText}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

CardImageWithBaseData.propTypes = {
    classes: PropTypes.object,
    cardData: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(CardImageWithBaseData);