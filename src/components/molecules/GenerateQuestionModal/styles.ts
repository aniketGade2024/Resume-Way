import theme from "@/theme/theme";
import IStyle from "@/types/common";

const GenerateQuestionModalStyles = () =>
  ({
    modal: {
      maxWidth: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    modalBody: {
      minWidth: "75%",
      minHeight: "400px",
      backgroundColor: theme.palette.info.main,
      borderRadius: "10px",
      padding: "30px 50px",
    },
    dFlex: {
      display: "flex",
      alignItems: "center",
    },
    title: {
      fontSize: "20px",
      fontWeight: "500",
      color: theme.palette.primary.main,
    },
    divider: { background: "#A8A8A8", margin: "15px 0" },
    key: {
      fontSize: 14,
      color: "rgba(0,0,0,0.3)",
    },
    value: {
      fontSize: 18,
      color: "rgba(0,0,0,0.9)",
      fontWeight: "600",
    },
    colFlex: {
      display: "flex",
      flexDirection: "column",
      gap: "15px",
    },
    spaceBetween: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
  } as IStyle);

export default GenerateQuestionModalStyles;
