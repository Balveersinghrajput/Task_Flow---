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
          // Brand Colors
          colorPrimary: "#a855f7", // Purple-500
          colorSuccess: "#22c55e",
          colorDanger: "#ef4444",
          colorWarning: "#f59e0b",
          
          // Backgrounds
          colorBackground: "transparent", // Let stars show through
          colorInputBackground: "rgba(30, 41, 59, 0.6)",
          colorInputText: "#f8fafc",
          
          // Effects
          borderRadius: "1rem",
          colorShimmer: "rgba(168, 85, 247, 0.15)",
          
          // Spacing
          spacingUnit: "1rem",
        },
        elements: {
          // Main card - Ultra glassmorphism
          card: `
            bg-gradient-to-br from-slate-900/40 via-purple-900/20 to-slate-900/40
            backdrop-blur-2xl 
            border border-purple-500/20
            shadow-[0_0_50px_rgba(168,85,247,0.15)]
            before:absolute before:inset-0 
            before:rounded-[1rem] 
            before:p-[2px] 
            before:bg-gradient-to-br before:from-purple-500/40 before:via-pink-500/40 before:to-blue-500/40
            before:-z-10
            before:blur-sm
            relative
            overflow-hidden
            after:absolute after:inset-0
            after:bg-gradient-to-tr after:from-transparent after:via-purple-500/5 after:to-transparent
            after:opacity-0 hover:after:opacity-100
            after:transition-opacity after:duration-500
          `,
          
          // Root box for organization components
          rootBox: `
            bg-transparent
          `,
          
          // Organization List specific
          organizationList: `
            bg-transparent
          `,
          
          organizationListContainer: `
            bg-transparent
          `,
          
          // Organization Preview Card - Main card styling
          organizationPreview: `
            bg-slate-900/40
            backdrop-blur-xl
            border-0
            shadow-none
            transition-all duration-300
            hover:bg-slate-900/60
            rounded-2xl
          `,
          
          organizationPreviewMainIdentifier: `
            text-slate-100 font-semibold text-lg
          `,
          
          organizationPreviewSecondaryIdentifier: `
            text-slate-400 text-sm
          `,
          
          organizationPreviewAvatarBox: `
            border-0
            shadow-none
            bg-slate-800/40
            backdrop-blur-lg
          `,
          
          organizationPreviewAvatarImage: `
            brightness-110
          `,
          
          // Organization Switcher Card
          organizationSwitcherPopoverCard: `
            bg-slate-900/60
            backdrop-blur-xl
            border-0
            shadow-none
            rounded-2xl
          `,
          
          organizationSwitcherPopoverActionButton: `
            hover:bg-purple-500/10
            text-slate-300
            hover:text-purple-300
            transition-all duration-200
            rounded-xl
          `,
          
          organizationSwitcherPopoverActionButtonText: `
            text-slate-300
          `,
          
          organizationSwitcherPopoverActionButtonIcon: `
            text-purple-400
          `,
          
          // Organization Switcher Trigger
          organizationSwitcherTrigger: `
            bg-slate-800/40
            backdrop-blur-xl
            border-0
            hover:bg-slate-700/60
            shadow-none
            transition-all duration-300
            rounded-xl
          `,
          
          organizationSwitcherTriggerIcon: `
            text-purple-400
          `,
          
          // Organization Profile Card
          organizationProfileCard: `
            bg-slate-900/40
            backdrop-blur-xl
            border-0
            shadow-none
            rounded-2xl
          `,
          
          // Member List
          membersPageInviteButton: `
            bg-gradient-to-r from-purple-600 to-blue-600
            hover:from-purple-500 hover:to-blue-500
            text-white
            shadow-[0_0_20px_rgba(168,85,247,0.4)]
            hover:shadow-[0_0_30px_rgba(168,85,247,0.6)]
            transition-all duration-300
            hover:scale-[1.02]
            border border-purple-400/30
            rounded-xl
          `,
          
          // Logo/Header area
          logoBox: "mb-6",
          logoImage: "brightness-110 contrast-110",
          
          // Header with animated gradient
          headerTitle: `
            text-transparent bg-clip-text 
            bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400
            font-bold text-3xl mb-1
            animate-gradient
            bg-[length:200%_auto]
          `,
          headerSubtitle: "text-slate-400 text-base font-light tracking-wide",
          
          // Primary button with glow effect
          formButtonPrimary: `
            relative
            bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600
            hover:from-purple-500 hover:via-purple-400 hover:to-blue-500
            text-white font-semibold text-base
            shadow-[0_0_20px_rgba(168,85,247,0.4)]
            hover:shadow-[0_0_30px_rgba(168,85,247,0.6)]
            transition-all duration-300
            hover:scale-[1.02]
            before:absolute before:inset-0
            before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent
            before:translate-x-[-200%] hover:before:translate-x-[200%]
            before:transition-transform before:duration-700
            overflow-hidden
            border border-purple-400/30
            rounded-xl
          `,
          
          formButtonReset: `
            text-slate-400 hover:text-purple-400 
            transition-all duration-200
            hover:bg-purple-500/10 rounded-lg
          `,
          
          // Input fields with neon effect
          formFieldInput: `
            bg-slate-900/50 
            border border-slate-700/50
            text-slate-100 
            placeholder:text-slate-500
            focus:border-purple-500/60
            focus:ring-2 focus:ring-purple-500/30
            focus:shadow-[0_0_15px_rgba(168,85,247,0.2)]
            transition-all duration-300
            hover:border-slate-600/50
            rounded-xl
          `,
          
          formFieldLabel: "text-slate-300 font-medium text-sm tracking-wide",
          
          formFieldInputShowPasswordButton: `
            text-slate-400 hover:text-purple-400
            transition-colors duration-200
          `,
          
          // Footer links
          footerAction: "text-slate-400 hover:text-purple-400 transition-colors duration-200",
          footerActionLink: `
            text-purple-400 hover:text-purple-300 
            font-semibold 
            underline decoration-purple-400/40 
            hover:decoration-purple-400
            underline-offset-4
            transition-all duration-200
          `,
          
          // Social buttons with hover effects
          socialButtonsBlockButton: `
            bg-slate-800/40
            border border-slate-700/50
            text-slate-200
            hover:bg-slate-700/50
            hover:border-purple-500/30
            hover:shadow-[0_0_15px_rgba(168,85,247,0.15)]
            transition-all duration-300
            hover:scale-[1.02]
            rounded-xl
          `,
          
          socialButtonsBlockButtonText: "text-slate-300 font-medium",
          
          socialButtonsProviderIcon: "brightness-110",
          
          // Divider
          dividerLine: "bg-gradient-to-r from-transparent via-slate-600/50 to-transparent",
          dividerText: "text-slate-500 text-sm font-light px-4 bg-slate-900/50",
          
          // Avatar with glow
          avatarBox: `
            border-2 border-purple-500/40 
            shadow-[0_0_20px_rgba(168,85,247,0.3)]
            ring-2 ring-purple-500/20
          `,
          avatarImage: "brightness-105",
          
          // User button dropdown
          userButtonBox: "border border-slate-700/50 shadow-lg",
          userButtonPopoverCard: `
            bg-slate-900/95 
            backdrop-blur-2xl 
            border border-purple-500/20
            shadow-[0_0_40px_rgba(168,85,247,0.2)]
            rounded-2xl
          `,
          userButtonPopoverActionButton: `
            hover:bg-purple-500/10 
            text-slate-300 
            hover:text-purple-300
            transition-all duration-200
            hover:pl-4
            rounded-xl
          `,
          userButtonPopoverActionButtonText: "text-slate-300",
          userButtonPopoverActionButtonIcon: "text-purple-400",
          
          // Alerts
          alert: `
            bg-slate-800/60 
            backdrop-blur-xl
            border border-slate-700/50 
            text-slate-200
            shadow-lg
            rounded-xl
          `,
          alertText: "text-slate-300",
          
          // Loading
          spinner: "text-purple-500",
          
          // Badges
          badge: `
            bg-gradient-to-r from-purple-500/20 to-blue-500/20
            text-purple-300 
            border border-purple-500/30
            shadow-sm
            rounded-lg
          `,
          
          // Error text
          formFieldErrorText: "text-red-400 text-sm font-medium",
          
          // Identity preview
          identityPreview: "hover:bg-slate-800/50 transition-colors duration-200 rounded-xl",
          identityPreviewEditButton: `
            text-purple-400 hover:text-purple-300
            hover:bg-purple-500/10 rounded
            transition-all duration-200
          `,
          
          // Menu items
          menuItem: `
            hover:bg-purple-500/10 
            text-slate-300 
            hover:text-purple-300
            transition-all duration-200
            hover:pl-4
            rounded-xl
          `,
          menuItemText: "text-slate-300",
          
          // Navbar
          navbar: `
            bg-slate-900/60 
            backdrop-blur-xl 
            border-b border-purple-500/20
            shadow-[0_0_30px_rgba(168,85,247,0.1)]
          `,
          
          navbarButton: `
            hover:bg-purple-500/10
            transition-all duration-200
            hover:shadow-[0_0_15px_rgba(168,85,247,0.15)]
            rounded-xl
          `,
          
          // Profile sections
          profileSection: "border-t border-slate-800/50",
          profileSectionTitle: `
            text-slate-400 text-xs 
            font-bold uppercase tracking-widest
            bg-gradient-to-r from-purple-400/20 to-transparent
            px-2 py-1 rounded
          `,
          profileSectionContent: "text-slate-300",
          
          // Tabs
          tabButton: `
            text-slate-400 
            hover:text-purple-400 
            transition-all duration-200
            data-[state=active]:text-purple-400 
            data-[state=active]:border-purple-400
            data-[state=active]:shadow-[0_2px_10px_rgba(168,85,247,0.2)]
            hover:bg-blue-500/5
            rounded-lg
          `,
          tabPanel: "text-slate-300",
          
          // Form fields
          formFieldRow: "gap-4",
          formFieldAction: "text-purple-400 hover:text-purple-300 transition-colors",
          
          // OTP Input
          formFieldInputGroup: "gap-2",
          
          // File input
          fileDropAreaBox: `
            border-2 border-dashed border-slate-700/50
            hover:border-purple-500/50
            bg-slate-900/30
            transition-all duration-300
            hover:bg-purple-500/5
            rounded-xl
          `,
          fileDropAreaIconBox: "text-purple-400",
          fileDropAreaButtonPrimary: `
            text-purple-400 hover:text-purple-300
            underline decoration-purple-400/40
            transition-all duration-200
          `,
          
          // Page elements
          pageScrollBox: "scrollbar-thin scrollbar-thumb-purple-500/20 scrollbar-track-transparent",
          
          // Modal/backdrop
          modalBackdrop: "backdrop-blur-sm bg-slate-900/80",
          modalContent: `
            bg-slate-900/95 
            backdrop-blur-2xl 
            border border-purple-500/20
            shadow-[0_0_60px_rgba(168,85,247,0.3)]
            rounded-2xl
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
            <main className="min-h-screen">{children}</main>
            <Toaster richColors />
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}