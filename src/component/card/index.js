import React, { useState } from "react";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Skeleton from "@mui/material/Skeleton";
import moment from "moment";
import { useNavigate } from 'react-router-dom'
function Media(props) {
  const navigate = useNavigate()
  let loading = props.loading;
  return (
    <Card sx={{ maxWidth: "100%" }} style={{ cursor: !props.disable ? "pointer" : "default" }} onClick={() => !props.disable && navigate(`/blog-view/${props.id}`)}>
      <CardHeader
        avatar={
          loading ? (
            <Skeleton
              animation="wave"
              variant="circular"
              width={40}
              height={40}
            />
          ) : (
            <Avatar
              alt="Ted talk"
              src={props.profileURL}
            />
          )
        }
        action={
          loading ? null : (
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          )
        }
        title={
          loading ? (
            <Skeleton
              animation="wave"
              height={10}
              width="80%"
              style={{ marginBottom: 6 }}
            />
          ) : (
            props.fullName
          )
        }
        subheader={
          loading ? (
            <Skeleton animation="wave" height={10} width="40%" />
          ) : (
            moment(props.created).format("MMMM Do YYYY, h:mm:ss a")
          )
        }
      />
      {loading ? (
        <Skeleton sx={{ height: 250 }} animation="wave" variant="rectangular" />
      ) : (
        <CardMedia
          component="img"
          height={props.disable ? "auto" : "250"}
          image={props.imagePath}
          alt="Nicola Sturgeon on a TED talk stage"
        />
      )}

      <CardContent>
        {loading ? (
          <React.Fragment>
            <Skeleton animation="wave" />
            <Skeleton
              animation="wave"
              height={10}
              style={{ marginBottom: 6 }}
            />
            <Skeleton animation="wave" height={10} width="80%" />
          </React.Fragment>
        ) : (
          <div>
            <Typography
              variant="body2"
              color="black"
              style={{ fontWeight: "bold" }}
              component="h1"
            >
              {/* {props.disable ? "A" :"B"} */}
              {props.disable ?
                props.title
                :
                props.title.slice(0, 20)
              }
              {!props.disable && (props.title.length > 20 && "...")}
            </Typography>
            <Typography variant="body2" color="text.secondary" component="p">
              {props.disable ? props.details :
                props.details.slice(0, 60)}
              {!props.disable && (props.details.length > 60 && "...")}
            </Typography>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

Media.propTypes = {
  loading: PropTypes.bool,
};

export default function CardCom(props) {
  return (
    <div>
      <Media
        loading={props.loading}
        imagePath={props.imagePath}
        created={props.created}
        title={props.title}
        details={props.details}
        fullName={props.fullName}
        profileURL={props.profileURL}
        id={props.id}
        disable={props.disable}
      />
      {/* <Media /> */}
    </div>
  );
}
