const app = require("app");
const BrowserWindow = require("browser-window");
const isPlainObject = require("lodash.isplainobject");

require("crash-reporter").start();

const mainWindow = null;

global.store = {
	dispatch: function(action) {
		console.log(action, isPlainObject(action));
	}
};

app.on("window-all-closed", function() {
	// On OS X it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("ready", function() {
	global.store.dispatch({ type: "ACTION_FROM_THE_SAME_GLOBAL_CONTEXT" });

	const mainWindow = new BrowserWindow({
		width:  1280,
		height: 768
	});

	mainWindow.loadUrl(`file://${__dirname}/rendererprocess.html`);

	mainWindow.openDevTools();

	mainWindow.on("closed", function() {
		mainWindow = null;
	});
});
