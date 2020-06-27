import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import avatar from "../../static/img/avatar.jpg";

const useStyles = makeStyles(() => ({
  list: {
    maxHeight: 300,
    overflow: "scroll",
  },
}));

export default function Comment({ comment }) {
  const classes = useStyles();
  return (
    <>
      <List className={classes.list}>
        <Divider component="li" />
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Avatar" src={avatar} />
          </ListItemAvatar>
          <ListItemText
            primary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  Anonymous
                </Typography>
                {/* <span style={{ fontSize: 12 }}> — 10:00 AM </span> */}
              </React.Fragment>
            }
            secondary={comment.comment}
          />
        </ListItem>
      </List>
    </>
  );
}
