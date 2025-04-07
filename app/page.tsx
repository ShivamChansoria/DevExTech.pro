import logger from "@/lib/logger";

export default function Home() {
  logger.info("Hello World!");

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Hello World!</h1>
    </main>
  );
}
