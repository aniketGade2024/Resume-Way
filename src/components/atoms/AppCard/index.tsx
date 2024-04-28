import "./styles.css";

type ICard = {
    title: string;
    subTitle: string
}

const AppCard = ({ title, subTitle }: ICard) => {
    <div className="card">
        <div className="card-content">
            <h2 className="card-title">{title}</h2>
            <p className="card-subtitle">{subTitle}</p>
        </div>
    </div>

}

export default AppCard;