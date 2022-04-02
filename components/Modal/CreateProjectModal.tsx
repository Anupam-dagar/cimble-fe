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
import { createProjectApi } from "../../apicalls/projects";
import api from "../../constants/api";
import { ProjectModel } from "../../models/project";
import ProjectsContext from "../../store/projectsContext";
import { clearCookies } from "../../utils/auth";
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
    let result;
    try {
      result = (await createProjectApi(data, Cookies.get("token") ?? "")).data;
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
          result = (await createProjectApi(data, refreshLoginResult.token))
            .data;
        } catch (err: any) {
          throw err;
        }
      }
    }
    updateNotification(notificationId, toast, "Project", "create");
    if (result) {
      projectsContext.addProject(result);
    }
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
