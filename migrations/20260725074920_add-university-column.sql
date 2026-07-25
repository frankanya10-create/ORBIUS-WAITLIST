ALTER TABLE public.waitlist ADD COLUMN IF NOT EXISTS university TEXT;

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
