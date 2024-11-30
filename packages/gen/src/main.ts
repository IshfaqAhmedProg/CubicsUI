import { writeFileSync } from "fs";
import genReactButton from "./components/button/reactButton";
import path = require("path");

function main() {
    const button = genReactButton({
        componentName: "button",
        mode: "typescript",
        styleEngine: "css",
        stylesName: "cssStyles",
    });
    try {
        let outPath = path.resolve(process.cwd(), "out/button.tsx");
        writeFileSync(outPath, button, { flag: "w+" });
    } catch (error) {
        console.error("Error while writing file:", error);
    }
}
main();
