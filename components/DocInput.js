import Input from "./Input";
import styles from '../styles/DocInput.module.css';
import TextArea from "./TextArea";
import Button from "./Button";
import { useState } from 'react';

export default function DocInput({
	saveDoc,
	deleteDoc,
	initialMode,
	initialName = '',
	initialPath = '',
	initialDesc = '',
	initialAttr = []
}) {
	const [mode, setMode] = useState(initialMode);
	const [name, setName] = useState(initialName);
	const [path, setPath] = useState(initialPath);
	const [desc, setDesc] = useState(initialDesc);
	const [attr, setAttr] = useState(initialAttr);

	const handleChangeState = () => {
		setMode(prev => {
			if (prev == 'mut') return 'imut';
			else return 'mut';
		})
		saveDoc({
			name,
			path,
			desc,
			attr,
			mode: 'imut'
		});
	}

	const handleEditDoc = () => { }

	return (
		<div className={`${styles.docInput} ${styles[mode]}`}>
			<Input
				placeholder="Doc Name"
				value={initialName}
				onChange={e => setName(e.target.value)}
				disabled={mode == 'imut'}
			/>
			<div className={styles.pathInput}>
				<span>/</span>
				<Input
					placeholder="Path"
					value={path}
					onChange={e => setPath(e.target.value)}
					disabled={mode == 'imut'}
				/>
			</div>
			<TextArea
				placeholder="Description"
				value={desc}
				onChange={e => setDesc(e.target.value)}
				disabled={mode == 'imut'}
			/>
			<div className={styles.controls}>
				{mode == 'imut'
					? (
						<>
							<Button color="gray" onClick={handleEditDoc}>Edit</Button>
							<Button color="gray" onClick={deleteDoc}>Delete</Button>
						</>
					)
					: (
						<Button onClick={handleChangeState}>Save</Button>
					)
				}
			</div>
		</div>
	);
}