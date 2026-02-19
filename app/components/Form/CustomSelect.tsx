"use client";
import { forwardRef, useEffect, useState } from "react";
import Select, {
  ActionMeta,
  GroupBase,
  MultiValue,
  PropsValue,
  SingleValue,
  StylesConfig,
} from "react-select";

import makeAnimated from "react-select/animated";

interface Props {
  options: OptionType[];
  id?: string;
  value?: OptionType | OptionType[] | null;
  onChangeSingle?: (
    newValue: SingleValue<OptionType>,
    actionMeta: ActionMeta<OptionType>
  ) => void;
  onChangeMulti?: (
    newValue: MultiValue<OptionType>,
    actionMeta: ActionMeta<OptionType>
  ) => void;
  placeholder?: string;
  isClearable?: boolean;
  isSearchable?: boolean;
  isDisabled?: boolean;
  isMulti?: boolean;
  closeMenuOnSelect?: boolean;
  singleSelectStyles?: StylesConfig<OptionType, false, GroupBase<OptionType>>;
  menuPlacement?: "auto" | "bottom" | "top";
  maxHeight?: number;
  defaultValue?: PropsValue<OptionType>;
  radius?: "pill" | undefined;
}

export type OptionType = { value: string; label: string };

export const defaultOption = { value: "", label: "Select" };
export const defaultNumberOption = { value: "0", label: "Select" };
export const defaultNegativeNumberOption = { value: "-1", label: "Select" };
export const booleanOptions = [
  { label: "True", value: "true" },
  { label: "False", value: "false" },
];

