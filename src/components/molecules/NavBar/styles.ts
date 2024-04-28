import { Theme } from "@mui/material";

const NavBarStyles = (scrollY: number, theme: Theme) => ({
  topNav: {
    position: "sticky",
    top: "0",
    transition: "all 0.2s ease-in-out",
    zIndex: 100,
    overflow: "hidden",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0px 60px",
    backgroundColor: scrollY > 40 ? theme.palette.info.main : "transparent",
    a: {
      color: scrollY > 40 ? "#000" : theme.palette.info.main,
      textAlign: "center",
      padding: "10px 16px",
      textDecoration: "none",
      fontSize: "15px",
    },
    boxShadow: scrollY > 40 ? "0px 10px 10px -10px rgba(0, 0, 0, 0.8);" : "none"
  },
  topNavLeft: {
    display: "flex",
    alignItems: "center",
    color: scrollY > 40 ? "#000" : theme.palette.info.main,
    fontSize: "20px",
    img: {
      transition:"all 0.2s ease-in-out",
      height: scrollY > 40 ? "70px" : "100px",
    },
  },
})

export default NavBarStyles;