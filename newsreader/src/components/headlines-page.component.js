//React imports
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getHeadlinesByCategory,
  getLoggedUser,
} from "../service/news-http.service";
import Navbar from "./navbar.component";

const Headlines = () => {
  const { categoriesParam } = useParams();
  const categories = categoriesParam.split(',')
  const categoriesIds = categories.join('&categorieId=');

  const [headlines, setHeadlines] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getLoggedUser().then((res) => setUser(res.data));
    getHeadlinesByCategory(categoriesIds)
      .then((res) => {
        console.log(res.data);
        setHeadlines(res.data);
      })
      .catch((err) => {
        console.error("Error fetching headlines: ", err);
        navigate('/error')
      })
      .finally(() => setIsLoading(false));
  }, [categoriesIds]);

  if (isLoading) {
    return <div>Loding data</div>;
  } else {
    return (
      <div>
        <Navbar user={user} />
        {headlines && headlines.length !== 0 ? (
          <div>
            {headlines.map((headline) => (
              <a href={"/article/" + headline.articleId} key={headline.id}>
                <li>{headline.headline}</li>
              </a>
            ))}
          </div>
        ) : (
          <div>No headlines in specific categories</div>
        )}
      </div>
    );
  }
};

export default Headlines;
