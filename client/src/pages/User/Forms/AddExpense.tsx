import {FaXmark} from "react-icons/fa6"

export default function AddExpense({display, setDisplay}: any) {

    function closeHandle(){
        setDisplay(false);
    }

  return (
    <>
    <div className="popupblur" style={{display: display?'flex':'none'}}></div>
    <div className="popupFrom" style={{display: display?'flex':'none'}}>
        <h2>Expense Details</h2>

        <form className="form">
            <div className="row">
                <div className="col">
                    <label htmlFor="name">Description</label>
                    <input type="text" name="name" id="name" />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <label htmlFor="date">Expense Date</label>
                    <input type="date" name="date" id="date" />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <label htmlFor="amount">Amount</label>
                    <input type="number" name="amount" id="amount" />
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
