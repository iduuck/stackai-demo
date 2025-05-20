"use client";

import type { PropsWithChildren } from "react";
import messages from "./en.json";
import { IntlContext } from "./intl-context";

export function IntlProvider(props: PropsWithChildren) {
	return (
		<IntlContext.Provider value={{ messages }}>
			{props.children}
		</IntlContext.Provider>
	);
}
