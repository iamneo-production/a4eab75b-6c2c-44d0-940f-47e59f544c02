//React imports
import React, {useEffect, useState} from 'react';
import { getAllCategories } from '../service/news-http.service';

const Categories = () => {

    const [categories, setCategories] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=> {
        getAllCategories().then(res => {
            setCategories(res.data);
            setIsLoading(false);
        }).catch(err => {
            setIsLoading(false);
            console.error("Error fetching categories: ", err);
        })
    })

    if(isLoading){
        return <div>Loding data</div>
    } else {
        return (
        categories ? (
            <div>{categories.map((category) => 
                <a href={category.id+"/headlines"}><li>{category.type}</li></a>
            )}</div>
        ) : (
            <div>Error fetching data</div>
        ))
    }
}

export default Categories