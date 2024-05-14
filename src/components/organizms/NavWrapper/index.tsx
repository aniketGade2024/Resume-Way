import { NavBar } from "@/components/molecules";
import { Box } from "@mui/material";

type INavWrapper = {
    children: React.ReactNode;
    isHide?: boolean;
}

const NavWrapper = ({ children, isHide }: INavWrapper) => {
    return (
        <Box>
            {Boolean(!isHide) && <NavBar />
            }
            {children}
        </Box>

    )
}
export default NavWrapper;