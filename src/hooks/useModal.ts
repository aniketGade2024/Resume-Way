import React from "react";

const useModal = () => {
  const [generateQuestionModal, setGenerateQuestionModal] =
    React.useState<boolean>(false);

  const handleGenerateQuestionModal = () => {
    setGenerateQuestionModal(!generateQuestionModal);
  };

  return {
    generateQuestionModal,
    handleGenerateQuestionModal,
  };
};

export default useModal;
