"use client";

import React, { forwardRef } from "react";
import { NumericFormat, NumericFormatProps } from "react-number-format";
import { Input } from "./input";
import { InputProps } from "./input";

const MoneyInputField = forwardRef(
  (
    props: NumericFormatProps<InputProps>,
    ref: React.ForwardedRef<HTMLInputElement>,
  ) => {
    return (
      <NumericFormat
        {...props}
        getInputRef={ref}
        thousandSeparator="."
        decimalSeparator=","
        prefix="R$ "
        allowNegative={false}
        customInput={Input}
      />
    );
  },
);

MoneyInputField.displayName = "MoneyInputField";

export default MoneyInputField;
