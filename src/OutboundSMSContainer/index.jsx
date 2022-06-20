import { Button } from "@twilio-paste/core/button";
import { Input } from "@twilio-paste/core/input";
import { Label } from "@twilio-paste/core/label";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalFooterActions,
  ModalHeader,
  ModalHeading,
} from "@twilio-paste/core/modal";
import { TextArea } from "@twilio-paste/core/textarea";
import { Theme } from "@twilio-paste/core/theme";
import { useEffect, useState } from "react";
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

  const [phoneNumber, setPhoneNumber] = useState("");
  const [body, setBody] = useState("");

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

        <ModalBody>
          <Label htmlFor="phone-number">Phone Number</Label>
          <Input
            id="phone-number"
            name="Phone Number"
            onChange={(ev) =>
              /[0-9]/.test(ev.target.value) && setPhoneNumber(ev.target.value)
            }
            type="text"
            value={phoneNumber}
            maxLength={11}
          />

          <Label htmlFor="message-body">Message Body</Label>
          <TextArea
            id="message-body"
            name="Message Body"
            onChange={(ev) => setBody(ev.target.value)}
            value={body}
          />
        </ModalBody>

        <ModalFooter>
          <ModalFooterActions>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary">Send</Button>
          </ModalFooterActions>
        </ModalFooter>
      </Modal>
    </Theme.Provider>
  );
}
