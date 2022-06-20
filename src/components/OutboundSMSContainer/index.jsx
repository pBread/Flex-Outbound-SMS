import { Button } from "@twilio-paste/core/button";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalFooterActions,
  ModalHeader,
  ModalHeading,
} from "@twilio-paste/core/modal";
import { Theme } from "@twilio-paste/core/theme";
import { useEffect, useState, useCallback } from "react";
import uuid from "uuid";

export function OutboundSMSContainer() {
  // there's a weird bug where there's an iframe overlaying the entire page
  // remove before deploying
  useEffect(() => {
    for (const el of document.getElementsByTagName("iframe")) el.remove();
  });

  const [isOpen, setIsOpen] = useState(true);
  const handleClose = () => setIsOpen(false);
  const handleOpen = () => setIsOpen(true);

  const [modalId] = useState(uuid());

  return (
    <Theme.Provider theme="default">
      <Button variant="primary" onClick={handleOpen}>
        Send SMS
      </Button>
      <Modal
        ariaLabelledby={modalId}
        isOpen={isOpen}
        onDismiss={handleClose}
        size="default"
      >
        <ModalHeader>
          <ModalHeading as="h3" id={modalId}>
            Send SMS
          </ModalHeading>
        </ModalHeader>

        <ModalBody>Body</ModalBody>

        <ModalFooter>
          <ModalFooterActions>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary">Done</Button>
          </ModalFooterActions>
        </ModalFooter>
      </Modal>
    </Theme.Provider>
  );
}
