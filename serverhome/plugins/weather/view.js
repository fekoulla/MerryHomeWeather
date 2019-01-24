var dataView = {
    "type" : "Weather",
    "items" : { controls : [] }
};

dataView.items.controls.push({
    name: "Menu",
    icon: "home",
    action: "sendKey",
    data: "MENU"
});

dataView.items.controls.push({
    name: "Back",
    icon: "arrow-left",
    action: "sendKey",
    data: "BACK"
});

dataView.items.controls.push({
    name: "MEDIA PREVIOUS",
    icon: "step-backward",
    action: "sendKey",
    data: "MEDIA_PREVIOUS"
});


dataView.items.controls.push({
    name: "Play",
    icon: "play",
    action: "sendKey",
    data: "MEDIA_PLAY"
});

dataView.items.controls.push({
    name: "Pause",
    icon: "pause",
    action: "sendKey",
    data: "MEDIA_PAUSE"
});

dataView.items.controls.push({
    name: "MEDIA NEXT",
    icon: "step-forward",
    action: "sendKey",
    data: "MEDIA_NEXT"
});

dataView.items.controls.push({
    name: "vol Mute",
    icon: "volume-off",
    action: "sendKey",
    data: "VOLUME_MUTE"
});

dataView.items.controls.push({
    name: "vol Down",
    icon: "volume-down",
    action: "sendKey",
    data: "VOLUME_DOWN"
});

dataView.items.controls.push({
    name: "vol UP",
    icon: "volume-up",
    action: "sendKey",
    data: "VOLUME_UP"
});


module.exports = dataView;
