﻿var System = {
	exit: function() {
		window.open('about:blank','_self').close();
	},
	getLocalStorage: function (key) {
		// NOTE: localStorage is undefined on IE/Edge if running on localhost.
		if (typeof localStorage !== "undefined") {
			return localStorage.getItem("local/" + key);
		} else {
			return undefined;
		}
	},
	setLocalStorage: function (key, value) {
		if (typeof localStorage !== "undefined") {
			if (value == null) {
				localStorage.removeItem("local/" + key);
			} else {
				localStorage.setItem("local/" + key, value);
			}
		}
	},
	getRoamingStorage: function (key) {
		if (typeof localStorage !== "undefined") {
			return localStorage.getItem("roaming/" + key);
		} else {
			return undefined;
		}
	},
	setRoamingStorage: function (key, value) {
		if (typeof localStorage !== "undefined") {
			if (value == null) {
				localStorage.removeItem("roaming/" + key);
			} else {
				localStorage.setItem("roaming/" + key, value);
			}
		}
	}
};

(function () {
	"use strict";

	document.addEventListener("DOMContentLoaded", function () {
		System.canvas = document.getElementById("canvas");
		System.main(System.canvas, false);
	});
})();
