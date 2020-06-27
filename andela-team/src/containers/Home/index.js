import React from "react";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from "@material-ui/core";

export default function Home() {
  const banner = require("../../static/img/home-banner.jpg");
  return (
    <div>
      <Card>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="400"
            image={banner}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Welcome to Andela Teamwork
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Teamwork is an internal social network for employees of an
              organization. The goal of this application is to facilitate more
              interaction between colleagues and promote team bonding.
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}
