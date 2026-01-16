import SigninForm from "@/components/forms/signin-form";

export default function Signin({
  params,
}: {
  params: Promise<{ domain: string }>;
}) {
  return <SigninForm redirectTo="/agent" />;
}
