import './App.css';

import Categories from './components/categories-page.component';
import Headlines from './components/headlines-page.component';
import Article from './components/article-page.component';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserLogin from './components/login-page.component';
import Logout from './components/logout.component';
import ErrorPage from './components/erroe-page.component';
import UserRegistration from './components/register-page.component';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<ErrorPage/>} />
          <Route index element={<Categories />} />
          <Route path="login" element={<UserLogin />} />
          <Route path="logout" element={<Logout />} />
          <Route path="register" element={<UserRegistration />} />
          <Route path="headlines/:categoriesParam" element={<Headlines />} />
          <Route path="article/:articleid" element={<Article />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
