import { Button, CircularProgress, SxProps } from "@mui/material";
import ButtonStyles from "./styles";
import theme from "@/theme/theme";

type IAppButton = {
    text: string;
    onClick?: () => void;
    sx?: SxProps;
    isLoading?: boolean;
    [x: string]: any;
}

const AppButton = ({ text, onClick, isLoading, sx, ...rest }: IAppButton) => {
    const styles = ButtonStyles(theme);

    return (
        <Button sx={{ ...styles.button, ...sx } as any} onClick={onClick} {...rest}>{text}{isLoading && <CircularProgress sx={styles.loader} color="info" size={25} />}</Button>
    )
}

export default AppButton;