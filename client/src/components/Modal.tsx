import { ReactNode, useEffect, useRef, MouseEvent, CSSProperties } from 'react';

type ModalProps = {
	isOpen: boolean;
	onClose?: () => void;
	onOpen?: (dialogRef: HTMLDialogElement | null) => void;
	children: ReactNode;
	style?: CSSProperties
};

export const Modal = ({
	style,
	isOpen,
	onClose,
	onOpen,
	children
}: ModalProps) => {
	const dialogRef = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog) return;

		if (isOpen) {
			dialog.showModal();
			onOpen?.(dialog);
		} else {
			dialog.close();
		}
	}, [isOpen, onOpen]);

	useEffect(() => {
		if (!isOpen) return undefined;

		document.body.style.overflow = 'hidden';

		return () => {
			document.body.style.overflow = '';
		};
	}, [isOpen]);

	return (
		<dialog
			onCancel={(event) => {
				event.preventDefault();
				onClose?.();
			}}
			onClick={(event: MouseEvent<HTMLDialogElement>) => {
				if (event.target === dialogRef.current) onClose?.();
			}}
			ref={dialogRef}
			style={{
				alignItems: 'center',
				background: 'transparent',
				border: 'none',
				borderRadius: style?.borderRadius,
				color: 'inherit',
				display: 'flex',
				inset: 0,
				justifyContent: 'center',
				margin: 'auto',
				padding: '0px',
				position: 'fixed'
			}}
		>
			<style>{`
				dialog::backdrop {
					background: rgba(0,0,0,0.5);
					backdrop-filter: blur(4px);
				}
			`}</style>

			{isOpen ? (
				<div
					onClick={(event) => event.stopPropagation()}
					style={{
						...style,
						minWidth: '300px',
						padding: '20px',
						position: 'relative'
					}}
				>
					<button
						aria-label="Close modal"
						onClick={() => {
							dialogRef.current?.close();
							onClose?.();
						}}
						style={{
							background: 'transparent',
							border: 'none',
							color: 'inherit',
							cursor: 'pointer',
							fontSize: '1.25rem',
							position: 'absolute',
							right: '10px',
							top: '0px'
						}}
					>
						&times;
					</button>
					{children}
				</div>
			) : null}
		</dialog>
	);
};
