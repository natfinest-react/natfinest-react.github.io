import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import {
  articlesSelector,
  postArticle,
  fetchArticles,
} from "../../slices/articles";
import { Field, Form, Formik } from "formik";
import { TextField } from "material-ui-formik-components/TextField";
import { Select } from "material-ui-formik-components/Select";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
} from "@material-ui/core";
import Article from "../../components/Article";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import CircularProgress from "@material-ui/core/CircularProgress";
import ReactPaginate from "react-paginate";
import MuiAlert from "@material-ui/lab/Alert";
import "./style.css";
import Snackbar from "@material-ui/core/Snackbar";

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
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const Articles = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { articles, loading } = useSelector(articlesSelector);

  const [open, setOpen] = React.useState(false);
  var [count, setCount] = React.useState(0);
  const [show, setShow] = React.useState(false);
  const [msg, setMsg] = React.useState("");
  const [type, setType] = React.useState("");

  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const showReport = (val, type) => {
    setMsg(val);
    setType(type);
    setShow(true);
  };

  // console.log(state.articles);

  const hideReport = () => {
    setShow(false);
  };

  var offset = 0;
  var perpage = 8;

  const pageCount = Math.ceil(articles.length / perpage);

  const handlePageClick = (e) => {
    var selectedPage = e.selected;
    offset = selectedPage * perpage;
    setCount(offset);
  };

  const renderArticles = () => {
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
    if (articles.length > 0)
      return articles
        .slice(count, count + perpage)
        .map((article) => (
          <Article key={article.id} article={article} excerpt />
        ));
    return <Typography variant="h5">Nothing to show here</Typography>;
  };

  return (
    <div>
      <Snackbar open={show} autoHideDuration={6000} onClose={hideReport}>
        <Alert onClose={hideReport} severity={type}>
          {msg}
        </Alert>
      </Snackbar>
      <Container maxWidth="lg">
        <Grid
          alignItems="center"
          container
          spacing={1}
          style={{ marginTop: 100 }}
        >
          <Grid item xs={12} xs={8}>
            <Typography variant="h3">Articles</Typography>
          </Grid>
          <Grid item xs={12} xs={4} style={{ textAlign: "right" }}>
            <Button variant="contained" color="primary" onClick={handleOpen}>
              Create Article
            </Button>
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
                        Create Article
                      </Typography>
                      <Formik
                        initialValues={{
                          form_title: "",
                          form_desc: "",
                          form_cat: "",
                          form_share: "",
                        }}
                        onSubmit={(values, { setSubmitting, resetForm }) => {
                          dispatch(postArticle(values));
                          // When button submits form and form is in the process of submitting, submit button is disabled
                          setSubmitting(true);

                          // Resets form after submission is complete
                          resetForm();

                          // Sets setSubmitting to false after form is reset
                          setSubmitting(false);

                          handleClose();

                          showReport("Article Created Successfully", "success");

                          dispatch(fetchArticles());
                        }}
                      >
                        {({ isSubmitting }) => (
                          <Form>
                            <Field
                              id="outlined-full-width"
                              required
                              component={TextField}
                              type="text"
                              name="form_title"
                              label="Title"
                            />
                            <Field
                              id="outlined-full-width"
                              required
                              multiline
                              component={TextField}
                              type="text"
                              name="form_desc"
                              label="Description"
                            />
                            <Field
                              id="outlined-full-width"
                              required
                              name="form_cat"
                              label="Category"
                              options={[
                                { value: "Sport", label: "Sport" },
                                { value: "Technology", label: "Technology" },
                                { value: "Lifestyle", label: "Lifestyle" },
                                { value: "Trending", label: "Trending" },
                                {
                                  value: "Entertainment",
                                  label: "Entertainment",
                                },
                                { value: "Education", label: "Education" },
                              ]}
                              component={Select}
                            />
                            <Field
                              id="outlined-full-width"
                              required
                              name="form_share"
                              label="Make Article Sharable?"
                              options={[
                                { value: "Yes", label: "Yes" },
                                { value: "No", label: "No" },
                              ]}
                              component={Select}
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
          </Grid>
        </Grid>
        <Grid container spacing={0} style={{ marginTop: 40 }}>
          {renderArticles()}
        </Grid>
        <ReactPaginate
          previousLabel={"Prev"}
          nextLabel={"Next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
      </Container>
    </div>
  );
};

export default Articles;
