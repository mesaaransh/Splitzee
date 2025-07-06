const activity = require("../Models/activity");


async function getActivities(req, res) {
    try {
        let activities = await activity.find({
            user: {$in: [req.tokenData.id]},
        })
        .limit(5)
        .sort({
            date: -1
        });
        res.status(200).send(activities);
    }
    catch (error) {
        console.error("Error fetching activities:", error);
        res.status(400).send(error);
    }
}

async function addActivity(req, res) {
    try {

        let data = req.body;

        if(!data.user){
            data.user = [req.tokenData.id];
        }
        
        console.log(data);
        
        let newActivity = new activity(data);
        await newActivity.save();
        res.status(200).send(newActivity);

    } catch (error) {
        console.error("Error adding activity:", error);
        res.status(400).send(error);
    }
}

module.exports = {addActivity, getActivities};