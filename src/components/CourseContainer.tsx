import LessonsList from "./LessonsList";
import LessonContainer from "./LessonContainer";
import { CourseDetails } from "../models/courseDetailsModel";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { setVideosProgressStorage } from "../redux/slices/videosProgressSlice";

type Props = {
	course: CourseDetails;
};

export default function CourseContainer(props: Props) {
	const { course } = props;
	const dispatch = useAppDispatch();
	const { videosProgresStorage } = useAppSelector(
		(state) => state.videosProgress
	);
	const [videosProgressStorageLS, setVideosProgressStorageLS] =
		useLocalStorage<Record<string, number> | null>(
			"videos-progress-storage",
			null,
			3600
		);
	const firstLesson = course.lessons[0];

	useEffect(() => {
		if (videosProgressStorageLS == null) return;
		dispatch(setVideosProgressStorage(videosProgressStorageLS));
	}, []);

	useEffect(() => {
		if (videosProgresStorage == null) return;
		setVideosProgressStorageLS(videosProgresStorage);
	}, [videosProgresStorage]);

	return (
		<>
			<div className="CourseContainer">
				<h1 className="CourseContainer__title">{course.title}</h1>
				<p className="CourseContainer__desc">{course.description}</p>
				<LessonContainer lesson={firstLesson} isFirstLesson={true} />
				<LessonsList lessons={course.lessons} />
			</div>
		</>
	);
}
