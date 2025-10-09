import SigninForm from "@/components/forms/signin-form";

export default function Page() {
  return (
    <div className="flex size-full items-center justify-center">
      <SigninForm redirectTo="/dashboard" />
    </div>
  );
}
