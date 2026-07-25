CREATE TABLE IF NOT EXISTS public.waitlist (
  id BIGSERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  university TEXT,
  position BIGSERIAL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

GRANT ALL ON public.waitlist TO anon, authenticated;

CREATE POLICY "anon_can_insert" ON public.waitlist
  FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "anon_can_select" ON public.waitlist
  FOR SELECT TO anon
  USING (true);

CREATE OR REPLACE FUNCTION public.set_waitlist_position()
RETURNS TRIGGER AS $$
BEGIN
  NEW.position = (SELECT COUNT(*) FROM public.waitlist) + 1;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS waitlist_set_position ON public.waitlist;
CREATE TRIGGER waitlist_set_position
BEFORE INSERT ON public.waitlist
FOR EACH ROW
EXECUTE FUNCTION public.set_waitlist_position();

INSERT INTO realtime.channels (pattern, description, enabled)
VALUES ('waitlist:new', 'New waitlist signups', true)
ON CONFLICT (pattern) DO UPDATE
SET description = EXCLUDED.description,
    enabled = EXCLUDED.enabled;

CREATE OR REPLACE FUNCTION public.notify_waitlist_new()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM realtime.publish(
    'waitlist:new',
    'new_signup',
    jsonb_build_object(
      'id', NEW.id,
      'email', NEW.email,
      'university', NEW.university,
      'position', NEW.position,
      'created_at', NEW.created_at
    )
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS waitlist_new_trigger ON public.waitlist;
CREATE TRIGGER waitlist_new_trigger
AFTER INSERT ON public.waitlist
FOR EACH ROW
EXECUTE FUNCTION public.notify_waitlist_new();
