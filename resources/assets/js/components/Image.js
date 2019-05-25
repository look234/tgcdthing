import React from 'react';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazyload';
import {withStyles} from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ImageIcon from '@material-ui/icons/Image';
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight';
import CircularProgress from '@material-ui/core/CircularProgress';

import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';

import Search from './Search';

const drawerWidth = 240;

const imageExtensions = [
    "ase",
    "art",
    "bmp",
    "blp",
    "cd5",
    "cit",
    "cpt",
    "cr2",
    "cut",
    "dds",
    "dib",
    "djvu",
    "egt",
    "exif",
    "gif",
    "gpl",
    "grf",
    "icns",
    "ico",
    "iff",
    "jng",
    "jpeg",
    "jpg",
    "jfif",
    "jp2",
    "jps",
    "lbm",
    "max",
    "miff",
    "mng",
    "msp",
    "nitf",
    "ota",
    "pbm",
    "pc1",
    "pc2",
    "pc3",
    "pcf",
    "pcx",
    "pdn",
    "pgm",
    "PI1",
    "PI2",
    "PI3",
    "pict",
    "pct",
    "pnm",
    "pns",
    "ppm",
    "psb",
    "psd",
    "pdd",
    "psp",
    "px",
    "pxm",
    "pxr",
    "qfx",
    "raw",
    "rle",
    "sct",
    "sgi",
    "rgb",
    "int",
    "bw",
    "tga",
    "tiff",
    "tif",
    "vtf",
    "xbm",
    "xcf",
    "xpm",
    "3dv",
    "amf",
    "ai",
    "awg",
    "cgm",
    "cdr",
    "cmx",
    "dxf",
    "e2d",
    "egt",
    "eps",
    "fs",
    "gbr",
    "odg",
    "svg",
    "stl",
    "vrml",
    "x3d",
    "sxd",
    "v2d",
    "vnd",
    "wmf",
    "emf",
    "art",
    "xar",
    "png",
    "webp",
    "jxr",
    "hdp",
    "wdp",
    "cur",
    "ecw",
    "iff",
    "lbm",
    "liff",
    "nrrd",
    "pam",
    "pcx",
    "pgf",
    "sgi",
    "rgb",
    "rgba",
    "bw",
    "int",
    "inta",
    "sid",
    "ras",
    "sun",
    "tga"
];

const styles = (theme) => ({
    root: {
        display: 'flex',
    },
    otherRoot: {
        position: 'fixed',
        right: 0,
        display: 'flex',
        maxHeight: 1000,
        maxWidth: '45%',
        overflowX: 'scroll',
        overflowY: 'scroll',
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    card: {
        maxWidth: 345,
    },
    media: {
        backgroundSize: 'contain',
        height: 445,
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
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        marginLeft: drawerWidth,
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
        },
    },
    menuButton: {
        marginRight: 20,
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
    },
    imageSelected: {
        backgroundColor: 'green',
    },
    listItemIcon: {
        marginRight: 0
    },
    subListItemIcon: {
        marginLeft: 15,
        marginRight: 0
    },
    listItemText: {
        padding: 0
    }
});

