import { AppButton, FileUploader } from "@/components/atoms";
import "./styles.css";

const Home = () => {
    return (
        <div className="card">
            <div className="dFlex">
                <FileUploader title="Upload Resume" />
                <FileUploader title="Upload JD (Job Description)" />
            </div>
                <p id="score">Accepted Resume Score : <span className="span">50%</span></p>
                <div className="justifyEnd">
                    <AppButton text="Process"/>
                </div>
        </div>
    )
}
export default Home;