import React, { useEffect} from "react";

import { useNavigate } from "react-router-dom"; 
import { setLoggedUser } from "../service/news-http.service";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedUser({}).then((response) => {
      window.alert("user logged out");

      navigate(-1, { replace: true });
    });
  }, []);

  return <></>;
}

export default Logout;
