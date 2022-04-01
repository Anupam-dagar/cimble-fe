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
import Cookies from "js-cookie";
import React, { useContext, useState } from "react";
import api from "../../constants/api";
import { ConfigurationsModel } from "../../models/configurations";
import { ProjectModel } from "../../models/project";
import ConfigurationsContext from "../../store/configurationsContext";
import ProjectsContext from "../../store/projectsContext";
import BlurOverlay from "../Overlays/BlurOverlay";

const CreateConfigurationModal = ({ isOpen, onOpen, onClose }: any) => {
  const [name, setName] = useState("");
  const [info, setInfo] = useState("");
  const configurationsContext = useContext(ConfigurationsContext);

  const createConfiguration = async (event: any) => {
    const data = {
      name,
      info,
    };
    const result = await axios.post<ConfigurationsModel>(
      `${api.CONFIGURATIONS_ROUTE}${Cookies.get("projectId")}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    configurationsContext.addConfiguration(result.data);
    onClose();
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <BlurOverlay />
      <ModalContent>
        <ModalHeader>Create a configuration</ModalHeader>
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
            <FormLabel htmlFor="name">Data</FormLabel>
            <Input
              id="data"
              type="text"
              placeholder="Data of the configuration"
              value={info}
              onChange={(e) => setInfo(e.target.value)}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={createConfiguration}
            isDisabled={name.length === 0 || info.length === 0}
          >
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateConfigurationModal;
