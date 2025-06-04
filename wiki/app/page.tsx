import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 text-center px-4">
      <h1 className="text-4xl font-bold mb-4 text-blue-700">Minsky</h1>
      <p className="text-lg mb-6 text-gray-700 max-w-xl">
        Instantly search highlighted text on any site — all with one hotkey.
      </p>

      <a
        href="https://chrome.google.com/webstore/detail/bodjhiicfbgpkjgneicdcohfdigmjpdf"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition"
      >
        Add to Chrome
      </a>

      <footer className="mt-10 text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Simar Malhotra. All rights reserved.
      </footer>
    </main>
  );
}
