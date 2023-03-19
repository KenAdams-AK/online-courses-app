import CoursesList from "../components/CoursesList";
import ErrorContainer from "../components/ErrorContainer";
import LoaderFallback from "../components/LoaderFallback";
import { Course } from "../models/coursesPreviewModel";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import {
	fetchCoursesPreview,
	setCourses,
} from "../redux/slices/coursesPreviewSlice";
import { TIME_TO_LIVE } from "../constants/TTL";

export default function CoursesPreviewPage() {
	const dispatch = useAppDispatch();
	const { isLoading, error, courses } = useAppSelector(
		(state) => state.coursesPreview
	);
	const [coursesLS, setCoursesLS] = useLocalStorage<Course[]>(
		"courses",
		[],
		TIME_TO_LIVE.coursesPreview
	);

	useEffect(() => {
		if (coursesLS?.length) {
			// Setting up the courses from Local Storage to Redux store on page initial load otherwise sending request to get the courses from server
			dispatch(setCourses(coursesLS));
			return;
		}
		const promise = dispatch(fetchCoursesPreview());
		return () => promise.abort();
	}, []);

	useEffect(() => {
		if (courses.length) {
			setCoursesLS(courses);
		}
	}, [courses]);

	return (
		<main className="CoursesPreviewPage__container">
			<h1 className="CoursesPreviewPage__title">Courses</h1>
			{isLoading ? <LoaderFallback /> : null}
			{error ? <ErrorContainer error={error} /> : null}
			<CoursesList courses={courses} />
		</main>
	);
}
