export default function SectionCta() {
  return (
    <section className="section-cta">
      <div className="cta">
        <div className="cta__img cta__img--logo">
          <img src="img/logo-white.png" alt="Natours logo" className="" />
        </div>
        <img src="img/tour-5-2.jpg" alt="" className="cta__img cta__img--1" />
        <img src="img/tour-5-1.jpg" alt="" className="cta__img cta__img--2" />

        <div className="cta__content">
          <h2 className="heading-secondary">What are you waiting for?</h2>
          <p className="cta__text">
            10 days. 1 adventure. Infinite memories. Make it yours today!
          </p>
          <button className="btn btn--green span-all-rows">
            Book tour now!
          </button>
        </div>
      </div>
    </section>
  );
}
