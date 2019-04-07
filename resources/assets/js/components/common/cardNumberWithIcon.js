import React from "react";
import {withStyles} from "@material-ui/core";
import PropTypes from "prop-types";

const styles = (theme) => ({
    cardNumberHolder: {
        display: 'inline',
    },
    numberHolder: {
        verticalAlign: 'middle',
        display: 'inline-block',
    },
    imageSize: {
        maxWidth: 55,
        maxHeight: 25,
    },
});

function CardNumberWithIcon(props) {
    const {classes, cardNumber, iconName} = props;
    let setIconComponent = null;

    if (iconName) {
        setIconComponent = <img src={`https://s3-us-west-2.amazonaws.com/resources.tgcdt.org/${iconName}`}
                                 className={classes.imageSize}/>;
    }

    return (<div className={classes.cardNumberHolder}>{setIconComponent}
        <div className={classes.numberHolder}>{cardNumber}</div>
    </div>);
}

CardNumberWithIcon.propTypes = {
    classes: PropTypes.object,
    iconName: PropTypes.string,
    cardNumber: PropTypes.string,
};

export default withStyles(styles, {withTheme: true})(CardNumberWithIcon);