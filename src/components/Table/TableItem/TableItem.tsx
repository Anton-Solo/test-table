import styles from './TabletItem.module.scss';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { useCustomDispatch } from '../../../hooks/useStore';
import { removeEssence } from '../../../store/slices/essenceSlice';
import { showModal } from '../../../store/slices/modalSlice';
import { Essence } from '../../../types/types';

import {ReactComponent as MoreIcon} from './img/morebtn.svg';
import {ReactComponent as PenIcon} from './img/pen.svg';
import {ReactComponent as SaveIcon} from './img/save.svg';
import {ReactComponent as DeleteIcon} from './img/delete.svg';

interface ITableItem {
    item: Essence
}

const TableItem = ({item}: ITableItem) => {
    const dispatch = useCustomDispatch();

    const handleShowModal = () => {
        dispatch(showModal(item.id))
    }

    const handleDeleteEssence = () => {
        dispatch(removeEssence(item))
    }

    return (
        <tr>
            <td className={styles.title}>
                <div className={styles.wrapper}>
                    <DropdownButton
                        className={styles.table_more}
                        drop='end'
                        key='end'
                        title={<MoreIcon />}
                    >
                        <Dropdown.Item 
                            onClick={handleShowModal}
                            eventKey="1"
                            className={styles.more_item}
                        >
                            <PenIcon />
                            Редагувати
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item 
                            eventKey="2"
                            className={styles.more_item}
                        >
                            <SaveIcon />
                            Зберегти як файл
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item 
                            eventKey="3"
                            onClick={handleDeleteEssence}
                            className={styles.more_item}
                        >
                            <DeleteIcon />
                            Видалити 
                        </Dropdown.Item>
                    </DropdownButton>

                    {item.title}
                </div>
            </td>
            <td className={styles.table_url}><a href="https://yesoriginal.inboost.ai/api/webhok">{`https://yesoriginal.inboost.ai/api/webhok/${item.id}`}</a></td>
            <td>{item.name}</td>
            {item.date &&
                <td className={styles.date}>
                    <span>
                        {new Date(item.date).getDate()}.{new Date(item.date).getMonth() + 1}.{new Date(item.date).getFullYear()}
                    </span>
                    <span>
                        {String(new Date(item.date).getHours()).length === 1 ? '0' + new Date(item.date).getHours() : new Date(item.date).getHours()}
                        :
                        {String(new Date(item.date).getMinutes()).length === 1 ? '0' + new Date(item.date).getMinutes() : new Date(item.date).getMinutes()}
                    </span>   
                </td>
            }
        </tr>
    )
}

export default TableItem;