import React, { useState } from "react";

import Post from "../post/post";
import posts from "./posts.json"
import commments from "./comments.json"
import NewPost from "../newPost/newPost";
import "./mainSection.css";

export default function MainSection(){
    
    const editedPosts = posts.map((post) => {
        const postComments = commments.filter((comment) => comment.postID === post.postID);
        return (
            <Post
                key={post.postID}
                authorName={post.authorName}
                time={post.time}
                liked={post.liked}
                likes={post.likes}
                comments={postComments.length}
                content={post.content}
                commentsList={postComments}
             />
        )
    })

    const [POSTS, setPosts] = useState(editedPosts);

    return (
        <div className="main-section">
            <NewPost/>
            <div className="posts">
                {POSTS}
            </div>
        </div>
    )
}