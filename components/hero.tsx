import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { grandstander } from "@/app/fonts";
import heroImg from "../public/landing_hero.png";

type Props = {
	text: string;
};

export default function Hero({ text }: Props) {
	return (
		<div
			className={` ${grandstander.className} grid place-items-center mt-6 lg:mt-0 space-y-8 lg:space-y-0 lg:grid-cols-2`}
		>
			<div className='font-bold grid place-items-center px-4 md:px-6 lg:order-1 w-full max-w-md lg:max-w-none space-y-4'>
				<h1 className='text-center lg:text-left text-[clamp(4rem,6vw,6rem)] leading-tight'>
					{text}
				</h1>
				<Link href='/signup' className='lg:place-self-start flex'>
					<Button className='bg-primary dark:bg-primary hover:bg-primary/90 '>
						Create an account
					</Button>
				</Link>
			</div>

			<Image src={heroImg} alt='women in native attire' />
		</div>
	);
}
