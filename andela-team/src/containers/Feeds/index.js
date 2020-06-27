import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { feedsSelector, fetchFeeds } from "../../slices/feeds";
import { Container, Grid, Typography } from "@material-ui/core";
import Feed from "../../components/Feed";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

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
}));

const Feeds = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { feeds, loading } = useSelector(feedsSelector);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    dispatch(fetchFeeds());
  }, [dispatch]);

  const handleClose = () => {
    setOpen(false);
  };

  const renderFeeds = () => {
    if (loading)
      return (
        <Backdrop
          className={classes.backdrop}
          open={true}
          onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      );
    if (feeds.length > 0)
      return feeds.map((feed) => <Feed key={feed.id} feed={feed} excerpt />);
    return <Typography variant="h5">Nothing to show here</Typography>;
  };

  return (
    <div>
      <Container maxWidth="md">
        <Grid
          container
          spacing={1}
          style={{ margin: "100px 50px 30px 0px" }}
          justify="center"
        >
          <Grid item xs={12} md={9}>
            <Typography variant="h4">Feeds</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={1} justify="center">
          <Grid item xs={12} md={9}>
            {renderFeeds()}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Feeds;
