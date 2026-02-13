function safeReplace(text: string, oldPath: string, newPath: string): string {
    const escapedOldPath = oldPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    const regex = new RegExp(escapedOldPath, 'g');

    return text.replace(regex, (match, offset, fullString) => {

        // Is there a letter/number before the word?
        if (offset > 0) {
            const charBefore = fullString[offset - 1];

            if (/[a-zA-Z0-9_]/.test(charBefore)) {
                return match; // Dont replace
            }
        }

        // Is there a letter/number after the word?
        if (offset + match.length < fullString.length) {
            const charAfter = fullString[offset + match.length];
            if (/[a-zA-Z0-9_]/.test(charAfter)) {
                return match; // Dont replace
            }
        }
        return newPath;
    });
}

const code = `
local MyPart = game.Workspace.Part
local Particle = game.Workspace.ParticleEmitter -- Soll NICHT ersetzt werden
print(game.Workspace.Part.Name)
`;

const oldP = "game.Workspace.Part";
const newP = "Workspace";

const result = safeReplace(code, oldP, newP);

console.log(result);