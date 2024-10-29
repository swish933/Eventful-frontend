import { grandstander } from "@/app/fonts";

export default function Footer() {
  return (
    <div
      className={`min-h-10 md:min-h-16 px-4 md:px-6 flex justify-between border-t w-full items-center text-muted-foreground ${grandstander.className}`}
    >
      <p>Eventful&copy;</p>
      <p>{new Date().getFullYear()}</p>
    </div>
  );
}
