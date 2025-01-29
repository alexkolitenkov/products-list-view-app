import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import AddProductModal from './AddProductModal';
import RemoveProductModal from './RemoveProductModal';
import ProductDetails from './ProductDetails';
import EditProductModal from './EditProductModal';
import type { IProduct } from '../types/common';
import type { RootState } from '../app/store';
import { setProducts } from '../features/products/productsSlice';
import { Button, MenuItem, Select, Typography, List, ListItem, ListItemText, Paper } from '@mui/material';
import { ProductListContainer, ProductListHeader } from '../styles/index.styles';

const ProductList: React.FC = () => {
    const dispatch = useAppDispatch();
    const products = useAppSelector((state: RootState) => state.product.products);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showRemoveModal, setShowRemoveModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
    const [sortOption, setSortOption] = useState('alphabetical');

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('http://localhost:3001/products');
            const products = await response.json();
            dispatch(setProducts(products));
        }
        fetchProducts();
    }, [dispatch]);

    const handleSortChange = (e: any) => {
        setSortOption(e.target.value);
    };

    const sortedProducts = [...products].sort((a: IProduct, b: IProduct) => {
        if (sortOption === 'alphabetical') {
            return a.name.localeCompare(b.name);
        } else {
            return a.count - b.count;
        }
    });

    return (
        <ProductListContainer>
            <ProductListHeader>
                <Typography variant="h4">Product List</Typography>
                <Button variant="contained" color="primary" onClick={() => setShowAddModal(true)}>
                    Add Product
                </Button>
                <Select value={sortOption} onChange={handleSortChange}>
                    <MenuItem value="alphabetical">Sort Alphabetically</MenuItem>
                    <MenuItem value="count">Sort by Count</MenuItem>
                </Select>
            </ProductListHeader>
            <List>
                {sortedProducts.map((product: IProduct) => (
                    <ListItem key={product.id} component={Paper} elevation={2} sx={{ marginBottom: '1rem', gap: '1rem' }}>
                        <ListItemText
                            primary={product.name}
                            secondary={`Count: ${product.count}`}
                        />
                        <Button variant="outlined" color="secondary" onClick={() => {
                            setSelectedProduct(product);
                            setShowRemoveModal(true);
                        }}>
                            Remove
                        </Button>
                        <Button variant="outlined" color="primary" onClick={() => {
                            setSelectedProduct(product);
                            setShowEditModal(true);
                        }}>
                            Edit
                        </Button>
                        <Button variant="outlined" color="success" onClick={() => {
                            setSelectedProduct(product);
                            setShowDetailsModal(true);
                        }}>
                            Details
                        </Button>
                    </ListItem>
                ))}
            </List>
            {showAddModal && (
                <AddProductModal
                    isOpen={showAddModal}
                    onRequestClose={() => setShowAddModal(false)}
                />
            )}
            {showRemoveModal && (
                <RemoveProductModal
                    isOpen={showRemoveModal}
                    onClose={() => setShowRemoveModal(false)}
                    onConfirm={() => setShowRemoveModal(false)}
                    product={selectedProduct}
                />
            )}
            {showEditModal && selectedProduct && (
                <EditProductModal
                    isOpen={showEditModal}
                    product={selectedProduct}
                    onUpdate={() => setShowEditModal(false)}
                    onClose={() => setShowEditModal(false)}
                />
            )}
            {showDetailsModal && selectedProduct && (
                <ProductDetails
                    isOpen={showDetailsModal}
                    product={selectedProduct}
                    onClose={() => setShowDetailsModal(false)}
                    onEdit={() => {
                        setShowDetailsModal(false);
                        setShowEditModal(true);
                    }}
                />
            )}
        </ProductListContainer>
    );
};

export default ProductList;