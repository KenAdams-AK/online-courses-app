type Props = {
	isActive: boolean;
	content: string;
};

export default function OverlayFallback(props: Props) {
	const { isActive, content } = props;

	if (!isActive) return null;

	return (
		<div className="OverlayFallback">
			<span>{content}</span>
		</div>
	);
}
