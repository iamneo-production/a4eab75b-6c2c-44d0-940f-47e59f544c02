//React imports
import React, {useEffect, useState} from 'react';
import { getAllCategories, getLoggedUser } from '../service/news-http.service';
import Navbar from './navbar.component';

const Categories = () => {

    const [categories, setCategories] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(()=> {
        getLoggedUser().then(res => setUser(res.data))
        getAllCategories().then(res => {
            setCategories(res.data);
        }).catch(err => {
            console.error("Error fetching categories: ", err);
        }).finally(() => setIsLoading(false))
    })

    if(isLoading){
        return <div>Loding data</div>
    } else {
        return (
            <div>
                <Navbar user={user}/>
        categories ? (
            <div>{categories.map((category) => 
                <a href={category.id+"/headlines"}><li>{category.type}</li></a>
            )}</div>
        ) : (
            <div>Error fetching data</div>
        )
        </div>
        )
    }
}

export default Categories