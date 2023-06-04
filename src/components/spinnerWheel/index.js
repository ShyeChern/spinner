import { useEffect, useState } from 'react';
import randomColor from 'randomcolor';

export default function SpinnerWheel({ segments, onFinished, isReady }) {
	let size = 250;
	let width = 600;
	let height = 600;
	let centerX = width / 2;
	let centerY = height / 2;
	if (window.innerWidth < 768) {
		size = 150;
		width = 400;
		height = 400;
		centerX = width / 2;
		centerY = height / 2;
	}
	const isOnlyOnce = false;
	const primaryColor = 'black';
	const contrastColor = 'white';
	const buttonText = 'Spin';
	const fontFamily = 'Arial';
	const upTime = segments.length * 100;
	const downTime = segments.length * 1000;
	const timerDelay = segments.length;
	const segColors = randomColor({ count: segments.length });
	const [isFinished, setFinished] = useState(false);
	let currentSegment = '';
	let winningSegment = '';
	let isStarted = false;
	let timerHandle = 0;
	let angleCurrent = 0;
	let angleDelta = 0;
	let canvasContext = null;
	let maxSpeed = Math.PI / `${segments.length}`;
	let spinStart = 0;
	let frames = 0;

	useEffect(() => {
		wheelInit();
		setTimeout(() => {
			window.scrollTo(0, 1);
		}, 0);
	}, []);

	const wheelInit = () => {
		initCanvas();
		wheelDraw();
	};

	const initCanvas = () => {
		let canvas = document.getElementById('canvas');
		if (navigator.userAgent.indexOf('MSIE') !== -1) {
			canvas = document.createElement('canvas');
			canvas.setAttribute('width', width);
			canvas.setAttribute('height', height);
			canvas.setAttribute('id', 'canvas');
			document.getElementById('wheel').appendChild(canvas);
		}
		canvas.addEventListener('click', spin, false);
		canvasContext = canvas.getContext('2d');
	};

	const spin = () => {
		isStarted = true;
		// get random number 0 to segments length
		winningSegment = segments[Math.floor(Math.random() * segments.length)];

		if (timerHandle === 0) {
			spinStart = new Date().getTime();
			maxSpeed = Math.PI / segments.length;
			frames = 0;
			timerHandle = setInterval(onTimerTick, timerDelay);
		}
	};

	const onTimerTick = () => {
		frames++;
		draw();
		const duration = new Date().getTime() - spinStart;
		let progress = 0;
		let finished = false;
		if (duration < upTime) {
			progress = duration / upTime;
			angleDelta = maxSpeed * Math.sin((progress * Math.PI) / 2);
		} else {
			if (winningSegment) {
				if (currentSegment === winningSegment && frames > segments.length) {
					progress = duration / upTime;
					angleDelta = maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
					progress = 1;
				} else {
					progress = duration / downTime;
					angleDelta = maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
				}
			} else {
				progress = duration / downTime;
				angleDelta = maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
			}
			if (progress >= 1) finished = true;
		}

		angleCurrent += angleDelta;
		while (angleCurrent >= Math.PI * 2) angleCurrent -= Math.PI * 2;
		if (finished) {
			setFinished(true);
			onFinished(currentSegment);
			clearInterval(timerHandle);
			timerHandle = 0;
			angleDelta = 0;
		}
	};

	const wheelDraw = () => {
		clear();
		drawWheel();
		drawNeedle();
	};

	const draw = () => {
		clear();
		drawWheel();
		drawNeedle();
	};

	const drawSegment = (key, lastAngle, angle) => {
		const ctx = canvasContext;
		const value = segments[key];
		ctx.save();
		ctx.beginPath();
		ctx.moveTo(centerX, centerY);
		ctx.arc(centerX, centerY, size, lastAngle, angle, false);
		ctx.lineTo(centerX, centerY);
		ctx.closePath();
		ctx.fillStyle = segColors[key];
		ctx.fill();
		ctx.stroke();
		ctx.save();
		ctx.translate(centerX, centerY);
		ctx.rotate((lastAngle + angle) / 2);
		ctx.fillStyle = contrastColor;
		ctx.font = 'bold 1em ' + fontFamily;
		ctx.fillText(value.substr(0, 21), size / 2 + 20, 0);
		ctx.restore();
	};

	const drawWheel = () => {
		const ctx = canvasContext;
		let lastAngle = angleCurrent;
		const len = segments.length;
		const PI2 = Math.PI * 2;
		ctx.lineWidth = 1;
		ctx.strokeStyle = primaryColor;
		ctx.textBaseline = 'middle';
		ctx.textAlign = 'center';
		ctx.font = '1em ' + fontFamily;
		for (let i = 1; i <= len; i++) {
			const angle = PI2 * (i / len) + angleCurrent;
			drawSegment(i - 1, lastAngle, angle);
			lastAngle = angle;
		}

		// Draw a center circle
		ctx.beginPath();
		ctx.arc(centerX, centerY, 50, 0, PI2, false);
		ctx.closePath();
		ctx.fillStyle = primaryColor;
		ctx.lineWidth = 10;
		ctx.strokeStyle = contrastColor;
		ctx.fill();
		ctx.font = 'bold 1em ' + fontFamily;
		ctx.fillStyle = contrastColor;
		ctx.textAlign = 'center';
		ctx.fillText(buttonText, centerX, centerY + 3);
		ctx.stroke();

		// Draw outer circle
		ctx.beginPath();
		ctx.arc(centerX, centerY, size, 0, PI2, false);
		ctx.closePath();

		ctx.lineWidth = 10;
		ctx.strokeStyle = primaryColor;
		ctx.stroke();
	};

	const drawNeedle = () => {
		const ctx = canvasContext;
		ctx.lineWidth = 1;
		ctx.strokeStyle = contrastColor;
		ctx.fileStyle = contrastColor;
		ctx.beginPath();
		ctx.moveTo(centerX + 20, centerY - 50);
		ctx.lineTo(centerX - 20, centerY - 50);
		ctx.lineTo(centerX, centerY - 70);
		ctx.closePath();
		ctx.fill();
		const change = angleCurrent + Math.PI / 2;
		let i = segments.length - Math.floor((change / (Math.PI * 2)) * segments.length) - 1;
		if (i < 0) i = i + segments.length;
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.fillStyle = primaryColor;
		ctx.font = 'bold 1.5em ' + fontFamily;
		currentSegment = segments[i];
		isStarted && ctx.fillText(currentSegment, centerX + 10, centerY + size + 50);
	};
	const clear = () => {
		const ctx = canvasContext;
		ctx.clearRect(0, 0, width, height);
	};
	return (
		<div id="wheel">
			<canvas
				id="canvas"
				width={width}
				height={height}
				style={{
					pointerEvents: !isReady || (isFinished && isOnlyOnce) ? 'none' : 'auto',
				}}
			/>
		</div>
	);
}
