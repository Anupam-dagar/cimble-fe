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
import { OrganisationModel } from "../../models/organisation";
import OrganisationsContext from "../../store/organisationsContext";
import {
  createNotification,
  updateNotification,
} from "../../utils/notification";
import BlurOverlay from "../Overlays/BlurOverlay";

const CreateOrganisationModal = ({ isOpen, onOpen, onClose }: any) => {
  const [name, setName] = useState("");
  const organisationContext = useContext(OrganisationsContext);
  const toast = useToast();

  const createOrganisation = async (event: any) => {
    const data = {
      name,
    };
    const notificationId = createNotification(
      toast,
      "Organisation",
      "Creating"
    );
    const result = await axios.post<OrganisationModel>(
      api.ORGANISATIONS_ROUTE,
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    updateNotification(notificationId, toast, "Organisation", "create");
    organisationContext.addOrganisation(result.data);
    onClose();
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <BlurOverlay />
      <ModalContent>
        <ModalHeader>Create an organisation</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isRequired isInvalid={name.length === 0}>
            <FormLabel htmlFor="email">Name</FormLabel>
            <Input
              id="name"
              type="text"
              placeholder="Name of the organisation"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button onClick={createOrganisation} isDisabled={name.length === 0}>
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateOrganisationModal;
