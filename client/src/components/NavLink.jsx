import { NavLink as RouterNavLink } from "react-router-dom";

function NavLink({ to, children }) {
  return (
    <RouterNavLink to={to} className="navbtn">
      {(isActive, isPending, isTransitioning) => (
        <button
          as="input"
          type="button"
          className={"navbtn" + (isActive ? " active" : "")}
        >
          {children}
        </button>
      )}
    </RouterNavLink>
  );
}

export default NavLink;
