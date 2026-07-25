import { createAdminClient } from "@insforge/sdk";

let admin: ReturnType<typeof createAdminClient>;

function getAdmin() {
  if (!admin) {
    admin = createAdminClient({
      baseUrl: process.env.NEXT_PUBLIC_INSFORGE_URL!,
      apiKey: process.env.INSFORGE_API_KEY!,
    });
  }
  return admin;
}

export async function POST(req: Request) {
  try {
    const adminClient = getAdmin();
    const { email } = await req.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ error: "Invalid email" }, { status: 400 });
    }

    const existing = await adminClient.database.from("waitlist").select("id").eq("email", email).maybeSingle();
    if (existing.data) {
      return Response.json({ error: "Already on the waitlist" }, { status: 409 });
    }

    const referralCode = email.split("@")[0]?.replace(/[^a-zA-Z0-9]/g, "").slice(0, 8).toLowerCase() + "-" + Math.random().toString(36).slice(2, 6);

    const { data, error } = await adminClient.database.from("waitlist").insert([{ email, referral_code: referralCode }]).select().single();

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ data }, { status: 201 });
  } catch {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const adminClient = getAdmin();
    const { data, error } = await adminClient.database.from("waitlist").select("*").order("created_at", { ascending: false });

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    const { count } = await adminClient.database.from("waitlist").select("*", { count: "exact", head: true });

    return Response.json({ data, count });
  } catch {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
