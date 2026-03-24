export const env = {
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL?.trim() || "",
  supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY?.trim() || "",
  resendFromEmail: import.meta.env.VITE_PUBLIC_FROM_EMAIL?.trim() || "",
};

export function hasPhaseBBackend() {
  return Boolean(env.supabaseUrl && env.supabaseAnonKey);
}

export function edgeFunctionUrl(name: string) {
  return `${env.supabaseUrl.replace(/\/$/, "")}/functions/v1/${name}`;
}
