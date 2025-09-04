import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material"
import { Link, useNavigate, useParams } from "react-router";
import { useActivities } from "../../../lib/types/hooks/useActivities";


export default function ActivityDetail() {
    const navigate = useNavigate();
    const {id} = useParams();
    const {activity, isLoadingActivity} = useActivities(id);
    console.log(activity);


    if (isLoadingActivity) return <Typography>Loading...</Typography>
    
    if (!activity) return <Typography>Activity not found</Typography>

    return (
    <Card sx={{borderRadius: 3}}>
        <CardMedia 
            component='img'
            src={`/images/categoryImages/${activity.category}.jpg`}
        />
        <CardContent>
            <Typography variant="h5">{activity.title}</Typography>
            <Typography variant="subtitle1" fontWeight="light">{activity.date}</Typography>
            <Typography variant="body1">{activity.description}</Typography>
        </CardContent>
        <CardActions>
            {/* This is a way to routing using the componet and i have to specify the to
                In the udemy guide it's said that is more convenient 
            */}
            <Button component={Link} to={`/manage/${activity.id}`} color="primary">Edit</Button>
            {/* The other way is using the useNavigate */}
            <Button onClick={() => navigate('/activities')} color="inherit">Cancel</Button>   
        </CardActions>
    </Card>
  )
}