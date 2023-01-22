import { StyleSheet, css } from 'aphrodite';
const SideBarInfoSection = ({children}:any) => {
    return <div className={css(styles.sideBarInfoSectionDefault)}>
        <h3></h3>
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
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '2.4rem',
        }
    }
);
