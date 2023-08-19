import React from 'react';
import { Link } from 'react-router-dom';

function ErrorPage() {
  return (
    <div>
      <h2>Oops! Something went wrong.</h2>
      <p>You encountered an error or The page you're looking for does not exist.</p>
      <Link to="/">Go to Homepage</Link>
    </div>
  );
}

export default ErrorPage;
