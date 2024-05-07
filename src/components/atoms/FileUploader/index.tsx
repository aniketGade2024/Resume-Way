import { Backdrop, Box, LinearProgress, Typography } from "@mui/material";
import FileUploadIcon from "@/assets/uploadIcon.png"
import FileUploaderStyles from "./styles";
import theme from "@/theme/theme";
import { convertToBase64 } from "@/utils/helpers/common";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

type IFileUploader = {
  name: string;
  title?: string;
  isUploading?: boolean;

}

const FiledUploader = ({ name, title, isUploading }: IFileUploader) => {
  const { control, setValue, getValues } = useFormContext();
  const fieldValue = getValues(name);
  const [file, setFile] = React.useState();
  const fileRef = React.useRef(null);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target);
    if (e.target.files) {
      const selectedFile = e.target.files[0];
      const base64File = await convertToBase64(selectedFile);
      if (base64File) {
        setValue(name, String(base64File).split(",")[1]);
      }
      setFile(URL.createObjectURL(selectedFile) as any);
    }
  }

  const handleRemove = () => {
    setValue(name, undefined);
    setFile(undefined);
  }
  const styles = FileUploaderStyles(theme);

  React.useEffect(() => {
    if (fieldValue === "") {
      setFile(undefined);
    }
  }, [fieldValue])

  return (
    <Controller name={name} control={control} render={() => {
      return (
        <Box sx={styles.container}>
          <Box sx={styles.card}>
            <Typography variant="h3">{title ?? "Upload File"}</Typography>
            <Box id={name} sx={{ ...styles.dropBox, borderStyle: file ? "none" : "dotted", boxShadow: file ? "0px 0px 10px 0px rgba(0, 0, 0, 0.5)" : "none", maxHeight: file ? "500px" : "auto" }}>
              {
                file && fieldValue ? (
                  <Box sx={styles.selectedImg}>
                    <img src={file} />
                  </Box>
                ) : (
                  <>
                    <Box sx={styles.imageContainer}>
                      <img src={FileUploadIcon} alt="UploadIcon" />
                    </Box>
                    <Typography sx={styles.h4}>Select File here</Typography>
                    <Typography sx={styles.p}>Files Supported: jpg, jpeg, png, webp </Typography>
                    <input ref={fileRef} type="file" accept="image/*" id={name} style={{ display: "none" }} onChange={(e) => handleChange(e)} />
                    <Typography sx={styles.btn} onClick={() => (fileRef.current as any).click()}>
                      Choose File
                    </Typography>

                  </>
                )
              }
              {
                file && <Box sx={styles.removeBtn} onClick={() => handleRemove()}>
                  <Typography sx={styles.rmText}>X</Typography>
                </Box>
              }
              {
                isUploading && (
                  <Backdrop
                    sx={styles.backDrop}
                    open={isUploading}
                  >
                    <Box sx={styles.loaderBox}>
                      <LinearProgress sx={styles.progressBar} color="success" />

                    </Box>
                  </Backdrop>
                )
              }
            </Box>

          </Box>

        </Box>
      )
    }} />
  )
}

export default FiledUploader