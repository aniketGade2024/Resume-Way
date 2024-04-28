import { Button, SxProps } from "@mui/material";
import ButtonStyles from "./styles";
import theme from "@/utils/theme/theme";

type IAppButton = {
    text: string;
    onClick?: () => void;
    sx?: SxProps;
}

const AppButton = ({ text, onClick, sx }: IAppButton) => {
    const styles = ButtonStyles(theme);

    return (
        <Button sx={{ ...styles.button, ...sx } as any} onClick={onClick}>{text}</Button>
    )
}

export default AppButton;