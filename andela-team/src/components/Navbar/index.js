import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import HomeIcon from "@material-ui/icons/Home";
import FeedbackIcon from "@material-ui/icons/Feedback";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import { Box, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userSelector, logout } from "../../slices/user";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    marginBottom: 60,
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const dispatch = useDispatch();

  const { user } = useSelector(userSelector);
  const mainLinks = () => {
    if (user)
      return (
        <>
          {/* <p>{user.user.firstname}</p> */}
          <Button color="inherit">
            <Link to="/feeds">Feeds</Link>
          </Button>
          <Button color="inherit">
            <Link to="/articles">Articles</Link>
          </Button>
          <Button
            color="inherit"
            onClick={() => {
              dispatch(logout());
            }}
          >
            Logout
          </Button>
        </>
      );
    return (
      <>
        {/* <Redirect to={"/"} /> */}
        <Button color="inherit">
          <Link to="/login">Login</Link>
        </Button>
        <Button color="inherit">
          <Link to="/register">Register</Link>
        </Button>
      </>
    );
  };

  const sideLinks = () => {
    if (user)
      return (
        <>
          <ListItem
            button
            onClick={() => {
              dispatch(logout());
              handleDrawerToggle();
            }}
          >
            <ListItemIcon>
              <PowerSettingsNewIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </>
      );
    return (
      <>
        {/* <Redirect to={"/"} /> */}
        <Link to="/login" onClick={handleDrawerToggle}>
          <ListItem button>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Login" />
          </ListItem>
        </Link>
        <Link to="/register" onClick={handleDrawerToggle}>
          <ListItem button>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Register" />
          </ListItem>
        </Link>
      </>
    );
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <Link to="/" onClick={handleDrawerToggle}>
          <ListItem button>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
        </Link>
        <Link to="/feeds" onClick={handleDrawerToggle}>
          <ListItem button>
            <ListItemIcon>
              <FeedbackIcon />
            </ListItemIcon>
            <ListItemText primary="Feeds" />
          </ListItem>
        </Link>
        <Link to="/articles" onClick={handleDrawerToggle}>
          <ListItem button>
            <ListItemIcon>
              <FeedbackIcon />
            </ListItemIcon>
            <ListItemText primary="Articles" />
          </ListItem>
        </Link>
      </List>
      <Divider />
      <List>{sideLinks()}</List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <Box display={{ sm: "block", md: "none" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerToggle}
              edge="start"
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
          </Box>

          <Typography
            variant="h6"
            className={classes.title}
            style={{ flexGrow: 1 }}
          >
            <Link to="/">Andela Teamwork</Link>
          </Typography>

          <Box display={{ xs: "none", sm: "block" }}>{mainLinks()}</Box>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden xsUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
          <Hidden mdDown implementation="css">
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
        </Hidden>
      </nav>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
