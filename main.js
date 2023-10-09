import './style.css';
const $bubble = document.querySelector('#bubble');
const $capturing = document.querySelector('#capturing');
const bubbleTargets = [
	$bubble.querySelector('.grand-parents'),
	$bubble.querySelector('.parents'),
	$bubble.querySelector('.children'),
];
const capturingTargets = [
	$capturing.querySelector('.grand-parents'),
	$capturing.querySelector('.parents'),
	$capturing.querySelector('.children'),
];
const $bubbleLog = $bubble.querySelector('.log');
const $capturingLog = $capturing.querySelector('.log');

const addEvent = (target, event, handler, options) => {
	target.addEventListener(event, handler, options);
};
const removeEvent = (target, event, handler, options) => {
	target.removeEventListener(event, handler, options);
};
const logging = (target, log, e, isCapturing) => {
	let event = '';

	if (isCapturing && e.currentTarget === capturingTargets[0]) {
		target.innerHTML = '';
	} else if (!isCapturing && e.eventPhase === e.AT_TARGET) {
		target.innerHTML = '';
	}

	if (e.eventPhase === e.AT_TARGET) {
		event = '이벤트 대상';
	} else if (e.eventPhase === e.BUBBLING_PHASE) {
		event = '이벤트 버블';
	} else if (e.eventPhase === e.CAPTURING_PHASE) {
		event = '이벤트 캡처';
	}
	target.insertAdjacentHTML('beforeend', `<div>${log} ${event}</div>`);
};

bubbleTargets.forEach((target) => {
	addEvent(
		target,
		'click',
		(e) => {
			logging($bubbleLog, target.getAttribute('name'), e, false);
		},
		{}
	);
});
capturingTargets.forEach((target) => {
	addEvent(
		target,
		'click',
		(e) => {
			logging($capturingLog, target.getAttribute('name'), e, true);
		},
		{ capture: true }
	);
});
