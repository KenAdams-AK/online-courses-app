import CourseCard from "./CourseCard";
import Pagination from "./Pagination";
import { Course } from "../models/coursesPreviewModel";
import { usePagination } from "../hooks/usePagination";

type Props = {
	courses: Course[];
};

export default function CoursesList(props: Props) {
	const { courses } = props;
	const { coursesPerPage, currentPage, setCurrentPage, currentCourses } =
		usePagination(courses, 10, 1);

	return (
		<>
			<ul className="CoursesList__list">
				{currentCourses.map((course) => (
					<li className="CoursesList__item" key={course.id}>
						<CourseCard course={course} />
					</li>
				))}
			</ul>
			<Pagination
				totalCourses={courses.length}
				coursesPerPage={coursesPerPage}
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
			/>
		</>
	);
}
