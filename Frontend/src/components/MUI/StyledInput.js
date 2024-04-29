import { styled } from '@mui/material/styles'
import { TextField } from '@mui/material'


const StyledInput = styled(TextField)(({theme}) => ({
    "& .MuiInputBase-input": {
        paddingTop: "12px",
        paddingBottom: "12px",
        color: "grey",
    }
}))

export default StyledInput