export type Audience = "student" | "lecturer";

export type Feature = {
  id: string;
  audience: Audience;
  tag: string;
  tagNote: string;
  title: string;
  bg: string;
  summary: string;
  tagline: string;
  description: string;
  bullets: string[];
};

export const features: Feature[] = [
  // ---------- STUDENT SIDE ----------
  {
    id: "course-hub",
    audience: "student",
    tag: "Core",
    tagNote: "For every major",
    title: "Courses",
    bg: "bg-lime-400",
    summary:
      "Every syllabus, reading, and problem set lands in one timeline — auto-sorted by due date.",
    tagline: "Your whole course load, in one scroll.",
    description:
      "Courses pulls every class you're enrolled in into a single feed — assignments, readings, and grades sit next to each other instead of scattered across five different portals. No more digging through email threads to find the syllabus a professor sent in week one.",
    bullets: [
      "Auto-sorted deadline timeline across every enrolled course",
      "Grades and feedback synced the moment they're posted",
      "Missed-lecture recap: slides, recording link, and notes in one card",
      "Works offline — check what's due even with no signal on campus",
    ],
  },
  {
    id: "quizzes",
    audience: "student",
    tag: "Practice",
    tagNote: "Auto-generated",
    title: "Quizzes",
    bg: "bg-coral-400",
    summary:
      "Turn any lecture slide or reading into a practice quiz in seconds — built for how you actually study.",
    tagline: "Cram smarter, not longer.",
    description:
      "Quizzes reads whatever your lecturer uploads — slides, PDFs, readings — and turns it into practice questions automatically. Answer a set, see exactly which concepts you're shaky on, and get a fresh set targeting those gaps instead of guessing what to review the night before an exam.",
    bullets: [
      "One-tap quiz generation from any uploaded lecture material",
      "Spaced repetition so weak topics resurface until they stick",
      "Instant explanations, not just right/wrong marks",
      "Shareable quiz sets so your study group reviews the same material",
    ],
  },
  {
    id: "study-ai",
    audience: "student",
    tag: "AI",
    tagNote: "Built into every class",
    title: "Study AI",
    bg: "bg-lavender-400",
    summary:
      "An AI tutor that actually knows your syllabus — ask it anything about this week's lecture.",
    tagline: "The tutor that's read the same slides you have.",
    description:
      "Study AI is scoped to your actual course materials — not the open internet. Ask it to explain a concept from Tuesday's lecture, summarize a 40-page reading in a minute, or turn your notes into flashcards. It cites the exact slide or page it pulled from, so you can always double-check the source.",
    bullets: [
      "Ask questions about lecture slides, readings, or your own notes",
      "One-click summaries, flashcards, and outline generation",
      "Always cites the source material — no black-box answers",
      "Practice explaining concepts back, with gentle correction",
    ],
  },
  {
    id: "timetable",
    audience: "student",
    tag: "Schedule",
    tagNote: "Auto-synced",
    title: "Timetable",
    bg: "bg-teal-400",
    summary:
      "Your class schedule, deadlines, and campus events on one calendar that actually catches conflicts.",
    tagline: "Never double-book a lecture again.",
    description:
      "Timetable pulls your enrolled sections directly from the registrar and overlays deadlines, study sessions, and campus events on top. It flags overlaps before they become a problem — like a quiz and a club meeting scheduled for the same hour — and syncs to your phone's native calendar.",
    bullets: [
      "Auto-imported from your course enrollment — no manual entry",
      "Conflict detection for classes, deadlines, and events",
      "Syncs one-way to Google/Apple Calendar",
      "Room and building info with walking time between lectures",
    ],
  },
  {
    id: "buddies",
    audience: "student",
    tag: "Social",
    tagNote: "Matched by class",
    title: "Buddies",
    bg: "bg-lime-400",
    summary:
      "Find your study squad — matched by course, major, or dorm, not a random group chat.",
    tagline: "Study groups that form themselves.",
    description:
      "Buddies matches you with classmates actually taking the same course this semester — not a stale group chat from two years ago. Filter by study style, preferred meeting time, or whether you want in-person or virtual sessions, and Orbius handles the intro.",
    bullets: [
      "Matched by shared courses, major, or residence hall",
      "Filter by study style and preferred meeting times",
      "Built-in scheduling for recurring study sessions",
      "Optional — you're never auto-added to a group without asking",
    ],
  },
  {
    id: "campus-hub",
    audience: "student",
    tag: "Social",
    tagNote: "Real-time",
    title: "Campus Hub",
    bg: "bg-coral-400",
    summary:
      "Group chats, dorm feeds, and club threads without switching apps — organized by class and crew.",
    tagline: "Where your people already are.",
    description:
      "Campus Hub is the social layer sitting right next to your coursework — class group chats, dorm floor feeds, and club announcements in one place, organized automatically by what you're actually enrolled in or a member of.",
    bullets: [
      "Auto-joined class group chats, no invite links needed",
      "Dorm and club feeds separate from your academic timeline",
      "Read-receipt-free by default — no pressure to reply instantly",
      "Event RSVPs sync straight into your Timetable",
    ],
  },
  {
    id: "priority-access",
    audience: "student",
    tag: "Bonus",
    tagNote: "Skip the line",
    title: "Priority Access",
    bg: "bg-lavender-400",
    summary: "Refer 3 classmates and jump straight to the front of the closed beta.",
    tagline: "Bring your friends, skip the wait.",
    description:
      "Every referral moves you up the waitlist. Get 3 classmates to sign up with your link and you're bumped straight into Wave 01 — the closed beta — with direct access to the founding team's feedback channel.",
    bullets: [
      "Each confirmed referral moves your position up the list",
      "3 referrals unlocks Wave 01 closed beta, guaranteed",
      "Founding beta users get a direct line to the product team",
      "Track your referral progress live from the confirmation screen",
    ],
  },

  // ---------- LECTURER SIDE ----------
  {
    id: "course-overview",
    audience: "lecturer",
    tag: "Overview",
    tagNote: "All sections",
    title: "Course Overview & Hub",
    bg: "bg-teal-400",
    summary:
      "A unified view of active courses, upcoming lecture schedules, and real-time class status.",
    tagline: "Every section you teach, one screen.",
    description:
      "Course Overview & Hub gives you a single dashboard across every course and section you teach — who's enrolled, what's due this week, and which lecture is live right now. No more tab-switching between the LMS, email, and a spreadsheet to know where things stand.",
    bullets: [
      "Live status per section: upcoming, in progress, or wrapped",
      "Enrollment counts and roster changes surfaced automatically",
      "At-a-glance view of what's due across every course you run",
      "One dashboard for both in-person and virtual sections",
    ],
  },
  {
    id: "module-builder",
    audience: "lecturer",
    tag: "Build",
    tagNote: "Drag & drop",
    title: "Syllabus & Module Builder",
    bg: "bg-lime-400",
    summary:
      "Drag-and-drop course outline creator to upload lecture slides, reading lists, video links, and weekly goals.",
    tagline: "Build a semester in an afternoon.",
    description:
      "Lay out your course week by week with a drag-and-drop builder — drop in slide decks, reading lists, video links, and a weekly learning goal for each module. Reorder units as the semester shifts, and publish updates to every enrolled student instantly.",
    bullets: [
      "Drag-and-drop weekly modules with goals and learning outcomes",
      "Upload slides, readings, and video links directly into each week",
      "Duplicate a syllabus structure across sections or semesters",
      "Draft mode — build ahead without publishing to students yet",
    ],
  },
  {
    id: "resource-repository",
    audience: "lecturer",
    tag: "Storage",
    tagNote: "Version controlled",
    title: "Smart Resource Repository",
    bg: "bg-coral-400",
    summary:
      "Centralized storage for course materials, allowing version control and instant distribution to students' mobile and web feeds.",
    tagline: "One upload, every student's feed.",
    description:
      "Every slide deck, handout, and dataset lives in one versioned repository. Upload a corrected slide deck and it silently replaces the old version everywhere it's referenced — students always see the current file, and you can roll back if you catch a mistake after publishing.",
    bullets: [
      "Full version history for every uploaded file",
      "Instant push to students' mobile and web feeds on upload",
      "Organize by module, week, or resource type",
      "Roll back to a previous version in one click",
    ],
  },
  {
    id: "attendance-tracker",
    audience: "lecturer",
    tag: "Attendance",
    tagNote: "In-person or virtual",
    title: "Real-time Attendance Tracker",
    bg: "bg-lavender-400",
    summary:
      "QR-code check-ins, geotagged attendance options, or manual rosters for physical and virtual lectures.",
    tagline: "Attendance that takes itself.",
    description:
      "Project a QR code at the start of class and attendance logs itself as students check in on their phones. Add optional geotagging to confirm they're actually in the room, or fall back to a manual roster for smaller seminars and virtual sessions — all recorded the same way.",
    bullets: [
      "QR-code check-in, refreshed periodically to prevent proxy sign-ins",
      "Optional geotagging to confirm on-campus presence",
      "Manual roster mode for seminars, labs, or virtual lectures",
      "Attendance trends surfaced per student, not just a raw log",
    ],
  },
  {
    id: "broadcast-announcements",
    audience: "lecturer",
    tag: "Comms",
    tagNote: "Read-receipts",
    title: "Class Broadcast & Announcements",
    bg: "bg-teal-400",
    summary:
      "Send urgent updates directly to students' Orbius notifications, email, and class feeds with read-receipt tracking.",
    tagline: "Say it once, everyone sees it.",
    description:
      "Send a class cancellation, a deadline extension, or a room change once, and it lands simultaneously in students' Orbius notifications, email inbox, and class feed. Read-receipt tracking shows exactly who's seen it, so you know whether a follow-up reminder is actually needed.",
    bullets: [
      "One broadcast, delivered to app, email, and class feed at once",
      "Read-receipt tracking per student, visible on your dashboard",
      "Schedule announcements ahead of time or send instantly",
      "Priority flag for urgent updates that bypass notification mute",
    ],
  },
];

export const studentFeatures = features.filter((f) => f.audience === "student");
export const lecturerFeatures = features.filter((f) => f.audience === "lecturer");
