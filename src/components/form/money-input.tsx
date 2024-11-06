import { Control } from "react-hook-form";
import { FormControl, FormLabel } from "../ui/form";

import { FormField, FormItem, FormMessage } from "../ui/form";
import MoneyInputField from "../ui/money-input-field";

type FormMoneyInputProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  name: string;
  label: string;
  placeholder: string;
};

const FormMoneyInput = ({
  control,
  name,
  label,
  placeholder,
}: FormMoneyInputProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <MoneyInputField placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormMoneyInput;
