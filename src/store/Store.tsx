import create from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";
import { actions } from "./UserActions";
import { devtools } from "zustand/middleware";


const useStore = create(
    devtools((set: any) => ({
        user: {
            email: "",
            id: "",
            name: "",
            roles: {
                user: false,
                admin: false,
                manager: false,
                'dp-manager': false,
                'data-analyst': false,
            },
        },
        ...actions(set),
    }))
);

if (process.env.NODE_ENV === "development") {
    mountStoreDevtool("Store", useStore as any);
}

export default useStore;
