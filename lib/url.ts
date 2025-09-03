import { env } from "./env";

const protocol = env.NODE_ENV === "production" ? "https" : "http";

export const baseUrl = `${protocol}://${env.VERCEL_PROJECT_PRODUCTION_URL}`;
