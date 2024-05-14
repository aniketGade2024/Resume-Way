import IStyle from "@/types/common";
import { Theme } from "@mui/material";

const ButtonStyles = (theme: Theme) =>
  ({
    button: {
      width: "auto",
      minHeight: "36px",
      height: "auto",
      borderRadius: "8px",
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.info.main,
      padding: "5px 20px",
      fontSize: "14px",
      fontWeight:"600",
      boxShadow:
        "rgba(50, 50, 93, .1) 0 0 0 1px inset, rgba(50, 50, 93, .1) 0 2px 5px 0, rgba(0, 0, 0, .07) 0 1px 1px 0",
      cursor: "pointer",
      outline: "none",
      overflow: "hidden",
      textAlign: "center",
      userSelect: "none",
      "&:disabled": {
        cursor: "default",
        backgroundColor: "grey",
      },
      textTransform: "none",
      "&:hover": {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.info.main,
      },
    },
    loader: {
      marginLeft: "10px",
    },
  } as IStyle);

export default ButtonStyles;
