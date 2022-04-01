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
import { OrganisationModel } from "../../models/organisation";
import OrganisationsContext from "../../store/organisationsContext";
import BlurOverlay from "../Overlays/BlurOverlay";

const EditOrganisationModal = ({
  isOpen,
  onOpen,
  onClose,
  organisationName,
  id,
}: any) => {
  const [name, setName] = useState(organisationName);
  const organisationContext = useContext(OrganisationsContext);

  const editOrganisation = async (event: any) => {
    const data = {
      name,
    };
    const result = await axios.put<OrganisationModel>(
      `${api.ORGANISATIONS_ROUTE}${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    organisationContext.editOrganisation(result.data);
    onClose();
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <BlurOverlay />
      <ModalContent>
        <ModalHeader>Edit Organisation</ModalHeader>
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
          <Button onClick={editOrganisation} isDisabled={name.length === 0}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditOrganisationModal;
