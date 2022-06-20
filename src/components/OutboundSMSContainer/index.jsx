import { Button } from "@twilio-paste/core/button";
import { Theme } from "@twilio-paste/core/theme";
import { useEffect, useState } from "react";
import { Modal } from "@twilio-paste/core/modal";
import uuid from "uuid";

export function OutboundSMSContainer() {
  // there's a weird bug where there's an iframe overlaying the entire page
  // remove before deploying
  useEffect(() => {
    for (const el of document.getElementsByTagName("iframe")) el.remove();
  });

  const [isOpen, setIsOpen] = useState(false);

  const [modalId] = useState(uuid());

  return (
    <Theme.Provider theme="default">
      <Button variant="primary" onClick={() => setIsOpen((isOpen) => !isOpen)}>
        Send SMS
      </Button>
      <Modal
        ariaLabelledby={modalId}
        isOpen={isOpen}
        onDismiss={() => setIsOpen(false)}
        size="default"
      >
        <div>Hello</div>
      </Modal>
    </Theme.Provider>
  );
}
