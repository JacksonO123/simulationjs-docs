import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialOceanic } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import styles from '../styles/Code.module.css';

export default function Code({ children }) {

	const customStyles = {
		borderRadius: 6,
		minWidth: 250,
		margin: 0,
	};

	return (
		<div className={styles.code}>
			<SyntaxHighlighter language="javascript" style={materialOceanic} customStyle={customStyles}>
				{children}
			</SyntaxHighlighter>
		</div>
	);
}
