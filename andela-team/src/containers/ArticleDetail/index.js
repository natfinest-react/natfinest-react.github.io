import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Container, Grid, Button } from "@material-ui/core";
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
import Moment from "react-moment";
import CardMedia from "@material-ui/core/CardMedia";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useSelector, useDispatch } from "react-redux";
import {
  articleSelector,
  fetchArticle,
  editArticle,
  deleteArticle,
  postComment,
} from "../../slices/article";
import cover from "../../static/img/article.jpg";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { Field, Form, Formik } from "formik";
import { TextField } from "material-ui-formik-components/TextField";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import "./style.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import avatar from "../../static/img/avatar.jpg";

const useStyles = makeStyles((theme) => ({
  media: {
    height: 250,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    outline: 0,
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ArticleDetail = ({ match }) => {
  const classes = useStyles();
  const history = useHistory();

  const dispatch = useDispatch();
  const { article, loading } = useSelector(articleSelector);

  const { id } = match.params;
  useEffect(() => {
    dispatch(fetchArticle(id));
  }, []);

  const [expanded, setExpanded] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [dia, setDia] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const [msg, setMsg] = React.useState("");
  const [type, setType] = React.useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setDia(true);
  };

  const handleClickClose = () => {
    setDia(false);
  };

  const articlepage = () => history.goBack();

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const showReport = (val, type) => {
    setMsg(val);
    setType(type);
    setShow(true);
  };

  const hideReport = () => {
    setShow(false);
  };

  const renderComments = () => {
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
    if (article.comments) {
      return article.comments.map((art) => (
        <Comment key={art.commentId} comment={art} excerpt />
      ));
    }
    // return <Typography variant="h5">Nothing to show here</Typography>;
  };

  return (
    <>
      <Snackbar open={show} autoHideDuration={6000} onClose={hideReport}>
        <Alert onClose={hideReport} severity={type}>
          {msg}
        </Alert>
      </Snackbar>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <Card>
              <CardContent>
                {/* {renderPosts()} */}
                <Typography variant="h4" align="center">
                  Edit Article
                </Typography>
                <Formik
                  initialValues={{
                    form_title: article.title,
                    form_desc: article.article,
                  }}
                  onSubmit={(values, { setSubmitting, resetForm }) => {
                    dispatch(editArticle(article.id, values));
                    // When button submits form and form is in the process of submitting, submit button is disabled
                    setSubmitting(true);

                    // Resets form after submission is complete
                    resetForm();

                    // Sets setSubmitting to false after form is reset
                    setSubmitting(false);

                    handleClose();

                    dispatch(fetchArticle(article.id));

                    showReport("Article Updated Successfully", "success");
                  }}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <Field
                        id="outlined-full-width"
                        component={TextField}
                        type="text"
                        name="form_title"
                        label="Title"
                      />
                      <Field
                        id="outlined-full-width"
                        multiline
                        component={TextField}
                        type="text"
                        name="form_desc"
                        label="Description"
                      />
                      <Button
                        id="outlined-full-width"
                        type="submit"
                        disabled={isSubmitting}
                        variant="contained"
                        color="primary"
                        align="center"
                        style={{ marginTop: 20, marginLeft: "40%" }}
                      >
                        Submit
                      </Button>
                    </Form>
                  )}
                </Formik>
              </CardContent>
            </Card>
          </div>
        </Fade>
      </Modal>

      <Dialog
        open={dia}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClickClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">Delete Article</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to delete this article? This process is
            irreversible!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              console.log(article.id);
              dispatch(deleteArticle(article.id));
              handleClickClose();
              showReport("Article Deleted Successfully", "error");
              articlepage();
            }}
            color="primary"
          >
            Yes, I'm Sure
          </Button>
          <Button onClick={handleClickClose} color="secondary">
            No, Don't Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Container maxWidth="md">
        <Grid container spacing={1} style={{ marginTop: 100 }}>
          <Grid item xs={12} xs={4} style={{ textAlign: "right" }}></Grid>
          <Grid item xs={12} md={9} style={{ marginBottom: 20 }}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              startIcon={<ArrowBackIcon />}
              onClick={history.goBack}
            >
              Back
            </Button>
          </Grid>
          <Grid item xs={12} md={9}>
            <Card style={{ marginBottom: 20, padding: "0px 15px" }}>
              <CardHeader
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title={article.title}
                subheader={
                  <React.Fragment>
                    <Moment format="LLL">{article.createdOn}</Moment>
                  </React.Fragment>
                }
              />
              <CardMedia className={classes.media} image={cover} />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  {article.article}
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
                <Formik
                  initialValues={{ form_comment: "" }}
                  onSubmit={(values, { setSubmitting, resetForm }) => {
                    dispatch(postComment(values, article.id));
                    // When button submits form and form is in the process of submitting, submit button is disabled
                    setSubmitting(true);

                    // Resets form after submission is complete
                    resetForm();

                    // Sets setSubmitting to false after form is reset
                    setSubmitting(false);

                    dispatch(fetchArticle(id));

                    showReport("Comment Added Successfully", "success");
                  }}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <div className="comment">
                        <Grid item>
                          <Avatar alt="Avatar" src={avatar} />
                        </Grid>
                        <Grid item xs={8}>
                          <Field
                            id="outlined-full-width"
                            component={TextField}
                            type="text"
                            name="form_comment"
                            label="Your Comment"
                          />
                        </Grid>
                        <Grid item>
                          <Button
                            type="submit"
                            disabled={isSubmitting}
                            variant="contained"
                            color="primary"
                            style={{ borderRadius: 50 }}
                          >
                            Send
                          </Button>
                        </Grid>
                      </div>
                    </Form>
                  )}
                </Formik>
                <CardContent style={{ maxHeight: 300, overflow: "scroll" }}>
                  {renderComments()}
                </CardContent>
              </Collapse>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <div className={(classes.root, classes.bs)}>
              <List component="nav" aria-label="main mailbox folders">
                <ListItem button onClick={handleOpen}>
                  <ListItemIcon>
                    <EditIcon />
                  </ListItemIcon>
                  <ListItemText primary="Edit" />
                </ListItem>
                <ListItem button onClick={handleClickOpen}>
                  <ListItemIcon>
                    <DeleteIcon />
                  </ListItemIcon>
                  <ListItemText primary="Delete" />
                </ListItem>
              </List>
            </div>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
export default ArticleDetail;
