import { CSSProperties, type InputHTMLAttributes, forwardRef } from 'react';
import clsx from 'clsx';
import styles from './TextInput.module.scss';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** error text 또는 helperText */
  helperText?: string;
  /** 에러 여부 */
  isError?: boolean;
  startDecorator?: React.ReactNode;
  endDecorator?: React.ReactNode;
  InputProps?: { className?: string; style?: CSSProperties };
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      helperText,
      isError = false,
      startDecorator,
      endDecorator,
      className,
      style,
      InputProps,
      ...rest
    },
    ref
  ) => {
    return (
      <div className={clsx(styles.field_wrapper, className)} style={style}>
        <div className={styles.input_wrapper}>
          {startDecorator}
          <input
            ref={ref}
            className={clsx(styles.input, InputProps?.className)}
            style={InputProps?.style}
            type="text"
            {...rest}
          />
          {endDecorator}
        </div>
        <p className={clsx(styles.input_error, isError && 'text-error-default')}>{helperText}</p>
      </div>
    );
  }
);

TextInput.displayName = 'TextInput';

export default TextInput;
