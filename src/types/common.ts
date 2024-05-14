import { AlertProps, SxProps } from "@mui/material";

type IStyle = {
    [x: string]: SxProps;
}



export type ISnackBar = {
    title: "Success" | "Error" | "Warning" | "Info" | "";
    subTitle: string;
    severity: AlertProps["severity"]
}

export default IStyle;