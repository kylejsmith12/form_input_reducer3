import React, { useReducer, useState } from "react";
import {
  Grid,
  Select,
  MenuItem,
  TextField,
  IconButton,
  Autocomplete,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import RowDisplay from "./RowDisplay";

const initialState = {
  rows: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD_ROW":
      return {
        ...state,
        rows: [...state.rows, sortMultiSelectField(action.payload)],
      };
    case "EDIT_ROW":
      return {
        ...state,
        rows: state.rows.map((row, index) =>
          index === action.index
            ? sortMultiSelectField({ ...row, ...action.payload })
            : row
        ),
      };
    case "DELETE_ROW":
      return {
        ...state,
        rows: state.rows.filter((_, index) => index !== action.index),
      };
    default:
      return state;
  }
}

// Sorting utility function
const sortMultiSelectField = (row) => {
  if (Array.isArray(row.multiSelect)) {
    row.multiSelect = [...row.multiSelect].sort((a, b) =>
      a.toString().localeCompare(b.toString())
    );
  }
  return row;
};

const FormGrid = ({ fieldConfig }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [formData, setFormData] = useState(() => {
    return fieldConfig.reduce(
      (acc, field) => ({ ...acc, [field.name]: field.initialValue || "" }),
      {}
    );
  });
  const [editingRow, setEditingRow] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAutocompleteChange = (name, newValue) => {
    setFormData((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleMultiSelectChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addRow = () => {
    if (editingRow !== null) {
      dispatch({ type: "EDIT_ROW", index: editingRow, payload: formData });
      setEditingRow(null); // Exit editing mode
    } else {
      dispatch({ type: "ADD_ROW", payload: formData });
    }
    setFormData(
      fieldConfig.reduce(
        (acc, field) => ({ ...acc, [field.name]: field.initialValue || "" }),
        {}
      )
    ); // Reset form
  };

  const startEditing = (index) => {
    setEditingRow(index);
    setFormData(state.rows[index]);
  };

  // Sorting comparator for alphabetization and numeric sorting
  const sortOptions = (a, b) => {
    const valA = a.toString().toLowerCase();
    const valB = b.toString().toLowerCase();

    if (valA < valB) return -1;
    if (valA > valB) return 1;
    return 0;
  };

  const renderAutocomplete = (field) => (
    <Autocomplete
      fullWidth
      options={field.options.sort(sortOptions)}
      value={formData[field.name]}
      onChange={(e, newValue) => handleAutocompleteChange(field.name, newValue)}
      renderInput={(params) => (
        <TextField {...params} name={field.name} label={field.name} />
      )}
    />
  );

  const renderSelect = (field) => (
    <Select
      fullWidth
      value={formData[field.name]}
      name={field.name}
      onChange={handleInputChange}
    >
      {field.options.sort(sortOptions).map((option, idx) => (
        <MenuItem key={idx} value={option}>
          {option}
        </MenuItem>
      ))}
    </Select>
  );

  const renderMultiSelect = (field) => (
    <Select
      multiple
      fullWidth
      value={formData[field.name]}
      name={field.name}
      onChange={handleMultiSelectChange}
      renderValue={(selected) => selected.join(", ")}
    >
      {field.options.sort(sortOptions).map((option, index) => (
        <MenuItem key={index} value={option}>
          {option}
        </MenuItem>
      ))}
    </Select>
  );

  const renderTextField = (field) => (
    <TextField
      fullWidth
      type={field.type}
      name={field.name}
      value={formData[field.name]}
      onChange={handleInputChange}
      placeholder={field.placeholder || ""}
    />
  );

  const renderField = (field) => {
    switch (field.type) {
      case "autocomplete":
        return renderAutocomplete(field);
      case "select":
        return renderSelect(field);
      case "multiSelect":
        return renderMultiSelect(field);
      default:
        return renderTextField(field);
    }
  };

  return (
    <>
      <RowDisplay
        rows={state.rows}
        editingRow={editingRow}
        startEditing={startEditing}
        saveEdit={addRow}
        dispatch={dispatch}
      />

      <Grid container spacing={2} sx={{ marginBottom: 2 }}>
        {fieldConfig.map((field, index) => (
          <Grid item xs={11 / fieldConfig.length} key={index}>
            {renderField(field)}
          </Grid>
        ))}
        <Grid item xs={1}>
          <IconButton onClick={addRow}>
            {editingRow !== null ? <CheckIcon /> : <AddIcon />}
          </IconButton>
        </Grid>
      </Grid>
    </>
  );
};

export default FormGrid;
