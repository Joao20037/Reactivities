import { CssBaseline, Container, Box, Typography } from "@mui/material";
import NavBar from "./NavBar";
import { useState } from "react"
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { useActivities } from "../../lib/types/hooks/useActivities";

function App() {

  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditmode] = useState(false);
  const {activities, isPending} = useActivities(); 
  


  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities!.find(x => x.id === id));
  }

  const handleCancelSelectActivity = () => {
    setSelectedActivity(undefined);
  }

  const handleOpenForm = (id?: string) => {
    if (id) handleSelectActivity(id);
    else handleCancelSelectActivity();
    setEditmode(true);
  }

  const handleFormClose = () => {
    setEditmode(false);
  }


  const handleDelete = (id:string) => {
    console.log(id);
  }


  return (
    <Box sx={{bgcolor: '#eeeeee', minHeight:'100vh'}}>
      <CssBaseline />
      <NavBar openForm={handleOpenForm}/>
      <Container maxWidth='xl' sx={{mt: 3}}>
        {!activities || isPending ? (
          <Typography>Loading...</Typography>
        ) : (
        <ActivityDashboard activities={activities} 
                           selectActivity={handleSelectActivity} 
                           cancelActivity={handleCancelSelectActivity}
                           selectedActivity={selectedActivity}
                           editMode={editMode}
                           openForm={handleOpenForm}
                           closeForm={handleFormClose}
                           deleteActivity={handleDelete}/>)}
      </Container>
    </Box>
  )
}

export default App
