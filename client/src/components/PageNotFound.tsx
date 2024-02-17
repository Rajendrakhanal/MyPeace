import { NavLink } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div className="container">
      <h1>Oops!</h1>
      <p>We could not find the page.</p>
      <p>
        <NavLink to="/">Go to the home page</NavLink>
      </p>
    </div>
  );
}
