import { Link } from "react-router-dom";

type Props = {
	totalCourses: number;
	coursesPerPage: number;
	setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
	currentPage: number;
};

export default function Pagination(props: Props) {
	const { totalCourses, coursesPerPage, currentPage, setCurrentPage } = props;
	const pages: number[] = [];

	for (let i = 1; i <= Math.ceil(totalCourses / coursesPerPage); i++) {
		pages.push(i);
	}

	return (
		<div className="Pagination">
			{pages.map((page, idx) => (
				<Link
					to={idx === 0 ? "/" : `page/${page}`}
					key={idx}
					onClick={() => setCurrentPage(page)}
					className={
						page === currentPage
							? "Pagination__link active"
							: "Pagination__link"
					}
				>
					{page}
				</Link>
			))}
		</div>
	);
}
