export default function SectionHeader() {
  return (
    <section className="section-header">
      <div className="heading-box">
        <h1 className="heading-primary">
          <span>
            The Park <br />
            Camper Tour
          </span>
        </h1>
        <div className="heading-box__group">
          <div className="heading-box__detail">
            <svg className="heading-box__icon">
              <use xlink:href="img/icons.svg#icon-clock"></use>
            </svg>
            <span className="heading-box__text">10 days</span>
          </div>
          <div className="heading-box__detail">
            <svg className="heading-box__icon">
              <use xlink:href="img/icons.svg#icon-map-pin"></use>
            </svg>
            <span className="heading-box__text">Las Vegas, USA</span>
          </div>
        </div>
      </div>
    </section>
  );
}
