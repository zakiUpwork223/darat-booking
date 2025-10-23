import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, Grid, Card, CardContent, Button, CardMedia, Modal, TextField } from '@mui/material';
import { useRouter } from 'next/navigation';
import AddProductModal from '@/app/create-product/_components/AddProductModal';
import MenuFile from '@/app/utilities/_components/MenuFile';
import CloseIcon from '@mui/icons-material/Close';
import api from '../../../../lib/services/api';
import CircularProgress from "@mui/material/CircularProgress";

export default function Products() {
    const router = useRouter();
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [openAddProductModal, setOpenAddProductModal] = useState(false);
    const [updateModalOpen, setUpdateModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [AnchorEl, setAnchorEl] = useState(null);
    const [updateFormData, setUpdateFormData] = useState({
        name: '',
        description: '',
        attachment: '',
        categoryId: '',
        variants: [],
    });

    useEffect(() => {
        if (typeof window !== "undefined") {
            async function fetchData() {
                try {
                    const response = await api.get('items');
                    const items = response.data.map(item => ({
                        ...item,
                        variantId: item.variantId.map(variant => ({
                            ...variant,
                            unique_code: variant.unique_code
                        }))
                    }));
                    setProducts(items);
                    setLoading(false);
                    setError(null);
                }
                catch (error) {
                    console.error('Error fetching products:', error);
                    setError('Failed to fetch products');
                }
            }
            fetchData();
        }
    }, []);


    const handleOpenUpdateModal = (product) => {
        setSelectedProduct(product);
        setUpdateFormData({
            attachment: product.attachment,
            name: product.name,
            description: product.description,
            categoryId: product.categoryId,
            variants: product.variantId ? product.variantId.map((variant) => ({
                ...variant,
            })) : []
        });
        setUpdateModalOpen(true);
    };


    const handleVariantChange = (e, id) => {
        const { name, value } = e.target;
        setUpdateFormData(prevState => {
            const updatedVariants = prevState.variants.map(variant => {
                if (variant.id === id) {
                    return { ...variant, [name]: name === 'stock' ? parseInt(value) : value, unique_code: variant.unique_code };
                }
                return variant;
            });
            return { ...prevState, variants: updatedVariants };
        });
    };


    const handleCloseUpdateModal = () => {
        setUpdateModalOpen(false);
        setSelectedProduct(null);
    };

    const handleUpdateFormDataChange = (e) => {
        const { name, value } = e.target;
        setUpdateFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleUpdate = async () => {
        try {
            const updatedProduct = { ...selectedProduct, ...updateFormData };
            updatedProduct.variants.forEach(variant => {
                variant.price = parseInt(variant.price);
                variant.stock = parseInt(variant.stock);
            });
            await api.patch(`items/${selectedProduct.id}`, updatedProduct);
            const response = await api.get('items');
            setProducts(response.data);
            handleCloseUpdateModal();
        } catch (error) {
            console.error('Error updating service:', error);
        }
    };


    const handleDeleteProduct = async (productId) => {
        try {
            await api.delete(`/items/${productId}`);
            setProducts(products.filter(product => product.id !== productId));
        } catch (error) {
            console.error('Error deleting product:', error);
            setError('Failed to delete product');
        }
    };

    const handleClose = () => {
        handleCloseUpdateModal();
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography style={{
                    fontWeight: 600,
                    color: "rgb(240, 187, 55)",
                    fontFamily: "Arial",
                    fontSize: "35px",
                }}>
                    PRODUCTS
                </Typography>
                <AddProductModal
                    open={openAddProductModal}
                    handleClose={() => setOpenAddProductModal(false)}
                />
            </Box>
            <Container maxWidth="md">
                <Grid container spacing={3} mt={3}>
                    {products.length > 0 && products.map((product) => (
                        <Grid item key={product.id} xs={12} sm={6} md={4}>
                            <Card sx={{ position: 'relative', maxWidth: 345, cursor: 'pointer', height: "400px" }}>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={product.attachment}
                                    alt={product.name}
                                />
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: 0,
                                        right: 0,
                                        zIndex: 1,
                                    }}
                                >
                                    <MenuFile
                                        onClickDelete={() => handleDeleteProduct(product.id)}
                                        onClickEdit={() => handleOpenUpdateModal(product)}
                                        onClose={handleCloseMenu}
                                    />
                                </Box>
                                <CardContent>
                                    <Typography variant="h6" component="h2" gutterBottom>
                                        {product.name}
                                    </Typography>
                                    <Typography variant="body1" color="textSecondary" component="p" gutterBottom>
                                        {product.description}
                                    </Typography>
                                    {product.variantId && product.variantId.map((variant, index) => (
                                        <div key={index}>
                                            <Typography variant="body1" component="p">
                                                <b>Price:</b> {variant.price}
                                            </Typography>
                                            <Typography variant="body1" component="p">
                                                <b>Size:</b> {variant.size}
                                            </Typography>
                                            <Typography variant="body1" component="p">
                                                <b>Stock:</b> {variant.stock}
                                            </Typography>
                                            {variant.colors && variant.colors.length > 0 && (
                                                <ul>
                                                    {variant.colors.map((color, idx) => (
                                                        <li key={idx}>
                                                            Color: {color.color}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                {error && (
                    <Typography variant="body1" color="error" align="center">
                        {error}
                    </Typography>
                )}
                {/* Update Modal */}
                <Modal open={updateModalOpen} onClose={handleCloseUpdateModal}>
                    <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, width: 400, borderRadius: "10px" }}>
                        <CloseIcon onClick={handleClose} sx={{ float: "right", cursor: "pointer" }} />
                        <Typography variant="h6" gutterBottom>
                            Update Product
                        </Typography>
                        <CardMedia
                            component="img"
                            height="200"
                            image={updateFormData.attachment}
                            alt={updateFormData.name}
                            sx={{ marginBottom: 2 }}
                        />
                        <TextField
                            label="Name"
                            name="name"
                            value={updateFormData.name}
                            onChange={handleUpdateFormDataChange}
                            fullWidth sx={{ mt: 3 }} />
                        <TextField label="Description"
                            name="description"
                            value={updateFormData.description}
                            onChange={handleUpdateFormDataChange}
                            fullWidth sx={{ mt: 3 }} />
                        {updateFormData.variants.length > 0 && updateFormData.variants.map((variant, index) => (
                            <Box key={index} sx={{ mt: 3 }}>
                                <Box sx={{ display: "flex", justifyContent: "space-around", gap: 2 }}>
                                    <TextField
                                        label="Size"
                                        name="size"
                                        value={variant.size}
                                        onChange={(e) => handleVariantChange(e, variant.id)}
                                        fullWidth
                                    />
                                    <TextField
                                        label="Price"
                                        name="price"
                                        value={variant.price}
                                        onChange={(e) => handleVariantChange(e, variant.id)}
                                        fullWidth
                                    />
                                </Box>
                                <Box sx={{ display: "flex", justifyContent: "space-around", gap: 2 }}>
                                    <TextField
                                        label="Stock"
                                        name="stock"
                                        value={variant.stock}
                                        onChange={(e) => handleVariantChange(e, variant.id)}
                                        fullWidth
                                        sx={{ mt: 2 }}
                                    />
                                    <TextField
                                        label="Unique Code"
                                        name="unique_code"
                                        value={variant.unique_code}
                                        disabled
                                        fullWidth
                                        sx={{ mt: 2 }}
                                    />
                                </Box>
                            </Box>
                        ))}

                        {/* Update button */}
                        <Button onClick={handleUpdate} fullWidth sx={{
                            mt: 4,
                            color: "white",
                            fontWeight: "bold",
                            backgroundColor: "rgb(240, 187, 55)",
                            "&:hover": {
                                backgroundColor: "rgb(240, 187, 55)",
                            },
                        }}>
                            Update
                        </Button>
                    </Box>
                </Modal>

            </Container>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    mt: 20
                }}
            >
                {loading && <CircularProgress sx={{ color: "black" }} />}
            </Box>
        </>
    );

}
