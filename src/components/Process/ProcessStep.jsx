import "./ProcessStep.css";

export default function ProcessStep({

id,

title,

text

}){

return(

<div className="process-card">

<div className="step-number">

{id}

</div>

<div className="step-content">

<h3>

{title}

</h3>

<p>

{text}

</p>

</div>

<div className="step-status">

<span></span>

ACTIVE

</div>

</div>

)

}