import React, { useState, useEffect } from "react";
import { Card } from "./../../component";
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
  doc,
} from "firebase/firestore";
import firebase from "../../config/firebase";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const Home = () => {
  const db = getFirestore(firebase);
  const [loading, setLoding] = useState(true);
  const [allBlog, setAllBlog] = useState([]);
  useEffect(() => {
    const q = query(collection(db, "blogs"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setLoding(false);
      // const cities = [];
      let newBlog = [];
      querySnapshot.forEach((blgoData) => {
        var newObj = {};
        // newBlog.push(blgoData.data());

        // cities.push(doc.data());
        onSnapshot(doc(db, "users", blgoData.data().uid), (userData) => {
          newObj.user = userData.data();
          newObj.blog = blgoData.data();
          // console.log("users data >>>>", userData.data().fullName);
          // console.log("blgoData data >>>>", blgoData.data().title);
          console.log("newObj", newObj);
          newBlog.push(newObj);
          setAllBlog([...newBlog]);
        });
      });
    });
  }, []);

  console.log("allBlog >>>>>>>>>>", allBlog);
  return (
    <div style={{ padding: "20px" }}>
      {/* <Card loading={lpxoading}/> */}
      {loading ? (
        <Card loading={loading}  disable={false} />
      ) : (
        <div>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              {allBlog.map((v, i) => {
                return (
                  <Grid key={i} item xxl={2} xl={2} lg={3} md={4} sm={6}>
                    <Card
                      loading={loading}
                      imagePath={v.blog.imagePath}
                      created={v.blog.created}
                      title={v.blog.title}
                      details={v.blog.details}
                      fullName={v.user.fullName}
                      profileURL={v.user.profileURL}
                      id={v.blog.id}
                      disable={false}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </div>
      )}
    </div>
  );
};
export default Home;
