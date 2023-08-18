//React imports
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getArticleById,
  getCommentsByArticleId,
  getHeadlineByArticleId,
  getLoggedUser,
} from "../service/news-http.service";
import Navbar from "./navbar.component";

const Article = () => {
  const { articleid } = useParams();
  const [headline, setHeadline] = useState(null);
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState(null);
  const [likes, setLikes] = useState([]);
  const [isliked, setIsLiked] = useState(false);
  const [isArticleLoading, setIsArticleLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    getArticleById(articleid)
      .then((res) => {
        setArticle(res.data);
        setComments(res.data.comments);
        setLikes(res.data.likes);
      })
      .catch((err) => {
        console.error("Error fetching article: ", err);
      })
      .finally(() => setIsArticleLoading(false));

    getLoggedUser().then((res) => setUser(res.data));

    getHeadlineByArticleId(articleid)
      .then((res) => {
        setHeadline(res.data);
      })
      .catch((err) => {
        console.error("Error fetching headline: ", err);
      });
  }, []);

  useEffect(() => {
    var like = likes.filter((like) => like.userId === user.id);
    if (like.length != 0) {
      setIsLiked(true);
    }
  }, [user]);

  if (isArticleLoading) {
    return <div>Loding data</div>;
  } else {
    return (
      <div>
        <Navbar user={user} />
        {headline && headline.length != 0 ? (
          <h1>{headline[0].headline}</h1>
        ) : (
          <div>Error fetching headline</div>
        )}
        {article ? <p>{article.content}</p> : <div>Error fetching article</div>}
        <div>liked by {likes.length} users</div>
        <div>
          {isliked ? "Liked: true" : "Liked: false"}
          {user && !isliked ? <button>Post Like</button> : ""}
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
      </div>
    );
  }
};

export default Article;
