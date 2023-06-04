'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Link from 'next/link';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';

export default function History() {
	const [isLoading, setIsLoading] = useState(true);
	const [histories, setHistories] = useState([]);

	const getHistoriesApi = async () => {
		setIsLoading(true);
		try {
			const res = await axios.get('api/histories');
			setHistories(res.data);
		} catch (e) {
			alert(e.message);
		}
		setIsLoading(false);
	};

	useEffect(() => {
		getHistoriesApi();
	}, []);

	return (
		<>
			<div className="d-flex justify-content-center align-items-center pt-3">
				<Link className="btn btn-primary text-white px-3 py-2 mx-2" href="/">
					Go Back
				</Link>
				<h1 className='mb-0'>Spinner History (Last 10)</h1>
			</div>
			{isLoading && (
				<Spinner animation="border" role="status">
					<span className="visually-hidden">Loading...</span>
				</Spinner>
			)}
			<div className="text-center d-flex justify-content-center pt-3">
				<div style={{ height: 500, overflowY: 'auto' }}>
					<Table striped bordered hover responsive>
						<thead>
							<tr>
								<th>Name</th>
								<th>Type</th>
								<th>Remove At</th>
							</tr>
						</thead>
						<tbody>
							{histories.map((v, i) => (
								<tr key={i}>
									<td>{v.name}</td>
									<td>{v.type}</td>
									<td>{new Date(v.createdAt).toDateString()}</td>
								</tr>
							))}
						</tbody>
					</Table>
				</div>
			</div>
		</>
	);
}
