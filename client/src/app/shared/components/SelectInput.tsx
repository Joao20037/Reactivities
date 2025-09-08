//! This code is different that was showed in the course, i don't know why making exactly the same as the course doesn't work

import { FormControl, FormHelperText, InputLabel, MenuItem, Select, type SelectProps} from "@mui/material";
import { useController, type FieldValues, type UseControllerProps} from "react-hook-form";

type Props<T extends FieldValues> = {
    items: { text: string; value: string }[];
    label: string;
} & UseControllerProps<T> & SelectProps;

export default function SelectInput<T extends FieldValues>(props: Props<T>) {
    const { field, fieldState } = useController({ ...props });

    return (
        <FormControl fullWidth error={!!fieldState.error}>
            <InputLabel>{props.label}</InputLabel>
            <Select {...field} label={props.label}>
                {props.items.map((item) => (
                    <MenuItem key={item.value} value={item.value}>
                        {item.text}
                    </MenuItem>
                ))}
            </Select>
            <FormHelperText>{fieldState.error?.message}</FormHelperText>
        </FormControl>
    );
}
