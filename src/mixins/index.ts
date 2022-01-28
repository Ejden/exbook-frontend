import router from "@/router";
import { Route } from "vue-router";

async function goToHomePage(): Promise<Route> {
    return router.push('/');
}

export { goToHomePage };
