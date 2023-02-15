import {currentUserApi} from "../util/api/current-user-api";

export const actions = (set: any) => ({
    getUser: async () => {
        const response = await currentUserApi();
        if (response.type === 'success'){
            const data = response.data;
            const name = data.firstName;
            const email = data.email;
            const id = data.id;
            const roles = data.roles;
            set({ user: { name, email, id, roles } });
        }
    },
});
