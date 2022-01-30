import { Store } from "vuex";
import { getModule } from "vuex-module-decorators";
import UserModule from '@/store/modules/user-store/user-store';

let userModuleStore: UserModule;

function initializeStores(store: Store<any>): void {
    userModuleStore = getModule(UserModule, store);
}

export { initializeStores, userModuleStore };
