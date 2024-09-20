import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/concerts">Musical Concerts</NavLink>
      <NavLink to="/stand-ups">Stand-up Comedy</NavLink>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/register">Create Account</NavLink>
    </div>
  );
};

export default Navbar;
