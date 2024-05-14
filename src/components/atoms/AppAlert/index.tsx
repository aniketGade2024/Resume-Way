import theme from "@/theme/theme";
import { ClearOutlined } from "@mui/icons-material";
import { Alert, AlertProps, AlertTitle, Box, Snackbar } from "@mui/material";

type IAlert = {
    title: string | "";
    subTitle: string;
    severity?: AlertProps["severity"];
    variant?: AlertProps["variant"];
    isOpen: boolean;
    handleClose: () => void;
}

const AppAlert = ({ title, subTitle, severity, variant, isOpen, handleClose }: IAlert) => {
    return (

        <Snackbar open={isOpen} onClose={handleClose} autoHideDuration={5000} anchorOrigin={{
            vertical: "top", horizontal: "right"
        }}>
            <Alert variant={variant ?? "filled"} severity={severity ?? "info"} sx={{ color: theme.palette.info.main }}>
                <AlertTitle sx={{ color: theme.palette.info.main }}>{title}</AlertTitle>
                <Box sx={{ position: "absolute", top: "10px", right: "10px", cursor: "pointer" }} onClick={() => handleClose()}>
                    <ClearOutlined sx={{ fontSize: "20px" }} />
                </Box>
                {subTitle}
            </Alert>
        </Snackbar>)
}

export default AppAlert;