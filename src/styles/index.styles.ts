import { styled } from '@mui/system';
import Modal from 'react-modal';
import { Box, Paper } from '@mui/material';

Modal.setAppElement('#root');

export const StyledModal = styled(Modal)`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const ModalContent = styled(Box)`
    background-color: white;
    padding: 2rem;
    border-radius: 8px;
    width: 400px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

export const CommentsSection = styled(Box)`
    margin-top: 2rem;
`;

export const DetailsModalContent = styled(Paper)`
    padding: 2rem;
    border-radius: 8px;
    width: 400px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

export const ProductListContainer = styled(Box)`
    padding: 2rem;
`;

export const ProductListHeader = styled(Box)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
`;

export const RemovalModalContent = styled(Paper)`
    padding: 2rem;
    border-radius: 8px;
    width: 400px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;
