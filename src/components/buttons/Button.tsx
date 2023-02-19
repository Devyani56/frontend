import { StyleSheet, css } from 'aphrodite';
interface IButtonProps {
    children: any;
    onClick?: (e:any) => void;
    type: "long" | "short";
    color: string;
    hoverColor?: string;
    disabled?: boolean;
    className?: string;
    style?: any;
    id?: string;
    title?: string;
    ariaLabel?: string;
    textColor ?: string;

}
const Button = (props :IButtonProps) => {
    const customStyles = StyleSheet.create(
        {
            ButtonCustom: {
                backgroundColor: props.color,

                color: props.textColor ? props.textColor : 'white',
            //     change color on hover
                ':hover': {
                    backgroundColor: props.hoverColor ? props.hoverColor : props.color,
                },
            }
        }
    )
    return (
        <button
            id={props.id || ""}
            onClick={props.onClick}
            disabled={props.disabled}
            className={css(styles.ButtonDefault, styles[props.type], customStyles.ButtonCustom)}
        >
            {props.children}
        </button>
    )
};

export default Button;

const styles = StyleSheet.create(
    {
        ButtonDefault: {
            border: 'none',
            borderRadius: '0.5rem',
            padding: '0.8rem 1.6rem',
            fontSize: '1.6rem',
            fontWeight: 700,
            color: 'white',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.8rem',

        },

        long: {
            width: '100%',
        },
        short: {
            width: 'auto',
        }
    }
)
