import { StyleSheet, css } from 'aphrodite';
const SideBarInfoSection = ({children}:any) => {
    return <div className={css(styles.sideBarInfoSectionDefault)}>
        <div className={css(styles.sideBarChildrenSectionDefault)}>
            {children}
        </div>
    </div>
}

export default SideBarInfoSection

const styles = StyleSheet.create(
    {
        sideBarInfoSectionDefault: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },

        sideBarChildrenSectionDefault: {
            width: '95%',
            maxWidth: '32rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1.3rem',
        }
    }
);
