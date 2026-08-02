import "./Process.css";

import ProcessStep from "./ProcessStep";
import ProcessTerminal from "./ProcessTerminal";

const steps = [

{
id:"01",
title:"Reconnaissance",
text:"Collect target intelligence and identify exposed assets before engagement."
},

{
id:"02",
title:"Threat Analysis",
text:"Analyze attack vectors and determine possible vulnerabilities."
},

{
id:"03",
title:"Penetration Testing",
text:"Launch controlled attacks to validate real-world security posture."
},

{
id:"04",
title:"Security Report",
text:"Generate professional vulnerability reports with recommendations."
},

{
id:"05",
title:"Remediation",
text:"Patch weaknesses and verify every security fix."
},

{
id:"06",
title:"Continuous Monitoring",
text:"Keep monitoring infrastructure to detect future attacks."
}

];

export default function Process(){

return(

<section className="process">

<div className="process-header">

<span className="process-badge">

SECURITY WORKFLOW

</span>

<h2>

Cyber Defense

<span>

Operation Process

</span>

</h2>

<p>

Every engagement follows a structured workflow from reconnaissance
to continuous monitoring ensuring maximum security.

</p>

</div>

<div className="process-wrapper">

<div className="process-left">

{

steps.map(step=>

<ProcessStep

key={step.id}

{...step}

/>

)

}

</div>

<div className="process-right">

<ProcessTerminal/>

</div>

</div>

</section>

)

}