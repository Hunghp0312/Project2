import React, { useState, useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import ShowImage from "./ShowImage";
import { addItem, updateProduct, removeProduct } from "../core/CartHelper";
import { listComment, postComment, deleteComment } from "../core/ApiCore";
import { isAuthenticated } from "../auth";
import moment from "moment";
function Comment({ productId }) {
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState();
    const [limit, setLimit] = useState(6);
    const [size, setSize] = useState(0);
    const [skip, setSkip] = useState(0);
    const { user, token } = isAuthenticated();
    const showComment = () => {
        return comments.map((comment, i) => (
            <div key={i} className="card mb-4">
                <div className="card-header">
                    {comment.user.name}
                    {showDeleteComment(comment)}
                    <div className="text-right">
                        Comment:
                        {moment(comment.createdAt).fromNow()}
                    </div>
                    {}
                </div>
                <div className="card-body">{comment.content}</div>
            </div>
        ));
    };
    const loadComments = () => {
        listComment(productId, 0, limit).then((data) => {
            if (data.error) {
                console.log(data.error);
            } else {
                setComments(data);

                setSize(data.length);
            }
        });
    };
    const removeComment = (comment) => {
        console.log(comment);
        deleteComment(user._id, token, comment._id).then((data) => {
            if (data.error) {
                console.log(data.error);
            } else {
                setSkip(0);
                loadComments();
            }
        });
    };
    const showDeleteComment = (comment) => {
        return (
            user.role === 1 && (
                <span
                    onClick={() => removeComment(comment)}
                    className="badge badge-danger badge-pill"
                >
                    Delete Comment
                </span>
            )
        );
    };
    const loadMore = () => {
        let toSkip = skip + limit;
        listComment(productId, toSkip, limit).then((data) => {
            if (data.error) {
                console.log(data.error);
            } else {
                setComments([...comments, ...data]);
                setSize(data.length);
                setSkip(toSkip);
            }
        });
    };
    console.log(skip);
    const loadMoreButton = () => {
        return (
            size > 0 &&
            size >= limit && (
                <button onClick={loadMore} className="btn btn-warning mb-5">
                    Load more
                </button>
            )
        );
    };
    const handlerChange = (e) => {
        setCommentText(e.target.value);
        console.log(commentText);
    };
    const clickSubmit = (e) => {
        e.preventDefault();
        console.log(commentText);
        postComment(user._id, token, productId, commentText);
        setSkip(0);
        loadComments();
        setCommentText("");
    };
    const addCommentSection = () => {
        return (
            <form onSubmit={clickSubmit}>
                <div className="form-group">
                    <label className="text-muted">Comment</label>
                    <textarea
                        className="form-control"
                        onChange={handlerChange}
                        value={commentText}
                        autoFocus
                    ></textarea>
                </div>
                <div className="text-right">
                    <button className="btn btn-primary ">Comment</button>
                </div>
            </form>
        );
    };
    useEffect(() => {
        loadComments();
    }, []);
    return (
        <div className="">
            {showComment()}
            {loadMoreButton()}
            {addCommentSection()}
        </div>
    );
}
export default Comment;
