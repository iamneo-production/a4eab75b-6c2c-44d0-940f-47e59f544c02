//React imports
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllCategories, getLoggedUser } from "../service/news-http.service";
import Navbar from "./navbar.component";

const Categories = () => {
  const [categories, setCategories] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [checkedCategories, setcheckedCategories] = useState([]);
  const navigate = useNavigate();

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    if (event.target.checked) {
      setcheckedCategories((prevCheckedCategories) => [
        ...prevCheckedCategories,
        value,
      ]);
    } else {
      setcheckedCategories((prevCheckedCategories) =>
        prevCheckedCategories.filter((item) => item !== value)
      );
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const checkedCategoriesParam = checkedCategories.join(",");
    navigate(`headlines/${checkedCategoriesParam}`);
  };

  useEffect(() => {
    getLoggedUser().then((res) => setUser(res.data));

    getAllCategories()
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.error("Error fetching categories: ", err);
        navigate('/error');
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <div>Loding data</div>;
  } else {
    return (
      <div>
        <Navbar user={user} />
        {categories ? (
          <div>
            <form onSubmit={handleSubmit}>
              {categories.map((category) => (
                <div key={category.id}>
                  <label>
                    <input
                      type="checkbox"
                      value={category.id}
                      onChange={handleCheckboxChange}
                    />
                    {category.type}
                  </label>
                </div>
              ))}
              <button type="submit">Show News</button>
            </form>
          </div>
        ) : (
          <div>Error fetching data</div>
        )}
      </div>
    );
  }
};

export default Categories;
