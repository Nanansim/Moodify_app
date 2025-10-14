export const PHASES = [
  {
    name: "Menstruation",
    range: [1, 5],
    hormones: "Estrogen and progesterone are at their lowest.",
    keywords: ["rest", "soothe", "nourish"],
    suggestions: {
      body: "Prioritize comfort rituals—think gentle yoga, warm baths, and iron-rich foods.",
      mind: "Journal how your body feels today and release expectations.",
      connection: "Communicate your energy levels honestly with friends and coworkers."
    }
  },
  {
    name: "Follicular",
    range: [6, 12],
    hormones: "Estrogen rises, bringing clarity and motivation.",
    keywords: ["create", "plan", "expand"],
    suggestions: {
      body: "Take advantage of rising energy with a new workout or skill.",
      mind: "Map out goals for the week while the brain is razor sharp.",
      connection: "Schedule collaborative sessions or catch-ups."
    }
  },
  {
    name: "Ovulation",
    range: [13, 16],
    hormones: "Estrogen peaks and a splash of testosterone amps confidence.",
    keywords: ["shine", "connect", "celebrate"],
    suggestions: {
      body: "Lean into social workouts or celebratory meals.",
      mind: "Share ideas, present, or pitch while communication flows.",
      connection: "Plan dates, networking, or group hangs." 
    }
  },
  {
    name: "Luteal",
    range: [17, 28],
    hormones: "Progesterone leads; energy slows but intuition deepens.",
    keywords: ["ground", "refine", "nest"],
    suggestions: {
      body: "Opt for strength + stretch, and magnesium-rich recipes.",
      mind: "Review ongoing projects, tidy loose ends.",
      connection: "Host cozy nights in or set boundaries for downtime."
    }
  }
];

export const MOODS = [
  {
    id: "radiant",
    title: "Radiant",
    tone: "sunny",
    affirmation: "I glow from the inside out today."
  },
  {
    id: "focused",
    title: "Focused",
    tone: "calm",
    affirmation: "My attention is my superpower."
  },
  {
    id: "sensitive",
    title: "Sensitive",
    tone: "soft",
    affirmation: "I honor every wave of feeling."
  },
  {
    id: "creative",
    title: "Creative",
    tone: "playful",
    affirmation: "Ideas flow freely through me."
  }
];
