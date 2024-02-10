import { env } from "@/env.mjs"

import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export function createClient(cookieStore: ReturnType<typeof cookies>) {
  return createServerClient(
    `https://${env.NEXT_PUBLIC_SUPABASE_PROJECT_REF}.supabase.co`,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
  )
}

const supabaseServerClient = () => {
  const cookieStore = cookies()
  return createClient(cookieStore)
}

export default supabaseServerClient
