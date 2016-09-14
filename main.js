const electron = require('electron');
const {app} = electron;
const {BrowserWindow} = electron;
const {client} = require('electron-connect').client;

let win;

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

function createWindow() {
	console.log('Hello, browser process');
	win = new BrowserWindow({ width: 600, height: 350 });


	win.loadURL(`file://${__dirname}/index.html`);

	win.webContents.openDevTools();

	win.on('closed', () => {
		win = null;
	});
}

app.on('active', () => {
	if (win === null) {
		createWindow();
	}
});

app.on('ready', createWindow);
