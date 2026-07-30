import { useState } from "react";

import Loader from "./components/Loader/Loader";

import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Services from "./components/Services/Services";
import Team from "./components/Team/Team";
import Dashboard from "./components/Dashboard/Dashboard";
import ThreatMap from "./components/ThreatMap/ThreatMap";

function App() {

    const [loading,setLoading]=useState(true);

    if(loading){
        return <Loader onComplete={()=>setLoading(false)} />
    }

    return(
        <>
            <Navbar/>
            <Hero/>
            <About/>
            <Services/>
            <Team/>
            <Dashboard />
            <ThreatMap />
        </>
    )
}

export default App;