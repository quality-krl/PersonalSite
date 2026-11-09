/* Run once from the personal-site root: node scripts/enable-project-covers.cjs */
const fs = require("node:fs");
const path = require("node:path");
const file = path.join(process.cwd(), "app", "components", "ProjectCarousel.tsx");
if (!fs.existsSync(file)) { console.error("ProjectCarousel.tsx not found. Nothing changed."); process.exit(1); }
let code = fs.readFileSync(file, "utf8");
if (code.includes("QA_PROJECT_COVERS_V4")) { console.log("Already installed. No changes required."); process.exit(0); }
const finder = /function ProjectArtwork\(\s*\{\s*id,\s*label\s*\}\s*:\s*\{\s*id:\s*ProjectId\s*;\s*label:\s*string\s*\}\s*\)\s*\{/;
if (!finder.test(code)) { console.error("Expected ProjectArtwork function was not found. No changes applied. Send me the current ProjectCarousel.tsx."); process.exit(1); }
const addition = `\n  // QA_PROJECT_COVERS_V4: first impression = original dossier cover where available.\n  const coverProjects = ["freetv", "ksp", "sylius", "precision", "eargym"];\n  if (coverProjects.includes(id)) {\n    return (\n      <div className={\`project-art project-art--\${id}\`} role="img" aria-label={label}>\n        {/* eslint-disable-next-line @next/next/no-img-element */}\n        <img\n          src={\`./media/\${id}/carousel-cover.webp\`}\n          alt=""\n          loading="eager"\n          draggable={false}\n          style={{ width: "100%", height: "100%", display: "block", objectFit: "cover" }}\n        />\n      </div>\n    );\n  }\n`;
code = code.replace(finder, x=>x+addition);
fs.writeFileSync(file,code,"utf8");
console.log("Project covers enabled for all five projects. Existing carousel layout kept intact.");
