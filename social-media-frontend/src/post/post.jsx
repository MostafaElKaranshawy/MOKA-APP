import React, {useState} from "react";
import "./post.css";
import profilePhoto from "../assets/profile-photo-holder.jpg";
import CommentList from "../comment/comments";

export default function Post(probs){
    const [liked, setLike] = useState(probs.liked);
    const [showComments, setShowComments] = React.useState(true);
    function toggleShowComments(){
        setShowComments((pre)=>!pre);
    }

    function changeLike(){
        setLike((pre)=>!pre)
    }
    return (
        <div className="post">
            <div className="post-header">
                    <img src={profilePhoto} alt="" />
                    <div className="name-time">
                        <p>{probs.authorName}</p>
                        <p>{probs.time}</p>
                    </div>
            </div>
            <div className="post-content">
                <p>{probs.content}</p>
            </div>
            <div className="post-actions">
                    {liked? (
                        <div className="post-action" onClick={changeLike}>
                            <i className="fa-solid fa-heart" style={{color:"red"}}></i>
                            <p>UnLike</p>
                            {probs.likes >0?<p className="action-count">{probs.likes}</p>:null} 
                        </div>
                        )
                    :
                        <div className="post-action" onClick={changeLike}>
                            <i className="fa-regular fa-heart"></i>
                            <p>Like</p>
                            {probs.likes >0?<p className="action-count">{probs.likes}</p>:null}
                        </div>
                    }
                    
                <div className="post-action" onClick={toggleShowComments}>
                    <i className="fa-regular fa-comment"></i>
                    <p>Comment</p>
                    {probs.comments > 0? <p className="action-count">{probs.comments}</p> : null}
                </div>
                <div className="post-action">
                <i className="fa-duotone fa-solid fa-retweet"></i>
                    <p>Share</p>
                </div>
            </div>
            {
                showComments? 
                <div className="post-comments">
                    <CommentList comments={probs.commentsList}/>
                </div> : null
            }
            
        </div>
    )
}