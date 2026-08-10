import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Jurusan from "./components/Jurusan";
import Keunggulan from "./components/Keunggulan";
import Galeri from "./components/Galeri";
import Pengumuman from "./components/Pengumuman";
import Kontak from "./components/Kontak";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Jurusan />
      <Keunggulan />
      <Galeri />
      <Pengumuman />
      <Kontak />
      <Footer />
    </main>
  );
}
