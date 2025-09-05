import { Box, Button, Paper, Typography } from "@mui/material";
import { useActivities } from "../../../lib/types/hooks/useActivities";
import { useParams } from "react-router";
import { useForm } from "react-hook-form"
import { useEffect } from "react";
import { activitySchema, type AcitivitySchema } from "../../../lib/schemas/ActivitySchema";
import { zodResolver } from '@hookform/resolvers/zod'
import TextInput from "../shared/components/TextInput";
import SelectInput from "../shared/components/SelectInput";
import { categoryOptions } from "./categoryOptions";
import DateTime from "../shared/components/DateTime";

export default function ActivityForm() {
    const {reset, control, handleSubmit} = useForm<AcitivitySchema>({
        mode: 'onTouched',
        resolver: zodResolver(activitySchema),
        // for some reason i need to do that, in the udemy course he didn't do and works, in my case is making 
        // the defaultValues be undefined that brakes the verification of strings
        defaultValues: {
            title: '',
            description: '',
            category: '',
            date: '',
            city: '',
            venue: ''
        }
    });
    const {id} = useParams(); 
    const {updateActivity, createActivity, activity, isLoadingActivity} = useActivities(id); 

    useEffect(() => {
        if (activity) reset(activity);
    }, [activity, reset])

    const onSubmit = (data: AcitivitySchema) => {
        console.log(data)
    }

    if (isLoadingActivity) return <Typography>Loading activity...</Typography>

    return (
        <Paper sx={{ borderRadius: 3, padding: 3 }}>
            <Typography variant="h5" gutterBottom color="primary">
                {activity ? "Edit activity": "Create activity"}
            </Typography>
            <Box component='form' onSubmit={handleSubmit(onSubmit)} display='flex' flexDirection='column' gap={3}>
                <TextInput label='Title' control={control} name="title" />
                <TextInput label='Description' control={control} name="description" multiline rows={3} />
                <SelectInput items={categoryOptions} label='Category' control={control} name="category" />
                <DateTime label='Date' control={control} name="date" />
                <TextInput label='City' control={control} name="city" />
                <TextInput label='Venue' control={control} name="venue" />
                <Box display='flex' justifyContent="end" gap={3}>
                    <Button color="inherit">Cancel</Button>
                    <Button type="submit" 
                            color="success" 
                            variant="contained"
                            disabled={updateActivity.isPending || createActivity.isPending}>Submit</Button>
                </Box>
            </Box>
        </Paper>
    )
}