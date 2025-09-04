import { Grid } from "@mui/material";
import ActivityList from "./ActivityList";
import ActivityDetail from "../details/ActivityDetail";
import ActivityForm from "../../../app/layout/forms/ActivityForm";

type Props = {
    activities: Activity[]
    selectActivity: (id:string) => void
    cancelActivity: () => void
    selectedActivity?: Activity
    openForm: (id: string) => void
    closeForm: () => void
    editMode: boolean
}

export default function ActivityDashboard({activities, 
                                            selectActivity,
                                            cancelActivity, 
                                            selectedActivity,
                                            openForm,
                                            closeForm,
                                            editMode}: Props) {
    return (
        <Grid container spacing={3}>
            <Grid size={7}>
                <ActivityList activities={activities} 
                              selectActivity={selectActivity}/>
            </Grid>
            <Grid size={5}>
                {selectedActivity && !editMode &&
                <ActivityDetail selectedActivity={selectedActivity} 
                                cancelSelectActivity={cancelActivity}
                                openForm={openForm}/>
                }
            {editMode && 
                <ActivityForm closeForm={closeForm} activity={selectedActivity}/>}
            </Grid>
        </Grid>
    )
}