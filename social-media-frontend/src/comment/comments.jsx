import React, { useState } from "react";
import "./comment.css";
import Comment from "./comment";

export default function Comments({ comments }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [currentFilter, setCurrentFilter] = useState("Most Recent");

    const toggleDropdown = () => {
        console.log("toggleDropdown");
        setIsDropdownOpen(prev => !prev);
    };

    const handleSelectItem = (item) => {
        setCurrentFilter(item);
        setIsDropdownOpen(false);
    };

    return (
        <div className="comment-list">
            <div className="comment-filter">
                <div className="select-selected" onClick={toggleDropdown}>
                    {currentFilter}
                    {!isDropdownOpen && <i className="fa-solid fa-chevron-down"></i>}
                    {isDropdownOpen && <i className="fa-solid fa-chevron-up"></i>}
                </div>
                {isDropdownOpen && (
                    <div className="select-items">
                        <div className="select-item" onClick={() => handleSelectItem("All Comments")}>
                            All Comments
                        </div>
                        <div className="select-item" onClick={() => handleSelectItem("Top Comments")}>
                            Top Comments
                        </div>
                        <div className="select-item" onClick={() => handleSelectItem("Most Recent")}>
                            Most Recent
                        </div>
                    </div>
                )}
            </div>
            {comments.map((comment, index) => (
                <Comment key={index} comment={comment} filter={currentFilter} />
            ))}
        </div>
    );
}
