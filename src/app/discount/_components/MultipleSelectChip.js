
import { Typography, Grid, ListItemIcon, Tooltip } from "@mui/material";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import Checkbox from "@mui/material/Checkbox";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import ListItemText from "@mui/material/ListItemText";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function MultipleSelectChip({
  typo,
  data = [],
  onChange,
  onBlur,
  name,
  selectAll,
  // value,
  value = [],
  disabled,
  tooltip,
}) {
  const isAllSelected = value?.length === data.length;
  //originl
  // const handleChange = (event) => {
  //   const eventVal = event.target.value;
  //   const val = eventVal[eventVal.length - 1] === "all" ? data : eventVal;
  //   onChange(
  //     isAllSelected && eventVal[eventVal.length - 1] === "all" ? [] : val
  //   );
  // };
 //for selecting and deselecting
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    // Convert the event value to an array if it's not one (for string values)
    let selectedValues = typeof value === "string" ? value.split(",") : value;

    // Handling "Select All" toggle
    if (selectedValues.includes("all")) {
      onChange(isAllSelected ? [] : data.slice());
      return;
    }

    // New approach for selecting/deselecting individual items
    let newValue = [];

    if (selectedValues.length > value.length) {
      // If the number of selected items has increased, add the new item(s)
      newValue = [...value];
    } else {
      // If the number of selected items has decreased (i.e., item was deselected)
      // Or the user is attempting to reselect a previously deselected item
      // We should filter based on the existing selected values

      // Find the difference between the current data and the new selection
      // This helps in identifying which item was added or removed
      const difference = data.filter((item) =>
        selectedValues.some(
          (selectedItem) => (selectedItem.id || selectedItem) === item.id
        )
      );

      newValue = [...difference];
    }

    onChange(newValue);
  };

  return (
    <>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 2 }}
      >
        <Grid item xs={20} md={20} lg={12} xl={12}>
          <Typography
            component="label"
            sx={{
              fontWeight: "500",
              fontSize: "14px",
              mb: "10px",
              display: "block",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {typo}{" "}
              {tooltip && (
                <Tooltip title={tooltip} placement="bottom">
                  <InfoOutlinedIcon fontSize="small" />
                </Tooltip>
              )}
            </Box>
          </Typography>

          <FormControl sx={{ width: "100%" }}>
            <InputLabel
              id={"demo-multiple-chip-label"}
              sx={{
                right: "28px",
              }}
            >
              {typo}
            </InputLabel>
            <Select
              labelId="demo-multiple-chip-label"
              name={name}
              multiple
              value={value}
              onBlur={onBlur}
              disabled={disabled}
              sx={{
                borderRadius: "8px",
                "& .MuiSelect-icon": {
                  position: "inherit",
                  right: "10px",
                  marginLeft: "15px",
                },
                "& legend": {
                 
                  fontSize: "0.6rem",
                },
              }}
              onChange={(e) => {
                // console.log("arrrr",e.target.value)
                handleChange(e);
              }}
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((product) => (
                    <Chip
                      key={product?.id}
                      label={
                        product?.name 
                      }
                    />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {selectAll && (
                <MenuItem value="all">
                  <ListItemIcon>
                    <Checkbox checked={isAllSelected} />
                  </ListItemIcon>
                  <ListItemText primary="Select All" />
                </MenuItem>
              )}
              {data.length > 0 ? (
                data.map((product, index) => {
                  // const ids = value.map((val) => val.id);
                  const ids = value && value.length > 0 ? value.map((val) => val.id) : [];
                  // const ids = Array.isArray(value) && value.length > 0 ? value.map((val) => val.id) : [];

                  return (
                    <MenuItem key={product.id} value={product} selected={true}>
                      {selectAll && (
                        <ListItemIcon>
                          <Checkbox
                            checked={ids?.indexOf(product.id) > -1}
                            size="small"
                          />
                        </ListItemIcon>
                      )}
                      {product.name || product.title || product.taskName}
                    </MenuItem>
                  );
                })
              ) : (
                <MenuItem>No Option!</MenuItem>
              )}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </>
  );
}