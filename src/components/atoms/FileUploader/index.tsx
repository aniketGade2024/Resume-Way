import "./styles.css";
import FileUploadIcon from "@/assets/uploadIcon.png"

type IFileUploader = {
  title?:string;

}

const FiledUploader = ({title}:IFileUploader) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    console.log(e.target.files);
  }

  return (
    <div className="container">
      <div className="card">
        <h3>{title ?? "Upload File"}</h3>
        <div className="drop_box">
          <div className="imageContainer">
            <img src={FileUploadIcon} alt="UploadIcon" />
          </div>
          <header>
            <h4>Select File here</h4>
          </header>
          <p>Files Supported: jpg, jpeg, png, webp </p>
          <input type="file" accept="image/*" id="fileId" style={{ display: "none" }} onChange={(e)=>handleChange(e)} />
          <label htmlFor="fileId" className="btn">
            Choose File
          </label>
        </div>
      </div>
    </div>
  )
}

export default FiledUploader