const CustomSelect = forwardRef<HTMLDivElement, Props>(
  (
    {
      options,
      id,
      value,
      onChangeSingle,
      onChangeMulti,
      placeholder = "Select...",
      isClearable = false,
      isSearchable = true,
      isDisabled = false,
      isMulti = false,
      closeMenuOnSelect = false,
      singleSelectStyles,
      menuPlacement = "auto",
      maxHeight = 43 * 6,
      defaultValue,
      radius = undefined,
    },
    _ref
  ) => {
    const [menuPortalTarget, setMenuPortalTarget] =
      useState<HTMLElement | null>(null);

    useEffect(() => {
      setMenuPortalTarget(document.body);
    }, []);

    // Custom Single Select Style
    const customSingleSelectStyles: StylesConfig<
      OptionType,
      false,
      GroupBase<OptionType>
    > = {
      control: (base, state) => ({
        ...base,
        "::-webkit-scrollbar": {
          width: "8px",
          height: "5px",
        },
        "::-webkit-scrollbar-track": {
          background: "#f1f1f1",
        },
        "::-webkit-scrollbar-thumb": {
          background: "#22a3bd",
          borderRadius: "10px",
        },
        "::-webkit-scrollbar-thumb:hover": {
          background: "#108fa8",
        },
        background: "rgba(255, 255, 255, 0.8)",
        borderRadius: radius ? 50 : 7,
        color: "#545861",
        fontWeight: 500,
        fontSize: "14px",
        border: "none",
        boxShadow: state.isFocused
          ? "0 0 0 1.5px #0C8CE9" // focus glow
          : "0 0 0 1.5px #eff0f2",
        transition: "all 0.3s",
      }),
      placeholder: (base) => ({
        ...base,
        color: "#545861", // Set the placeholder color
        fontWeight: 500,
      }),
      dropdownIndicator: (base) => ({
        ...base,
        padding: 10.5,
        color: "#000", // ✅ makes the chevron icon white
      }),
      indicatorSeparator: (base) => ({
        ...base,
        display: "none",
      }),
      clearIndicator: (base) => ({
        ...base,
        padding: 4,
      }),
      valueContainer: (base) => ({
        ...base,
        padding: "0 6px",
      }),
      input: (base) => ({
        ...base,
        margin: 0,
        padding: 0,
      }),
      menu: (base) => ({
        ...base,
        // ✅ CRITICAL: Increased z-index to be above Radix Dialog
        zIndex: 99999,
        padding: "4px 8px",
        borderRadius: 14,
        border: 0,
        boxShadow: "0px 0px 7px 3px rgba(0,0,0,0.1)",
      }),
      menuPortal: (base) => ({
        ...base,
        // ✅ CRITICAL: Must be higher than Radix Dialog overlay (default is around 9999)
        zIndex: 99999,
      }),
      option: (base, state) => ({
        ...base,
        backgroundColor: state.isSelected
          ? "#C2E7E4"
          : state.isFocused
          ? "#E4EDEC"
          : "white",
        color: "#000",
        fontSize: "14px",
        padding: "10px",
        borderRadius: 7,
        // ✅ Ensure pointer events work
        cursor: "pointer",
        pointerEvents: "auto",
      }),
      menuList: (base) => ({
        ...base,
        maxHeight: maxHeight,
        // ✅ Ensure pointer events work
        pointerEvents: "auto",
        "::-webkit-scrollbar": {
          width: "8px",
          height: "100px",
        },
        "::-webkit-scrollbar-track": {
          background: "#f1f1f1",
        },
        "::-webkit-scrollbar-thumb": {
          background: "#22a3bd",
          borderRadius: "10px",
        },
        "::-webkit-scrollbar-thumb:hover": {
          background: "#108fa8",
        },
      }),
    };

    // old
    // const customSingleSelectStyles: StylesConfig<
    //   OptionType,
    //   false,
    //   GroupBase<OptionType>
    // > = {
    //   control: (base, state) => ({
    //     ...base,
    //     "::-webkit-scrollbar": {
    //       width: "8px", // Narrower scrollbar
    //       height: "8px",
    //     },
    //     "::-webkit-scrollbar-track": {
    //       background: "#f1f1f1",
    //     },
    //     "::-webkit-scrollbar-thumb": {
    //       background: "#22a3bd",
    //       borderRadius: "10px",
    //     },
    //     "::-webkit-scrollbar-thumb:hover": {
    //       background: "#108fa8",
    //     },
    //     background: "rgba(255, 255, 255, 0.8)",
    //     borderRadius: radius ? 50 : 7,
    //     color: "#545861",
    //     fontWeight: 500,
    //     fontSize: "14px",
    //     border: "none",
    //     boxShadow: state.isFocused
    //       ? "0 0 0 1.5px #0C8CE9" // focus glow
    //       : "0 0 0 1.5px #eff0f2",
    //     transition: "all 0.3s",
    //   }),
    //   dropdownIndicator: (base) => ({
    //     ...base,
    //     padding: 10.5,
    //   }),
    //   indicatorSeparator: (base) => ({
    //     ...base,
    //     display: "none", // remove vertical line if needed
    //   }),
    //   clearIndicator: (base) => ({
    //     ...base,
    //     padding: 4,
    //   }),
    //   valueContainer: (base) => ({
    //     ...base,
    //     padding: "0 6px",
    //   }),
    //   input: (base) => ({
    //     ...base,
    //     margin: 0,
    //     padding: 0,
    //   }),
    //   menu: (base) => ({
    //     ...base,
    //     zIndex: 99999,
    //     padding: "4px 8px",
    //     borderRadius: 14,
    //     border: 0,
    //     boxShadow: "0px 0px 7px 3px rgba(0,0,0,0.1)",
    //   }),
    //   menuPortal: (base) => ({
    //     ...base,
    //     zIndex: 99999,
    //   }),
    //   option: (base, state) => ({
    //     ...base,
    //     backgroundColor: state.isSelected
    //       ? "#C2E7E4" // selected background color
    //       : state.isFocused
    //       ? "#E4EDEC" // hover background color
    //       : "white",
    //     color: "#333",
    //     fontSize: "14px",
    //     padding: "10px",
    //     borderRadius: 7,
    //   }),
    //   // Styles for the dropdown menu list (this is where scrollbar lives)
    //   menuList: (base) => ({
    //     ...base,
    //     maxHeight: maxHeight, // show 6 options, then scroll
    //     "::-webkit-scrollbar": {
    //       width: "8px",
    //       height: "8px",
    //     },
    //     "::-webkit-scrollbar-track": {
    //       background: "#f1f1f1",
    //     },
    //     "::-webkit-scrollbar-thumb": {
    //       background: "#22a3bd",
    //       borderRadius: "10px",
    //     },
    //     "::-webkit-scrollbar-thumb:hover": {
    //       background: "#108fa8",
    //     },
    //   }),
    // };

    // Custom styles for react-select multi selection options
    const customMultiSelectStyles: StylesConfig<
      OptionType,
      true,
      GroupBase<OptionType>
    > = {
      control: (base, state) => ({
        ...base,
        "::-webkit-scrollbar": {
          width: "8px",
          height: "8px",
        },
        "::-webkit-scrollbar-track": {
          background: "#f1f1f1",
        },
        "::-webkit-scrollbar-thumb": {
          background: "#22a3bd",
          borderRadius: "10px",
        },
        "::-webkit-scrollbar-thumb:hover": {
          background: "#108fa8",
        },
        fontSize: "14px",
        borderRadius: 7,
        background: "rgba(255, 255, 255, 0.8)",
        border: state.isFocused ? "1px solid #0c8ce9" : "1px solid #eff0f2",
        boxShadow: state.isFocused
          ? "0 0 0 1px rgba(12, 140, 233, 0.4)"
          : "none",
        "&:hover": {
          border: "1px solid #0c8ce9",
          boxShadow: "0 0 0 1px rgba(12, 140, 233, 0.4)",
        },
      }),
      placeholder: (base) => ({
        ...base,
        color: "#000", // Set the placeholder color
        fontWeight: 400,
      }),
      singleValue: (base) => ({
        ...base,
        color: "#000",
      }),
      dropdownIndicator: (base) => ({
        ...base,
        padding: 10.5,
      }),
      indicatorSeparator: (base) => ({
        ...base,
        display: "none",
      }),
      clearIndicator: (base) => ({
        ...base,
        padding: 4,
      }),
      valueContainer: (base) => ({
        ...base,
        padding: "0 6px",
      }),
      input: (base) => ({
        ...base,
        margin: 0,
        padding: 0,
      }),
      menu: (base) => ({
        ...base,
        // ✅ CRITICAL: Increased z-index
        zIndex: 99999,
        padding: "4px 8px",
        borderRadius: 14,
        border: 0,
        boxShadow: "0px 0px 7px 3px rgba(0,0,0,0.1)",
      }),
      menuPortal: (base) => ({
        ...base,
        // ✅ CRITICAL: Increased z-index
        zIndex: 99999,
      }),
      option: (base, state) => ({
        ...base,
        backgroundColor: state.isFocused ? "#E4EDEC" : "white",
        color: "#000",
        fontSize: "14px",
        padding: "10px",
        borderRadius: 7,
        // ✅ Ensure pointer events work
        cursor: "pointer",
        pointerEvents: "auto",
      }),
      menuList: (base) => ({
        ...base,
        maxHeight: maxHeight,
        // ✅ Ensure pointer events work
        pointerEvents: "auto",
        "::-webkit-scrollbar": {
          width: "8px",
          height: "8px",
        },
        "::-webkit-scrollbar-track": {
          background: "f1f1f1",
        },
        "::-webkit-scrollbar-thumb": {
          background: "#22a3bd",
          borderRadius: "10px",
        },
        "::-webkit-scrollbar-thumb:hover": {
          background: "#108fa8",
        },
      }),
      multiValue: (provided) => ({
        ...provided,
        backgroundColor: "#B0E0E6",
      }),
    };

    const animatedComponents = makeAnimated();

    return singleSelectStyles ? (
      <Select
        options={options}
        name={id}
        id={id}
        defaultValue={defaultValue}
        isClearable={isClearable}
        isSearchable={isSearchable}
        isDisabled={isDisabled}
        placeholder={placeholder}
        styles={singleSelectStyles}
        menuPlacement={menuPlacement}
        menuPosition="fixed" // ✅ Changed from "absolute" to "fixed"
        closeMenuOnSelect={closeMenuOnSelect}
        components={animatedComponents}
        menuPortalTarget={menuPortalTarget}
        value={value}
        onChange={onChangeSingle}
      />
    ) : isMulti ? (
      <Select
        options={options}
        name={id}
        id={id}
        defaultValue={defaultValue}
        isMulti={isMulti}
        isClearable={isClearable}
        isSearchable={isSearchable}
        isDisabled={isDisabled}
        placeholder={placeholder}
        styles={customMultiSelectStyles}
        menuPlacement={menuPlacement}
        menuPosition="fixed" // ✅ Changed from "absolute" to "fixed"
        closeMenuOnSelect={closeMenuOnSelect}
        components={animatedComponents}
        menuPortalTarget={menuPortalTarget}
        value={value}
        onChange={onChangeMulti}
      />
    ) : (
      <Select
        options={options}
        name={id}
        id={id}
        defaultValue={defaultValue}
        isClearable={isClearable}
        isSearchable={isSearchable}
        isDisabled={isDisabled}
        placeholder={placeholder}
        styles={customSingleSelectStyles}
        menuPlacement={menuPlacement}
        menuPosition="fixed" // ✅ Changed from "absolute" to "fixed"
        closeMenuOnSelect={closeMenuOnSelect}
        menuPortalTarget={menuPortalTarget}
        value={value}
        onChange={onChangeSingle}
      />
    );
  }
);

CustomSelect.displayName = "CustomSelect";

export default CustomSelect;
