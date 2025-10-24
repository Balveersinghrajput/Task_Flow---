import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import Stars from "@/components/Stars";
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Inter } from "next/font/google";
import "react-day-picker/dist/style.css";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Task-Flow",
  description: "Project Management app",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: "#a855f7",
          colorSuccess: "#22c55e",
          colorDanger: "#ef4444",
          colorWarning: "#f59e0b",
          colorBackground: "transparent",
          colorInputBackground: "rgba(30, 41, 59, 0.5)",
          colorInputText: "#f8fafc",
          borderRadius: "0.75rem",
          colorShimmer: "rgba(168, 85, 247, 0.15)",
          spacingUnit: "1rem",
          fontFamily: inter.style.fontFamily,
          fontSize: "0.875rem",
        },
        elements: {
          card: `
            bg-slate-900/90 backdrop-blur-2xl border border-slate-800/50
            shadow-[0_0_50px_rgba(168,85,247,0.25)]
            relative overflow-hidden p-5 sm:p-6 md:p-8 rounded-2xl
            before:absolute before:inset-0 
            before:bg-[radial-gradient(circle_at_top_left,_rgba(168,85,247,0.25),_transparent_60%)]
            after:absolute after:inset-0 
            after:bg-[radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.15),_transparent_60%)]
            before:blur-3xl after:blur-3xl before:-z-10 after:-z-10
            hover:shadow-[0_0_70px_rgba(168,85,247,0.4)]
            transition-all duration-700
          `,
          rootBox: `
            bg-transparent w-full max-w-md mx-auto relative
            before:absolute before:inset-0
            before:bg-[linear-gradient(45deg,rgba(168,85,247,0.05),rgba(59,130,246,0.05))]
            before:rounded-[2rem]
            before:animate-[pulse_6s_infinite]
          `,
          logoImage: `
            brightness-110 w-16 h-16 sm:w-20 sm:h-20 mx-auto
            rounded-2xl border border-purple-400/30
            shadow-[0_0_25px_rgba(168,85,247,0.4)]
            animate-[float_4s_ease-in-out_infinite]
          `,
          headerTitle: `
            text-transparent bg-clip-text bg-gradient-to-r 
            from-purple-400 via-pink-400 to-blue-400 font-extrabold 
            text-3xl sm:text-4xl tracking-wide drop-shadow-[0_0_15px_rgba(168,85,247,0.3)]
          `,
          formButtonPrimary: `
            relative group w-full py-2.5 sm:py-3 px-6
            bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600
            rounded-xl font-semibold text-white text-sm sm:text-base
            shadow-[0_0_25px_rgba(168,85,247,0.35)]
            hover:shadow-[0_0_35px_rgba(168,85,247,0.6)]
            overflow-hidden
            before:absolute before:inset-0 before:bg-gradient-to-r 
            before:from-transparent before:via-white/25 before:to-transparent
            before:translate-x-[-200%] hover:before:translate-x-[200%]
            before:transition-transform before:duration-[1200ms]
            transition-all duration-300
            hover:scale-[1.03] active:scale-[0.97]
          `,
          formFieldInput: `
            w-full pl-12 pr-4 py-2.5 sm:py-3 bg-slate-800/60 border border-slate-700/60
            rounded-xl text-slate-100 placeholder:text-slate-500 text-sm sm:text-base
            focus:outline-none focus:border-purple-500/70 focus:ring-2 focus:ring-purple-500/20
            hover:border-purple-500/30 transition-all duration-300
          `,
          avatarBox: `
            border-2 border-purple-500/40 ring-2 ring-purple-500/20
            shadow-[0_0_30px_rgba(168,85,247,0.35)] rounded-full
            animate-[pulse_5s_infinite]
          `,
          userButtonPopoverCard: `
            bg-slate-900/95 backdrop-blur-2xl border border-purple-500/20
            shadow-[0_0_40px_rgba(168,85,247,0.25)] rounded-2xl
            p-3 animate-[fadeIn_0.6s_ease]
          `,
          organizationSwitcherPopoverCard: `
            bg-slate-900/95 backdrop-blur-2xl border border-purple-500/20
            shadow-[0_0_50px_rgba(168,85,247,0.25)]
            rounded-2xl p-3
          `,
          modalContent: `
            bg-slate-900/95 backdrop-blur-2xl border border-purple-500/20
            shadow-[0_0_60px_rgba(168,85,247,0.4)]
            rounded-2xl p-6 animate-[fadeIn_0.5s_ease-out]
          `,
          profileSection: `
            border-t border-slate-800/50 relative
            before:absolute before:inset-x-0 before:top-0 
            before:h-[1px] before:bg-gradient-to-r 
            before:from-transparent before:via-purple-500/30 before:to-transparent
          `,
          badge: `
            bg-gradient-to-r from-purple-500/20 to-blue-500/20
            border border-purple-400/40 text-purple-300
            shadow-[0_0_15px_rgba(168,85,247,0.2)]
            animate-[pulse_4s_infinite]
          `,
          spinner: `
            text-purple-500 drop-shadow-[0_0_10px_rgba(168,85,247,0.7)]
          `,
        },
        layout: {
          shimmer: true,
          logoPlacement: "inside",
          socialButtonsPlacement: "bottom",
          socialButtonsVariant: "blockButton",
          helpPageUrl: "/help",
          privacyPageUrl: "/privacy",
          termsPageUrl: "/terms",
        },
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.className} animated-background`}>
          <Stars count={150} fallingCount={7} />
          <ThemeProvider attribute="class" defaultTheme="dark">
            <Header />
            <main className="min-h-screen relative">
              {/* Neon glow background overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(168,85,247,0.08),transparent_60%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.08),transparent_60%)]" />
              {children}
            </main>
            <Toaster richColors />
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
