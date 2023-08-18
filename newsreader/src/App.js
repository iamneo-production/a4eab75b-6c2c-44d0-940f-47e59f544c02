import logo from './logo.svg';
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
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
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
