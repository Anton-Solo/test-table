import { Modal, Button } from 'react-bootstrap';
import Form from '../Form/Form';
import {ReactComponent as AddIcon} from './img/add.svg';

import styles from './CustomModal.module.scss';
import { selectEssenceData, selectModal } from '../../store/selectors';
import { useCustomDispatch, useCustomSelector } from '../../hooks/useStore';
import { hideModal, showModal } from '../../store/slices/modalSlice';

const CustomModal = () => {
    const dispatch = useCustomDispatch();
    const modal = useCustomSelector(selectModal);
    const essence = useCustomSelector(selectEssenceData)

    const handleClose = () => dispatch(hideModal());
    const handleShow = () => dispatch(showModal(null));

    return (
        <>
            <Modal 
                show={modal} 
                onHide={handleClose}
                dialogClassName={styles.modal_dialog}
            >
                <Modal.Header
                    closeButton
                    className={styles.modal_header}
                >
                    <AddIcon />
                    <Modal.Title className={styles.title}>{essence.length > 0 ? 'Редагувати користувача' : 'Додати користувача'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form handleClose={handleClose} essence={essence[0]}/>
                </Modal.Body>
            </Modal>
            <Button 
                onClick={handleShow}
                className={styles.addBtn}
            >
                Add essence
            </Button>
        </>
    )
}

export default CustomModal;