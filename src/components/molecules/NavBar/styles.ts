import { Theme } from "@mui/material";

const NavBarStyles = (scrollY: number, theme: Theme) => ({
  topNav: {
    transition: "all 0.2s ease-in-out",
    zIndex: 100,
    overflow: "hidden",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 60px",
    backgroundColor: theme.palette.info.main,
    a: {
      color: "#000",
      textAlign: "center",
      padding: "10px 16px",
      textDecoration: "none",
      fontSize: "15px",
    },
    boxShadow: "0px 10px 10px -10px rgba(0, 0, 0, 0.8)",
  },
  topNavLeft: {
    flex:1,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    color: "#000",
    fontSize: "20px",
    img: {
      transition: "all 0.2s ease-in-out",
      height: "70px",
    },
  },
});

export default NavBarStyles;
