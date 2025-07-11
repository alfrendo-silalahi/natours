import { NavLink } from "react-router";
import { useAuth } from "../../context/auth.context";

export default function Header() {
  const { logout } = useAuth();

  return (
    <header className="header">
      <nav className="nav nav--tours">
        <NavLink to="/" className="nav__el">
          All tours
        </NavLink>
        <form className="nav__search">
          <button className="nav__search-btn">
            <svg>
              <use href="img/icons.svg#icon-search"></use>
            </svg>
          </button>
          <input
            type="text"
            placeholder="Search tours"
            className="nav__search-input"
          />
        </form>
      </nav>
      <div className="header__logo">
        <img src="img/logo-white.png" alt="Natours logo" />
      </div>
      <nav className="nav nav--user">
        <a href="#" className="nav__el">
          My bookings
        </a>
        <a href="#" className="nav__el">
          <img src="img/user.jpg" alt="User photo" className="nav__user-img" />
          <span>Alfrendo</span>
        </a>

        <button className="nav__el">Log in</button>
        <button className="nav__el nav__el--cta">Sign up</button>
        <button onClick={logout} className="nav__el nav__el--cta">
          Logout
        </button>
      </nav>
    </header>
  );
}
