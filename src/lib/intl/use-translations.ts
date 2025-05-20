"use client";

import { get } from "lodash-es";
import { useCallback, useContext } from "react";
import { IntlContext } from "./intl-context";

/**
 * Returns a function that can be used to translate a string.
 *
 * This is only for mocking purposes.
 */
export function useTranslations(base?: string) {
	const { messages } = useContext(IntlContext);

	/**
	 * When there is a `base` attribute given, we are scope all translations to
	 * that.
	 */
	return useCallback(
		(str: string) => get(messages, base ? `${base}.${str}` : str),
		[base, messages],
	);
}
