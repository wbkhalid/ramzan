import CardHeader from "@/app/components/Navbar/CardHeader";
import { Badge, Flex } from "@radix-ui/themes";
import Item from "./Item";

const CommodityWiseSale = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-[auto_1fr] gap-5 py-5">
      <div className="text-center">
        <Badge
          radius="full"
          color="green"
          className="font-bold! text-[17px]! py-2.25! px-3.5!"
        >
          2
        </Badge>
      </div>
      <Flex direction="column" className="gap-5 w-full">
        <CardHeader
          headingSize="5"
          labelWeight="regular"
          heading="Commodity wise Sale"
          label="Fill the Commodity wise Sale"
        />
        <Item marketRate={89} sahulatBazarRate={85} itemName="Atta Sold" />
        <Item marketRate={590} sahulatBazarRate={560} itemName="Chicken Sold" />
        <Item marketRate={150} sahulatBazarRate={140} itemName="Sugar Sold" />
      </Flex>
    </div>
  );
};

export default CommodityWiseSale;
