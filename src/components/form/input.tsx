import { Control } from "react-hook-form";
import { FormControl, FormLabel } from "../ui/form";

import { FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

type FormInputProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  name: string;
  label: string;
  placeholder: string;
};

const FormInput = ({ control, name, label, placeholder }: FormInputProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormInput;
