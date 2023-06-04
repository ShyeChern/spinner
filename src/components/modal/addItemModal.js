import { useState } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
const defaultType = 'Food';

export default function AddItemModal({ show, setShow, refreshSpinnerWheel }) {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	const [item, setItem] = useState('');
	const [type, setType] = useState(defaultType);

	const addItem = async () => {
		setIsLoading(true);
		try {
			if (!type || !item) {
				setError('Please input all the field');
				return;
			}
			setError('');
			await axios.post('api/bucket-lists', { type, item });
			setItem('');
			setType(defaultType);
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
			<Form
				onSubmit={(e) => {
					e.preventDefault();
					addItem();
				}}
			>
				<Modal.Body>
					{error && <Alert variant={'danger'}>{error}</Alert>}
					<Form.Group className="mb-3" controlId="item">
						<Form.Label>Item</Form.Label>
						<Form.Control
							type="text"
							placeholder="Item"
							value={item}
							onChange={(e) => setItem(e.target.value)}
						/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="type">
						<Form.Label>Type</Form.Label>
						<Form.Select value={type} onChange={(e) => setType(e.target.value)}>
							<option value={'Food'}>Food</option>
							<option value={'Place'}>Place</option>
						</Form.Select>
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => setShow(false)} disabled={isLoading}>
						Close
					</Button>
					<Button variant="primary" type="submit" className="text-white" disabled={isLoading}>
						{isLoading ? (
							<Spinner animation="border" role="status">
								<span className="visually-hidden">Loading...</span>
							</Spinner>
						) : (
							'Add'
						)}
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	);
}
