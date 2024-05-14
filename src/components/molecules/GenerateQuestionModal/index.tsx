import { Box, Divider, IconButton, Modal, Typography } from "@mui/material";
import GenerateQuestionModalStyles from "./styles";
import { ClearOutlined, CloudDownload } from "@mui/icons-material";

type IGenerateQuestionModal = {
  isOpen: boolean;
  handleOpenModal: () => void;
  application: {
    name: string;
    skill: string;
    experience: string;
    location: string;
    score: number;
  };
};

type IContentBox = {
  field: string;
  value: string | number;
};

const ContentBox = ({ field, value }: IContentBox) => {
  const styles = GenerateQuestionModalStyles();

  return (
    <Box sx={styles.colFlex}>
      <Typography sx={styles.key}>{field}</Typography>
      <Typography sx={styles.value}>{value}</Typography>
    </Box>
  );
};

const GenerateQuestionModal = ({
  isOpen,
  handleOpenModal,
  application,
}: IGenerateQuestionModal) => {
  const styles = GenerateQuestionModalStyles();

  return (
    <Modal
      open={isOpen}
      disableAutoFocus={true}
      closeAfterTransition
      sx={styles.modal}
    >
      <Box sx={styles.modalBody}>
        <Box sx={{ ...styles.dFlex, justifyContent: "space-between" }}>
          <Box sx={{ ...styles.dFlex, gap: "25px" }}>
            <Typography sx={styles.title}>Generate Questions</Typography>
            <Box sx={{ ...styles.dFlex, gap: "10px" }}>
              <CloudDownload /> Export
            </Box>
          </Box>
          <IconButton onClick={() => handleOpenModal()}>
            <ClearOutlined color="primary" sx={{ fontSize: "30px" }} />
          </IconButton>
        </Box>
        <Divider sx={styles.divider} />

        <Box sx={styles.spaceBetween}>
          <ContentBox field="Name" value={application?.name} />
          <ContentBox field="Primary Skill" value={application?.skill} />
          <ContentBox field="Experience" value={application?.experience} />
          <ContentBox field="Location" value={application?.location} />
          <ContentBox field="Score" value={application?.score} />
        </Box>
      </Box>
    </Modal>
  );
};

export default GenerateQuestionModal;
