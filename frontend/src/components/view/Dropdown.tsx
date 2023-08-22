import React from 'react';
import TextField from '@mui/material/TextField';
import { Autocomplete } from '@mui/material';

interface MultiSelectAutoCompleteProps {
    options: string[];
    onSelect?: (selectedOptions: string[]) => void;
    label?: string;
}

const MultiSelectDropdown: React.FC<MultiSelectAutoCompleteProps> = ({ options, onSelect, label = "Select" }) => {

    const handleChange = (event: React.ChangeEvent<{}>, newValue: string[]) => {
        event.stopPropagation()
        onSelect && onSelect(newValue);
    };

    return (
        <Autocomplete
            disableCloseOnSelect
            multiple
            id="tags-outlined"
            options={options}
            getOptionLabel={(option) => option}
            onChange={handleChange}
            filterSelectedOptions
            renderInput={(params) => (
                <TextField
                    {...params}
                    variant="outlined"
                    label={label}
                />
            )}
        />
    );
};

export default MultiSelectDropdown;
