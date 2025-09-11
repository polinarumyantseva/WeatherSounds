import './index.scss';
import summerSound from './assets/sounds/summer.mp3';
import winterSound from './assets/sounds/winter.mp3';
import autumnSound from './assets/sounds/rain.mp3';

interface SoundFiles {
	summer: string;
	winter: string;
	autumn: string;
	[key: string]: string;
}

const soundItems = document.querySelectorAll('.sound-item');
const mainBackground = document.getElementById('main-background') as HTMLDivElement;
const volume = document.getElementById('volume') as HTMLInputElement;

let currentAudio: HTMLMediaElement | null = null;
let activeButton: Element | null = null;

const soundFiles: SoundFiles = {
	summer: summerSound,
	winter: winterSound,
	autumn: autumnSound,
};

volume.addEventListener('input', (e: Event) => {
	const target = e.target as HTMLInputElement;
	if (currentAudio) {
		currentAudio.volume = Number(target.value) / 10;
	}
});

soundItems.forEach((button: Element) => {
	button.addEventListener('click', () => {
		const soundType = (button as HTMLElement).dataset.sound;

		if (!soundType || !soundFiles[soundType]) return;

		if (activeButton === button && currentAudio) {
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
