import { FlexPlugin } from "@twilio/flex-plugin";
import * as Flex from "@twilio/flex-ui";
import { OutboundSMSContainer } from "./OutboundSMSContainer";

const PLUGIN_NAME = "OutboundSmsPlugin";

export default class OutboundSmsPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   */
  async init(flex: typeof Flex, manager: Flex.Manager): Promise<void> {
    const options = { sortOrder: -1 };
    flex.AgentDesktopView.Panel1.Content.add(
      <OutboundSMSContainer key="OutboundSmsPlugin-component" />,
      options
    );
  }
}
