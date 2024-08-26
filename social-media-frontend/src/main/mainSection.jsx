import React, { useState } from "react";

import Post from "../post/post";
import posts from "./posts.json"
import NewPost from "../newPost/newPost";
import "./mainSection.css";

export default function MainSection(){
    
    const editedPosts = posts.map((post) => {
        return (
            <Post
                key={post.postID}
                authorName={post.authorName}
                time={post.time}
                liked={post.liked}
                likes={post.likes}
                comments={post.comments}
                content={post.content}
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