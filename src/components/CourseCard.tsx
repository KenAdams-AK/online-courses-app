import ReactPlayerContainer from "./ReactPlayerContainer";
import { Link } from "react-router-dom";
import { Course } from "../models/coursesPreviewModel";
import { MouseEventHandler, useCallback } from "react";

type Props = {
	course: Course;
};

export default function CourseCard(props: Props) {
	const { course } = props;
	const previewImageLink = `${course.previewImageLink}/cover.webp`;
	const videoLink = course.meta.courseVideoPreview?.link;
	let timeOut: ReturnType<typeof setTimeout>;

	const mouseEnterHandler: MouseEventHandler<HTMLDivElement> = useCallback(
		(e) => {
			const currentTarget = e.currentTarget;
			const video = currentTarget.querySelector("video");
			if (video == null) return;
			video.play();
			const img = currentTarget.querySelector("img");
			if (img != null) {
				timeOut = setTimeout(() => {
					img.style.opacity = "0";
				}, 800);
			}
		},
		[]
	);

	const mouseOutHandler: MouseEventHandler<HTMLDivElement> = useCallback(
		(e) => {
			clearTimeout(timeOut);
			const currentTarget = e.currentTarget;
			const video = currentTarget.querySelector("video");
			if (video != null) video.pause();
		},
		[]
	);

	return (
		<div className="CourseCard__card">
			<Link to={`courses/${course.id}`} className="CourseCard__link">
				<div
					className="CourseCard__media media"
					onMouseEnter={mouseEnterHandler}
					onMouseOut={mouseOutHandler}
				>
					<img src={previewImageLink} alt="Image" className="media__image" />
					<ReactPlayerContainer
						videoUrl={videoLink!}
						previewImageUrl={videoLink ? undefined : previewImageLink}
						muted
						loop
						playIcon={<button />}
					/>
				</div>
				<div className="CourseCard__desc desc">
					<h2 className="desc__title">{course.title}</h2>
					<div className="desc__lessons-count">
						<span>Lessons count: </span>
						{course.lessonsCount}
					</div>
					{course.meta.skills ? (
						<div className="desc__skills skills">
							<ul className="skills__list">
								<span>Skills:</span>
								{course.meta.skills.map((skill, idx) => (
									<li key={idx} className="skills__item">
										&#8211; {skill}
									</li>
								))}
							</ul>
						</div>
					) : (
						<div className="skills"></div>
					)}
					<div className="desc__rating">
						<span>Rating: </span>
						{course.rating}
					</div>
				</div>
			</Link>
		</div>
	);
}
