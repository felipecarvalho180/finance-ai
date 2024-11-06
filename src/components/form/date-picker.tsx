import { Control } from "react-hook-form";
import { FormControl, FormLabel } from "../ui/form";

import { FormField, FormItem, FormMessage } from "../ui/form";
import { DatePicker } from "../ui/date-picker";

type FormDatePickerProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  name: string;
  label: string;
};

const FormDatePicker = ({ control, name, label }: FormDatePickerProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <DatePicker value={field.value} onChange={field.onChange} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormDatePicker;
