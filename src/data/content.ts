export type MoodKey = 'tired 😵' | 'okay 😌' | 'overthinking 😭' | 'curious 👀' | ''

export const moods: { label: string; description: string; color: string }[] = [
  { label: 'tired 😵',        description: 'running on fumes',       color: '#f5e6da' },
  { label: 'okay 😌',         description: 'existing peacefully',    color: '#daf0e8' },
  { label: 'overthinking 😭', description: "brain won't stop",       color: '#e8e0f5' },
  { label: 'curious 👀',      description: 'in the mood to explore', color: '#fdf0d0' },
]

export const moodResponses: Record<string, string> = {
  'tired 😵':        "Then this is a soft place to land. No rush.",
  'okay 😌':         "Good. That kind of calm is rare. Let's keep it.",
  'overthinking 😭': "Let's give your brain something nicer to think about.",
  'curious 👀':      "Good. You're going to like what comes next.",
}

export const moodHeroSubtext: Record<string, string> = {
  'tired 😵':        "You don't have to do anything. Just read along.",
  'okay 😌':         'Good energy for this. Stay easy.',
  'overthinking 😭': "I made this carefully. You're in good hands.",
  'curious 👀':      "Okay, I'll try to keep up with your brain.",
  '':                'Just stay for a bit.',
}

export const vibeCards = [
  {
    id: 'cafe',
    title: 'Comfort café dates',
    emoji: '☕',
    reaction: "This honestly feels the most 'us'. No notes.",
    color: '#f5e6da',
  },
  {
    id: 'walks',
    title: 'Random walks',
    emoji: '🚶‍♀️',
    reaction: 'I think this is where I like you the most.',
    color: '#daf0e8',
  },
  {
    id: 'talks',
    title: 'Deep talks at night',
    emoji: '🌙',
    reaction: "This is our most dangerous category and we both know it 😭",
    color: '#e8e0f5',
  },
  {
    id: 'gala',
    title: 'Chaotic gala moments',
    emoji: '✨',
    reaction: "We would 100% get lost and call it an adventure.",
    color: '#fdf0d0',
  },
]

export const timeline = [
  {
    id: 1,
    label: 'Bumble, of all places 🐝',
    note: 'The algorithm did something right for once.',
    emoji: '🐝',
    rotation: -2,
    isLast: false,
  },
  {
    id: 2,
    label: 'The quiet talking phase',
    note: 'Little to no talking. But you stayed on my mind.',
    emoji: '💬',
    rotation: 1.5,
    isLast: false,
  },
  {
    id: 3,
    label: 'January 23, 2026',
    note: 'We got back. This is when things started to feel real.',
    emoji: '📅',
    rotation: -1,
    isLast: false,
  },
  {
    id: 4,
    label: '1,000 hours of your life',
    note: "I asked. You didn't say no. That meant everything.",
    emoji: '⏱️',
    rotation: 2,
    isLast: false,
  },
  {
    id: 5,
    label: 'The dates',
    note: 'One, two, three, four… each one better than the last.',
    emoji: '☕',
    rotation: -1.5,
    isLast: false,
  },
  {
    id: 6,
    label: 'Date 5. This moment 😄',
    note: 'You reading this right now.',
    emoji: '✨',
    rotation: 1,
    isLast: true,
  },
]

export type ComfortPrompt = {
  question: string
  microcopy: string
}

export const prompts: ComfortPrompt[] = [
  {
    question: 'What kind of future feels peaceful to you?',
    microcopy: "okay this one's kinda deep 😭",
  },
  {
    question: 'What kind of love feels safe?',
    microcopy: 'no surface answers please',
  },
  {
    question: 'What makes you feel most appreciated?',
    microcopy: 'genuine question',
  },
  {
    question: "What's your ideal slow day?",
    microcopy: 'be specific. I want to know.',
  },

  {
    question: 'What does a really good conversation feel like to you?',
    microcopy: 'you already know mine includes you',
  },
]

export const notes = [
  { text: 'I like how emotionally aware you are.',       sub: "It's rarer than people think."     },
  { text: 'I like hearing your random kwentos 😆',       sub: 'Every single one.'                  },
  { text: 'I like how calm things feel around you.',     sub: 'You have this quiet gravity.'        },
  { text: 'I like how real our conversations get.',      sub: 'No performance. Just us.'            },
  { text: 'I like that you take things seriously.',      sub: 'The right things, specifically.'     },
  { text: 'I like the way you think.',                  sub: 'It shows in everything.'             },
]

export const traits = [
  { emoji: '🤍', text: 'Kind, and genuinely cares about the people around her.' },
  { emoji: '🙏', text: 'Has a beautiful relationship with God.' },
  { emoji: '🌟', text: 'Passionate in her dreams.' },
  { emoji: '😷', text: 'Wears a facemask while traveling. It helps her sleep on the go.' },
  { emoji: '⚡', text: 'Loves the adrenaline. Chases adventure.' },
  { emoji: '👁️', text: 'Notices things most people justt ignore.' },
  { emoji: '🫂', text: 'Has friends from every chapter of her life.' },
  { emoji: '🍗', text: 'Thigh part of the chicken. Non-negotiable.' },
  { emoji: '🩷', text: 'Pink is her color.' },
  { emoji: '🥞', text: 'Puffyn and Tasty pancakes with a LOT of syrup. haha!' },
  { emoji: '👨‍👩‍👧', text: 'Looks up to her sister. Loves her family deeply.' },
  { emoji: '🥦', text: 'Loves cauliflower and ampalaya - but only when her mom makes it. (wen ko kaya matikman din :>)' },
  { emoji: '🍟', text: 'Potato Corner loyalist.' },
  { emoji: '🍈', text: 'Melon, strawberry, buko. Certified fruit girlie.' },
  { emoji: '🥡', text: 'She really wants to try chopsuey. With a lot of cauliflower.' },
]

export const finalMessages = {
  yes: {
    headline: "okay. then let's figure this out together.",
    body: 'No grand plans. No pressure. Just us being intentional about this.',
    sub: 'Thank you for trusting this.',
  },
  slow: {
    headline: "That's okay. Good things are worth understanding slowly.",
    body: "No rush, no pressure — I'll still be here whenever you're ready.",
    sub: 'And honestly? I respect that.',
  },
}
