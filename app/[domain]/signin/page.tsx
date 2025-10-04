import SigninForm from "@/components/forms/signin-form";

export default function Page() {
  return (
    <div className="flex size-full items-center justify-center">
      <SigninForm redirectUrl="/dashboard" />
    </div>
  );
}
