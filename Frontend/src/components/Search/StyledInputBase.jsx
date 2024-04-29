import { styled, InputBase } from "@mui/material"

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from search Icon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        width: "100%",
    },
}))

export default StyledInputBase