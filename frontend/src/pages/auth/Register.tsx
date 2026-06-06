import { useState } from "react";

import logo from "@/assets/logo_v2.png";
import { CustomInput } from "@/components/ui/CustomInput";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { Card, CardContent } from "@/components/ui/card";
import { Lock, Mail, User } from "lucide-react";
import { AlertCircle } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { FormField } from "@/components/auth/FormField";
import { AuthError, register as registerRequest } from "@/api/auth/authApi";

function Register() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!fullName.trim() || !email.trim() || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    try {
      await registerRequest({ fullName, email, password });
      navigate("/login", { replace: true });
    } catch (caughtError) {
      if (caughtError instanceof AuthError) {
        setError(caughtError.message);
      } else {
        setError("Unable to register. Please try again.");
      }
    } finally {
      setIsLoading(false);
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
                Create an account to manage your smart home energy.
              </p>
            </div>
          </div>

          <CardContent className="px-6 py-3">
            <form className="space-y-5" onSubmit={handleSubmit}>
              <FormField label="Full name">
                <CustomInput
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="John Doe"
                  disabled={isLoading}
                  icon={<User className="size-4" strokeWidth={1.75} />}
                />
              </FormField>

              <FormField label="Email Address">
                <CustomInput
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  disabled={isLoading}
                  icon={<Mail className="size-4" strokeWidth={1.75} />}
                />
              </FormField>

              <FormField label="Password">
                <CustomInput
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  autoComplete="new-password"
                  disabled={isLoading}
                  icon={<Lock className="size-4" strokeWidth={1.75} />}
                />
              </FormField>

              <FormField label="Confirm password">
                <CustomInput
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat password"
                  autoComplete="new-password"
                  disabled={isLoading}
                  icon={<Lock className="size-4" strokeWidth={1.75} />}
                />
              </FormField>

              {error ? (
                <p className="text-sm text-red-400" role="alert">
                  <AlertCircle className="size-4 inline-block mr-1" strokeWidth={1.75} />
                  {error}
                </p>
              ) : null}

              <PrimaryButton
                type="submit"
                disabled={isLoading || !email.trim() || !password || !fullName || !confirmPassword}
                className="mt-2 h-11 w-full rounded-xl text-sm"
              >
                {isLoading ? "Creating account..." : "Create account"}
              </PrimaryButton>
            </form>

            <p className="mt-6 text-center text-sm text-[#8C929F]">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-[#00E676]">
                Sign in
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export { Register };
