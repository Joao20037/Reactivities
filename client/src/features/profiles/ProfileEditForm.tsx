import { useForm } from "react-hook-form"
import { editProfileSchema, type EditProfileSchema } from "../../lib/schemas/EditProfileSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useParams } from "react-router"
import { useProfile } from "../../lib/hooks/useProfile"
import { useEffect } from "react"
import { Box, Button } from "@mui/material"
import TextInput from "../../app/shared/components/TextInput"

type Props = {
    onSuccess: () => void;
}

export default function ProfileEditForm({ onSuccess }: Props) {
    const { reset, control, handleSubmit, formState} = useForm<EditProfileSchema>({
        mode: 'onTouched',
        resolver: zodResolver(editProfileSchema)
    })

    const { id } = useParams();
    const { editProfile, profile } = useProfile(id);

    // This makes that if data is fetched it is updated in the forms
    useEffect(() => {
        if(profile) reset({
            ...profile
        });
    }, [profile, reset])

    const onSubmit = async (data: EditProfileSchema) => {
        try {
            if(profile) {
                editProfile.mutate({...profile, ...data}, {
                    onSuccess: () => {onSuccess();}
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Box>
            <Box component='form' onSubmit={handleSubmit(onSubmit)} display='flex' flexDirection='column' gap={3}>
                <TextInput label='Display Name' control={control} name="displayName"/>
                <TextInput label='Bio' control={control} name='bio' multiline rows={3}/>
                <Button type='submit'
                        color='success'
                        variant="contained"
                        disabled={!formState.isValid || !formState.isDirty || editProfile.isPending}>
                            UPDATE PROFILE
                </Button>
            </Box>
        </Box>
    )
}