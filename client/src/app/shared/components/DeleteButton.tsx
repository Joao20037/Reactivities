import { Delete, DeleteOutline } from "@mui/icons-material"
import { Button } from "@mui/material"
import { Box } from "@mui/system"


export default function DeleteButton() {
  return (
    <Box sx={{position: 'relative'}}>
        <Button 
            sx={{
                opacity: 0.8,
                transition: 'opacity 0.3s',
                position: "relative",
                cursor: 'pointer'
            }}>
                <DeleteOutline 
                    sx = {{
                        fontSize: 32,
                        color: 'white',
                        position: 'absolute'
                    }}
                />

                <Delete 
                    sx={{
                        fontSize: 28,
                        color: 'red'
                    }}
                />
            </Button>
    </Box>
  )
}