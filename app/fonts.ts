import { Grandstander, Rubik, IBM_Plex_Sans } from "next/font/google";

export const grandstander = Grandstander({
  weight: "variable",
  subsets: ["latin"],
  display: "swap",
});

export const rubik = Rubik({
  weight: "variable",
  subsets: ["latin"],
  display: "swap",
});

export const ibmPlexSans = IBM_Plex_Sans({
  weight: ["100",'200','300','400','500','600','700'],
  subsets:["latin"],display:"swap"
})
