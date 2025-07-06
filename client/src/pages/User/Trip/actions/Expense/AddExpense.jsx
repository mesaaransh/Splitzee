import { useImperativeHandle, forwardRef, useState } from "react";
import tripFetcher from "../../tripFetcher";
import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import addExpense from "./expenseAdder";
import dateFormat from 'dateformat';

import { FaXmark } from "react-icons/fa6";

const AddExpense = forwardRef((props, ref) => {
    
    const [open, setOpen] = useState(false);
    let query = useQueryClient();

    useImperativeHandle(ref, () => ({
        open: () => setOpen(true),
        close: () => setOpen(false)
    }));

    const { id } = useParams()
    let trip = useQuery({
        queryKey: ['trip', id],
        queryFn: () => tripFetcher(id),
        refetchOnWindowFocus: false,
    })
    
    const [date, setDate] = useState();
    let [financer, setFinancer] = useState(null);
    let [members, setMembers] = useState([]);
    
    function selectFinancer(e) {
        setFinancer(e.currentTarget.dataset.id);
    }
    
    const selectMembers = (e) => {
        const id = e.currentTarget.dataset.id;
        if (!id) return;
        
        setMembers((prev) =>
            prev.includes(id)
                ? prev.filter((i) => i !== id)
                : [...prev, id]
            );
        };

        let expenseAdder = useMutation({
            mutationFn: (d) => addExpense(d),
            onSuccess: (data) => {
            alert('Expense added successfully!');
            console.log(data);
            query.invalidateQueries({ queryKey: ['trip', data._id] });
        },
        onError: (error) => {
            console.error('Error adding expense:', error);
            alert('Failed to add expense. Please try again.');
        }
    })
    
    function submitHandle(e) {
        e.preventDefault();
        
        if (!financer) {
            alert('Please select a financer');
            return;
        }
        
        if (members.length === 0) {
            alert('Please select at least one member');
            return;
        }

        const formData = new FormData(e.currentTarget);
        const data = {
            trip: id,
            description: formData.get('description'),
            amount: parseFloat(formData.get('amount')),
            date: formData.get('date'),
            financer,
            members
        }

        expenseAdder.mutate(data)
        closeForm();

    }

    function closeForm() {
        setFinancer(null);
        setMembers([]);
        setOpen(false);
    }
    
    if (!open) return <></>;
    if (trip.isFetching || trip.isLoading) return (
        <div className="formContainer">
            <form>Loading...</form>
        </div>
    );

    if (trip.isError) return (
        <div className="formContainer">
            <form action="">Error fetching trip details</form>
        </div>
    );

    return (
        <div className="formContainer">
            <form onSubmit={submitHandle}>
                <div>
                    <h2>Add Expense</h2>
                    <p>{trip.data.raw.name} - {dateFormat(trip.data.raw.startDate, 'dd mmmm yyyy')}</p>
                </div>
                <div className="closeForm">
                    <FaXmark onClick={closeForm} />
                </div>
                <div className="formGroup">
                    <label htmlFor="description">Expense Description</label>
                    <input type="text" id="description" name="description" required />
                </div>
                <div className="formGroup">
                    <label htmlFor="amount">Amount</label>
                    <input type="number" id="amount" name="amount" required />
                </div>
                <div className="formGroup">
                    <label htmlFor="date">Date</label>
                    <input type="date" id="date" name="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                </div>

                <div className="formGroup">
                    <label htmlFor="date">Paid By</label>
                    <div className="financers">
                        {
                            trip.data.raw.members.map((member) => (
                                <div className={`financer ${financer === member._id ? 'selected' : ''}`} key={member._id} data-id={member._id} onClick={selectFinancer}>
                                    <p>{member.name}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>

                <div className="formGroup">
                    <label htmlFor="date">Split Into</label>
                    <div className="financers">
                        {
                            trip.data.raw.members.map((member) => (
                                <div className={`financer ${members.includes(member._id) ? 'selected' : ''}`} key={member._id} data-id={member._id} onClick={selectMembers}>
                                    <p>{member.name}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <button type="submit">Add Expense</button>
            </form>
        </div>
    )
})

export default AddExpense;