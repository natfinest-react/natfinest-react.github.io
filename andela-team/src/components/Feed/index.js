import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import "./style.css";
import Moment from "react-moment";
import { Link } from "react-router-dom";

export default function Feed({ feed }) {
  return (
    <>
      <Card style={{ marginBottom: 20, padding: "0px 15px" }}>
        <CardHeader
          title={feed.title}
          subheader={
            <>
              <Moment format="LLL">{feed.time}</Moment>
            </>
          }
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {feed.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Link
            to={{
              pathname: `/articles/${feed.id}`,
            }}
          >
            <Button size="small" color="primary">
              Read More
            </Button>
          </Link>
        </CardActions>
      </Card>
    </>
  );
}
