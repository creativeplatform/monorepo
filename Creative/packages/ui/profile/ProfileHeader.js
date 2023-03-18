import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
//import { CheckFollow } from "../../components/lens";
//import { EditProfile } from "../lens";
import { Box, Heading, Text, Image, chakra } from "@chakra-ui/react";
import { FaTwitter, FaConnectdevelop, FaUserAlt } from "react-icons/fa";

const filterAttributes = (attributes, key) => {
    return attributes.filter((attribute) => attribute.key === key);
};
export const ProfileHeader = ({ profile, balance, refetch, }) => {
    const { address } = useAccount();
    const [profilePic, setProfilePic] = useState(null);
    useEffect(() => {
        if (profile && profile.picture) {
            if (profile.picture.__typename === "NftImage") {
                setProfilePic(profile.picture.uri);
            }
            if (profile.picture.__typename === "MediaSet") {
                setProfilePic(profile.picture.original.url);
            }
        }
    }, [profile]);
    const checkLocation = () => {
        const location = filterAttributes(profile.attributes, "location");
        if (location[0])
            return location[0].value;
    };
    const checkTwitter = () => {
        const twitter = filterAttributes(profile.attributes, "twitter");
        if (twitter[0])
            return twitter[0].value;
    };
    const checkWebsite = () => {
        const website = filterAttributes(profile.attributes, "website");
        if (website[0])
            return website[0].value;
    };
    if (!profile)
        return (_jsx(Box, Object.assign({ margin: "auto", maxW: ["100%", "100%", "100%", "60%"], display: "flex", overflowX: "hidden", justifyContent: ["center", "center", "center", "space-evenly"], flexDir: ["column", "column", "column", "row"] }, { children: _jsx(chakra.h2, Object.assign({ color: "black", fontSize: "3xl", fontWeight: "bold" }, { children: "No user with this handle" })) })));
    return (_jsxs(Box, Object.assign({ margin: "auto", maxW: ["100%", "100%", "100%", "60%"], display: "flex", overflowX: "hidden", justifyContent: ["center", "center", "center", "space-evenly"], flexDir: ["column", "column", "column", "row"] }, { children: [_jsxs(Box, Object.assign({ display: "flex", flexDir: "column", marginTop: 30, marginRight: [0, 0, 0, 0], marginBottom: [10, 10, 10, 0], alignItems: "center", maxW: ["100%", "100%", "100%", "20%"], cursor: "cursor" }, { children: [profilePic ? (_jsx(Image, { borderRadius: "full", boxSize: "80px", src: profilePic, alt: profile.handle, marginBottom: [10, 10, 10, 5] })) : (_jsx(Box, Object.assign({ marginBottom: [10, 10, 10, 5] }, { children: _jsx(FaUserAlt, { size: 80 }) }))), _jsxs(chakra.h2, Object.assign({ color: "black", fontSize: "md", fontWeight: "medium" }, { children: ["@", profile.handle] })), profile.attributes && checkLocation() && (_jsx(Box, Object.assign({ display: "flex", fontSize: "sm", alignContent: "left", padding: 2, marginBottom: [10, 10, 10, 5] }, { children: _jsxs("span", Object.assign({ style: { display: "flex" } }, { children: [_jsx(FaConnectdevelop, {}), _jsx(Text, Object.assign({ marginLeft: 4 }, { children: checkLocation() }))] })) })))] })), _jsxs(Box, Object.assign({ maxW: ["100%", "100%", "100%", "80%"] }, { children: [_jsxs(Box, Object.assign({ margin: "auto", display: "flex", justifyContent: "space-between", flexDir: ["column", "column", "row", "row"], marginBottom: 20 }, { children: [_jsx(Box, Object.assign({ display: "flex", justifyContent: "space-between", flexDir: ["column", "column", "row", "row"] }, { children: _jsxs(Box, Object.assign({ marginBottom: [10, 10, 0, 0] }, { children: [_jsx(Box, Object.assign({ display: ["flex", "flex", "flex", "flex"] }, { children: _jsx(chakra.h2, Object.assign({ color: "black", fontSize: "xl", fontWeight: "medium" }, { children: profile.name })) })), profile.attributes && checkTwitter() && (_jsx(Box, Object.assign({ display: "flex", fontSize: "sm", alignContent: "left", padding: 2 }, { children: _jsxs("a", Object.assign({ href: `https://twitter.com/${checkTwitter()}`, target: "_blank", rel: "noreferrer noopener", style: { display: "flex" } }, { children: [_jsx(FaTwitter, {}), _jsx(Text, Object.assign({ marginLeft: 4 }, { children: checkTwitter() }))] })) }))), profile.attributes && checkWebsite() && (_jsx(Box, Object.assign({ display: "flex", fontSize: "sm", alignContent: "left", padding: 2 }, { children: _jsxs("a", Object.assign({ href: `${checkWebsite()}`, target: "_blank", rel: "noreferrer noopener", style: { display: "flex" } }, { children: [_jsx(FaConnectdevelop, {}), _jsx(Text, Object.assign({ marginLeft: 4 }, { children: checkWebsite() }))] })) })))] })) })), _jsxs(Box, { children: [_jsx(Box, Object.assign({ marginBottom: 5 }, { children: _jsx(Heading, { children: "Total Winnings" }) })), _jsxs(Box, { children: [_jsxs(Heading, Object.assign({ color: "red" }, { children: [balance, " USDC"] })), " "] })] })] })), _jsxs(Box, Object.assign({ margin: "auto", flexDir: ["column", "column", "row", "row"], marginBottom: 20 }, { children: [_jsx(Heading, { children: "Biography" }), _jsx(Text, Object.assign({ textAlign: "left", fontSize: "lg" }, { children: profile.bio }))] }))] }))] })));
};
