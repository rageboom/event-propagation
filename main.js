const $bubble = document.querySelector('#bubble');
const $capturing = document.querySelector('#capturing');
const $stopPropagation = document.querySelector('#stopPropagation');
const $stopImmediatePropagation = document.querySelector(
  '#stopImmediatePropagation'
);
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
const stopPropagationTargets = [
  $stopPropagation.querySelector('.grand-parents'),
  $stopPropagation.querySelector('.parents'),
  $stopPropagation.querySelector('.children'),
];
const stopImmediatePropagationTargets = [
  $stopImmediatePropagation.querySelector('.grand-parents'),
  $stopImmediatePropagation.querySelector('.parents'),
  $stopImmediatePropagation.querySelector('.children'),
];
const $bubbleLog = $bubble.querySelector('.log');
const $capturingLog = $capturing.querySelector('.log');
const $stopPropagationLog = $stopPropagation.querySelector('.log');
const $stopImmediatePropagationLog =
  $stopImmediatePropagation.querySelector('.log');

const addEvent = (target, event, handler, options) => {
  target.addEventListener(event, handler, options);
};
const removeEvent = (target, event, handler, options) => {
  target.removeEventListener(event, handler, options);
};
const logging = (target, log, e, isCapturing, flag = false) => {
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
  if (!flag) {
    target.insertAdjacentHTML('beforeend', `<div>${log} ${event}</div>`);
  } else {
    target.innerHTML = `<div>${log} ${event}</div>`;
  }
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
stopPropagationTargets.forEach((target) => {
  addEvent(
    target,
    'click',
    (e) => {
      e.stopPropagation();
      logging($stopPropagationLog, target.getAttribute('name'), e);
    },
    {}
  );
});
stopImmediatePropagationTargets.forEach((target) => {
  addEvent(
    target,
    'click',
    (e) => {
      // e.stopImmediatePropagation();
      logging(
        $stopImmediatePropagationLog,
        target.getAttribute('name'),
        e,
        false
      );
    },
    {}
  );
  addEvent(
    target,
    'click',
    (e) => {
      logging(
        $stopImmediatePropagationLog,
        target.getAttribute('name') + '-test',
        e,
        false
      );
    },
    {}
  );
});
