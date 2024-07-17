import "./Froms.css"

import {FaXmark} from "react-icons/fa6"

export default function AddTrip({display, setDisplay} : any) {

    function closeHandle(){
        setDisplay(false);
    }

  return (
    <>
    <div className="popupblur" style={{display: display?'flex':'none'}}></div>
    <div className="popupFrom" style={{display: display?'flex':'none'}}>
        <h2>Trip Details</h2>

        <form className="form">
            <div className="row">
                <div className="col">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <label htmlFor="date">Start Date</label>
                    <input type="date" name="startDate" id="date" />
                </div>
            </div>

            <button type="submit">Save Details</button>
        </form>

        <div className="closeButton" onClick={closeHandle}>
            <FaXmark/>
        </div>
    </div>
    </>
  )
}
