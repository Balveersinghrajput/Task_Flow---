// app/sign-up/[[...sign-up]]/page.jsx
'use client';

import { useSignUp } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CustomSignUpPage() {
  const { signUp, setActive } = useSignUp();
  const router = useRouter();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [code, setCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [canResend, setCanResend] = useState(true);
  const [resendTimer, setResendTimer] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Create sign up
      const result = await signUp.create({
        emailAddress: email,
        password: password,
        firstName: firstName || undefined,
        lastName: lastName || undefined,
      });

      console.log("Sign up result:", result);

      // If sign up is complete, proceed
      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        // Redirect to onboarding - middleware will handle org check
        router.push("/onboarding");
        return;
      }

      // If email verification is required
      if (result.status === "missing_requirements") {
        const needsEmailVerification = result.unverifiedFields?.includes("email_address");
        
        if (needsEmailVerification) {
          try {
            await signUp.prepareEmailAddressVerification({ 
              strategy: "email_code" 
            });
            setVerifying(true);
          } catch (verifyError) {
            console.error("Email verification preparation error:", verifyError);
            
            // Check if it's a strategy error
            if (verifyError.errors?.[0]?.code === "form_param_value_invalid") {
              setError("Email verification is configured differently. Please contact support or use Google sign-in.");
            } else {
              setError(verifyError.errors?.[0]?.message || "Failed to prepare email verification.");
            }
          }
        } else {
          // Try to complete without verification
          try {
            await setActive({ session: result.createdSessionId });
            router.push("/onboarding");
          } catch (activeError) {
            console.error("Set active error:", activeError);
            setError("Failed to complete sign up. Please try again.");
          }
        }
      }
    } catch (err) {
      console.error("Sign-up error:", err);
      const errorMessage = err.errors?.[0]?.message || err.message || "Failed to sign up. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signUp.attemptEmailAddressVerification({ code });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/onboarding");
      } else {
        setError("Verification incomplete. Please try again.");
      }
    } catch (err) {
      console.error("Verification error:", err);
      setError(err.errors?.[0]?.message || "Invalid verification code.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!canResend) return;
    
    setCanResend(false);
    setResendTimer(60);
    
    const countdown = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    try {
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setError(""); // Clear any previous errors
    } catch (err) {
      console.error("Resend error:", err);
      setError("Failed to resend code. Please try again.");
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      await signUp.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: `${window.location.origin}/sso-callback`,
        redirectUrlComplete: `${window.location.origin}/onboarding`,
      });
    } catch (err) {
      console.error("Google sign-up error:", err);
      setError("Failed to sign up with Google. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 relative bg-slate-950">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 sm:top-20 sm:left-20 w-64 h-64 sm:w-96 sm:h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 sm:bottom-20 sm:right-20 w-72 h-72 sm:w-[500px] sm:h-[500px] bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:40px_40px] sm:bg-[size:60px_60px] pointer-events-none"></div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 md:mb-10">
          {/* Logo */}
          <div className="inline-flex items-center justify-center mb-4 sm:mb-6">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 blur-2xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-blue-600 via-blue-500 to-purple-600 flex items-center justify-center shadow-2xl shadow-blue-500/30 border border-blue-400/20">
                <svg className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 px-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              {verifying ? "Verify Your Email" : "Join Task-Flow"}
            </span>
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm md:text-base px-4">
            {verifying ? "Enter the 6-digit code sent to your email" : "Create your account and start managing projects"}
          </p>

          <div className="mt-4 sm:mt-6 flex items-center justify-center gap-2 sm:gap-3">
            <div className="w-8 sm:w-12 h-[2px] bg-gradient-to-r from-transparent via-blue-500/50 to-blue-500/50"></div>
            <div className="w-2 h-2 rounded-full bg-blue-500/50 animate-pulse"></div>
            <div className="w-8 sm:w-12 h-[2px] bg-gradient-to-l from-transparent via-blue-500/50 to-blue-500/50"></div>
          </div>
        </div>

        {/* Form Card */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
          
          <div className="relative bg-slate-900/90 backdrop-blur-2xl rounded-2xl border border-slate-800/50 shadow-2xl p-5 sm:p-6 md:p-8">
            {error && (
              <div className="mb-5 sm:mb-6 p-3 sm:p-4 rounded-xl bg-red-500/10 border border-red-500/20 backdrop-blur-sm">
                <div className="flex items-start gap-2 sm:gap-3">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-red-400 text-xs sm:text-sm">{error}</p>
                </div>
              </div>
            )}

            {!verifying ? (
              <>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-slate-300 mb-2">
                        First Name <span className="text-slate-500">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="John"
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-slate-100 text-sm sm:text-base placeholder:text-slate-500 focus:outline-none focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20 focus:bg-slate-800/80 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-slate-300 mb-2">
                        Last Name <span className="text-slate-500">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Doe"
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-slate-100 text-sm sm:text-base placeholder:text-slate-500 focus:outline-none focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20 focus:bg-slate-800/80 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-slate-300 mb-2">Email Address</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-slate-100 text-sm sm:text-base placeholder:text-slate-500 focus:outline-none focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20 focus:bg-slate-800/80 transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-slate-300 mb-2">Password</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-2.5 sm:py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-slate-100 text-sm sm:text-base placeholder:text-slate-500 focus:outline-none focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20 focus:bg-slate-800/80 transition-all"
                        required
                        minLength={8}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center text-slate-500 hover:text-blue-400 transition-colors"
                      >
                        {showPassword ? (
                          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        )}
                      </button>
                    </div>
                    <p className="mt-2 text-xs text-slate-500">Must be at least 8 characters</p>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="relative w-full group overflow-hidden rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 transition-all duration-300 group-hover:scale-105"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                    <span className="relative flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-3 text-white font-semibold text-sm sm:text-base">
                      {loading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-4 w-4 sm:h-5 sm:w-5 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Creating Account...
                        </>
                      ) : (
                        <>
                          Create Account
                          <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </>
                      )}
                    </span>
                  </button>
                </form>

                <div className="relative my-5 sm:my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-700/50"></div>
                  </div>
                  <div className="relative flex justify-center text-xs sm:text-sm">
                    <span className="px-3 sm:px-4 bg-slate-900/90 text-slate-500 font-medium">Or continue with</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleGoogleSignUp}
                  className="w-full flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3 bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 hover:border-slate-600 rounded-xl text-slate-200 font-semibold text-xs sm:text-sm md:text-base transition-all hover:scale-[1.01] active:scale-[0.99] group"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span>Sign up with Google</span>
                </button>

                <p className="mt-5 sm:mt-6 text-center text-xs sm:text-sm text-slate-400">
                  Already have an account?{' '}
                  <Link href="/sign-in" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
                    Sign in
                  </Link>
                </p>
              </>
            ) : (
              <>
                <form onSubmit={handleVerify} className="space-y-5 sm:space-y-6">
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-slate-300 mb-3 text-center">
                      Verification Code
                    </label>
                    <input
                      type="text"
                      value={code}
                      onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      placeholder="000000"
                      maxLength={6}
                      className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-slate-800/50 border border-slate-700/50 rounded-xl text-slate-100 text-xl sm:text-2xl text-center font-mono tracking-wider sm:tracking-widest placeholder:text-slate-600 focus:outline-none focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20 focus:bg-slate-800/80 transition-all"
                      required
                      autoFocus
                    />
                    <p className="mt-3 text-xs text-slate-500 text-center">
                      We sent a code to <span className="text-blue-400 font-medium">{email}</span>
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={loading || code.length !== 6}
                    className="relative w-full group overflow-hidden rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 transition-all duration-300 group-hover:scale-105"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                    <span className="relative flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-3 text-white font-semibold text-sm sm:text-base">
                      {loading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-4 w-4 sm:h-5 sm:w-5 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Verifying...
                        </>
                      ) : (
                        <>
                          Verify Email
                          <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </>
                      )}
                    </span>
                  </button>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={handleResendCode}
                      disabled={!canResend}
                      className="text-xs sm:text-sm text-slate-400 hover:text-blue-400 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {canResend ? (
                        <>Didn't receive the code? <span className="text-blue-400">Resend</span></>
                      ) : (
                        <>Resend code in {resendTimer}s</>
                      )}
                    </button>
                  </div>
                </form>

                <button
                  type="button"
                  onClick={() => {
                    setVerifying(false);
                    setCode("");
                    setError("");
                  }}
                  className="mt-5 sm:mt-6 w-full flex items-center justify-center gap-2 px-4 py-2 sm:py-3 text-xs sm:text-sm text-slate-400 hover:text-slate-300 transition-colors"
                >
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to sign up
                </button>
              </>
            )}
          </div>
        </div>

        <p className="mt-6 sm:mt-8 text-center text-xs text-slate-500 px-4">
          By signing up, you agree to our{' '}
          <Link href="/terms" className="text-blue-400 hover:text-blue-300 transition-colors">Terms of Service</Link>
          {' '}and{' '}
          <Link href="/privacy" className="text-blue-400 hover:text-blue-300 transition-colors">Privacy Policy</Link>
        </p>
      </div>
    </div>
  );
}