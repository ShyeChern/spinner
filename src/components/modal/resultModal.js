import { useState } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

export default function ResultModal({ show, setShow, refreshSpinnerWheel, result }) {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');

	const deleteItem = async () => {
		setIsLoading(true);
		try {
			setError('');
			await axios.delete(`api/bucket-lists/${result._id}`);
			await refreshSpinnerWheel();
			setShow(false);
		} catch (e) {
			setError(e.message);
		}
		setIsLoading(false);
	};

	return (
		<Modal show={show} onHide={() => setShow(false)} backdrop="static" keyboard={false} centered>
			<Modal.Header>
				<Modal.Title>Add Item</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{error && <Alert variant={'danger'}>{error}</Alert>}
				Result: {result.name}
			</Modal.Body>
			<Modal.Footer>
				<Button
					variant="primary"
					className="text-white"
					onClick={() => deleteItem()}
					disabled={isLoading}
				>
					{isLoading ? (
						<Spinner animation="border" role="status">
							<span className="visually-hidden">Loading...</span>
						</Spinner>
					) : (
						'Remove'
					)}
				</Button>
			</Modal.Footer>
		</Modal>
	);
}
