import { createContext } from "react";
import type translations from "./en.json";

interface TContext {
	messages: typeof translations;
}

export const IntlContext = createContext<TContext>({} as TContext);
