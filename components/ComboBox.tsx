import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  useCombobox,
  UseComboboxState,
  UseComboboxStateChangeOptions,
} from "downshift";
import tw from "twin.macro";
import styled from "@emotion/styled";

import { Input, Label, Menu } from "components/Input";

const Wrapper = tw.div`
  w-full
  inline-block
  relative
`;

type RenderPropOptions = {
  isHighlighted: boolean;
};

const DefaultRow = styled.div<RenderPropOptions>`
  ${tw`
    px-4 py-2
    text-off-black
  `}
  ${(props) => props.isHighlighted && tw`bg-highlight`}
`;

function defaultRowRenderer<T>(itemToString: (item: T) => string) {
  return (item: T, { isHighlighted }: RenderPropOptions) => (
    <DefaultRow isHighlighted={isHighlighted}>{itemToString(item)}</DefaultRow>
  );
}

type SelectProps<T> = {
  label: string;
  items: T[];
  autoDetectInitialValue?: boolean;
  itemToString?: (item: T) => string;
  filterPredicate?: (inputValue: string | null, item: T) => boolean;
  keyFunction?: (item: T) => string;
  children?: (item: T, options: RenderPropOptions) => React.ReactElement;
  onChange: (selection: T) => void;
} & (SelectPropsRequiredValue<T> | SelectPropsAutoDetect<T>);

type SelectPropsRequiredValue<T> = {
  value: T;
};

type SelectPropsAutoDetect<T> = {
  value?: T;
  autoDetectInitialValue: true;
};

const ComboBox = <T extends any>(props: SelectProps<T>) => {
  const {
    label,
    value,
    items,
    autoDetectInitialValue = false,
    itemToString = (item: T) => String(item),
    filterPredicate = (inputValue: string | null, item: T) =>
      !inputValue ||
      itemToString(item).toLowerCase().includes(inputValue.toLowerCase()),
    keyFunction = itemToString,
    children: renderItem = defaultRowRenderer(itemToString),
    onChange,
  } = props;

  const safeItemToString = useCallback(
    (item: T) => (item != null ? itemToString(item) : ""),
    [itemToString]
  );

  const [inputValue, setInputValue] = useState(() =>
    value
      ? safeItemToString(value)
      : autoDetectInitialValue
      ? safeItemToString(items[0])
      : ""
  );

  const filteredItems = useMemo(
    () => items.filter((item) => filterPredicate(inputValue, item)),
    [items, filterPredicate, inputValue]
  );

  const stateReducer = useCallback(
    (
      state: UseComboboxState<T>,
      options: UseComboboxStateChangeOptions<T>
    ): UseComboboxState<T> => {
      switch (options.type) {
        case useCombobox.stateChangeTypes.InputBlur:
        case useCombobox.stateChangeTypes.InputKeyDownEscape:
          return {
            ...options.changes,
            selectedItem: value!,
            inputValue: value != null ? itemToString(value) : "",
          };
      }

      return options.changes;
    },
    [itemToString, value]
  );

  const onStateChange = useCallback(
    (state: Partial<UseComboboxState<T>>) => {
      if (state.selectedItem != null) {
        requestAnimationFrame(() => {
          onChange(state.selectedItem!);
        });
      }
    },
    [onChange]
  );

  useEffect(() => {
    if (autoDetectInitialValue && !value) {
      onChange(items[0]);
    }
  }, [autoDetectInitialValue, items, onChange, value]);

  useEffect(() => {
    setInputValue(value != null ? safeItemToString(value) : "");
  }, [safeItemToString, value]);

  const {
    isOpen,
    getLabelProps,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
    openMenu,
  } = useCombobox({
    items: filteredItems,
    defaultHighlightedIndex: 0,
    selectedItem: value,
    itemToString: safeItemToString,
    inputValue: inputValue || "",
    onInputValueChange: ({ inputValue }) => setInputValue(inputValue || ""),
    onStateChange,
    stateReducer,
  });
  return (
    <Wrapper>
      <Label {...getLabelProps()}>{label}</Label>
      <Input
        {...(getInputProps({
          open: isOpen && !!filteredItems.length,
          onClick: () => {
            openMenu();
            setInputValue("");
          },
          onFocus: () => {
            openMenu();
            setInputValue("");
          },
        }) as any)}
      />
      <Menu
        {...getMenuProps({
          isHidden: !isOpen || filteredItems.length === 0,
        } as any)}
      >
        {isOpen &&
          filteredItems.map((item, index) => (
            <li key={keyFunction(item)} {...getItemProps({ item, index })}>
              {renderItem(item, {
                isHighlighted: index === highlightedIndex,
              })}
            </li>
          ))}
      </Menu>
    </Wrapper>
  );
};

export default ComboBox;

type ObjectSelectOptions = {
  items: { [key: string]: string };
};

export function objectSelect(options: ObjectSelectOptions) {
  const { items } = options;

  return {
    items: Object.keys(items),
    itemToString: (i: string) => items[i],
    keyFunction: (i: string) => i,
  };
}
