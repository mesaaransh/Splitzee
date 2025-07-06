import "./Trip.css"
import { useParams } from 'react-router-dom';
import { TbTrashX, TbBookmark } from "react-icons/tb";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TripCu } from "./TripCU";
import tripFetcher from "./tripFetcher";
import dateFormat from "dateformat";
import getCategoryForDescription from "./functions/iconSuggestor";
import expenseDeleter from "./actions/Expense/expenseDeleter";


export default function Trips() {

    const { id } = useParams()
    let trip = useQuery({
        queryKey: ['trip', id],
        queryFn: () => tripFetcher(id),
        refetchOnWindowFocus: false,
    })

    return (
        <>
        {
            (trip.isLoading || trip.isPending)?
            <p>Loading Data</p>
            :
            <div className="trip">

                <TripCu trip={trip.data.raw} />
                <div className="tripTransactions">
                    <TripTransactions trip={trip.data.grouped} />
                </div>

            </div>
        }
        </>
    )
}


function TripTransactions({ trip }) {

    // if (trip.isError) return (<>There was an error fetching trips</>)
    return (
        <>
            {
                Object.keys(trip.transactions).map((date) => (
                    <TripTransactionSection date={date} num={trip.transactions[date].length} key={date}>
                        {
                            trip.transactions[date].map((data) => (
                                <TripTransaction key={data._id} data={data} />
                            ))
                        }
                    </TripTransactionSection>
                ))
            }
        </>
    )
}



function TripTransactionSection({ date, num, children }) {

    return (

        <div className="tripTransactionSection">
            <div className="tripTransactionSectionHeader">
                <h3>{dateFormat(date, "dd mmmm yyyy")}</h3>
                <div>
                    <p>No. of transactions: {num}</p>
                </div>
            </div>
            {children}
        </div>

    )

}


function TripTransaction({ data }) {

    let { id } = useParams();
    const { icon: Icon, color, bgColor } = getCategoryForDescription(data.description);
    let userData = JSON.parse(sessionStorage.getItem("userData"));
    let query = useQueryClient();

    const isPresent = data.members.some((m) => m._id === userData._id);

    let deleter = useMutation({
        mutationFn: (id) => expenseDeleter(id),
        onSuccess: () => {
            console.log("Expense deleted successfully");
            query.invalidateQueries({ queryKey: ['trip', id] }, {
                exact: true,
            });
        },
        onError: (error) => {
            console.error("Error deleting expense:", error);
            alert("Failed to delete expense. Please try again.");
        }
    })

    function deleteHandle() {
        deleter.mutate(data._id);
    }

    if (deleter.isPending) return (<div className="tripTransaction">Deleting...</div>);
    return (

        <div className="tripTransaction">

            <div className="tripTransactionIcon" style={{ backgroundColor: bgColor, color: color }}>
                <Icon />
            </div>
            <div className="tripTransactionInfo">
                <h3>{data.description}</h3>
                <p className="tripTransactionDate">Paid By: {data.financer.name}</p>
                <p className="tripTransactionDate">Shared By: {data.members.map((member) => (member.name + ", "))}</p>
            </div>

            <div className="tripTransactionAmount">
                <h3>${data.amount}</h3>
                <p>Your Share: ${isPresent ? Math.round((data.amount / data.members.length) * 100) / 100 : '0'}</p>
            </div>

            <div className="tripTransactionIcons">
                <div className="bookmark">
                    <TbBookmark />
                </div>
                <div className="delete" onClick={deleteHandle}>
                    <TbTrashX />
                </div>
            </div>
        </div>

    )

}