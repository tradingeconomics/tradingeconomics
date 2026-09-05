import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const envSchema = z.object({
    NODE_ENV: z
        .enum(["development", "production", "test"])
        .default("development"),
    PORT: z
        .string()
        .default("3000")
        .transform((val) => parseInt(val, 10))
        .refine(
            (val) => val > 0 && val < 65536,
            "PORT must be between 1 and 65535"
        ),
    API_KEY: z
        .string()
        .min(1, "API_KEY is required")
        .refine(
            (val) => val.includes(":"),
            "API_KEY should contain ':' separator"
        ),
    TRADING_ECONOMICS_BASE_URL: z
        .string()
        .min(1, "TRADING_ECONOMICS_BASE_URL is required")
        .refine(
            (val) => val.startsWith("https://"),
            "TRADING_ECONOMICS_BASE_URL should use HTTPS"
        ),
    MEXICO_ENDPOINT: z
        .string()
        .min(1, "MEXICO_ENDPOINT is required")
        .refine(
            (val) => val.startsWith("/"),
            "MEXICO_ENDPOINT should start with '/'"
        ),
    THAILAND_ENDPOINT: z
        .string()
        .min(1, "THAILAND_ENDPOINT is required")
        .refine(
            (val) => val.startsWith("/"),
            "THAILAND_ENDPOINT should start with '/'"
        ),
    ALLOWED_ORIGINS: z.string().optional(),
});

const parseResult = envSchema.safeParse(process.env);

if (!parseResult.success) {
    console.error("Environment validation failed:");
    console.error(
        "Please check your .env file and ensure all required variables are set correctly.\n"
    );

    parseResult.error.issues.forEach((issue) => {
        console.error(`  - ${issue.path.join(".")}: ${issue.message}`);
    });

    console.error("\nRequired environment variables:");
    console.error("  - API_KEY: Your Trading Economics API key");
    console.error(
        "  - TRADING_ECONOMICS_BASE_URL: Base URL for Trading Economics API"
    );
    console.error("  - MEXICO_ENDPOINT: Endpoint for Mexico data");
    console.error("  - THAILAND_ENDPOINT: Endpoint for Thailand data");

    process.exit(1);
}

export const env = parseResult.data;

export type Env = z.infer<typeof envSchema>;

console.log("Environment variables validated successfully");
console.log(`Starting application in ${env.NODE_ENV} mode on port ${env.PORT}`);
