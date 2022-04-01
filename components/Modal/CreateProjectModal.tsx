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
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useContext, useState } from "react";
import api from "../../constants/api";
import { ProjectModel } from "../../models/project";
import ProjectsContext from "../../store/projectsContext";
import {
  createNotification,
  updateNotification,
} from "../../utils/notification";
import BlurOverlay from "../Overlays/BlurOverlay";

const CreateProjectModal = ({ isOpen, onOpen, onClose }: any) => {
  const [name, setName] = useState("");
  const projectsContext = useContext(ProjectsContext);
  const toast = useToast();

  const createProject = async (event: any) => {
    const data = {
      name,
      organisationId: Cookies.get("organisation"),
    };
    const notificationId = createNotification(toast, "Project", "Creating");
    const result = await axios.post<ProjectModel>(api.PROJECTS_ROUTE, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    updateNotification(notificationId, toast, "Project", "create");
    projectsContext.addProject(result.data);
    onClose();
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <BlurOverlay />
      <ModalContent>
        <ModalHeader>Create a project</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isRequired isInvalid={name.length === 0}>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input
              id="name"
              type="text"
              placeholder="Name of the project"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button onClick={createProject} isDisabled={name.length === 0}>
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateProjectModal;
