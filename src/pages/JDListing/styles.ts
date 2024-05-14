import theme from "@/theme/theme";
import IStyle from "@/types/common";

const JdListingStyles = () =>
  ({
    page: {
        background: "red",
        marginTop:"40px",
    },
    container:{
        background:theme.palette.info.main
    },
    flex: {
      display: "flex",
      alignItems:"center",
      gap:"25px"
    },
    spaceBetween: {
      display: "flex",
      justifyContent: "space-between",
      alignItems:"center"
    },
    title:{
        color:theme.palette.primary.main,
        fontSize:"18px",
        fontWeight:"700"
    },
    tableContainer:{
        padding:"0 60px"
    }
  } as IStyle);

export default JdListingStyles;
