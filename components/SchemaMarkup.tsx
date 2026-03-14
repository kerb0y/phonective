export default function SchemaMarkup() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Phonective",
    url: "https://phonective.app",
    description:
      "Platform diagnostik smartphone online. Cek layar, speaker, mikrofon, kamera, sensor, dan hardware langsung dari browser.",
    applicationCategory: "UtilityApplication",
    browserRequirements: "Requires Web Audio API, MediaDevices API, DeviceOrientation API for full functionality.",
    operatingSystem: "All, Android, iOS, Windows, macOS",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "IDR",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
