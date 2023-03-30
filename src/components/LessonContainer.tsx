import ReactPlayerContainer from "./ReactPlayerContainer";
import PlayIcon from "./PlayIcon";
import OverlayFallback from "./OverlayFallback";
import Modal from "./Modal";
import { Lesson } from "../models/courseDetailsModel";
import { imageErrorHandler } from "../helpers/imageErroHandler";
import { memo, useCallback, useRef, useState } from "react";
import { useAppDispatch } from "../redux/store";
import {
	IVideoProgress,
	updateVideosProgressStorage,
} from "../redux/slices/videosProgressSlice";

type Props = {
	lesson: Lesson;
	isFirstLesson?: boolean;
	currentVideoProgress: number;
};

function LessonContainer(props: Props) {
	const { lesson, isFirstLesson, currentVideoProgress } = props;
	const dispatch = useAppDispatch();
	const [openModal, setOpenModal] = useState<boolean>(false);
	const playedSeconds = useRef<number>(0);
	const previewImageLink = `${lesson.previewImageLink}/lesson-${lesson.order}.webp`;
	const isLocked = lesson.status === "locked";

	const handleOpenModal = useCallback(() => {
		if (isLocked || !lesson.link) return;
		setOpenModal(true);
	}, []);

	const handleCloseModal = useCallback(() => {
		setOpenModal(false);
		const newVideoProgress: IVideoProgress = {
			lessonId: lesson.id,
			startPoint: playedSeconds.current,
		};
		dispatch(updateVideosProgressStorage(newVideoProgress));
	}, []);

	const lessonDesc = (
		<div className="LessonContainer__desc">
			<div className="LessonContainer__number">Lesson &#x23;{lesson.order}</div>
			<h2 className="LessonContainer__title">{lesson.title}</h2>
		</div>
	);

	return (
		<>
			<div
				className={
					isFirstLesson ? "LessonContainer first-lesson" : "LessonContainer"
				}
				onClick={handleOpenModal}
			>
				<div className="LessonContainer__image-wrapper">
					<OverlayFallback isActive={isLocked} content="Locked" />
					<img
						src={previewImageLink}
						className="LessonContainer__image"
						alt="Image"
						onError={imageErrorHandler}
					/>
					{lesson.link ? <PlayIcon /> : null}
				</div>
				{lessonDesc}
			</div>
			{openModal ? (
				<Modal isOpen={openModal} handleClose={handleCloseModal}>
					{lessonDesc}
					<ReactPlayerContainer
						videoStartPoint={
							currentVideoProgress >= 3
								? currentVideoProgress - 3
								: currentVideoProgress
						}
						videoUrl={lesson.link}
						controls
						playing
						onProgress={(progress) => {
							playedSeconds.current = progress.playedSeconds;
						}}
					/>
				</Modal>
			) : null}
		</>
	);
}

function areEqual(prevProps: Props, nextProps: Props): boolean {
	return prevProps.currentVideoProgress !== nextProps.currentVideoProgress
		? false
		: true;
}

export default memo(LessonContainer, areEqual);
