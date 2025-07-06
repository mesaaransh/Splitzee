import { useMutation, useQueryClient } from "@tanstack/react-query";
import { forwardRef, useImperativeHandle, useState } from "react"
import { FaXmark } from "react-icons/fa6";
import tripAdder from "./tripAdder";

const AddTrip = forwardRef((props, ref) => {

    const [open, setOpen] = useState(false);
    let query = useQueryClient();

    useImperativeHandle(ref, () => ({
        open: () => setOpen(true),
        close: () => setOpen(false)
    }));

    function closeForm() {
        setOpen(false);
    }


    let adder = useMutation({
        mutationFn: (d) => tripAdder(d),
        onSuccess: (resp) => {
            query.invalidateQueries(['trips'])
            alert("Successfully added trip");
            closeForm();
        },
        onError: (err) => {
            console.log(err)
            alert("There was a problem adding the trip")
        }
    })

    function submitHandle(e){
        e.preventDefault();
        let formData = new FormData(e.currentTarget)

        let trip = {
            name: formData.get('name'),
            startDate: formData.get('date')
        }

        adder.mutate(trip)

    }

    if(!open) return null;
    return (
        <div className="formContainer">
            <form onSubmit={submitHandle}>
                <h3>Add Trip</h3>

                <div className="closeForm">
                    <FaXmark onClick={closeForm} />
                </div>
                <div className="formGroup">
                    <label htmlFor="name">Trip Name</label>
                    <input type="text" id="name" name="name" required />
                </div>
                <div className="formGroup">
                    <label htmlFor="date">Start Date</label>
                    <input type="date" id="date" name="date" required />
                </div>

                <button type="submit">Add Trip</button>
            </form>
        </div>
    )
})

export default AddTrip