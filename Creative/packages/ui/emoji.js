import { jsx as _jsx } from "react/jsx-runtime";
export const Emoji = (props) => (_jsx("span", Object.assign({ className: "emoji", role: "img", "aria-label": props.label ? props.label : "", "aria-hidden": props.label ? "false" : "true" }, { children: props.symbol })));
