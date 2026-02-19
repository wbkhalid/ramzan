"use client";

import { devmap } from "@/app/utils/utils";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
} from "@vis.gl/react-google-maps";
import { Button, TextField } from "@radix-ui/themes";
import { useMemo, useState } from "react";
import usePlacesAutoComplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { HugeiconsIcon } from "@hugeicons/react";
import { LocationShare02Icon, Search01Icon } from "@hugeicons/core-free-icons";

interface LatLng {
  lat: number;
  lng: number;
}

interface MyMapProps {
  onLocationSelect: (lat: number, lng: number) => void;
}

const MyMap = ({ onLocationSelect }: MyMapProps) => {
  const [selected, setSelected] = useState<LatLng | null>(null);
  const [mapCenter, setMapCenter] = useState({ lat: 31.17, lng: 72.7097 });
  const [zoom, setZoom] = useState(10);

  const handleConfirm = () => {
    if (selected) {
      onLocationSelect(selected.lat, selected.lng);
    }
  };

  return (
    <div className="relative w-full h-full">
      <APIProvider
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API as string}
        libraries={["places", "marker"]}
      >
        <div id="map-wrapper" className="relative w-full h-full">
          <div className="absolute left-0 top-2.5 z-[100] w-full px-6.75 py-5 pointer-events-none">
            <div className="pointer-events-auto max-w-xl">
              <PlacesAutoComplete
                setSelected={setSelected}
                setMapCenter={setMapCenter}
                setZoom={setZoom}
              />
            </div>
          </div>

          {devmap && (
            <Map
              mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID}
              zoom={zoom}
              center={mapCenter}
              gestureHandling="greedy"
              style={{
                width: "100%",
                height: "600px",
                borderRadius: "30px",
                overflow: "hidden",
              }}
              zoomControl
              fullscreenControl={false}
              mapTypeControl={false}
            >
              {selected && (
                <AdvancedMarker position={selected}>
                  <Pin
                    background={"#3b82f6"}
                    borderColor={"#1e40af"}
                    glyphColor={"#ffffff"}
                  />
                </AdvancedMarker>
              )}
            </Map>
          )}

          {/* Confirm Button */}
          {selected && (
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-[100]">
              <Button
                size="3"
                onClick={handleConfirm}
                className="bg-blue-600! text-white! cursor-pointer!"
              >
                Confirm Location
              </Button>
            </div>
          )}
        </div>
      </APIProvider>
    </div>
  );
};

export default MyMap;

interface PlaceOption {
  label: string;
  value: string;
}

interface PlacesAutoCompleteProps {
  setSelected: (location: LatLng | null) => void;
  setMapCenter: (center: LatLng) => void;
  setZoom: (zoom: number) => void;
}

const PlacesAutoComplete = ({
  setSelected,
  setMapCenter,
  setZoom,
}: PlacesAutoCompleteProps) => {
  const {
    ready,
    setValue: setGoogleValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutoComplete({
    debounce: 300,
  });

  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const items: PlaceOption[] = useMemo(() => {
    if (status !== "OK") return [];
    return data.map((item) => ({
      label: item.description,
      value: item.place_id,
    }));
  }, [status, data]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setGoogleValue(value);
    setIsOpen(true);
  };

  const handleSelect = async (address: PlaceOption) => {
    setInputValue(address.label);
    setGoogleValue(address.label, false);
    clearSuggestions();
    setIsOpen(false);

    try {
      const results = await getGeocode({ address: address.label });
      const { lat, lng } = await getLatLng(results[0]);

      const location = { lat, lng };
      setSelected(location);
      setMapCenter(location);
      setZoom(15);

      console.log("Selected place:", address, "Coordinates:", location);
    } catch (error) {
      console.error("Error getting geocode:", error);
    }
  };

  return (
    <div className="relative w-full">
      <TextField.Root
        placeholder="Search an address"
        disabled={!ready}
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => setIsOpen(items.length > 0)}
        size="3"
      >
        <TextField.Slot className="w-fit! [&_input]:font-medium! [&_input]:py-3.25! [&_input]:px-2! bg-white! h-full! [&_input]:rounded-[10px]! rounded-[10px]! text-[#475569]! focus:ring-0! outline-0! ring-0! hover:shadow-[0px_0px_0px_1px_rgba(203,213,225,0.4)]! active:shadow-[0px_0px_0px_1.5px_rgba(203,213,225,0.4)]! transition-all! duration-300! [&_input::placeholder]:text-[#475569]! [&_input::placeholder]:font-medium! [&_input::placeholder]:text-base!">
          <HugeiconsIcon size={20} icon={LocationShare02Icon} />
        </TextField.Slot>
        <TextField.Slot side="right" className="ps-0!">
          <HugeiconsIcon size={20} icon={Search01Icon} />
        </TextField.Slot>
      </TextField.Root>

      {isOpen && items.length > 0 && (
        <div className="absolute z-[101] mt-2 w-full bg-white rounded-md shadow-lg border border-gray-200 max-h-60 overflow-y-auto">
          {items.map((item) => (
            <div
              key={item.value}
              onClick={() => handleSelect(item)}
              className="px-4 py-2.5 cursor-pointer hover:bg-gray-100 transition-colors text-sm"
            >
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
