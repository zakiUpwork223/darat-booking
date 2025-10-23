import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import api from "../../../../lib/services/api";
import { useSearchParams } from "next/navigation";
import ProductCard from "./ProductCard";
import DoctorCard from "./DoctorCard";
import ServicesCard from "./ServicesCard";

const Search = () => {
  const searchParams = useSearchParams();
  const value = searchParams.get("q");
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.post(`/search/general?query=${value}`);
        setData(res.data);
        setLoading(true);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [value]);

  return (
    <Box>
      {loading ? (
        <Box>
          <Typography variant="h4" align="center" gutterBottom mt={5} mb={4}>
            Products
          </Typography>
          <ProductCard product={data.menu} />
          <Typography variant="h4" align="center" gutterBottom mt={5} mb={4}>
            Doctors
          </Typography>
          <DoctorCard doctor={data.doctors} />
          <Typography variant="h4" align="center" gutterBottom mt={5} mb={4}>
            Services
          </Typography>
          <ServicesCard services={data.services} />
        </Box>
      ) : null}
    </Box>
  );
};

export default Search;
