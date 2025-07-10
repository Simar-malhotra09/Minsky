const { writeFileSync } = require("fs");
const fs = require("fs"); 

interface HotKeys {
  desc: string;
  suggestedKey: string;
  suggestedKeyMac?: string;
}

type CommandSection = {
  [key: string]: {
    description: string;
    suggested_key: {
      default: string;
      mac?: string;
    };
  };
};

const raw = fs.readFileSync("./extension/manifest.json", "utf-8");
const manifest = JSON.parse(raw);

// Grab just the `commands` block
const commands: CommandSection = manifest.commands ?? {};

const hotkeys: HotKeys[] = Object.entries(commands).map(([_, cmd]) => ({
  desc: cmd.description,
  suggestedKey: cmd.suggested_key.default,
  suggestedKeyMac: cmd.suggested_key.mac,
}));

writeFileSync("hotkeys_config.json", JSON.stringify(hotkeys, null, 2));
