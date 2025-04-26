import "./UserActivity.css"

export default function UserActivity() {
  return (
    <div className="userActivity">

        <h3> Your Activity </h3>

        <div className="activities">
            <Activity type={'oweActivity'} name={'Abhay Bagla'} amount={'200'} reason={'Shimla Trip'} date={'20th October 2024'} />
            <Activity type={'payActivity'} name={'Abhay Bagla, Gauransh Mehra'} amount={'200'} reason={'Party Night Dinner'} date={'1st December 2022'} />
            <Activity type={'avainActivity'} name={'Chirag Bansal'} amount={'200'} reason={'After Exam Lunch'} date={'5th April 2025'} />
        </div>

    </div>
  )
}


function Activity({name, amount, reason, date, type}: any){

    return(
        <div className={"activity " + type}>
            <p>You owe {name} ${amount} for {reason}</p>
            {/* <p> You paid Abhay Bagla, Gauransh Mehra, Chirag Bansal $200 for phalana dhimkana </p> */}
            <p>{date}</p>
        </div>
    )

}