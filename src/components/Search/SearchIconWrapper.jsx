import { styled } from "@mui/material"

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    zIndex: 1000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}))

export default SearchIconWrapper