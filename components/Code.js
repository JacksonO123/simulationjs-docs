import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialOceanic } from 'react-syntax-highlighter/dist/cjs/styles/prism';

export default function Code({ children }) {

	const styles = {
		borderRadius: 6,
		minWidth: 250
	};

	return (
		<SyntaxHighlighter language="javascript" style={materialOceanic} customStyle={styles}>
			{children}
		</SyntaxHighlighter>
	);
}