import LessonContainer from "./LessonContainer";
import { Lesson } from "../models/courseDetailsModel";
import { useAppSelector } from "../redux/store";

type Props = {
	lessons: Lesson[];
};

export default function LessonsList(props: Props) {
	const { lessons } = props;
	const { videosProgresStorage } = useAppSelector(
		(state) => state.videosProgress
	);

	return (
		<ul className="LessonsList__list">
			{[...lessons]
				.sort((a, b) => a.order - b.order)
				.map((lesson, idx) => {
					if (idx === 0) return null;
					return (
						<li key={lesson.id} className="LessonsList__item">
							<LessonContainer
								lesson={lesson}
								currentVideoProgress={
									videosProgresStorage != null
										? videosProgresStorage[lesson.id]
										: 0
								}
							/>
						</li>
					);
				})}
		</ul>
	);
}
