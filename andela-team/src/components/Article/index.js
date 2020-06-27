import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import "./style.css";
import Moment from "react-moment";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import cover from "../../static/img/article.jpg";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  media: {
    height: 170,
    backgroundSize: "cover",
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

  return (
    <>
      <Grid item xs={12} sm={4} md={3}>
        <Link
          to={{
            pathname: `/articles/${article.id}`,
          }}
        >
          <Card style={{ marginBottom: 20 }}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={cover}
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
          </Card>
        </Link>
      </Grid>
    </>
  );
}
