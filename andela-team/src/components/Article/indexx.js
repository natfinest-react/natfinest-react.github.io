import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Grid, Button, TextField } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import { red } from "@material-ui/core/colors";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Comment from "../../components/Comment";
import clsx from "clsx";
import "./style.css";
import Moment from "react-moment";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";

const useStyles = makeStyles((theme) => ({
  media: {
    height: 140,
  },
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: "#fff",
  },
  bs: {
    boxShadow: "2px 2px 7px 1px #ccc",
  },
  media2: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  list: {
    maxHeight: 300,
    overflow: "scroll",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  inline: {
    fontSize: 16,
  },
}));

export default function Article({ article }) {
  const classes = useStyles();

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // const timestamp = article.createdat

  // console.log(
  //   new Intl.DateTimeFormat("en-US", {
  //     year: "numeric",
  //     month: "2-digit",
  //     day: "2-digit",
  //     hour: "2-digit",
  //     minute: "2-digit",
  //     second: "2-digit",
  //   }).format(timestamp)
  // );

  return (
    <>
      <Card style={{ marginBottom: 20, padding: "0px 15px" }}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image="/static/images/cards/contemplative-reptile.jpg"
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {article.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {article.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Typography variant="body2" color="textSecondary" component="p">
            Posted On:
            <Moment format="LLL">{article.createdat}</Moment>
          </Typography>
        </CardActions>
        {/* <CardHeader
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={article.title}
          subheader={
            <React.Fragment>
              <Moment format="LLL">{article.createdat}</Moment>
            </React.Fragment>
          }
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {article.description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Divider />
          <div className="comment">
            <Grid item>
              <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
            </Grid>
            <Grid item xs={8}>
              <TextField
                id="outlined-textarea"
                placeholder="Placeholder"
                fullWidth
                multiline
                variant="outlined"
              />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                style={{ borderRadius: 50 }}
              >
                Send
              </Button>
            </Grid>
          </div>
          <CardContent>
            <Comment />
          </CardContent>
        </Collapse> */}
      </Card>
    </>
  );
}
