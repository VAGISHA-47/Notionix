import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../context/ToastContext";
import { ArrowRight, Loader2, Check } from "lucide-react";

interface EmailCaptureProps {
  source?: string;
  plan?: string | null;
  testid?: string;
  cta?: string;
  dark?: boolean;
}

export const EmailCapture: React.FC<EmailCaptureProps> = ({
  source = "hero",
  plan = null,
  testid = "email-capture",
  cta = "Get started free",
  dark = false,
}) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (state === "loading") return;
    if (!email || !email.includes("@")) {
      toast("Invalid Email", "Please enter a valid email address.", "error");
      return;
    }
    setState("loading");
    
    // Simulate successful subscription
    setTimeout(() => {
      setState("done");
      toast("Subscribed!", "You're on the list — welcome to Notionix.", "success");
      setTimeout(() => {
        setState("idle");
        setEmail("");
        // Redirect to register screen
        navigate('/auth');
      }, 1000);
    }, 1200);
  };

  return (
    <form
      onSubmit={submit}
      data-testid={`${testid}-form`}
      className={`flex w-full max-w-md items-center gap-1.5 rounded-full border p-1.5 transition-colors duration-200 ${
        dark
          ? "border-white/15 bg-white/5 focus-within:border-white/30"
          : "border-slate-200 bg-white shadow-ambient focus-within:border-indigo-300"
      }`}
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@work.com"
        data-testid={`${testid}-input`}
        className={`min-w-0 flex-1 bg-transparent px-4 py-2 text-sm outline-none placeholder:text-slate-400 ${
          dark ? "text-white" : "text-slate-900"
        }`}
      />
      <button
        type="submit"
        disabled={state === "loading"}
        data-testid={`${testid}-submit`}
        className="group inline-flex shrink-0 items-center gap-1.5 rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-glow transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_46px_-6px_rgba(79,70,229,0.6)] active:scale-95 disabled:opacity-70"
      >
        {state === "loading" ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : state === "done" ? (
          <Check className="h-4 w-4" />
        ) : (
          <>
            <span className="hidden sm:inline">{cta}</span>
            <span className="sm:hidden">Join</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </>
        )}
      </button>
    </form>
  );
};
