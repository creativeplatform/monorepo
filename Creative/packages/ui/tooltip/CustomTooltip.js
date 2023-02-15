import { jsx as _jsx } from "react/jsx-runtime";
import { Tooltip } from '@chakra-ui/react';
export const CustomToolTip = (message, position) => (_jsx(Tooltip, { label: message, "aria-label": message, placement: position }));
