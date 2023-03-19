import { SyntheticEvent } from "react";

export function imageErrorHandler (e: SyntheticEvent<HTMLImageElement>) {
  const fallbackImage: string = new URL('../assets/imgs/fallback-image.png', import.meta.url).href

			if (fallbackImage) {
				e.currentTarget.src = fallbackImage;
			}
		}