import cn from 'clsx';
import { forwardRef, useState, cloneElement } from 'react';

import styles from './styles.module.scss';

export type Props = {
  icon?: React.ReactNode;
  type?: 'tel' | 'text' | 'date' | 'number' | 'search' | 'password';
  label: React.ReactNode;
  errorMessage?: React.ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, Props>(
  (
    {
      icon,
      name,
      type = 'text',
      value,
      label,
      onBlur,
      onChange,
      required,
      disabled,
      readOnly,
      maxLength,
      className,
      errorMessage,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState('');

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>): void => {
      if (type === 'number' && !event.target.validity.valid) {
        // eslint-disable-next-line no-param-reassign
        event.target.value = '';

        setInternalValue('');
      }

      onBlur && onBlur(event);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
      if (maxLength && event.target.value && maxLength < event.target.value.length) {
        // eslint-disable-next-line no-param-reassign
        event.target.value = String(event.target.value).substring(maxLength, 0);
      }

      setInternalValue(event.target.value);

      onChange && onChange(event);
    };

    return (
      <div
        className={cn(className, styles.input, styles[`-${type}`], {
          [styles['-invalid']]: !!errorMessage && !disabled,
          [styles['-disabled']]: disabled,
          [styles['-readonly']]: readOnly,
        })}
      >
        {icon &&
          cloneElement(icon as React.ReactElement, {
            className: cn(styles.icon),
            'data-icon': '',
          })}

        <input
          id={`${name}-input`}
          ref={ref}
          name={name}
          type={type}
          value={value !== undefined ? value : internalValue}
          onBlur={handleBlur}
          onChange={handleChange}
          required={required}
          disabled={disabled}
          readOnly={readOnly}
          minLength={maxLength ? 0 : undefined}
          maxLength={maxLength}
          className={cn(styles.input, {
            [styles['-filled']]:
              !!(value !== undefined ? value : internalValue) || (type === 'number' && value === 0),
          })}
          tabIndex={disabled || readOnly ? -1 : 0}
          data-input=""
          autoComplete="off"
          aria-invalid={errorMessage && !disabled ? 'true' : 'false'}
          aria-readonly={readOnly ? 'true' : 'false'}
          aria-disabled={disabled ? 'true' : 'false'}
          aria-required={required ? 'true' : 'false'}
          aria-labelledby={`${name}-input-label`}
          aria-errormessage={`${name}-input-error`}
          {...props}
        />
        <label
          id={`${name}-input-label`}
          htmlFor={`${name}-input`}
          className={styles.label}
          data-label=""
        >
          {label} {!required && !disabled && '(optional)'}
        </label>
      </div>
    );
  }
);

export default Input;
