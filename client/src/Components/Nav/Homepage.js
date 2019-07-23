import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import {LinkConstants} from '../../_constants/link.constants';
import {history} from "../../_helper/history";
import Icon from '@material-ui/core/Icon';
import { Copyright } from '@material-ui/icons';

function CopyrightText() {
  return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Built with love by "us"'}
      </Typography>
  );
}

const recipe = {
    facebook: require('../../assets/img/facebook.svg'),
    twitter: require('../../assets/img/twitter.svg'),
    instagram: require('../../assets/img/instagram.svg'),
    gallery: require('../../assets/img/gallery.svg'),
};

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
    height: "100%"
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  bold: {
    fontWeight: "bold"
  },
  media: {
    width: "20px",
    margin: "5px"
  }
}));

const cards = [1];

export default function Homepage() {
  const classes = useStyles();

  return (
      <React.Fragment>
        <CssBaseline />
        <main>
          <div className={classes.heroContent}>
            <Container maxWidth="sm">
              <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                TechWatch
              </Typography>
              <Typography variant="h5" align="center" color="textSecondary" paragraph>
                Fully improve the way to <span className={classes.bold}>"Tech watching"</span>.
              </Typography>
              <Typography variant="h5" align="center" color="textSecondary" paragraph>
                Creating by developers for developers, you've got now the new way to <span className={classes.bold}>share</span> and <span className={classes.bold}>read</span> posts that will help you to be aware about all <span className={classes.bold}>new technologies.</span>
              </Typography>
              <Typography variant="h3" align="center">
                👀
              </Typography>
              <div className={classes.heroButtons}>
                <Grid container justify="center">
                  <Grid item>
                    <Link component="button" onClick={() => {history.push(LinkConstants.POST_LIST);}}>
                      <Button variant="contained" color="primary" to={LinkConstants.POST_CREATE}>
                        "Tech Watching" now!
                      </Button>
                    </Link>
                  </Grid>
                </Grid>
              </div>
            </Container>
          </div>
          <Container className={classes.cardGrid} align="center">
              <img src={recipe.gallery} alt="Gallery image"/>
          </Container>
        </main>
        <footer className={classes.footer}>
          <Typography variant="h6" align="center" gutterBottom>
            Follow us
          </Typography>
              <img src={recipe.facebook} alt="Facebook logo" className={classes.media}/>
              <img src={recipe.twitter} alt="Twitter logo" className={classes.media}/>
              <img src={recipe.instagram} alt="Instagram logo" className={classes.media}/>
          <CopyrightText/>
        </footer>
      </React.Fragment>
  );
}