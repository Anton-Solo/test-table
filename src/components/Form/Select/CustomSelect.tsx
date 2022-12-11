import './CustomSelect.scss';
import { FieldProps } from "formik";
import Select, {Options, OnChangeValue, components} from "react-select";
import {ReactComponent as ArrowIcon} from './img/arrow.svg';

interface Option {
    label: string;
    value: string;
}

interface FormikSelectProps extends FieldProps {
    options: Options<Option>;
    isMulti?: boolean;
    placeholder: string,
    error: boolean
}

const DropdownIndicator = (props: any) => {
  return (
    <components.DropdownIndicator {...props}>
      <ArrowIcon />
    </components.DropdownIndicator>
  );
};

const CustomSelect =
  ({
    field,
    form,
    options,
    placeholder,
    isMulti = false,
    error
  }: FormikSelectProps) => {
    const onChange = (option: OnChangeValue<Option | Option[], boolean>) => {
      form.setFieldValue(
        field.name,
        isMulti
            ? (option as Option[]).map((item: Option) => item.value)
            : (option as Option).value
          );
    };

    const getValue = () => {
        if (options) {
          return isMulti
            ? options.filter(option => field.value.indexOf(option.value) >= 0)
            : options.find(option => option.value === field.value);
        } else {
            return isMulti ? [] : ("" as any);
        }
    };

    const classNames = error ? 'error select' : 'select';

    return (
      <Select
        classNamePrefix={classNames}
        placeholder={placeholder}
        name={field.name}
        value={getValue()}
        onChange={onChange}
        options={options}
        components={{DropdownIndicator}}
        isMulti={isMulti}
      />
    );
};

export default CustomSelect;