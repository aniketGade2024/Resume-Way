import "./styles.css";

type IAppButton = {
    text: string;
    onClick?: () => void;
    style?: React.CSSProperties;
}

const AppButton = ({ text, onClick, style }: IAppButton) => {
    return (
        <button className="button-9" role="button" onClick={onClick} style={{ ...style }}>{text}</button>
    )
}

export default AppButton;