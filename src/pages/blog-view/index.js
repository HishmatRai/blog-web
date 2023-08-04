import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
  doc,
  updateDoc,
} from "firebase/firestore";
import firebase from "../../config/firebase";
import { Card } from "./../../component";
import moment from "moment";
import { Divider, Avatar, Grid, Paper } from "@material-ui/core";
import {
  FacebookShareButton,
  FacebookIcon,
  EmailShareButton,
  EmailIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";
const BlogView = () => {
  const location = useLocation();
  console.log("location.pathname", location.pathname);
  const path = location.pathname.slice(11);
  const db = getFirestore(firebase);
  const [loading, setLoding] = useState(true);
  const [profiePath, setProfilePath] = useState("");
  const [fullName, setFullName] = useState("");
  const [createdDate, setCreatedDate] = useState("");
  const [blogImagePath, setBlogImagePath] = useState("");
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "blogs", path), (blgoData) => {
      setLoding(false);
      let data = blgoData.data();
      onSnapshot(doc(db, "users", data.uid), (userData) => {
        console.log("data: ", data);
        let user = userData.data();
        setCreatedDate(data.created);
        setBlogImagePath(data.imagePath);
        setTitle(data.title);
        setDetails(data.details);
        setFullName(user.fullName);
        setProfilePath(user.profileURL);
        setComments(data.comment);
      });

      // setProfilePath();
    });
  }, []);

  const PostHandler = async () => {
    if (name === "") {
      alert("Name required");
    } else if (email === "") {
      alert("email required");
    } else if (message === "") {
      alert("message required");
    } else {
      let commentValue = {
        name: name,
        email: email,
        message: message,
        date: moment().format(),
      };
      let newComment = [];
      comments.push(commentValue);
      console.log("newComment", newComment);
      // setComments([...newComment]);
      console.log("comments", comments);
      const washingtonRef = doc(db, "blogs", path);
      await updateDoc(washingtonRef, {
        comment: comments,
      });
      alert("comment added");
      setName("");
      setEmail("");
      setMessage("");
    }
  };
  console.log("comments", comments);
  return (
    <div style={{ padding: "20px" }}>
      {loading ? (
        <Card loading={loading} disable={true} />
      ) : (
        <div>
          <Card
            loading={loading}
            imagePath={blogImagePath}
            created={createdDate}
            title={title}
            details={details}
            fullName={fullName}
            profileURL={profiePath}
            disable={true}
          />
          <hr />
          <h1>Share</h1>
          <FacebookShareButton
            url={`https://ihunar-blog.netlify.app${location.pathname}`}
          >
            <FacebookIcon size={20} round={true} />
          </FacebookShareButton>
          <EmailShareButton
            url={`https://ihunar-blog.netlify.app${location.pathname}`}
          >
            <EmailIcon size={20} round={true} />
          </EmailShareButton>
          <WhatsappShareButton
            url={`https://ihunar-blog.netlify.app${location.pathname}`}
          >
            <WhatsappIcon size={20} round={true} />
          </WhatsappShareButton>
          <h1>Comments ({comments.length})</h1>
          <hr />

          {comments.length !== 0 &&
            comments.map((v, i) => {
              return (
                <div key={i}>
                  <Grid
                    container
                    wrap="nowrap"
                    spacing={2}
                  >
                    <h1></h1>
                    <Grid item>
                      <Avatar>{v.name.slice(0, 1)}</Avatar>
                    </Grid>
                    <Grid item xs zeroMinWidth>
                      <h4 style={{ margin: 0, textAlign: "left" }}>{v.name}</h4>
                      <p style={{ textAlign: "left" }}>{v.message}</p>
                      <p style={{ textAlign: "left", color: "gray" }}>
                        {moment(v.date).format("MMM DD, YYYY")}
                      </p>
                    </Grid>
                  </Grid>
                </div>
              );
            })}

          <hr />
          <input
            type="text"
            placeholder="Full Name"
            name="fullName"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <textarea
            placeholder="Message ..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <button onClick={PostHandler}>post</button>
        </div>
      )}
    </div>
  );
};
export default BlogView;
