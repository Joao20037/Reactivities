import { Box, Tabs, Tab, Typography, Grid } from "@mui/material";
import { useEffect, useState, type SyntheticEvent } from "react";
import { useProfile } from "../../lib/hooks/useProfile";
import { useParams } from "react-router";
import ProfileActivityCard from "./ProfileActivityCard";

export default function ProfileActivities() {
    const { id } = useParams();
    const [value, setValue] = useState(0);
    const { setFilter, loadingUserActivities, userActivities } = useProfile(id);

    const handleChange = (_: SyntheticEvent, newValue: number) => {
        setValue(newValue);
        setFilter(tabContent[newValue].filter);
    }

    useEffect(() => {
        setFilter('future');
    }, [setFilter]);

    const tabContent = [
        { label: "future events", filter: 'future' },
        { label: "past events", filter: 'past' },
        { label: "hosting", filter: 'hosting' }
    ]

    return (
        <Box>
            <Tabs
                orientation="horizontal"
                value={value}
                onChange={handleChange}>
                {tabContent.map((tab, index) => (
                    <Tab key={index} label={tab.label} sx={{ mr: 3 }} />
                ))}
            </Tabs>
            <Box>
                {loadingUserActivities ? <Typography marginTop={3}>Loading...</Typography> : (
                    <Box display='flex' marginTop={3} gap={3}>
                        {userActivities?.length === 0 ? (<Typography>No events</Typography>) : (
                            <Grid container spacing={2} sx={{ mt: 2, width: '100%'}}>
                                {userActivities?.map(activity => (
                                    <Grid size={2} key={activity.id}>
                                        <ProfileActivityCard userActivity={activity} />
                                    </Grid>
                                ))}
                            </Grid>)}
                    </Box>
                )}
            </Box>
        </ Box>
    )
}