export async function POST(req: Request) {
  try {
    const { password } = await req.json();
    const valid = process.env.DASHBOARD_PASSWORD;

    if (!valid || password !== valid) {
      return Response.json({ ok: false }, { status: 401 });
    }

    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false }, { status: 500 });
  }
}
