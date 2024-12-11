export default function Account() {
  return (
    <main className="main">
      <div className="user-view">
        <nav className="user-view__menu">
          <ul className="side-nav">
            <li className="side-nav--active">
              <a href="#">
                {/* <Settings className="side-nav__icon" /> */}
                Settings
              </a>
            </li>
            <li>
              <a href="#">
                {/* <Briefcase className="side-nav__icon" /> */}
                My bookings
              </a>
            </li>
            <li>
              <a href="#">
                {/* <Star className="side-nav__icon" /> */}
                My reviews
              </a>
            </li>
            <li>
              <a href="#">
                {/* <CreditCard className="side-nav__icon" /> */}
                Billing
              </a>
            </li>
          </ul>

          <div className="admin-nav">
            <h5 className="admin-nav__heading">Admin</h5>
            <ul className="side-nav">
              <li>
                <a href="#">
                  {/* <Map className="side-nav__icon" /> */}
                  Manage tours
                </a>
              </li>
              <li>
                <a href="#">
                  {/* <Users className="side-nav__icon" /> */}
                  Manage users
                </a>
              </li>
              <li>
                <a href="#">
                  {/* <Star className="side-nav__icon" /> */}
                  Manage reviews
                </a>
              </li>
              <li>
                <a href="#">
                  {/* <Briefcase className="side-nav__icon" /> */}
                  Manage bookings
                </a>
              </li>
            </ul>
          </div>
        </nav>

        <div className="user-view__content">
          <div className="user-view__form-container">
            <h2 className="heading-secondary ma-bt-md">
              Your account settings
            </h2>
            <form className="form form-user-data">
              <div className="form__group">
                <label className="form__label" htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  className="form__input"
                  type="text"
                  defaultValue="Alfrendo Silalahi"
                  required
                />
              </div>
              <div className="form__group ma-bt-md">
                <label className="form__label" htmlFor="email">
                  Email address
                </label>
                <input
                  id="email"
                  className="form__input"
                  type="email"
                  defaultValue="admin@natours.io"
                  required
                />
              </div>
              <div className="form__group form__photo-upload">
                <img
                  className="form__user-photo"
                  src="img/user.jpg"
                  alt="User photo"
                />
                <a className="btn-text" href="">
                  Choose new photo
                </a>
              </div>
              <div className="form__group right">
                <button className="btn btn--small btn--green">
                  Save settings
                </button>
              </div>
            </form>
          </div>

          <div className="line">&nbsp;</div>

          <div className="user-view__form-container">
            <h2 className="heading-secondary ma-bt-md">Password change</h2>
            <form className="form form-user-settings">
              <div className="form__group">
                <label className="form__label" htmlFor="password-current">
                  Current password
                </label>
                <input
                  id="password-current"
                  className="form__input"
                  type="password"
                  placeholder="••••••••"
                  required
                  minLength="8"
                />
              </div>
              <div className="form__group">
                <label className="form__label" htmlFor="password">
                  New password
                </label>
                <input
                  id="password"
                  className="form__input"
                  type="password"
                  placeholder="••••••••"
                  required
                  minLength="8"
                />
              </div>
              <div className="form__group ma-bt-lg">
                <label className="form__label" htmlFor="password-confirm">
                  Confirm password
                </label>
                <input
                  id="password-confirm"
                  className="form__input"
                  type="password"
                  placeholder="••••••••"
                  required
                  minLength="8"
                />
              </div>
              <div className="form__group right">
                <button className="btn btn--small btn--green">
                  Save password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
