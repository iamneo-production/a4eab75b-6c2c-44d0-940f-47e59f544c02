//React imports
import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { getHeadlinesByCategory } from '../service/news-http.service';

const Headlines = () => {
    const { categoryid } = useParams();
    const [headlines, setHeadlines] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=> {
        getHeadlinesByCategory(categoryid).then(res => {
            setHeadlines(res.data);
            setIsLoading(false);
        }).catch(err => {
            setIsLoading(false);
            console.error("Error fetching headlines: ", err);
        })
    })

    if(isLoading){
        return <div>Loding data</div>
    } else {
        return (
        headlines ? (
            <div>{headlines.map((headline) => 
                <a href={"/article/"+headline.article}><li>{headline.content}</li></a>
            )}</div>
        ) : (
            <div>Error fetching data</div>
        ))
    }
}

export default Headlines