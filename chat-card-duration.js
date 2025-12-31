Hooks.once("init", () => {
  game.settings.register("chat-card-duration", "duration", {
    name: "Chat Card Duration",
    hint: "How long chat cards remain visible (in seconds).",
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
    const seconds = game.settings.get("chat-card-duration", "duration");
    ChatLog.NOTIFY_DURATION = seconds * 1000;
    console.log(`Chat Card Duration | Set to ${seconds}s`);
  };

  applyDuration();
  Hooks.on("closeSettingsConfig", applyDuration);
});
