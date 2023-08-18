import './App.css';

import Categories from './components/categories-page.component';
import Headlines from './components/headlines-page.component';
import Article from './components/article-page.component';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserLogin from './components/login-page.component';
import Logout from './components/logout.component';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route index element={<Categories />} />
            <Route path="login" element={<UserLogin />} />
            <Route path="logout" element={<Logout />} />
            <Route path=":categoryid/headlines" element={<Headlines />} />
            <Route path="article/:articleid" element={<Article />} />
            
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
