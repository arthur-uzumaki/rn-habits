import { z } from 'zod'

const envSchema = z.object({
  EXPO_PUBLIC_WEB_CLIENT_ID: z.string(),
  EXPO_PUBLIC_ANDROID_CLIENT_ID: z.string(),
  EXPO_PUBLIC_IOS_CLIENT_ID: z.string(),
  EXPO_PUBLIC_ACCESS_TOKEN: z.string(),
})

export const env = envSchema.parse(process.env)
