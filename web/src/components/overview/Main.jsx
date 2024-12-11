import { NavLink } from "react-router";

export default function Main() {
  return (
    <main className="main">
      <div className="card-container">
        <div className="card">
          <div className="card__header">
            <div className="card__picture">
              <div className="card__picture-overlay">&nbsp;</div>
              <img
                src="img/tour-1-cover.jpg"
                alt="Tour 1"
                className="card__picture-img"
              />
            </div>

            <h3 className="heading-tertirary">
              <span>The Forest Hiker</span>
            </h3>
          </div>

          <div className="card__details">
            <h4 className="card__sub-heading">Easy 5-day tour</h4>
            <p className="card__text">
              Breathtaking hike through the Canadian Banff National Park
            </p>
            <div className="card__data">
              <svg className="card__icon">
                <use xlink:href="img/icons.svg#icon-map-pin"></use>
              </svg>
              <span>Banff, Canada</span>
            </div>
            <div className="card__data">
              <svg className="card__icon">
                <use xlink:href="img/icons.svg#icon-calendar"></use>
              </svg>
              <span>April 2021</span>
            </div>
            <div className="card__data">
              <svg className="card__icon">
                <use xlink:href="img/icons.svg#icon-flag"></use>
              </svg>
              <span>3 stops</span>
            </div>
            <div className="card__data">
              <svg className="card__icon">
                <use xlink:href="img/icons.svg#icon-user"></use>
              </svg>
              <span>25 people</span>
            </div>
          </div>

          <div className="card__footer">
            <p>
              <span className="card__footer-value">$297</span>
              <span className="card__footer-text">per person</span>
            </p>
            <p className="card__ratings">
              <span className="card__footer-value">4.9</span>
              <span className="card__footer-text">rating (21)</span>
            </p>
            <NavLink to="/tour/samosir" className="btn btn--green btn--small">
              Details
            </NavLink>
          </div>
        </div>

        <div className="card">
          <div className="card__header">
            <div className="card__picture">
              <div className="card__picture-overlay">&nbsp;</div>
              <img
                src="img/tour-2-cover.jpg"
                alt="Tour 1"
                className="card__picture-img"
              />
            </div>

            <h3 className="heading-tertirary">
              <span>The Sea Explorer</span>
            </h3>
          </div>

          <div className="card__details">
            <h4 className="card__sub-heading">Medium-difficult 7-day tour</h4>
            <p className="card__text">
              Exploring the jaw-dropping US east coast by foot and by boat
            </p>
            <div className="card__data">
              <svg className="card__icon">
                <use xlink:href="img/icons.svg#icon-map-pin"></use>
              </svg>
              <span>Oregon, US</span>
            </div>
            <div className="card__data">
              <svg className="card__icon">
                <use xlink:href="img/icons.svg#icon-calendar"></use>
              </svg>
              <span>June 2021</span>
            </div>
            <div className="card__data">
              <svg className="card__icon">
                <use xlink:href="img/icons.svg#icon-flag"></use>
              </svg>
              <span>4 stops</span>
            </div>
            <div className="card__data">
              <svg className="card__icon">
                <use xlink:href="img/icons.svg#icon-user"></use>
              </svg>
              <span>15 people</span>
            </div>
          </div>

          <div className="card__footer">
            <p>
              <span className="card__footer-value">$497</span>
              <span className="card__footer-text">per person</span>
            </p>
            <p className="card__ratings">
              <span className="card__footer-value">4.8</span>
              <span className="card__footer-text">rating (12)</span>
            </p>
            <a href="#" className="btn btn--green btn--small">
              Details
            </a>
          </div>
        </div>

        <div className="card">
          <div className="card__header">
            <div className="card__picture">
              <div className="card__picture-overlay">&nbsp;</div>
              <img
                src="img/tour-3-cover.jpg"
                alt="Tour 1"
                className="card__picture-img"
              />
            </div>

            <h3 className="heading-tertirary">
              <span>The Snow Adventurer</span>
            </h3>
          </div>

          <div className="card__details">
            <h4 className="card__sub-heading">Difficult 3-day tour</h4>
            <p className="card__text">
              Exciting adventure in the snow with snowboarding and skiing
            </p>
            <div className="card__data">
              <svg className="card__icon">
                <use xlink:href="img/icons.svg#icon-map-pin"></use>
              </svg>
              <span>Aspen, USA</span>
            </div>
            <div className="card__data">
              <svg className="card__icon">
                <use xlink:href="img/icons.svg#icon-calendar"></use>
              </svg>
              <span>January 2022</span>
            </div>
            <div className="card__data">
              <svg className="card__icon">
                <use xlink:href="img/icons.svg#icon-flag"></use>
              </svg>
              <span>2 stops</span>
            </div>
            <div className="card__data">
              <svg className="card__icon">
                <use xlink:href="img/icons.svg#icon-user"></use>
              </svg>
              <span>10 people</span>
            </div>
          </div>

          <div className="card__footer">
            <p>
              <span className="card__footer-value">$697</span>
              <span className="card__footer-text">per person</span>
            </p>
            <p className="card__ratings">
              <span className="card__footer-value">4.9</span>
              <span className="card__footer-text">rating (7)</span>
            </p>
            <a href="#" className="btn btn--green btn--small">
              Details
            </a>
          </div>
        </div>

        <div className="card">
          <div className="card__header">
            <div className="card__picture">
              <div className="card__picture-overlay">&nbsp;</div>
              <img
                src="img/tour-4-cover.jpg"
                alt="Tour 1"
                className="card__picture-img"
              />
            </div>

            <h3 className="heading-tertirary">
              <span>The City Wanderer</span>
            </h3>
          </div>

          <div className="card__details">
            <h4 className="card__sub-heading">Easy 7-day tour</h4>
            <p className="card__text">
              Living the life of Wanderlust in the US' most beatiful cities
            </p>
            <div className="card__data">
              <svg className="card__icon">
                <use xlink:href="img/icons.svg#icon-map-pin"></use>
              </svg>
              <span>NYC, USA</span>
            </div>
            <div className="card__data">
              <svg className="card__icon">
                <use xlink:href="img/icons.svg#icon-calendar"></use>
              </svg>
              <span>March 2021</span>
            </div>
            <div className="card__data">
              <svg className="card__icon">
                <use xlink:href="img/icons.svg#icon-flag"></use>
              </svg>
              <span>3 stops</span>
            </div>
            <div className="card__data">
              <svg className="card__icon">
                <use xlink:href="img/icons.svg#icon-user"></use>
              </svg>
              <span>20 people</span>
            </div>
          </div>

          <div className="card__footer">
            <p>
              <span className="card__footer-value">$997</span>
              <span className="card__footer-text">per person</span>
            </p>
            <p className="card__ratings">
              <span className="card__footer-value">4.8</span>
              <span className="card__footer-text">rating (31)</span>
            </p>
            <a href="#" className="btn btn--green btn--small">
              Details
            </a>
          </div>
        </div>

        <div className="card">
          <div className="card__header">
            <div className="card__picture">
              <div className="card__picture-overlay">&nbsp;</div>
              <img
                src="img/tour-5-cover.jpg"
                alt="Tour 1"
                className="card__picture-img"
              />
            </div>

            <h3 className="heading-tertirary">
              <span>The Park Camper</span>
            </h3>
          </div>

          <div className="card__details">
            <h4 className="card__sub-heading">Medium-Difficult 10-day tour</h4>
            <p className="card__text">
              Breathing in Nature in America's most spectacular National Parks
            </p>
            <div className="card__data">
              <svg className="card__icon">
                <use xlink:href="img/icons.svg#icon-map-pin"></use>
              </svg>
              <span>Las Vegas, USA</span>
            </div>
            <div className="card__data">
              <svg className="card__icon">
                <use xlink:href="img/icons.svg#icon-calendar"></use>
              </svg>
              <span>August 2021</span>
            </div>
            <div className="card__data">
              <svg className="card__icon">
                <use xlink:href="img/icons.svg#icon-flag"></use>
              </svg>
              <span>4 stops</span>
            </div>
            <div className="card__data">
              <svg className="card__icon">
                <use xlink:href="img/icons.svg#icon-user"></use>
              </svg>
              <span>15 people</span>
            </div>
          </div>

          <div className="card__footer">
            <p>
              <span className="card__footer-value">$1,497</span>
              <span className="card__footer-text">per person</span>
            </p>
            <p className="card__ratings">
              <span className="card__footer-value">4.9</span>
              <span className="card__footer-text">rating (19)</span>
            </p>
            <a href="/tour.html" className="btn btn--green btn--small">
              Details
            </a>
          </div>
        </div>

        <div className="card">
          <div className="card__header">
            <div className="card__picture">
              <div className="card__picture-overlay">&nbsp;</div>
              <img
                src="img/tour-6-cover.jpg"
                alt="Tour 1"
                className="card__picture-img"
              />
            </div>

            <h3 className="heading-tertirary">
              <span>The Sports Lover</span>
            </h3>
          </div>

          <div className="card__details">
            <h4 className="card__sub-heading">Difficult 14-day tour</h4>
            <p className="card__text">
              Surfing, skating, parajumping, rock climbing and more, all in one
              tour
            </p>
            <div className="card__data">
              <svg className="card__icon">
                <use xlink:href="img/icons.svg#icon-map-pin"></use>
              </svg>
              <span>California, USA</span>
            </div>
            <div className="card__data">
              <svg className="card__icon">
                <use xlink:href="img/icons.svg#icon-calendar"></use>
              </svg>
              <span>July 2021</span>
            </div>
            <div className="card__data">
              <svg className="card__icon">
                <use xlink:href="img/icons.svg#icon-flag"></use>
              </svg>
              <span>5 stops</span>
            </div>
            <div className="card__data">
              <svg className="card__icon">
                <use xlink:href="img/icons.svg#icon-user"></use>
              </svg>
              <span>8 people</span>
            </div>
          </div>

          <div className="card__footer">
            <p>
              <span className="card__footer-value">$1,997</span>
              <span className="card__footer-text">per person</span>
            </p>
            <p className="card__ratings">
              <span className="card__footer-value">4.7</span>
              <span className="card__footer-text">rating (23)</span>
            </p>
            <a href="#" className="btn btn--green btn--small">
              Details
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
