import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import {
    getFirestore,
    collection,
    query,
    where,
    onSnapshot,
    doc,
} from "firebase/firestore";
import firebase from "../../config/firebase";
import { Card } from "./../../component";
const BlogView = () => {
    const location = useLocation();
    const path = location.pathname.slice(11)
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
    const [message, setMessage] = useState("")
    useEffect(() => {
        const unsub = onSnapshot(doc(db, "blogs", path), (blgoData) => {
            setLoding(false)
            let data = blgoData.data();
            onSnapshot(doc(db, "users", data.uid), (userData) => {
                console.log("data: ", data);
                let user = userData.data()
                setCreatedDate(data.created);
                setBlogImagePath(data.imagePath);
                setTitle(data.title);
                setDetails(data.details);
                setFullName(user.fullName);
                setProfilePath(user.profileURL);
                setComments(data.comment)
            });

            // setProfilePath();

        });

    }, []);

const PostHandler =()=>{
    console.log("comment",name , email ,message)
}
    return (
        <div style={{ padding: "20px" }}>
            {loading ?
                <Card loading={loading} disable={true} /> :
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
                    <h1>Comments ({comments.length})</h1>
                    <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
                    <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <textarea placeholder="Message ..." value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                    <button onClick={PostHandler}>post</button>
                </div>
            }
        </div>
    )
}
export default BlogView