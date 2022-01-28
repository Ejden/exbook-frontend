import { Store } from "vuex";
import { IRootState } from "./store"

declare module "@vue/runtime-core" {
    interface ComponentCustomProperties {
        $store: Store<IRootState>
    }
}

declare module "vuex" {
    export function useStore(key?: string): Store<State>
}
