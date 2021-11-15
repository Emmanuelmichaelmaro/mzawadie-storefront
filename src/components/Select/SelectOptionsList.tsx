import classNames from "classnames";
import React from "react";
import { FormattedMessage } from "react-intl";

import { ISelectOptionsList } from "./customTypes";

type Ref = HTMLParagraphElement;

const renderNoOptions = () => (
    <p className="select__option select__option--disabled" key="no-option">
        <FormattedMessage defaultMessage="No Options" />
    </p>
);

const getRef = (isSelected: boolean, ref: React.Ref<Ref>) => isSelected && { ref };

// eslint-disable-next-line react/display-name
const SelectOptionsList = React.forwardRef<Ref, ISelectOptionsList>(
    ({ activeOption, options, onChange, setOpen, updateOptions }, ref) => (
        <>
            {options.length
                ? options.map(({ label, value }) => {
                      const isSelected = activeOption.value === value;
                      return (
                          <p
                              {...getRef(isSelected, ref)}
                              className={classNames("select__option", {
                                  "select__option--selected": isSelected,
                              })}
                              key={value}
                              onClick={() => {
                                  updateOptions({ label, value }, onChange);
                                  setOpen(false);
                              }}
                          >
                              {label}
                          </p>
                      );
                  })
                : renderNoOptions()}
        </>
    )
);

export default SelectOptionsList;
