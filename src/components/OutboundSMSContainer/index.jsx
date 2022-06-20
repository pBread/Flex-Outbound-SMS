import { Button } from "@twilio-paste/core/button";
import { Theme } from "@twilio-paste/core/theme";
import { useEffect, useState } from "react";

export function OutboundSMSContainer() {
  // there's a weird bug where there's an iframe overlaying the entire page
  // remove before deploying
  useEffect(() => {
    for (const el of document.getElementsByTagName("iframe")) el.remove();
  });

  const [isOpen, setIsOpen] = useState(true);
  const toggleOpen = () => setIsOpen((isOpen) => !isOpen);

  return (
    <Theme.Provider theme="default">
      <Button variant="primary" onClick={toggleOpen}>
        Send SMS
      </Button>
    </Theme.Provider>
  );
}
