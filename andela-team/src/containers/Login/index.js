import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, userSelector } from "../../slices/user";
import { TextField } from "material-ui-formik-components/TextField";
import { Grid, Card, CardContent, Typography, Button } from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import MuiAlert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import CloseIcon from "@material-ui/icons/Close";
import { Redirect } from "react-router-dom";
import "./style.css";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Login = () => {
  const [open, setOpen] = React.useState(true);

  const dispatch = useDispatch();
  const { user, error, loading, hasErrors } = useSelector(userSelector);
  const error_message = error.error;

  const renderPosts = () => {
    if (loading) return <p>Loading posts...</p>;
    if (hasErrors)
      return (
        <>
          <Collapse in={open} style={{ margin: 20 }}>
            <Alert
              severity="error"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              {error_message}
            </Alert>
          </Collapse>
        </>
      );
    if (user)
      return (
        <Redirect
          to={{
            pathname: "/feeds",
          }}
        />
      );
  };

  return (
    <div className="login-bg">
      <Grid
        className="pc-100"
        style={{ textAlign: "center" }}
        container
        justify="center"
        alignItems="center"
      >
        <Grid item xs={11} sm={8} md={6}>
          <Card>
            <CardContent>
              {renderPosts()}
              <Typography variant="h4" align="center">
                Login
              </Typography>
              <Formik
                initialValues={{ username: "", password: "" }}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                  dispatch(login(values));
                  // When button submits form and form is in the process of submitting, submit button is disabled
                  setSubmitting(true);

                  // Resets form after submission is complete
                  resetForm();

                  // Sets setSubmitting to false after form is reset
                  setSubmitting(false);
                }}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <Field
                      id="outlined-full-width"
                      component={TextField}
                      type="text"
                      name="username"
                      label="Email"
                    />
                    <Field
                      component={TextField}
                      type="password"
                      name="password"
                      label="Password"
                    />
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      variant="contained"
                      color="primary"
                      align="center"
                      style={{ marginTop: 20 }}
                    >
                      Submit
                    </Button>
                  </Form>
                )}
              </Formik>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>

    //
  );
};

export default Login;
