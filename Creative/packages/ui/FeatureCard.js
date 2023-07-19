import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, Flex, Heading, Stack, Text } from "@chakra-ui/react";
export default function FeatureCard({ step, title, description }) {
    return (_jsx(Card, Object.assign({ px: 8, py: 10 }, { children: _jsxs(Stack, Object.assign({ spacing: 8 }, { children: [_jsxs(Flex, Object.assign({ flexDirection: "row", alignItems: "center" }, { children: [_jsx(Text, Object.assign({ fontSize: "large", mr: 4 }, { children: step })), _jsx(Heading, Object.assign({ fontSize: "2xl" }, { children: title }))] })), _jsx(Text, Object.assign({ fontSize: "large", ml: 10 }, { children: description }))] })) })));
}
;
