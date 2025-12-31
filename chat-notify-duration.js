Hooks.once("init", () => {
  game.settings.register("chat-notify-duration", "notifyDuration", {
    name: "Chat Card Duration Slider",
    hint: "How long chat message notifications stay visible (in seconds).",
    scope: "client",
    config: true,
    type: Number,
    default: 10,
    range: {
      min: 5,
      max: 30,
      step: 1
    }
  });
});

Hooks.once("ready", () => {
  const ChatLog = foundry?.applications?.sidebar?.tabs?.ChatLog;
  if (!ChatLog) return;

  const applyDuration = () => {
    const seconds = game.settings.get(
      "chat-notify-duration",
      "notifyDuration"
    );

    ChatLog.NOTIFY_DURATION = seconds * 1000;
    console.log(`Chat Card Duration Slider | Set to ${seconds}s`);
  };

  applyDuration();
  Hooks.on("closeSettingsConfig", applyDuration);
});