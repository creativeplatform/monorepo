import { configureSIWE } from "connectkit-next-siwe";
import { SIWE_SESSION_SECRET } from "../../../utils/config";

export const siwe = configureSIWE({
    session: { password: SIWE_SESSION_SECRET },
    apiRoutePrefix: "/api/siwe",
});