import { createAdminClient } from "@insforge/sdk";

function getAdmin() {
  const baseUrl = process.env.NEXT_PUBLIC_INSFORGE_URL;
  const apiKey = process.env.INSFORGE_API_KEY;

  if (!baseUrl) throw new Error("INSFORGE_URL not configured");
  if (!apiKey) throw new Error("INSFORGE_API_KEY not configured");

  return createAdminClient({ baseUrl, apiKey });
}

export async function POST(req: Request) {
  try {
    const adminClient = getAdmin();
    const { email, university } = await req.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ error: "Invalid email" }, { status: 400 });
    }

    const existing = await adminClient.database.from("waitlist").select("id").eq("email", email).maybeSingle();
    if (existing.data) {
      return Response.json({ error: "Already on the waitlist" }, { status: 409 });
    }

    const payload: Record<string, string> = { email };
    if (university && typeof university === "string") {
      payload.university = university.trim();
    }

    const { data, error } = await adminClient.database.from("waitlist").insert([payload]).select().single();
    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ data }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return Response.json({ error: message }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const adminClient = getAdmin();

    const { data, error } = await adminClient.database.from("waitlist").select("*").order("created_at", { ascending: false });
    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    const { count } = await adminClient.database.from("waitlist").select("*", { count: "exact", head: true });

    return Response.json({ data, count });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return Response.json({ error: message }, { status: 500 });
  }
}
