import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useState } from "react";
import api from "../../constants/api";
import { ProjectModel } from "../../models/project";
import ProjectsContext from "../../store/projectsContext";
import BlurOverlay from "../Overlays/BlurOverlay";

const EditProjectModal = ({
  isOpen,
  onOpen,
  onClose,
  projectName,
  id,
}: any) => {
  const [name, setName] = useState(projectName);
  const projectContext = useContext(ProjectsContext);

  const editProject = async (event: any) => {
    const data = {
      name,
    };
    const result = await axios.put<ProjectModel>(
      `${api.PROJECTS_ROUTE}${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    projectContext.editProject(result.data);
    onClose();
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <BlurOverlay />
      <ModalContent>
        <ModalHeader>Edit Project</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isRequired isInvalid={name.length === 0}>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input
              id="name"
              type="text"
              placeholder="Name of the configuration key"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button onClick={editProject} isDisabled={name.length === 0}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditProjectModal;
