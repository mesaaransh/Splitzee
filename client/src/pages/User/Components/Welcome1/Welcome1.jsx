import { useRef } from "react";
import AddTrip from "../../Sidebar/AddTrip"
import "./Welcome1.css"

export default function Welcome1() {

  const tripRef = useRef();
  return (
    <>
    <AddTrip ref={tripRef}/>
    <div className="welcome1">
        <h1>Nice to see you!</h1>
        <p>The stress-free way to split bills, rent, and more with friends. Because who needs arguments over money when you could be having a blast?</p>
        <div className="buttons">
            <button onClick={() => {tripRef.current?.open()}}>Make a Trip</button>
            <button>Personal Wallet</button>
        </div>
    </div>
    </>
  )
}
