import { useQuery } from "@tanstack/react-query"
import "./UserActivity.css"
import axios from "axios";
import config from "../../../../config";
import type { Activity } from "../../../../schemas/activity";

export default function UserActivity() {
  const query = useQuery({
    queryKey: ['activities'],
    queryFn: async (): Promise<Activity[]> => {
      const res = await axios.get(config.apiURL + 'activity', {
        headers: {
          token: sessionStorage.getItem('token') || ''
        }
      });
      return res.data;
    },
  });

  return (
    <div className="userActivity">
      <h3>Your Activity</h3>
      <div className="activities">
        {
          query.isLoading ? (
            <p>Loading...</p>
          ) : query.isError ? (
            <p>Error loading activity!</p>
          ) : (
            query.data?.map((activity: Activity) => (
              <Activity
                key={activity._id}
                message={activity.message}
                date={activity.date}
              />
            ))
          )
        }
      </div>
    </div>
  );
}

function Activity({message, date}: any){

    return(
        <div className={"activity"}>
            <p>{message}</p>
            <p>{date}</p>
        </div>
    )

}