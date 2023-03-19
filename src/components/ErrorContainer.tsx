type Props = {
	error: string;
};

export default function ErrorContainer(props: Props) {
	const { error } = props;

	return <div className="ErrorContainer">{error}...</div>;
}
