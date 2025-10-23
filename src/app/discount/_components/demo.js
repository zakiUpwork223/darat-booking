"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  Typography,
  Divider,
  Card,
  Avatar,
  CardMedia,
} from "@mui/material";

import CustomModal from "@/app/utilities/_components/CustomModal";
import { deleteDiscount, getAllDiscounts } from "./apiCalls";
import AddDiscountModal from "./AddDiscountModal";
import moment from "moment";
import DiscountMenu from "./DiscountMenu";
import EditDiscountModal from "./EditDiscountModal";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
const Discount = () => {
  const [openAddDiscountModal, setOpenAddDiscountModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [discountData, setDiscountData] = useState([]);
  const [modalDiscountId, setModalDiscountId] = useState(null);
  const [load, setload] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    getAllDiscounts(setDiscountData);
  }, [load]);

  const handleOpenAddDiscountModal = () => {
    setOpenAddDiscountModal(true);
  };

  const handleEdit = (id) => {
    setModalDiscountId(id);
    setOpenEditModal(true);
  };
  const toggleInnerData = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };
  const handleDelete = (id) => {
    deleteDiscount(id);
    setDiscountData((prevScheduleData) =>
      prevScheduleData.filter((discount) => discount.id !== id)
    );
  };
  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Typography
          style={{
            fontWeight: 600,
            color: "rgb(240, 187, 55)",
            fontFamily: "Arial",
            fontSize: "35px",
          }}
        >
          DISCOUNT
        </Typography>
        <Button
          sx={{
            backgroundColor: "rgb(240, 187, 55)",
            fontWeight: 600,
            fontSize: "16px",
            textTransform: "capitalize",
            color: "white",
            width: "150px",
            height: "40px",
            "&:hover": { backgroundColor: "rgb(240, 187, 55)" },
          }}
          onClick={handleOpenAddDiscountModal}
        >
          Add Discount
        </Button>

        <CustomModal
          open={openAddDiscountModal}
          setOpenModal={setOpenAddDiscountModal}
        >
          <AddDiscountModal setload={setload} />
        </CustomModal>
      </Box>

      <Grid container spacing={3} mt={3}>
        {discountData.map((discount) => (
          <Grid item key={discount.id} xs={12} sm={6} md={4} lg={4}>
            <Card
              sx={{
                width: "100%",
                position: "relative",
                "&:hover": {
                  boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  right: -10,
                  zIndex: 1,
                }}
              >
                <DiscountMenu
                  onClickDelete={() => handleDelete(discount.id)}
                  onClickEdit={() => handleEdit(discount.id)}
                />
                <CustomModal
                  open={openEditModal && modalDiscountId === discount.id}
                  setOpenModal={setOpenEditModal}
                >
                  <EditDiscountModal discount={discount} setload={setload} />
                </CustomModal>
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                padding="10px 20px"
                gap="5px"
              >
                {/* <Typography variant="h5" gutterBottom>
                  {discount.type}
                </Typography> */}

                <Typography
                  sx={{
                    height: "40px",
                    width: "150px",
                    fontWeight: 200,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#FEF08A",
                    letterSpacing: 1.3,
                    borderRadius: "15px",
                  }}
                  variant="body1"
                  color="black"
                  gutterBottom
                >
                  <b>Code: </b>
                  {discount.unique_code}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <b>Value:</b> {discount.value}
                </Typography>

                <Typography
                  sx={{
                    fontSize: "15px",
                    whiteSpace: "nowrap",
                  }}
                >
                  <b>Expiry Date : </b>
                  {moment.utc(discount.expiryDate).format("YYYY-MM-DD")}
                </Typography>

                <Box
                  onClick={toggleInnerData}
                  sx={{ display: "flex", gap: 16, marginTop: "30px" }}
                >
                  <Typography
                    sx={{
                      fontSize: "15px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Discounted Items
                  </Typography>
                  {isOpen ? <RemoveIcon /> : <AddIcon />}
                </Box>
                <Box
                  style={{
                    overflow: "hidden",
                    maxHeight: isOpen ? "100%" : "0",
                    transition: "max-height 0.4s ease-in-out",
                  }}
                >  {discount.items.map((eachItem) => (
                  <Box key={eachItem.id} sx={{ mt: 2 }}>
                    <Box>
                      <Box>
                        <CardMedia
                          component="img"
                          sx={{ width: 150 }}
                          image={eachItem.item.attachment}
                        />
                      </Box>
                      <Box>
                        <Typography>
                          {eachItem.item.name}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                ))}
                
                 
                </Box>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Discount;
