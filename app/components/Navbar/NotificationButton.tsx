import { AlertCircleIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Popover,
  IconButton,
  Flex,
  Avatar,
  Box,
  TextArea,
  Checkbox,
  Text,
  Button,
  Badge,
} from "@radix-ui/themes";
import { LuCircleAlert } from "react-icons/lu";
import { PiBellSimpleLight } from "react-icons/pi";

const NotificationButton = () => {
  const data = [
    {
      label: "New Batch Arrival",
      count: 1,
      description:
        "A new batch of 2,500 chicks (Cobb 500) has arrived at the Islamabad farm. Verify health and vaccination records.",
      time: "6:24 AM",
    },
    {
      label: "Feed Stock Low - Broiler Starter",
      count: 0,
      description:
        "The Broiler Starter feed stock at the Rawalpindi warehouse is critically low. Only 3 tons remaining. Immediate replenishment is required.",
      time: "9:17 PM",
    },
    {
      label: "Vaccination Schedule Reminder",
      count: 0,
      description:
        "The Newcastle Disease vaccination is due for the flock at the Lahore farm on July 18, 2024. Prepare the vaccine and notify the team.",
      time: "1:52 PM",
    },
  ];

  return (
    <Popover.Root>
      <Popover.Trigger>
        <IconButton className="p-2.75! w-10.5! h-10.5! rounded-[10px]! bg-[rgba(243,244,246,0.05)]!">
          <PiBellSimpleLight className="text-silver! w-5! h-5!" />
        </IconButton>
      </Popover.Trigger>
      <Popover.Content
        width="512px"
        className="p-0! px-0! bg-linear-to-r!  from-[#020618] via-[#0D1527] to-[#020618] shadow-[0_0_0_1px_#141D2F]!"
      >
        <Flex justify="between" className="py-3! px-4.5! bg-white/5!">
          <Text>Notifications</Text>
          <Button variant="ghost" className="text-silver!">
            Sell
          </Button>
        </Flex>
        {data.map((d, i) => (
          <div
            key={i}
            className="py-3.25 px-4.75 border-b-[1.5px] border-[#FFFFFF]/5 last:border-0"
          >
            <Flex className="gap-3.25!">
              <Box className="w-5! h-5!">
                <HugeiconsIcon
                  icon={AlertCircleIcon}
                  color="#0D9887"
                  className="w-4! h-4!"
                />
              </Box>
              <Box>
                <Flex className="w-full" justify="between">
                  <Flex gap="8" align="center">
                    <Text size="1" weight="bold">
                      {d.label}
                    </Text>
                    {d.count > 0 && (
                      <Badge
                        radius="full"
                        className="bg-[#0D9887]! px-2! text-white! text-[13px]!"
                      >
                        {d.count}
                      </Badge>
                    )}
                  </Flex>
                  <Text size="1" weight="bold" className="text-silver!">
                    {d.time}
                  </Text>
                </Flex>
                <Text size="1" className="text-silver!">
                  {d.description}
                </Text>
              </Box>
            </Flex>
          </div>
        ))}
      </Popover.Content>
    </Popover.Root>
  );
};

export default NotificationButton;
