import { NextResponse } from "next/server";

export async function GET() {
    try {
        // Gọi API backend để lấy Google Auth URL
        const googleAuthUrl = "http://localhost:8080/api/auth/google";

        return NextResponse.json({
            url: googleAuthUrl,
            message: "Google Auth URL generated successfully"
        });
    } catch (error) {
        console.error("Error generating Google Auth URL:", error);
        return NextResponse.json(
            { error: "Failed to generate Google Auth URL" },
            { status: 500 }
        );
    }
}