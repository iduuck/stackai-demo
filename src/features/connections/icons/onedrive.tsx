
import Image from "next/image";
import type { ConnectionIconProps } from "./types";

export function ConnectionIconOneDrive(props: ConnectionIconProps) {
  return (
    <Image src="/brand-icons/onedrive.svg" width={32} height={32} alt="OneDrive Logo" {...props} />
  )
}
