import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import Footer from "@/components/footer";

export default function Home() {
	return (
		<>
			<Navbar />
			<main>
				<Hero text='Organize and attend events with ease' />
			</main>
			<Footer />
		</>
	);
}
