import { CardMedia, Typography, CardContent, Card } from "@mui/material"
import { format } from "date-fns"
import { Link } from "react-router"

type Props = {
    userActivity: UserActivity
}

export default function ProfileActivityCard({ userActivity }: Props) {
    return (
        <Link to={`/activities/${userActivity.id}`} style={{ textDecoration: 'none' }}>
            <Card elevation={4} sx={{ height: '100%' }}>
                <CardMedia
                    component="img"
                    height="140"
                    image={`/images/categoryImages/${userActivity.category}.jpg`}
                    alt={userActivity.title}
                    sx={{ objectFit: 'cover' }}
                />
                <CardContent>
                    <Typography variant="h6" textAlign="center" mb={1}>
                        {userActivity.title}
                    </Typography>
                    <Typography
                        variant="body2"
                        textAlign="center"
                        display='flex'
                        flexDirection='column'
                    >
                        <span>{format(userActivity.date, 'do LLL yyyy')}</span>
                        <span>{format(userActivity.date, 'h:mm a')}</span>
                    </Typography>
                </CardContent>
            </Card>
        </Link>
    )
}
