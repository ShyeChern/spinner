'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import SpinnerWheel from '@/components/spinnerWheel';
import LoginModal from '@/components/modal/loginModal';
import AddItemModal from '@/components/modal/addItemModal';
import ResultModal from '@/components/modal/resultModal';

export default function Home() {
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState('');
	const [isLogin, setIsLogin] = useState(false);
	const [showLoginModal, setShowLoginModal] = useState(false);
	const [showAddItemModal, setShowAddItemModal] = useState(false);
	const [showResultModal, setShowResultModal] = useState(false);
	const [bucketList, setBucketList] = useState([]);
	const [wheelSegment, setWheelSegment] = useState([]);
	const [spinnerWheelResult, setSpinnerWheelResult] = useState({});

	const onFinished = async (result) => {
		const found = bucketList.find((v) => v.name === result);
		if (found) {
			setSpinnerWheelResult(found);
			setShowResultModal(true);
		}
	};

	const login = async (password) => {
		try {
			setError('');
			await axios.post('api/login', { password });
			setIsLogin(true);
		} catch (e) {
			setIsLogin(false);
			setError(e.response.data);
		}
		setIsLoading(false);
	};

	const getBucketListApi = async () => {
		setIsLoading(true);
		try {
			const res = await axios.get('api/bucket-lists');
			setBucketList(res.data);
			setWheelSegment(res.data.map((v) => v.name));
		} catch (e) {
			alert(e.message);
		}
		setIsLoading(false);
	};

	useEffect(() => {
		login();
	}, []);

	useEffect(() => {
		if (isLogin) {
			getBucketListApi();
		} else {
			setShowLoginModal(true);
		}
	}, [isLogin]);

	return (
		<>
			<main>
				<div className="text-center d-flex justify-content-center flex-wrap">
					{isLoading ? (
						<div className="text-center py-5" style={{ width: 400, height: 400 }}>
							<Spinner animation="border" role="status">
								<span className="visually-hidden">Loading...</span>
							</Spinner>
						</div>
					) : (
						<SpinnerWheel
							segments={wheelSegment}
							isReady={isLogin}
							onFinished={(winner) => onFinished(winner)}
						/>
					)}
					{isLogin && (
						<div className="align-self-center">
							<div className="d-flex flex-column gx-2">
								<Button className="text-white px-3 py-2" onClick={() => setShowAddItemModal(true)}>
									Add Item
								</Button>
								<Link className="btn btn-primary text-white px-3 py-2 mt-2" href="/histories">
									History
								</Link>
							</div>
							<AddItemModal
								show={showAddItemModal}
								setShow={setShowAddItemModal}
								refreshSpinnerWheel={getBucketListApi}
							/>
							<ResultModal
								show={showResultModal}
								setShow={setShowResultModal}
								refreshSpinnerWheel={getBucketListApi}
								result={spinnerWheelResult}
							/>
						</div>
					)}
				</div>
			</main>

			{!isLoading && !isLogin && (
				<LoginModal show={showLoginModal} setShow={setShowLoginModal} error={error} login={login} />
			)}
		</>
	);
}
