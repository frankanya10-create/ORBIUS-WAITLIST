const DEFAULT_PASSWORD = "orbius2024";

export async function POST(req: Request) {
  try {
    const { password } = await req.json();
    const valid = process.env.DASHBOARD_PASSWORD || DEFAULT_PASSWORD;

    if (!password || password !== valid) {
      return Response.json({ ok: false, error: "Incorrect password" }, { status: 401 });
    }

    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
