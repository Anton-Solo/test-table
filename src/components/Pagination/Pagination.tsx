import styles from './Pagination.module.scss';
import {
    Pagination as PaginationBoot, 
    Button
} 
from 'react-bootstrap';
import { useState } from 'react';
import cn from 'classnames';
import {ReactComponent as ArrowSub} from './img/arrowsub.svg';

interface IPagination {
    total: number;
    current: number;
    onChangePage: any;
    pageSize: number;
}

const Pagination = ({
    total, 
    current, 
    onChangePage, 
    pageSize, 
}: IPagination) => {
    const [value, setValue] = useState<number | string>('');
    const totalPages = Math.ceil(total / pageSize);
    let items = [];

    if(current > 1) {
        items.push(<PaginationBoot.First key='first' onClick={() => onChangePage(1)}/>)
        items.push(<PaginationBoot.Prev key='prev' onClick={() => onChangePage(current - 1)}/>)
    }

    for(let page = 1; page <= totalPages; page++) {
        items.push(
            <PaginationBoot.Item key={page} data-page={page} active={page === current} onClick={() => onChangePage(page)}>
                {page}
            </PaginationBoot.Item>
        )
    }

    if (current < totalPages) {
        items.push(<PaginationBoot.Next key='next' onClick={() => onChangePage(current + 1)}/>);
        items.push(<PaginationBoot.Last key='last' onClick={() => onChangePage(total)}/>);
    }

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        onChangePage(value);
        setValue('');
    }

    const handleChange: React.FormEventHandler<HTMLInputElement> = (e) => {
        const val = e.currentTarget.value;
        if (+val <= totalPages) {
            setValue(e.currentTarget.value)
        } else {
            setValue(1)
        }
    }

    return (
        <>
            { items.length > 0 &&
                <div className={styles.wrapper}>
                    <div className={styles.wrapper_item}>
                        <PaginationBoot>
                            {items}
                        </PaginationBoot>
                    </div>
                    <div className={cn(styles.wrapper_item, styles.form_wrap)}>
                        <form 
                            className={styles.form}
                            onSubmit={e => handleSubmit(e)}
                        >
                            <label htmlFor='page'>Перейти на сторінку</label>
                            <div className={styles.form_input}>
                                <input 
                                    type='number' 
                                    name='page' 
                                    id='page' 
                                    max={total}
                                    min={1}
                                    value={value}
                                    onInput={e => handleChange(e)}
                                />
                                <Button type='submit'>
                                    <ArrowSub />
                                </Button>
                            </div>
                        </form>
                    </div>
                    <div className={styles.wrapper_item}>
                        <span className={styles.pages}>Сторінка <span className={styles.current}>{current}</span> з {total}</span>
                    </div>
                </div>
            }
        </>
    )
}

export default Pagination;