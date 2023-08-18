//React imports
import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { getArticleById, getCommentsByArticleId, getHeadlineByArticleId } from '../service/news-http.service';

const Article = () => {
    const { articleid } = useParams();
    const [headline, setHeadline] = useState(null);
    const [article, setArticle] = useState(null);
    const [comments, setComments] = useState(null);
    const [likes, setLikes] = useState(null);
    const [isliked, setIsLiked] = useState(false);
    const [isArticleLoading, setIsArticleLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(()=> {
        getLoggedUser().then(res => setUser(res.data));
        getArticleById(articleid).then(res => {
            setArticle(res.data);
            setComments(res.data.comments);
            setLikes(res.data.likes);
            var like = res.data.likes.filter(like => like.userId=user.id);
            console.log(like);
        }).catch(err => {
            console.error("Error fetching article: ", err);
        }).finally(() => setIsLoading(false))

        
        getHeadlineByArticleId(articleid).then(res => {
            setHeadline(res.data);
        }).catch(err => {
            console.error("Error fetching headline: ", err);
        })

        // getCommentsByArticleId(articleid).then(res => {
        //     setComments(res.data);
        // }).catch(err => {
        //     console.error("Error fetching comments: ", err);
        // })
    })

    if(isArticleLoading){
        return <div>Loding data</div>
    } else {
        return (
        <div>
            <Navbar user={user}/>
            {headline ? (
            <h1>{headline[0].headline}</h1>
        ) : (
            <div>Error fetching headline</div>
        )}
        {article ? (
            <p>{article.content}</p>
        ) : (
            <div>Error fetching article</div>
        )}
        {comments ? (
            <div>{comments.map((comment) => 
                <li>{comment.body}</li>
            )}</div>
        ) : (
            <div>Error fetching comments</div>
        )}
        </div>);
    }
}

export default Article