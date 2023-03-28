import { StyleSheet, css } from 'aphrodite';
import themeVars from "../../util/themeVars";
import {useState} from "react";


const DATA = [
    {
        "email": "divyansh.24888@gmail.com",
        "roles": {
            "user": true,
            "admin": true,
            "manager": true,
            "dp-manager": true,
            "data-analyst": true
        },
        "appliedRoles": {
            "user": true,
            "admin": true,
            "manager": true,
            "dp-manager": true,
            "data-analyst": true
        },
        "emailVerified": true,
        "firstName": "Divyansh",
        "lastName": "",
        "id": "63dc22bfb904ac78c1eabf48"
    },
    {
        "email": "balijapellypranav2507@gmail.com",
        "roles": {
            "user": true,
            "admin": true,
            "manager": true,
            "dp-manager": true,
            "data-analyst": true
        },
        "appliedRoles": {
            "user": true,
            "admin": true,
            "manager": true,
            "dp-manager": true,
            "data-analyst": true
        },
        "emailVerified": true,
        "firstName": "Pranav",
        "lastName": "",
        "id": "63ff184ad241040bbbd0cb4a"
    },
    {
        "email": "divyansh.19031@iitgoa.ac.in",
        "roles": {
            "user": true,
            "admin": false,
            "manager": false,
            "dp-manager": false,
            "data-analyst": false
        },
        "appliedRoles": {
            "user": true,
            "admin": false,
            "manager": false,
            "dp-manager": false,
            "data-analyst": false
        },
        "emailVerified": true,
        "firstName": "Divyansh",
        "lastName": "",
        "id": "64007f41fd26a56e7440472d"
    },
    {
        "email": "balijapelly.pranav.19031@iitgoa.ac.in",
        "roles": {
            "user": true,
            "admin": true,
            "manager": true,
            "dp-manager": true,
            "data-analyst": false
        },
        "appliedRoles": {
            "user": true,
            "admin": false,
            "manager": false,
            "dp-manager": false,
            "data-analyst": false
        },
        "emailVerified": true,
        "firstName": "Pranav Balijapelly",
        "lastName": "",
        "id": "64084c0a2479e487c6ee71ed"
    },
    {
        "email": "balijaellypranav2507@gmail.com",
        "roles": {
            "user": false,
            "admin": false,
            "manager": false,
            "dp-manager": false,
            "data-analyst": false
        },
        "appliedRoles": {
            "user": true,
            "admin": false,
            "manager": false,
            "dp-manager": false,
            "data-analyst": false
        },
        "emailVerified": false,
        "firstName": "pranav",
        "id": "6416dd2703ce0812706d90c5"
    }
]

const UserManagement = () => {

    const [users, setUsers] = useState(DATA);
    return (
        <div className={css(styles.boardDefault)}>
            <div className={css(styles.dsHeader)}>
                <div className={css(styles.titleHeader)}>
                    User Management
                </div>
            </div>
            <div  className={css(styles.userListCont)}>
                <div className={css(styles.userList)}>
                    {users.length !== 0 ? (
                        users.map((user) => (
                            <div className={css(styles.userItem)}>
                                <div className={css(styles.userInfoCont)}>
                                    <div className={css(styles.userNameEmail)}>
                                        <div className={css(styles.nameRole)}>
                                            <div className={css(styles.userName)}>
                                                {user.firstName}
                                            </div>
                                            <div className={css(styles.userRoles)}>
                                                {user.roles.admin && <div className={css(styles.userRole)}>
                                                    Admin
                                                </div>}
                                                {user.roles.manager && <div className={css(styles.userRole)}>
                                                    Manager
                                                </div>}
                                                {user.roles["data-analyst"] && <div className={css(styles.userRole)}>
                                                    Data Analyst
                                                </div>}

                                            </div>
                                        </div>

                                        <div className={css(styles.userEmail)}>
                                            {user.email}
                                        </div>
                                    </div>

                                </div>
                                <div className={css(styles.userActionsCont)}>
                                    <div className={css(styles.inviteCont)}>
                                        {
                                            !user.roles.admin &&
                                            <button className={css(styles.inviteBtn)}>
                                            Invite as Admin
                                        </button>
                                        }
                                        {
                                            !user.roles.manager &&
                                            <button className={css(styles.inviteBtn)}>
                                                Invite as Manager
                                            </button>
                                        }
                                        {
                                            !user.roles["data-analyst"] &&
                                            <button className={css(styles.inviteBtn)}>
                                                Invite as Data Analyst
                                            </button>
                                        }


                                    </div>

                                </div>
                            </div>
                            ))
                        ) : (
                            <div className={css(styles.noDataCont)}>
                                <img src="/images/no-data.svg" className={css(styles.noDataImg)} />
                                <div className={css(styles.noDataText)}>
                                    No Data
                                </div>
                            </div>
                        )
                    }
                </div>

            </div>

        </div>
    );
}

export default UserManagement;


const styles = StyleSheet.create(
    {
        boardDefault: {
            width: '100%',
            minHeight: '100%',
            boxSizing: 'border-box',
        },


        dsHeader: {
            width: '100%',
            padding: '2rem 4%',
            display: 'flex',
            justifyContent: 'space-between',
            boxSizing: 'border-box',
            alignItems: 'center',

        },

        dataCont: {
            width: '100%',
            padding: '2rem 6%',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',

        },

        titleHeader: {
            fontSize: '2.8rem',
            fontWeight: 'normal',
            width: '100%',
            color: themeVars.colors.accent.dark
        },

        noDataCont: {
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },

        noDataImg: {
            width: '40%',
            marginRight: '15rem',
            opacity: 0.5,
            marginTop: '10rem',

        },

        userList: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            boxSizing: 'border-box',
            padding: '0 4%',
            gap: '2rem',

        },

        userListCont: {
            width: '100%',
            marginTop: '2rem',

        },

        userItem: {
            width: '100%',
            display: 'flex',
            backgroundColor: themeVars.colors.accent.light,
            padding: '1rem 2rem',
            boxSizing: 'border-box',
            borderRadius: '1rem',


        },

        userInfoCont: {
            width: '100%',
            boxSizing: 'border-box',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',



        },

        userName: {
            fontSize: '1.4rem',
            fontWeight: 'normal',
            color: themeVars.colors.accent.dark,


        },

        userEmail: {
            fontSize: '1.2rem',
            fontWeight: 'normal',
            color: themeVars.colors.accent.dark2,
            opacity: 0.7,
            borderRadius: '0.5rem',


        },

        userRoles: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: '1rem',

        },

        userRole: {
            fontSize: '1rem',
            fontWeight: 'normal',
            border:'1px solid ' +  themeVars.colors.accent.darkGreen,
            color: themeVars.colors.accent.darkGreen,
            padding: '0.2rem 0.8rem',
            borderRadius: '0.5rem',
            boxSizing: 'border-box',

        },

        noDataText: {

        },

        userNameEmail: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            gap: '0.5rem',
        },

        nameRole: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: '1rem',
        },

        userActionsCont: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            gap: '1rem',

        },

        inviteCont: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            gap: '1rem',
            flexGrow: 1,

        },

        inviteBtn: {
            backgroundColor: 'transparent',
            border: 'none',
            width: 'auto',
            fontSize: '1.2rem',
            color: themeVars.colors.accent.darkGreen,

            ':hover': {
                cursor: 'pointer',
                textDecoration: 'underline',
            }

        },



    }
)
