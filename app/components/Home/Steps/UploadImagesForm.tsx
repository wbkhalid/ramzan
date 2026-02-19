import { ImageUploadIcon, Upload01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Badge, Button, Flex, Text } from "@radix-ui/themes";
import { ReactNode, useRef } from "react";

interface Props {
  label?: string;
  selfieUrl?: string;
  description?: string;
  buttonLabel?: string;
  icon?: ReactNode;
  message?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UploadImagesForm = ({
  label = "Upload",
  description = "Focal Person Photos",
  buttonLabel = "Upload Images",
  selfieUrl = "",
  icon = (
    <Badge className="p-3! rounded-[10px]! shadow-[0px_0px_0px_1.24px_#CBD5E1]/50!">
      <HugeiconsIcon
        icon={ImageUploadIcon}
        size={30}
        className="text-slate-gray!"
      />
    </Badge>
  ),
  message = "JPG, PNG (Max 5MB)",
  onChange,
}: Props) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className="border border-dashed border-[#CBD5E1] p-4 rounded-4xl"
      onClick={handleClick}
    >
      <input
        type="file"
        accept="image/png, image/jpeg, image/jpg"
        ref={fileInputRef}
        className="hidden"
        onChange={onChange}
      />

      <Flex justify="center" className="mb-4">
        {selfieUrl ? (
          <img
            src={selfieUrl}
            alt="Uploaded Preview"
            className="w-20 h-20 object-cover "
          />
        ) : (
          <Badge className="p-4! rounded-full!">
            <HugeiconsIcon
              icon={ImageUploadIcon}
              size={32}
              className="text-slate-gray!"
            />
          </Badge>
        )}
      </Flex>

      <Flex align="center" direction="column" className="gap-1.75!">
        <Text weight="bold" color="green" size="2">
          {label}
        </Text>

        <Text size="2" className="text-slate-gray">
          {description}
        </Text>

        {/* <Button
          type="button"
          color="green"
          onClick={handleClick}
          className="w-full! py-2.5! rounded-[10.5px]!"
        >
          <Flex className="gap-2.5" align="center">
            <HugeiconsIcon icon={Upload01Icon} color="white" size={20} />
            <Text className="text-white">{buttonLabel}</Text>
          </Flex>
        </Button> */}

        <Text weight="medium" size="1" className="text-slate-gray!">
          {message}
        </Text>
      </Flex>
    </div>
  );
};

export default UploadImagesForm;
