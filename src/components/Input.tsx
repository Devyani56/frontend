import {StyleSheet, css} from "aphrodite";
import themeVars from "../util/themeVars";
interface IInputProps {
    label: string;
    name: string;
    type: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeHolder?: string;
    error?: {error : boolean, message: string};
    onBlur?: (field: string, value: string) => void;
}

const Input = (props: IInputProps) => {
    const { label, name, type, value,placeHolder, error, onChange, onBlur } = props;
    return (
        <div className={css(styles.InputContainer)}>
        <label htmlFor={name} className={css(styles.InputLabel)}>
            {label}
        </label>

        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            className={css(styles.Input, error?.error && styles.InputError)}
            placeholder={placeHolder}
            onBlur={onBlur && ((e) => onBlur(name, e.target.value))}
        />

        {error && <div className={css(styles.Error)}>{error.message}</div>}
        </div>
    );
};

export default Input;

const styles = StyleSheet.create(
    {
        InputContainer: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            gap: '0.5rem',
            width: '100%',
        },

        InputLabel: {
            fontSize: '1.2rem',
            fontWeight: 600,
            color: themeVars.colors.accent.black,
        },

        Input: {
            width: '100%',
            height: '3.2rem',
            border: '1px solid ' + themeVars.colors.textField.borderColor,
            borderRadius: '0.5rem',
            boxSizing: 'border-box',
            padding: '0.6rem 1rem',
            fontSize: '1.4rem',
            fontWeight: 500,
            lineHeight: '2rem',
            color: themeVars.colors.accent.black,
            backgroundColor: themeVars.colors.textField.background,
            // chnage css when input is focused
            ':focus': {
                outline: '1px solid rgba(127, 200, 182, 1)',
            }
        },

        InputActive: {
            border: '1px solid rgba(127, 200, 182, 1)',
        },

        Error: {
            color: themeVars.colors.alerts.red
        },

        InputError: {
            border: '1px solid ' + themeVars.colors.alerts.red,
        }

    }
)
