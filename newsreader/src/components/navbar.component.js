import React from "react";

function Navbar({ user }) {
  return (
    <nav className="navbar">
      <div className="logo">
        <a href="/">News Reader</a>
      </div>

      <ul className="nav-links">
        {user == null || JSON.stringify(user) === "{}" ? (
          <>
            <li>
              <a href="/login">Login</a>
            </li>

            <li>
              <a href="/register">Sign Up</a>
            </li>
          </>
        ) : (
          <>
            <li>Hello {user.name}</li>

            <li>
              <a href="/logout">Logout</a>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
