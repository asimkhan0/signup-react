import React from 'react';
import { Modal } from "react-responsive-modal";
import Button from '../button/index'
import "react-responsive-modal/styles.css";
import './styles/modal.css';


export default function TransitionsModal(props) {
    const { openModal, setOpenModal } = props;
    return (
        <Modal open={openModal} center={true} onClose={() => setOpenModal(false)}>
            <h2>Upload Profile Picture</h2>
            {props.children}
            <Button
                name="Save"
                variant="contained"
                color="primary"
                onClick={() => setOpenModal(false)}
            />
        </Modal>
    );
}