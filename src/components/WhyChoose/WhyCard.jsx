import "./WhyCard.css";

export default function WhyCard({

  number,

  icon: Icon,

  title,

  text

}) {

  return (

    <article className="why-card">

      <div className="scan-line"></div>

      <span className="corner tl"></span>
      <span className="corner tr"></span>
      <span className="corner bl"></span>
      <span className="corner br"></span>

      <div className="why-top">

        <div className="icon-box">

          <Icon size={28} />

        </div>

        <span className="number">

          {number}

        </span>

      </div>

      <h3>

        {title}

      </h3>

      <p>

        {text}

      </p>

      <div className="card-footer">

        <span>ACTIVE</span>

        <div className="pulse"></div>

      </div>

    </article>

  );

}