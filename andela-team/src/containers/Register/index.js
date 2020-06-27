import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, userSelector } from "../../slices/user";
import { TextField } from "material-ui-formik-components/TextField";
import { Select } from "material-ui-formik-components/Select";
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

const Register = () => {
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
    if (user) return <Redirect to={"/feeds"} />;
  };

  return (
    <div className="register-bg">
      <Grid style={{ textAlign: "center" }} container justify="center">
        <Grid item xs={11} sm={8} md={6}>
          <Card>
            <CardContent>
              {renderPosts()}
              <Typography variant="h4" align="center">
                Register
              </Typography>
              <Formik
                initialValues={{
                  form_firstname: "",
                  form_lastname: "",
                  form_email: "",
                  form_password: "",
                  form_gender: "",
                  form_jobrole: "",
                  form_department: "",
                  form_address: "",
                  form_avatarurl: "",
                  form_userrole: "",
                }}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                  dispatch(register(values));
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
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <Field
                          required
                          component={TextField}
                          type="text"
                          name="form_firstname"
                          label="Firstname"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Field
                          required
                          component={TextField}
                          type="text"
                          name="form_lastname"
                          label="Latname"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Field
                          required
                          component={TextField}
                          type="text"
                          name="form_email"
                          label="Email"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Field
                          required
                          component={TextField}
                          type="password"
                          name="form_password"
                          label="Password"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Field
                          required
                          component={TextField}
                          type="text"
                          name="form_department"
                          label="Department"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Field
                          required
                          component={TextField}
                          type="text"
                          name="form_jobrole"
                          label="Jobrole"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Field
                          id="outlined-full-width"
                          required
                          name="form_gender"
                          label="Gender"
                          options={[
                            { value: "Male", label: "Male" },
                            { value: "Female", label: "Female" },
                          ]}
                          component={Select}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Field
                          required
                          component={TextField}
                          type="text"
                          name="form_address"
                          label="Address"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Field
                          required
                          component={TextField}
                          type="text"
                          name="form_avatarurl"
                          label="Avatar Url"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Field
                          id="outlined-full-width"
                          required
                          name="form_userole"
                          label="Userole"
                          options={[
                            { value: "Admin", label: "Admin" },
                            { value: "Employee", label: "Employee" },
                          ]}
                          component={Select}
                        />
                      </Grid>
                    </Grid>
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

export default Register;
