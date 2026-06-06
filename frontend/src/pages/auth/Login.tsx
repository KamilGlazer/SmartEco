import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { AuthError } from "@/api/auth/authApi";
import logo from "@/assets/logo_v2.png";
import { CustomInput } from "@/components/ui/CustomInput";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { Lock, Mail } from "lucide-react";
import { AlertCircle } from "lucide-react";

function LoginField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-sm text-[#8C929F]">{label}</span>
      {children}
    </label>
  );
}

function Login() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    try {
      await login({ email, password });
      navigate("/", { replace: true });
    } catch (caughtError) {
      if (caughtError instanceof AuthError) {
        setError(caughtError.message);
        return;
      }

      setError("Unable to sign in. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#131313] px-4 py-10">
      <div className="w-full max-w-md space-y-8">
        <Card className="border-white/10 bg-[#161616] py-0 ring-0">
          <div className="flex flex-col items-center gap-4 text-center">
            <img src={logo} alt="SmartEco" className="w-56 pt-10" />
            <div className="space-y-1">
              
              <p className="text-sm text-[#8C929F]">
                Sign in to manage your smart home energy.
              </p>
            </div>
          </div>

          <CardContent className="px-6 py-3">
            <form className="space-y-5" onSubmit={handleSubmit}>
              <LoginField label="Email Address">
                <CustomInput
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  disabled={isLoading}
                  icon={<Mail className="size-4" strokeWidth={1.75} />}
                />
              </LoginField>

              <LoginField label="Password">
                <CustomInput
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  disabled={isLoading}
                  icon={<Lock className="size-4" strokeWidth={1.75} />}
                />
              </LoginField>

              {error ? (
                <p className="text-sm text-red-400" role="alert">
                  <AlertCircle className="size-4 inline-block mr-1" strokeWidth={1.75} />
                  {error}
                </p>
              ) : null}

              <PrimaryButton
                type="submit"
                disabled={isLoading || !email.trim() || !password}
                className="mt-2 h-11 w-full rounded-xl text-sm"
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </PrimaryButton>
            </form>

            <p className="mt-6 text-center text-sm text-[#8C929F]">
              Don&apos;t have an account?{" "}
              <span className="font-medium text-[#00E676]">
                Registration soon
              </span>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export { Login };
