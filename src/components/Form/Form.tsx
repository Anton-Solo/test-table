import styles from './Form.module.scss'
import { v4 as uuidv4 } from 'uuid';
import cn from 'classnames';
import { 
    Formik, 
    Form as FormikForm, 
    Field 
} from 'formik';
import * as Yup from 'yup';
import { 
    Row, 
    Col, 
    Button 
} from 'react-bootstrap';

import { useCustomDispatch} from '../../hooks/useStore';
import { addEssence, updateEssence } from '../../store/slices/essenceSlice';
import { Essence } from '../../types/types';

import CustomSelect from './Select/CustomSelect';

interface IForm {
    handleClose: () => void
    essence: Essence
}

const langOptions = [
    {
        value: 'UA',
        label: 'Українська'
    },
    {
        value: 'EN',
        label: 'Англійська'
    },
]

const fieldOptions = [
    {
        value: 'txt',
        label: 'Текст'
    },
    {
        value: 'col',
        label: 'Колонка'
    },
    {
        value: 'row',
        label: 'рядок'
    },
]

const groupOptions = [
    {
        value: '1',
        label: 'Круті чуваки'
    },
    {
        value: '2',
        label: 'Такі собі'
    }
]

const Form = ({handleClose, essence}: IForm) => {
    const dispatch = useCustomDispatch();

    const initialValues = essence ? 
    {
        id: essence.id,
        title: essence.title, 
        name: essence.name,
        phone: essence.phone,
        email: essence.email,
        group: essence.group,
        lang: essence.lang,
        field: essence.field,
        meaning: essence.meaning,
        date: new Date()
    } : 
    {
        id: uuidv4(),
        title: '', 
        name: '',
        phone: '',
        email: '',
        group: '',
        lang: '',
        field: '',
        meaning: '',
        date: new Date()
    }

    return (
        <Formik 
            initialValues = {initialValues}
            validationSchema = {Yup.object({
                title: Yup.string()
                        .min(2, 'Мінімум 2 символи!')
                        .required('Обов`язкове поле'),
                name: Yup.string()
                        .min(2, 'Мінімум 2 символи!')
                        .required('Обов`язкове поле'),
                phone: Yup.string()
                        .required('Обов`язкове поле'),
                email: Yup.string().email()
                        .required('Обов`язкове поле'),
                group: Yup.string()
                        .required('Обов`язкове поле'),
                lang: Yup.string()
                        .required('Обов`язкове поле'),
                field: Yup.string()
                        .required('Обов`язкове поле'),
                meaning: Yup.string()
                        .min(2, 'Мінімум 2 символи!')
                        .required('Обов`язкове поле'),
            })}
            onSubmit = {(values: Essence) => {
                if (essence) {
                    dispatch(updateEssence(values));
                    handleClose();
                } else {
                    dispatch(addEssence(values));
                    handleClose();
                }
            }}
        >
            {({ errors, touched }) => (
                <FormikForm className={styles.form}>
                    <Row>
                        <Col>
                            <div className={styles.form_group}>
                                <label htmlFor='title'>Назва</label>
                                <Field
                                    id='title'
                                    name='title'
                                    type='text'
                                    placeholder='Статус посилки'
                                    className={cn(styles.field, errors.title && touched.title ? styles.error : '')}
                                />
                            </div>
                            
                            <div className={styles.form_group}>
                                <div>
                                    <label htmlFor='phone'>Номер телефону</label>
                                    <Field
                                        id='phone'
                                        name='phone'
                                        type='text'
                                        placeholder='1 (999) 999-9999'
                                        className={cn(styles.field, errors.phone && touched.phone ? styles.error : '')}
                                    />
                                </div>
                            </div>

                            <div className={styles.form_group}>
                                <label htmlFor='group'>Група користувачів</label>
                                <Field
                                    name='group'
                                    id='group'
                                    component={CustomSelect}
                                    placeholder='Оберіть групу'
                                    options={groupOptions.map((group) => ({
                                        value: group.value,
                                        label: group.label,
                                    }))}
                                    error={errors.group && touched.group}
                                />
                            </div>

                            <div className={styles.form_group}>
                                <label htmlFor='field'>Заголовок</label>
                                <Field
                                    name='field'
                                    id='field'
                                    component={CustomSelect}
                                    placeholder='Додати нове поле'
                                    options={fieldOptions.map(field => ({
                                        value: field.value,
                                        label: field.label,
                                    }))}
                                    error={errors.field && touched.field}
                                />
                            </div>
                        </Col>
                        <Col>
                            <div className={styles.form_group}>
                                <label htmlFor='name'>Ім’я та фамілія</label>
                                <Field
                                    id='name'
                                    name='name'
                                    type='text'
                                    placeholder='Через пробіл'
                                    className={cn(styles.field, errors.name && touched.name ? styles.error : '')}
                                />
                            </div>
                            
                            <div className={styles.form_group}>
                                <label htmlFor='email'>Email</label>
                                <Field
                                    id='email'
                                    name='email'
                                    type='text'
                                    placeholder='example.com'
                                    className={cn(styles.field, errors.email && touched.email ? styles.error : '')}
                                />
                            </div>

                            <div className={styles.form_group}>
                                <label htmlFor='lang'>Мова</label>
                                <Field
                                    name='lang'
                                    id='lang'
                                    component={CustomSelect}
                                    placeholder='Оберіть мову'
                                    options={langOptions.map((lang) => ({
                                        value: lang.value,
                                        label: lang.label,
                                    }))}
                                    error={errors.lang && touched.lang}
                                />
                            </div>

                            <div className={styles.form_group}>
                                <label htmlFor='meaning'>Значення поля</label>
                                <Field
                                    id='meaning'
                                    name='meaning'
                                    type='text'
                                    placeholder='Введіть значення'
                                    className={cn(styles.field, errors.meaning && touched.meaning ? styles.error : '')}
                                />
                            </div>
                            
                        </Col>
                    </Row>

                    <Button 
                        className={styles.submit} 
                        type='submit' 
                        variant='outline-primary'
                    >
                        {essence ? 'Редагувати користувача' : 'Додати користувача'}
                    </Button>
            </FormikForm>
            )}
        </Formik>
    )
}

export default Form;