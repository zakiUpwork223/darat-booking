import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/navigation";
const SearchTextField = () => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");

  const handleKeyPress = (event) => {
   if (searchValue != ""){
    if(event.key === 'Enter'){
        router.push(`/search?q=${searchValue}`);
      
    }
   }
  };

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <TextField
      variant="outlined"
      placeholder="Search"
      value={searchValue}
      onChange={handleChange}
      onKeyPress={handleKeyPress}
      InputProps={{
        startAdornment: (
          <SearchIcon style={{ marginRight: "8px", color: "gray" }} />
        ),
      }}
    />
  );
};

export default SearchTextField;
