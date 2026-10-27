"use client";

import { useActionState, useState } from "react";
import { Eye, EyeOff, Lock, ShieldAlert } from "lucide-react";
import { ActionResponse, loginAction } from "../actions";

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState<
    ActionResponse | null,
    FormData
  >(loginAction, null);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form action={formAction} className="mt-8 space-y-6">
      {state?.error && (
        <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800 animate-in fade-in">
          <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
          <span>{state.error}</span>
        </div>
      )}

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-semibold text-gray-700"
        >
          Palavra-passe de Administrador
        </label>
        <div className="relative mt-2">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            required
            autoComplete="current-password"
            placeholder="••••••••••••"
            className="block w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-10 text-gray-900 placeholder-gray-400 shadow-xs focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 sm:text-sm"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 focus:outline-none"
            aria-label={
              showPassword ? "Ocultar palavra-passe" : "Mostrar palavra-passe"
            }
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="flex w-full justify-center rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPending ? "A verificar..." : "Entrar no Backoffice"}
      </button>
    </form>
  );
}
