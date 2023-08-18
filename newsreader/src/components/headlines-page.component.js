//React imports
import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { getHeadlinesByCategory } from '../service/news-http.service';

const Headlines = () => {
    const { categoryid } = useParams();
    const [headlines, setHeadlines] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(()=> {
        getLoggedUser().then(res => setUser(res.data));
        getHeadlinesByCategory(categoryid).then(res => {
            console.log(res.data);
            setHeadlines(res.data);
        }).catch(err => {
            console.error("Error fetching headlines: ", err);
        }).finally(() => setIsLoading(false))
    })

    if(isLoading){
        return <div>Loding data</div>
    } else {
        return (
            <div>
                <Navbar user={user}/>
        headlines ? (
            <div>{headlines.map((headline) => 
                <a href={"/article/"+headline.article} key={headline.id}><li>{headline.headline}</li></a>
            )}</div>
        ) : (
            <div>Error fetching data</div>
        )
        </div>)
    }
}

export default Headlines