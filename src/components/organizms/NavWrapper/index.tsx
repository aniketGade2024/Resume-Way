import { NavBar } from "@/components/molecules";
import { Box } from "@mui/material";

type INavWrapper = {
    children: React.ReactNode;
}

const NavWrapper = ({ children }: INavWrapper) => {
    return (
        <Box>
            <NavBar />
            {children}
        </Box>

    )
}
export default NavWrapper;