var System = {
	exit: function() {
		Windows.ApplicationModel.Core.CoreApplication.exit();
	},
	getLocalStorage: function (key) {
		return Windows.Storage.ApplicationData.current.localSettings.values[key];
	},
	setLocalStorage: function (key, value) {
		if (value == null) {
			Windows.Storage.ApplicationData.current.localSettings.values.remove(key);
		} else {
			Windows.Storage.ApplicationData.current.localSettings.values[key] = value;
		}
	},
	getRoamingStorage: function (key) {
		return Windows.Storage.ApplicationData.current.roamingSettings.values[key];
	},
	setRoamingStorage: function (key, value) {
		if (value == null) {
			Windows.Storage.ApplicationData.current.roamingSettings.values.remove(key);
		} else {
			Windows.Storage.ApplicationData.current.roamingSettings.values[key] = value;
		}
	},
	getFullScreen: function() {
		return document.fullscreenElement != null;
	},
	setFullScreenn: function(value) {
		var view = Windows.UI.ViewManagement.ApplicationView.getForCurrentView();
		if (value) {
			view.tryEnterFullScreenMode();
			this.canvas.requestFullscreen();
		} else {
			document.exitFullscreen();
			view.exitFullScreenMode();
		}
	}
};

(function () {
	"use strict";

	var system = WinJS.Application;
	var activation = Windows.ApplicationModel.Activation;

	Windows.UI.ViewManagement.ApplicationView.preferredLaunchWindowingMode = Windows.UI.ViewManagement.ApplicationViewWindowingMode.preferredLaunchViewSize;
	Windows.UI.ViewManagement.ApplicationView.preferredLaunchViewSize.width = 1280;
	Windows.UI.ViewManagement.ApplicationView.preferredLaunchViewSize.height = 720 + 90;

	system.onactivated = function (args) {
		if (args.detail.kind === activation.ActivationKind.launch) {
			System.canvas = document.getElementById("canvas");
			var resume = (args.detail.previousExecutionState === activation.ApplicationExecutionState.terminated);
			System.main(System.canvas, resume);
			args.setPromise(WinJS.UI.processAll());
		}
	};

	system.oncheckpoint = function (args) {
		System.checkpoint();
	};

	system.start();
})();
