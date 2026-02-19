import { Cancel02Icon, Location03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Dialog, IconButton } from "@radix-ui/themes";
import MyMap from "./MyMap";

interface MapDialogProps {
  onLocationSelect: (lat: number, lng: number) => void;
}

const MapDialog = ({ onLocationSelect }: MapDialogProps) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <IconButton
          type="button"
          size="4"
          className="bg-[rgba(244,244,244,0.2)]! shadow-[0px_0px_0px_1px_rgba(203,213,225,0.4)]!"
        >
          <HugeiconsIcon icon={Location03Icon} size={24} />
        </IconButton>
      </Dialog.Trigger>

      <Dialog.Content
        maxWidth="900px"
        className="p-2!"
        style={{
          pointerEvents: "auto",
        }}
      >
        <Dialog.Title className="flex! justify-end!">
          <Dialog.Close>
            <IconButton variant="soft" size="4" color="blue">
              <HugeiconsIcon icon={Cancel02Icon} />
            </IconButton>
          </Dialog.Close>
        </Dialog.Title>
        <Dialog.Description className="sr-only!" size="2" mb="4">
          Search and select location
        </Dialog.Description>

        <MyMap onLocationSelect={onLocationSelect} />
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default MapDialog;
