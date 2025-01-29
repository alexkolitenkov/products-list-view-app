import type { FC } from 'react';
import Modal from 'react-modal';
import { useAppDispatch } from '../app/hooks';
import { removeProduct } from '../features/products/productsSlice';
import type { IProduct } from '../types/common';
import { Box, Button, Typography } from '@mui/material';
import { RemovalModalContent, StyledModal } from '../styles/index.styles';

Modal.setAppElement('#root');

interface RemoveProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    product: IProduct | null;
}

const RemoveProductModal: FC<RemoveProductModalProps> = ({ isOpen, onClose, onConfirm, product }) => {
    const dispatch = useAppDispatch();

    const handleConfirm = () => {
        if (product) {
            dispatch(removeProduct(product.id));
            onConfirm();
        }
    };

    return (
        <StyledModal isOpen={isOpen} onRequestClose={onClose}>
            <RemovalModalContent elevation={3}>
                <Typography variant="h6">Confirm Deletion</Typography>
                <Typography variant="body1">
                    Are you sure you want to delete the product '{product?.name}'?
                </Typography>
                <Box display="flex" justifyContent="space-between" mt={2}>
                    <Button variant="contained" color="primary" onClick={handleConfirm}>
                        Delete
                    </Button>
                    <Button variant="outlined" onClick={onClose}>
                        Cancel
                    </Button>
                </Box>
            </RemovalModalContent>
        </StyledModal>
    );
};

export default RemoveProductModal;