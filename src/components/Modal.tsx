import ReactDOM from "react-dom";
import { MouseEventHandler, ReactNode, useEffect, useMemo } from "react";

type Props = {
	isOpen: boolean;
	handleClose: MouseEventHandler<HTMLElement>;
	children: ReactNode;
};

export default function Modal(props: Props) {
	const { isOpen, handleClose, children } = props;

	if (!isOpen) return null;

	const containerElement = useMemo(
		() => document.querySelector("#modal-root"),
		[]
	);
	const bodyElement = useMemo(() => document.querySelector("body"), []);

	useEffect(() => {
		if (bodyElement == null) return;
		bodyElement.classList.add("modal-active");
		return () => bodyElement.classList.remove("modal-active");
	}, []);

	return ReactDOM.createPortal(
		<div className="Modal__overlay" onClick={handleClose}>
			<button
				className="Modal__close-button"
				type="button"
				onClick={handleClose}
			>
				&times;
			</button>
			<div
				className="Modal__body"
				onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
			>
				{children}
			</div>
		</div>,
		containerElement as HTMLDivElement
	);
}
