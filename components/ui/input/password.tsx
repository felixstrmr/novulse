"use client";

import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function PasswordInput({
  ...props
}: React.ComponentProps<"input">) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="relative">
      <Input
        className="bg-background"
        id="password-toggle"
        placeholder="Enter your password"
        type={showPassword ? "text" : "password"}
        {...props}
      />
      <Button
        className="absolute top-0 right-0 h-full px-3 hover:bg-transparent"
        onClick={() => setShowPassword(!showPassword)}
        size="icon"
        type="button"
        variant="ghost"
      >
        {showPassword ? (
          <EyeOffIcon className="size-4 text-muted-foreground" />
        ) : (
          <EyeIcon className="size-4 text-muted-foreground" />
        )}
      </Button>
    </div>
  );
}
