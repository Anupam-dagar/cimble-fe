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
import Router from "next/router";
import React, { useContext, useState } from "react";
import { refreshLogin, refreshNextLogin } from "../../apicalls/auth";
import { editProjectApi } from "../../apicalls/projects";
import api from "../../constants/api";
import { ProjectModel } from "../../models/project";
import ProjectsContext from "../../store/projectsContext";
import { clearCookies } from "../../utils/auth";
import {
  createNotification,
  updateNotification,
} from "../../utils/notification";
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
  const toast = useToast();

  const editProject = async (event: any) => {
    const data = {
      name,
    };
    const notificationId = createNotification(toast, "Project", "Updating");
    let result;
    try {
      result = (await editProjectApi(data, id, Cookies.get("token") ?? ""))
        .data;
    } catch (err: any) {
      if (err.response.status === 403) {
        try {
          let refreshLoginResult;
          try {
            refreshLoginResult = (await refreshNextLogin()).data;
          } catch (err: any) {
            clearCookies();
            Router.replace("/login");
            return;
          }
          result = (await editProjectApi(data, id, refreshLoginResult.token))
            .data;
        } catch (err: any) {
          throw err;
        }
      }
    }
    updateNotification(notificationId, toast, "Project", "update");
    if (result) {
      projectContext.editProject(result);
    }
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
