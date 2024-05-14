import { Box, Button, IconButton, MenuItem, Typography } from "@mui/material";
// import AnimatedPlane from "@/assets/AnimationPlane.gif";
import NavBarStyles from "./styles";
import React from "react";
import theme from "@/theme/theme";
import { useLocation } from "react-router-dom";
import { AppMenu } from "@/components/atoms";
import { AccountCircleSharp, Visibility } from "@mui/icons-material";
import ArrowDropDownSharpIcon from "@mui/icons-material/ArrowDropDownSharp";
import LogoutSharpIcon from "@mui/icons-material/LogoutSharp";

enum routes {
  home = "/home",
  profiles = "/profiles",
  questions = "/questions",
  list = "/list",
  createjd = "/createjd",
  applications = "/applications",
}
type IRouteType = {
  [key in routes]: string;
};

const headerTiles: IRouteType = {
  "/home": "Analyze Resume / Jd",
  "/profiles": "Profiles",
  "/questions": "Questionnaire",
  "/list": "Listing of JD's",
  "/createjd": "Create Job Description",
  "/applications": "List of Applications",
};

const NavBar = () => {
  const [scrollY, setScrollY] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const location = useLocation();
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  React.useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollY]);

  const styles = NavBarStyles(scrollY, theme);

  return (
    <Box sx={styles.topNav}>
      <Box sx={styles.topNavLeft}>
        {
          headerTiles[
            location.pathname as
              | "/home"
              | "/profiles"
              | "/questions"
              | "/createjd"
              | "/list"
              | "/applications"
          ]
        }
        {/* <img src={AnimatedPlane} alt="Animated Plane" /> */}

        <Button
          id="demo-customized-button"
          aria-controls={open ? "demo-customized-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          variant="contained"
          disableElevation
          sx={{
            background: "transparent",
            color: theme.palette.primary.main,
            "&:hover": { background: "transparent" },
          }}
          disableRipple
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <AccountCircleSharp sx={{ fontSize: "30px" }} />
            <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <Typography sx={{ fontSize: "14px" }}>
                {"Sachin Tendulkar"}
              </Typography>
              <IconButton onClick={handleClick} sx={{ padding: 0 }}>
                <ArrowDropDownSharpIcon color="primary" />
              </IconButton>
            </Box>
          </Box>
        </Button>

        <AppMenu
          id="demo-customized-menu"
          MenuListProps={{
            "aria-labelledby": "demo-customized-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose} disableRipple>
            <Visibility /> View Profile
          </MenuItem>
          <MenuItem onClick={handleClose} disableRipple>
            <LogoutSharpIcon />
            Log Out
          </MenuItem>
        </AppMenu>
      </Box>
    </Box>
  );
};
export default NavBar;
