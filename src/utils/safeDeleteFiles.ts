import fs from "fs/promises";
import path from "path";
export const safeDeleteFiles = async (filenames: string[]) => {
    for (const filename of filenames) {
        const filePath = path.join(
            process.cwd(),
            "public",
            "uploads",
            filename
        );
        await fs.stat(filePath); // يتحقق من وجود الملف
        await fs.unlink(filePath);
        console.log("Deleted:", filename);
    }
};
