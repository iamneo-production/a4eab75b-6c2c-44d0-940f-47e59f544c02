//React imports
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    getArticleById,
    getHeadlineByArticleId,
    getLoggedUser,
    postCommentOnArticle,
    postLikeOnArticle,
} from "../service/news-http.service";
import Navbar from "./navbar.component";

const Article = () => {
    const commentRef = useRef(null);
    const { articleid } = useParams();
    const [headline, setHeadline] = useState(null);
    const [article, setArticle] = useState(null);
    const [comments, setComments] = useState(null);
    const [likes, setLikes] = useState([]);
    const [isliked, setIsLiked] = useState(false);
    const [isArticleLoading, setIsArticleLoading] = useState(true);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        getArticleById(articleid)
            .then((res) => {
                setArticle(res.data);
                setComments(res.data.comments);
                setLikes(res.data.likes);
            })
            .catch((err) => {
                console.error("Error fetching article: ", err);
                navigate('/error');
            })
            .finally(() => setIsArticleLoading(false));

        getLoggedUser().then((res) =>
            JSON.stringify(res.data) !== "{}" ? setUser(res.data) : ""
        );

        getHeadlineByArticleId(articleid)
            .then((res) => {
                setHeadline(res.data);
            })
            .catch((err) => {
                console.error("Error fetching headline: ", err);
            });
    }, [articleid]);

    useEffect(() => {
        if (user != null) {
            let like = likes.filter((like) => like.userId === user.id);
            if (like.length !== 0) {
                setIsLiked(true);
            }
        }
    }, [user, likes]);

    const postLike = () => {
        let like = {
            id: null,
            articleId: article.id,
            userId: user.id
        };
        postLikeOnArticle(like).then((res) => setLikes([...likes, res.data])).catch(err => window.alert("Error!"));
    };

    const postComment = () => {
        const comment = commentRef.current.value;
        if(comment.trim().length > 0){
            let data = {
                id: null,
                userId: user.id,
                body: comment,
                articleId: article.id
            };
            postCommentOnArticle(data).then((res) => setComments([...comments, res.data])).catch(err => window.alert("Error!"));
        }
    };

    if (isArticleLoading) {
        return <div>Loding data</div>;
    } else {
        return (
            <div>
                <Navbar user={user} />
                {headline && headline.length !== 0 ? (
                    <h1>{headline[0].headline}</h1>
                ) : (
                    <div>Error fetching headline</div>
                )}
                {article ? <p>{article.content}</p> : <div>Error fetching article</div>}
                <div>liked by {likes.length} users</div>
                <div>
                    {isliked ? "Liked: true" : "Liked: false"}
                    {user && !isliked ?
                        <button onClick={postLike}>Post Like</button>
                        :
                        ""
                    }
                </div>

                {comments ? (
                    <div>
                        {comments.map((comment) => (
                            <li key={comment.id}>{comment.body}</li>
                        ))}
                    </div>
                ) : (
                    <div>No comments</div>
                )}
                {user ?
                    <form onSubmit={postComment}>
                    <div>
                      <label>
                        Comment:
                        <input type="text" ref={commentRef} />
                      </label>
                    </div>
                    <button type="submit">Submit</button>
                    </form>
                    :
                    ""
                }
            </div>
        );
    }
};

export default Article;
