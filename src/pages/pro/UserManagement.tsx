import { StyleSheet, css } from 'aphrodite';
const UserManagement = () => {
    return (
        <div className={css(styles.boardDefault)}>
            UserManagement
        </div>
    );
}

export default UserManagement;


const styles = StyleSheet.create(
    {
        boardDefault: {
            width: '100%',
        }
    }
)