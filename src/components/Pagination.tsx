import { useCallback, useEffect, useRef } from "react";

type Props = {
	totalCourses: number;
	coursesPerPage: number;
	setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
	currentPage: number;
};

export default function Pagination(props: Props) {
	const { totalCourses, coursesPerPage, currentPage, setCurrentPage } = props;
	const paginationRef = useRef<HTMLDivElement>(null);
	const pages: number[] = [];

	for (let i = 1; i <= Math.ceil(totalCourses / coursesPerPage); i++) {
		pages.push(i);
	}

	const scrollToBottom = useCallback(() => {
		paginationRef.current?.scrollIntoView();
	}, []);

	useEffect(() => {
		if (!paginationRef.current) return;
		scrollToBottom();
	}, [currentPage]);

	return (
		<div className="Pagination" ref={paginationRef}>
			{pages.map((page, idx) => (
				<button
					key={idx}
					onClick={() => setCurrentPage(page)}
					className={
						page === currentPage
							? "Pagination__button active"
							: "Pagination__button"
					}
				>
					{page}
				</button>
			))}
		</div>
	);
}
