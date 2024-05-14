import theme from "@/theme/theme";
import IStyle from "@/types/common";

const AppInputStyles = () =>
  ({
    inputBox: {
      margin: "30px 0",
      flex:1,
      width:"100%",
    },
    input: {
      width: "100%",
      "& .MuiInputBase-root": {
        transition: "none !important",
        borderRadius: "8px",
        background: theme.palette.info.main,
        minHeight:"40px"
      },
    },
    label: {
      fontSize: "16px",
      color: "#000",
      fontWeight: "400",
      paddingBottom: "10px",
    },
    icon: {
      fontSize: "50px",
    },
  } as IStyle);

export default AppInputStyles;
