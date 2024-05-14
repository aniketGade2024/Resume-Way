import theme from "@/theme/theme";
import IStyle from "@/types/common";

export const CreateJDStyles = () =>
  ({
    page: {
      backgroundColor: theme.palette.info.main,
      margin: "30px 60px",
      padding: "30px",
      borderRadius: "10px",
    },
    contentBox: {
      background: "#F4F4F4",
      padding:"10px 20px"
    },
    dFlex: {
      display: "flex",
      alignItems:"center",
      borderRadius: "10px",
    },
    input: {
      height: "45px",
      flex: 1,
      width:"100%"
    },

    title: {
      color: theme.palette.primary.main,
      fontSize: "18px",
      fontWeight: "700",
    },
  } as IStyle);
