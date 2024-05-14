import { Button, CircularProgress, SxProps } from "@mui/material";
import ButtonStyles from "./styles";
import theme from "@/theme/theme";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


type IAppButton = {
    text: string;
    onClick?: () => void;
    sx?: SxProps;
    isLoading?: boolean;
    loadingText?: string;
    disabled?: boolean;
    isSuccess?: boolean;
    [x: string]: any;
}

const AppButton = ({ text, onClick, isLoading, disabled, isSuccess, loadingText, sx, ...rest }: IAppButton) => {
    const styles = ButtonStyles(theme);

    return (
        <Button disabled={disabled} sx={{ ...styles.button, ...sx } as any} onClick={onClick} {...rest} endIcon={isSuccess ? <CheckCircleIcon color="success" /> : null}>{isLoading ? loadingText : text}{isLoading && <CircularProgress sx={styles.loader} color="info" size={25} />}</Button>

    )
}

export default AppButton;