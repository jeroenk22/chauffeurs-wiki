import express from "express";
import cors from "cors";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();
const PORT = process.env.PORT || 8080;

// Sta CORS toe
app.use(cors());

console.log("NODE_ENV:", process.env.NODE_ENV);

// Proxy alleen starten als NODE_ENV niet "production" is
if (process.env.NODE_ENV !== "production") {
  console.log("🔄 Proxy actief op http://localhost:" + PORT);

  // Proxy naar Google Places API
  app.use(
    "/places-api",
    createProxyMiddleware({
      target: "https://maps.googleapis.com",
      changeOrigin: true,
      pathRewrite: { "^/places-api": "" },
    })
  );

  // Proxy naar LocationIQ API
  app.use(
    "/locationiq-api",
    createProxyMiddleware({
      target: "https://api.locationiq.com/v1",
      changeOrigin: true,
      pathRewrite: { "^/locationiq-api": "" },
    })
  );
} else {
  console.log("Production mode, proxy niet actief");
}

// ✅ Start de server slechts één keer!
const server = app
  .listen(PORT, () => {
    console.log(`🚀 Server draait op http://localhost:${PORT}`);
  })
  .on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.error(`❌ Poort ${PORT} is bezet. Gebruik een andere poort.`);
      process.exit(1);
    } else {
      throw err;
    }
  });
