import OverlayFallback from "./OverlayFallback";
import ReactPlayer, { ReactPlayerProps } from "react-player";
import { useEffect, useRef, useState } from "react";
import { imageErrorHandler } from "../helpers/imageErroHandler";

interface IProps extends ReactPlayerProps {
	videoUrl: string;
	videoStartPoint?: number;
	previewImageUrl?: string;
}

export default function ReactPlayerContainer(props: IProps) {
	const { videoUrl, videoStartPoint, previewImageUrl, ...restProps } = props;
	const [fallbackState, setFallbackState] = useState(false);
	const playerRef = useRef<ReactPlayer>(null);

	useEffect(() => {
		if (!videoStartPoint) return;
		if (playerRef.current) {
			playerRef.current.seekTo(videoStartPoint, "seconds");
		}
	}, [videoStartPoint]);

	return (
		<div className="ReactPlayerContainer">
			{fallbackState ? (
				<OverlayFallback
					isActive={fallbackState}
					content="Failure to load video..."
				/>
			) : null}
			<ReactPlayer
				ref={playerRef}
				className="ReactPlayerContainer__react-player"
				url={videoUrl}
				width="100%"
				height="100%"
				pip
				onError={(error) => {
					setFallbackState(true);
					console.warn("Failure to load video: ", error);
				}}
				light={
					previewImageUrl ? (
						<img
							src={previewImageUrl}
							alt="Thumbnail"
							onError={imageErrorHandler}
						/>
					) : (
						false
					)
				}
				config={{
					file: {
						attributes: {
							preload: "none",
						},
					},
				}}
				{...restProps}
			/>
		</div>
	);
}
