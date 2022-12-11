import styles from './Table.module.scss';
import { useState, useCallback, useMemo} from 'react';
import { 
    Table as TableBoot, 
    Container 
} from 'react-bootstrap';
import { useCustomDispatch, useCustomSelector } from '../../hooks/useStore';
import { selectEssences } from '../../store/selectors';
import { Essence } from '../../types/types';

import TableItem from './TableItem/TableItem';
import Pagination from '../Pagination/Pagination';
import {ReactComponent as ArrowUp} from './img/sort-arrow-up.svg';
import {ReactComponent as ArrowDown} from './img/sort-arrow-down.svg';
import { sortEssencesDown, sortEssencesUp } from '../../store/slices/essenceSlice';

const Table = () => {
    const essences = useCustomSelector(selectEssences);
    const dispatch = useCustomDispatch();

    const [rows, setRows] = useState<Essence[]>(essences);
    const [page, setPage] = useState(1);
    const [activeUp, setActiveUp] = useState(true);
    const [activeDown, setActiveDown] = useState(false);

    const pageSize = 8;

    const handleChangePage = useCallback((page: number) => {
        setPage(page)
    }, []);

    useMemo(() => {
        const firstPageIndex = (page - 1) * pageSize;
        const lastPageIndex = firstPageIndex + pageSize;
        const newData = essences.slice(firstPageIndex, lastPageIndex);
        setRows(newData);
    }, [page, essences]);

    const handleSortUp = () => {
        setActiveDown(false);
        setActiveUp(true);
        dispatch(sortEssencesUp());
    }

    const handleSortDown = () => {
        setActiveDown(true);
        setActiveUp(false);
        dispatch(sortEssencesDown());
    }

    return (
        <>
            { essences.length > 0  && 
                <Container>
                    <TableBoot className={styles.table}>
                        <thead className={styles.table_head}>
                            <tr>
                                <th><span className={styles.name}>Назва</span></th>
                                <th className={styles.table_url}>URL</th>
                                <th>Автор</th>
                                <th className={styles.sort_wrap}>
                                    <span>Створено</span>
                                    <div className={styles.sort}>
                                        <button onClick={handleSortUp}>
                                            <ArrowUp className={activeUp ? styles.active : ''} />
                                        </button>
                                        <button onClick={handleSortDown}>
                                            <ArrowDown className={activeDown ? styles.active : ''} />
                                        </button>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody className={styles.table_body}>
                            { rows.map((essence: Essence) => (
                                <TableItem key={essence.id}  item={essence} />
                            ))}
                        </tbody>
                    </TableBoot>

                    { essences.length > 1 &&
                        <Pagination 
                            total={essences.length}
                            current={page}
                            onChangePage={handleChangePage}
                            pageSize={pageSize}
                        />
                    }
                </Container>
            }
        </>
        
    )
}

export default Table;