import nodepub from "nodepub";
import fs from "fs/promises";
import path from "path";
import os from "os";
import * as cheerio from "cheerio";

// async function downloadCoverToTemp(url: string): Promise<string> {
//   const response = await axios.get(url, {
//     responseType: "arraybuffer",
//   });

//   const tempPath = path.join(os.tmpdir(), `cover-${Date.now()}.jpg`);
//   await fs.writeFile(tempPath, response.data);
//   return tempPath;
// }

export const generateEPUB = async ({ source }: { source: string }) => {
  let outputDir: string | null = null;

  try {
    console.log("📚 Starting EPUB generation...");

    // ✅ Parsear HTML con cheerio
    const $ = cheerio.load(source);

    // Extraer información del álbum del primer h1 (si existe)
    const firstH1 = $("h1").first().text();
    const [artist] = firstH1.split(" - ").map((s) => s.trim());

    // Metadata
    const metadata = {
      id: `album-${Date.now()}`,
      cover: "public/og.png",
      title: artist ? `${artist} - Lyrics` : "Album Lyrics",
      author: artist || "Various Artists",
      publisher: "Kindle Lyrics",
      language: "en",
      published: new Date().toISOString().split("T")[0],
      description: `Lyrics collection`,
      showContents: true,
    };

    // Crear documento EPUB
    const epub = nodepub.document(metadata);

    // CSS personalizado
    epub.addCSS(`
      body {
        font-family: Georgia, serif;
        line-height: 1.8;
        padding: 20px;
      }
      h1 {
        text-align: center;
        margin-top: 50px;
        margin-bottom: 20px;
        font-size: 2em;
        page-break-before: always;
      }
      .pdf-lyrics {
        white-space: pre-wrap;
        line-height: 1.8;
        margin: 20px 0;
      }
      p {
        margin: 0.5em 0;
      }
    `);

    // ✅ Extraer cada .page y crear secciones
    const pages = $(".page");

    if (pages.length === 0) {
      throw new Error("No songs found in HTML");
    }

    pages.each((index, element) => {
      const $page = $(element);

      // Extraer título de la canción
      const h1Text = $page.find("h1").text().trim();
      const songTitle = h1Text || `Song ${index + 1}`;

      // Extraer letras
      const lyricsHtml =
        $page.find(".pdf-lyrics").html() ||
        $page.find("p").html() ||
        "Lyrics not available.";

      // Crear contenido de la sección
      const sectionContent = `
        <h1>${h1Text}</h1>
        <div class="pdf-lyrics">
          ${lyricsHtml}
        </div>
      `;

      // Agregar sección al EPUB
      epub.addSection(songTitle, sectionContent);

      console.log(`✅ Added: ${songTitle}`);
    });

    // ✅ Crear directorio temporal
    outputDir = path.join(os.tmpdir(), `epub-output-${Date.now()}`);
    await fs.mkdir(outputDir, { recursive: true });

    const filename = "album-lyrics";

    // ✅ Generar EPUB
    await epub.writeEPUB(outputDir, filename);

    // Leer el archivo generado
    const epubPath = path.join(outputDir, `${filename}.epub`);
    const epubBuffer = await fs.readFile(epubPath);

    console.log("✅ EPUB generated!", epubBuffer.length, "bytes");

    // Limpiar directorio temporal
    if (outputDir) {
      await fs.rm(outputDir, { recursive: true, force: true }).catch(() => {});
    }

    return epubBuffer;
  } catch (error: any) {
    console.error("❌ EPUB generation error:", error.message);

    // Limpiar en caso de error
    if (outputDir) {
      await fs.rm(outputDir, { recursive: true, force: true }).catch(() => {});
    }

    throw new Error(`Failed to generate EPUB: ${error.message}`);
  }
};
