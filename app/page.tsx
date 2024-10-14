import Image from "next/image";
import Navbar from "./components/nav-bar";

export default function Home() {
  return (
    // 这是一个很好的自适应居中布局
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Navbar />
      <div className="w-full flex items-center justify-center">
        <h1 className="text-4xl font-bold">Hello Next.js</h1>
      </div>
    </div>
  );
}
