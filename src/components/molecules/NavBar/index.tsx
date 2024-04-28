import { Box } from "@mui/material";
import AnimatedPlane from "@/assets/AnimationPlane.gif";
import NavBarStyles from "./styles";
import React from "react";
import theme from "@/utils/theme/theme";

const NavBar = () => {

    const [scrollY, setScrollY] = React.useState(0);

    React.useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [scrollY]);

    const styles = NavBarStyles(scrollY, theme);

    return (
        <Box sx={styles.topNav}>
            <Box sx={styles.topNavLeft}>Resume Way <img src={AnimatedPlane} alt="Animated Plane" /></Box>
            <Box>
                <a href="#Login">Login</a>
                <a href="#Sign Up">Sign Up</a>
            </Box>
        </Box>
    )
}
export default NavBar