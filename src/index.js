import './index.scss';
import summerSound from '../public/assets/sounds/summer.mp3';
import winterSound from '../public/assets/sounds/winter.mp3';
import autumnSound from '../public/assets/sounds/rain.mp3';

const soundItems = document.querySelectorAll('.sound-item');
const mainBackground = document.getElementById('main-background');
const volume = document.getElementById('volume');

let currentAudio = null;
let activeButton = null;

const soundFiles = {
	summer: summerSound,
	winter: winterSound,
	autumn: autumnSound,
};

volume.addEventListener('input', (e) => {
	if (currentAudio) {
		currentAudio.volume = e.target.value / 10;
	}
});

soundItems.forEach((button) => {
	button.addEventListener('click', () => {
		const soundType = button.dataset.sound;
		if (!soundFiles[soundType]) return;

		if (activeButton === button) {
			if (currentAudio.paused) {
				currentAudio.play();
				activeButton.classList.remove('paused');
			} else {
				currentAudio.pause();
				activeButton.classList.add('paused');
			}
			return;
		} else {
			if (activeButton) {
				if (currentAudio) {
					currentAudio.pause();
					currentAudio = null;
				}
				activeButton.classList.remove('paused');
			}
			activeButton = button;
		}
		mainBackground.classList = `blurred-bg ${soundType}`;

		currentAudio = new Audio(soundFiles[soundType]);
		currentAudio.loop = true;
		currentAudio.play();
	});
});
