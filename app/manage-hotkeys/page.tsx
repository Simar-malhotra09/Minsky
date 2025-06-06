"use client"
import Image from "next/image";
import { useEffect, useState } from 'react';
export default function Home() {


  const [commands, setCommands] = useState({});
  const [hosts, setHosts] = useState([]);

  useEffect(() => {
    fetch('/manifest.json')
      .then(res => res.json())
      .then(manifest => {
        setCommands(manifest.commands || {});
        setHosts(manifest.host_permissions || []);
      });
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 text-center px-4">
       <div className="p-6 font-sans">
      <h1 className="text-2xl text-black font-bold mb-4">Extension Hotkeys</h1>

      <ul className="list-none text-black pl-6">
        {Object.entries(commands).map(([key, value]) => (
          <li key={key}>
            <strong>{value.description || key}:</strong>{' '}
            {value.suggested_key?.default || 'N/A'}
          </li>
        ))}
      </ul>

    </div>


    <footer className="mt-10 text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Simar Malhotra. All rights reserved.
      </footer>
    </main>
  );
}

