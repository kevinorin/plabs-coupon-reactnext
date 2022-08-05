import {
  Grid,
  MenuItem,
  FormControl,
  Select,
  TextField,
  InputLabel,
  Checkbox,
  ListItemText,
  SelectChangeEvent,
  Button,
  Badge,
} from "@mui/material";
import { useRouter } from "next/router";

// Utilities
import { useSearch } from "@hooks";
import { clearSearchParams, parseSearchParams, updateSearchParams } from "@utils/search.util";

/** Simple list search/filter */
const ItemSearch = (props) => {
  const { defaultValue = "", items = [], multiple = false, selectKey, selectLabel } = props;

  const router = useRouter();
  const { handleSearchChange, handleSearchSubmit, searchText, setSearchText, unappliedSearch } = useSearch();

  const urlFilters = parseSearchParams<ISearchItemFilters>(router.query, {
    [selectKey]: multiple ? [] : "",
    search: "",
  });
  // Display an option to clear filters only when filters have changed (ignore default value)
  const hasFilterApplied = Boolean(
    urlFilters.search || (urlFilters[selectKey]?.length && urlFilters[selectKey] !== defaultValue)
  );

  // URL select filter must be transformed according to whether multiple selections are allowed,
  //   as well as account for default value when nothing is selected.
  const rawSelectValue = urlFilters[selectKey] || defaultValue;
  const selectValue = Array.isArray(rawSelectValue) ? rawSelectValue : [rawSelectValue];

  /**
   * Render selected values
   *
   * TODO: Refactor and either memoize or find a better way of handling this!!!
   *
   * @param   selected - Selected merchant IDs
   * @returns - Selected merchant names
   */
  const renderSelectValue = (selected) =>
    items
      .filter((i) => selected.includes(i.id))
      .map((i) => i.name)
      .join(", ");

  /** Clear the search filters (from URL) */
  const handleClear = () => {
    clearSearchParams(["merchants", "search"]);
    setSearchText("");
  };

  /**
   * Handle select filter changes
   *
   * @param event - Select filter change event
   */
  const handleSelectChange = (event) => {
    const { value } = event.target;

    updateSearchParams({ [selectKey]: value });
  };

  return (
    <Grid container spacing={2} sx={{ pb: 4 }}>
      <Grid item xs={12} md={6}>
        <Badge color="primary" invisible={!unappliedSearch} sx={{ width: "100%" }} variant="dot">
          <TextField
            helperText={null}
            placeholder="Search"
            size="small"
            sx={{ input: { backgroundColor: "white" } }}
            value={searchText}
            onChange={handleSearchChange}
            onKeyDown={handleSearchSubmit}
          />
        </Badge>
      </Grid>
      <Grid item xs={12} md={4}>
        <FormControl fullWidth size="small">
          {selectLabel && <InputLabel>{selectLabel}</InputLabel>}
          <Select
            label={selectLabel}
            multiple={multiple}
            renderValue={renderSelectValue}
            sx={{ div: { backgroundColor: "white" } }}
            value={selectValue}
            onChange={handleSelectChange}
          >
            {items.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {multiple && <Checkbox checked={selectValue.includes(item.id)} />}
                <ListItemText primary={item.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      {hasFilterApplied && (
        <Grid display="flex" item xs={12} md={2}>
          <Button variant="text" onClick={handleClear}>
            Clear
          </Button>
        </Grid>
      )}
    </Grid>
  );
};

export default ItemSearch;
