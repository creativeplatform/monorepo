import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Badge, useToken, useColorModeValue } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { Player } from '@livepeer/react';
import { useRouter } from 'next/router';
export default function CreativeCard() {
    const router = useRouter();
    const property = {
        playbackId: "b271joph1jvjfdsc",
        imageAlt: "Tesla Campaign",
        crtv: 40,
        apr: 18.78,
        brand: "Tesla",
        product: "Model Y",
        formattedPrice: "$79,900.00",
        reviewCount: 34,
        rating: 3
    };
    const [brand400, brand200] = useToken(
    // the key within the theme, in this case `theme.colors`
    "colors", 
    // the subkey(s), resolving to `theme.colors.red.100`
    ["brand.400", "brand.200"]);
    const goTo = () => {
        router.push('/details/1');
    };
    return (_jsxs(Box, Object.assign({ onClick: () => goTo(), maxW: "sm", minW: 'sm', margin: 5, borderWidth: "1px", rounded: "lg", overflow: "hidden", alignItems: "center", cursor: 'pointer', height: "511px", width: "full", boxShadow: `inset 0 4px 0 ${brand400}, 0 0 8px ${brand200}` }, { children: [_jsx(Player, { title: `${property.brand} - ${property.product}`, playbackId: property.playbackId, autoPlay: true, showTitle: true, muted: true, loop: true }), _jsxs(Box, Object.assign({ p: "6" }, { children: [_jsxs(Box, Object.assign({ display: "flex", alignItems: "baseline" }, { children: [_jsx(Badge, Object.assign({ rounded: "full", px: "2", color: brand400 }, { children: "New" })), _jsxs(Box, Object.assign({ color: "gray.500", fontWeight: "semibold", letterSpacing: "wide", fontSize: "xs", textTransform: "uppercase", ml: "2" }, { children: [property.crtv, " CRTV \u2022 ", property.apr, " % APR"] }))] })), _jsxs(Box, Object.assign({ mt: "1", fontWeight: "semibold", as: "h2", lineHeight: "tight", color: useColorModeValue("black", "white"), noOfLines: 1 }, { children: [property.brand, " - ", property.product] })), _jsxs(Box, Object.assign({ color: useColorModeValue("black", "white") }, { children: [property.formattedPrice, _jsx(Box, Object.assign({ as: "span", bgGradient: "linear(to-l, #7928CA, #e50168)", bgClip: "text", fontSize: "lg", fontWeight: "extrabold" }, { children: "\u00A0/ Prize Reward" }))] })), _jsxs(Box, Object.assign({ display: "flex", mt: "2", alignItems: "center" }, { children: [Array(5)
                                .fill("")
                                .map((_, i) => (_jsx(StarIcon, { color: i < property.rating ? "pink.500" : "gray.300" }, i))), _jsxs(Box, Object.assign({ as: "span", ml: "2", color: "gray.600", fontSize: "sm" }, { children: [property.reviewCount, " reviews"] }))] }))] }))] })));
}
