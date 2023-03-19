import LoaderFallback from "../components/LoaderFallback";
import ErrorContainer from "../components/ErrorContainer";
import CourseContainer from "../components/CourseContainer";
import { useParams } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { CourseDetails } from "../models/courseDetailsModel";
import { useEffect } from "react";
import {
	fetchCourseDetails,
	setCourseDetails,
} from "../redux/slices/courseDetailsSlice";
import { TIME_TO_LIVE } from "../constants/TTL";

type CourseDetailsParams = {
	id: string;
};

export default function CourseDetailsPage() {
	const { id } = useParams<CourseDetailsParams>();
	const dispatch = useAppDispatch();
	const { isLoading, error, courseDetails } = useAppSelector(
		(state) => state.courseDetails
	);
	const [currentCourseLS, setCurrentCourseLS] =
		useLocalStorage<CourseDetails | null>(
			"current-course",
			null,
			TIME_TO_LIVE.currentCourse
		);

	useEffect(() => {
		if (!id) return;
		if (id === currentCourseLS?.id) {
			// Setting up the current course from Local Storage to Redux store on page reload otherwise sending request
			dispatch(setCourseDetails(currentCourseLS));
			return;
		}
		const promise = dispatch(fetchCourseDetails(id));

		return () => promise.abort();
	}, [id]);

	useEffect(() => {
		if (!courseDetails) return;
		setCurrentCourseLS(courseDetails);
	}, [courseDetails]);

	return (
		<main className="CourseDetailsPage__container">
			{error ? <ErrorContainer error={error} /> : null}
			{isLoading ? (
				<LoaderFallback />
			) : courseDetails ? (
				<CourseContainer course={courseDetails} />
			) : null}
		</main>
	);
}
