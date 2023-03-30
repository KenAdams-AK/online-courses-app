import ScrollToTop from "./components/ScrollToTop";
import CourseDetailsPage from "./pages/CourseDetailsPage";
import CoursesPreviewPage from "./pages/CoursesPreviewPage";
import { DOMRouts } from "./routs/domRouts";
import { Navigate, Route, Routes } from "react-router";

export default function App() {
	return (
		<ScrollToTop>
			<Routes>
				<Route
					path={DOMRouts.COURSES_PREVIEW_PAGE_HOME}
					element={<CoursesPreviewPage />}
				>
					<Route
						path={DOMRouts.COURSES_PREVIEW_PAGE_PAGINATED}
						element={<CoursesPreviewPage />}
					/>
				</Route>
				<Route
					path={DOMRouts.COURSE_DETAILS_PAGE}
					element={<CourseDetailsPage />}
				/>
				<Route path="*" element={<Navigate to={"/"} />} />
			</Routes>
		</ScrollToTop>
	);
}