function ImageGallery(props) {
    const {classes, theme, folders, currentFolder, resources, getUnsortedResources, handleDrawerToggle, mobileOpen, handleImageClick, imageState, handleFollowUpClick} = props;
    console.log(imageState);
    console.log(folders);
    const loading = (<div className={classes.loading}><CircularProgress className={classes.progress} size={50}/></div>);
    let foldersContent = loading;
    let resourcesGalleryContent = null;

    if (Object.keys(folders).length) {
        if (Object.keys(folders).length > 0) {
            const foldersContentData = folders[""].map((data) => {
                    const primaryText = `${data.Prefix ? (data.Prefix).split('/')[1] : ''}`;
                    let subList = null;
                    if (primaryText in folders && folders[primaryText].length > 0) {
                        subList = folders[primaryText].map((data) => {
                            const subText = `${data.Prefix ? (data.Prefix).split('/')[2] : ''}`;
                            const search = `${primaryText}/${subText}`;
                            let subSubList = null;
                            if (search in folders && folders[search].length > 0) {
                                subSubList = folders[search].map((data) => {
                                    const subSubText = `${data.Prefix ? (data.Prefix).split('/')[3] : ''}`;
                                    const subSearch = `${primaryText}/${subText}/${subSubText}`;
                                    let subSubSubList = null;
                                    if (subSearch in folders && folders[subSearch].length > 0) {
                                        subSubSubList = folders[subSearch].map((data) => {
                                            const subSubSubText = `${data.Prefix ? (data.Prefix).split('/')[4] : ''}`;
                                            const subSubSearch = `${primaryText}/${subText}/${subSubText}/${subSubSubText}`;
                                            return (
                                                <ListItem button
                                                          onClick={() => getUnsortedResources(`${subSubSearch}`)}
                                                          className={classes.nested}>
                                                    <ListItemIcon className={classes.subListItemIcon}>
                                                        <SubdirectoryArrowRightIcon/>
                                                    </ListItemIcon>
                                                    <ListItemText className={classes.listItemText} disableTypography
                                                                  primary={<Typography
                                                                      variant="title">{subSubSubText}</Typography>}/>
                                                </ListItem>
                                            );
                                        });
                                    }

                                    return (
                                        <>
                                            <ListItem button
                                                      onClick={() => getUnsortedResources(`${subSearch}`)}
                                                      className={classes.nested}>
                                                <ListItemIcon className={classes.subListItemIcon}>
                                                    <SubdirectoryArrowRightIcon/>
                                                </ListItemIcon>
                                                <ListItemText className={classes.listItemText} disableTypography
                                                              primary={<Typography variant="title">{subSubText}</Typography>}/>
                                            </ListItem>
                                            <List component="div" disablePadding>
                                                {subSubSubList}
                                            </List>
                                        </>
                                    );
                                });
                            }

                            return (
                                <>
                                    <ListItem button onClick={() => getUnsortedResources(`${primaryText}/${subText}`)}
                                              className={classes.nested}>
                                        <ListItemIcon className={classes.listItemIcon}>
                                            <SubdirectoryArrowRightIcon/>
                                        </ListItemIcon>
                                        <ListItemText className={classes.listItemText} disableTypography
                                                      primary={<Typography variant="title">{subText}</Typography>}/>
                                    </ListItem>
                                    <List component="div" disablePadding>
                                        {subSubList}
                                    </List>
                                </>
                            );
                        });
                    }

                    return (
                        <>
                            <ListItem button onClick={() => getUnsortedResources(primaryText)}>
                                <ListItemText
                                    disableTypography
                                    primary={<Typography variant="title">{primaryText}</Typography>}
                                />
                            </ListItem>
                            <List component="div" disablePadding>
                                {subList}
                            </List>
                        </>
                    );
                }
            );
            foldersContent = (
                <List>
                    {foldersContentData}
                </List>);
        } else {
            foldersContent = null;
        }
    }

    if (Object.keys(resources).length) {
        if (Object.keys(resources).length > 0 && currentFolder in resources && resources[currentFolder].length > 0) {
            const resourcesGalleryContentData = resources[currentFolder].map((data) => {
                    const primaryText = `${data.Key ? data.Key : ''}`;
                    const imageExtension = primaryText.split('.').pop();
                    if (imageExtensions.includes(imageExtension.toLowerCase())) {
                        return (
                            <Grid item lg={4} md={4} sm={3} xs={2}>
                                <Card className={classes.card} onClick={() => handleImageClick(primaryText)}>
                                    <CardActionArea>
                                        <LazyLoad height={200}>
                                            <CardMedia
                                                className={classes.media}
                                                image={`https://s3-us-west-2.amazonaws.com/resources.tgcdt.org/${primaryText}`}
                                                title="Contemplative Reptile"
                                            />
                                        </LazyLoad>
                                        <CardContent className={(primaryText in imageState ? classes.imageSelected : null)}>
                                            <Typography component="p">
                                                {primaryText.split('/').pop()}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        );
                    } else {
                        return null;
                    }
                }
            );

            resourcesGalleryContent = (<Grid container className={classes.root} spacing={24}>
                {resourcesGalleryContentData}
            </Grid>);
        } else {
            resourcesGalleryContent = 'No Images';
        }
    }

    const drawer = (
        <div>
            <div className={classes.toolbar}/>
            <Divider/>
            {foldersContent}
        </div>
    );

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="Open drawer"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" color="inherit" noWrap>
                        Responsive drawer
                    </Typography>
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer}>
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                    <Drawer
                        container={props.container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content}>
                <Grid container className={classes.root} spacing={24}>
                    <Grid item xs={6}>
                        {resourcesGalleryContent}
                    </Grid>
                    <Grid item xs={6} className={classes.otherRoot}>
                        <Search handleFollowUpClick={handleFollowUpClick}/>
                    </Grid>
                </Grid>
            </main>
        </div>);
}

ImageGallery.propTypes = {
    classes: PropTypes.object.isRequired,
    folders: PropTypes.array.isRequired,
    foldersStatuses: PropTypes.object.isRequired,
    resources: PropTypes.object.isRequired,
    resourcesStatuses: PropTypes.object.isRequired,
    getUnsortedResources: PropTypes.func,
    handleDrawerToggle: PropTypes.func,
    mobileOpen: PropTypes.bool,
    handleImageClick: PropTypes.func,
    imageState: PropTypes.object,
    currentFolder: PropTypes.string,
    handleFollowUpClick: PropTypes.func,
};

export default withStyles(styles, {withTheme: true})(ImageGallery);