import { cn } from "@/lib/utils";
import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";

const inputVariants = cva(
	"flex w-full rounded-md border border-input bg-background text-base ring-offset-background file:border-0 file:bg-transparent file:font-medium file:text-foreground file:text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
	{
		variants: {
			size: {
				default: "h-10 px-3 py-2",
				sm: "h-10 px-3 py-2",
			},
		},

		defaultVariants: { size: "default" },
	},
);

type NativeInputProps = React.ComponentProps<"input">;
type VariantInputProps = VariantProps<typeof inputVariants>;

const Input = React.forwardRef<
	HTMLInputElement,
	Omit<NativeInputProps, keyof VariantInputProps> & VariantInputProps
>(({ className, type, size, ...props }, ref) => {
	return (
		<input
			type={type}
			className={cn(inputVariants({ size, className }))}
			ref={ref}
			{...props}
		/>
	);
});

Input.displayName = "Input";

export { Input };
