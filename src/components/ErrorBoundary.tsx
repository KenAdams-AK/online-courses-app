import { Component, ErrorInfo, ReactNode } from "react";

type Props = {
	children: ReactNode;
};

type State = {
	hasError: boolean;
};

class ErrorBoundary extends Component<Props, State> {
	state: State = {
		hasError: false,
	};

	static getDerivedStateFromError(_: Error): State {
		return {
			hasError: true,
		};
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
		console.error("Uncaught error: ", error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			return (
				<div className="ErrorBoundary__container">
					<h3 className="ErrorBoundary__title">Sorry... there was an error.</h3>
					<button
						className="ErrorBoundary__button"
						type="button"
						onClick={() => location.reload()}
					>
						Reload the page
					</button>
					<button
						className="ErrorBoundary__button"
						type="button"
						onClick={() => window.location.replace("/")}
					>
						Back to home page
					</button>
				</div>
			);
		}
		return this.props.children;
	}
}

export default ErrorBoundary;
