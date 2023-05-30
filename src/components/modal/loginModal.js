import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

export default function LoginModal({ show, setShow, error, login }) {
	const [password, setPassword] = useState('');

	return (
		<Modal show={show} onHide={() => setShow(false)} backdrop="static" keyboard={false} centered>
			<Modal.Header>
				<Modal.Title>Login</Modal.Title>
			</Modal.Header>
			<Form
				onSubmit={(e) => {
					e.preventDefault();
					login(password);
					setPassword('');
				}}
			>
				<Modal.Body>
					{error && <Alert variant={'danger'}>{error}</Alert>}
					<Form.Group className="mb-3" controlId="formBasicPassword">
						<Form.Label>Password</Form.Label>
						<Form.Control
							type="password"
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="primary" type="submit" className="text-white">
						Login
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	);
}
