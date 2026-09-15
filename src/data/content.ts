import type { Goal, Journey, PracticePrompt } from './types'

export const goals: Goal[] = [
  {
    id: 'speak-clearly',
    label: 'Speak with more clarity',
    description: 'Make your ideas easier to follow in rooms, calls, and interviews.',
  },
  {
    id: 'think-on-your-feet',
    label: 'Think on your feet',
    description: 'Build a calmer structure for quick answers and unexpected questions.',
  },
  {
    id: 'connect-easily',
    label: 'Connect more naturally',
    description: 'Turn small moments into conversations that feel like you.',
  },
]

export const communicationJourney: Journey = {
  id: 'communication',
  title: 'Communication',
  category: 'Everyday confidence',
  description: 'A five-lesson path for clearer, warmer conversations.',
  lessonCount: 5,
  lessons: [
    {
      id: 'lesson-1',
      order: 1,
      title: 'Start with presence',
      subtitle: 'Be calm and intentional',
      durationMinutes: 12,
      summary: 'Before the perfect words, create a moment people can actually hear.',
      outcomes: ['Use a calm opening', 'Create space before you speak', 'Choose one clear intention'],
      sections: [
        {
          heading: 'Presence is a choice',
          body: 'People notice the pace and energy you bring before they process every word. A slower start gives your message somewhere to land.',
        },
        {
          heading: 'Try the one-breath reset',
          body: 'Before you answer, take one comfortable breath and name the outcome you want. You do not need a performance; you need a direction.',
        },
      ],
      exercisePrompt: 'Say your next sentence after one relaxed breath. Notice what changes when you do not rush the opening.',
      quiz: {
        id: 'quiz-1',
        prompt: 'What is the purpose of a one-breath reset?',
        options: [
          { id: 'a', label: 'To sound more formal' },
          { id: 'b', label: 'To create a clear starting point' },
          { id: 'c', label: 'To avoid answering the question' },
        ],
        correctOptionId: 'b',
        explanation: 'A brief pause helps you choose a direction before you speak.',
      },
    },
    {
      id: 'lesson-2',
      order: 2,
      title: 'Introduce yourself with confidence',
      subtitle: 'Make a clear, confident impression',
      durationMinutes: 15,
      summary: 'Use a simple structure that makes introductions feel natural, not rehearsed.',
      outcomes: ['Use a simple 3-part introduction', 'Tailor your message', 'Avoid common mistakes'],
      sections: [
        {
          heading: 'Give people a handle',
          body: 'A good introduction gives someone three easy handles: who you are, what you do, and what you are curious about right now.',
        },
        {
          heading: 'Leave the door open',
          body: 'Finish with a detail that invites a response. The goal is not to deliver your biography; it is to make the next sentence easier for both of you.',
        },
      ],
      exercisePrompt: 'Draft a 20-second introduction using: who you are, what you do, and one detail you would enjoy discussing.',
      quiz: {
        id: 'quiz-2',
        prompt: 'Which introduction creates the clearest opening for a conversation?',
        options: [
          { id: 'a', label: 'Hi, I work in marketing and I need a new job.' },
          { id: 'b', label: 'Hey, I am Alex. I am here to meet people.' },
          { id: 'c', label: 'Hi, I help early-stage teams with marketing, and I am always curious about new ideas.' },
        ],
        correctOptionId: 'c',
        explanation: 'It covers who you are, what you do, and a detail that opens the conversation.',
      },
    },
    {
      id: 'lesson-3',
      order: 3,
      title: 'Ask better questions',
      subtitle: 'Show curiosity, not pressure',
      durationMinutes: 13,
      summary: 'Move beyond small talk with questions that feel easy to answer.',
      outcomes: ['Ask open questions', 'Follow the detail you hear', 'Avoid interview-mode'],
      sections: [
        {
          heading: 'Follow the energy',
          body: 'The most natural follow-up is usually inside the answer you just heard. Choose one detail and gently ask for the story behind it.',
        },
        {
          heading: 'Trade performance for curiosity',
          body: 'You do not need to find the most impressive question. You need to show that you were present for the answer.',
        },
      ],
      exercisePrompt: 'Take one recent answer someone gave you and write two follow-up questions that begin with “what” or “how”.',
      quiz: {
        id: 'quiz-3',
        prompt: 'What makes a follow-up question feel natural?',
        options: [
          { id: 'a', label: 'It responds to a detail the person just shared' },
          { id: 'b', label: 'It is as clever as possible' },
          { id: 'c', label: 'It changes the topic quickly' },
        ],
        correctOptionId: 'a',
        explanation: 'Specific attention makes curiosity feel genuine instead of scripted.',
      },
    },
    {
      id: 'lesson-4',
      order: 4,
      title: 'Navigate difficult conversations',
      subtitle: 'Stay respectful and clear',
      durationMinutes: 16,
      summary: 'Hold a clear boundary while keeping the other person in the conversation.',
      outcomes: ['Name the issue', 'Separate intent from impact', 'Offer a next step'],
      sections: [
        {
          heading: 'Name what is happening',
          body: 'A calm description of the moment keeps you from arguing about motives. Start with what you observed and what it changed.',
        },
        {
          heading: 'Make progress concrete',
          body: 'End with a small, specific next step. Clarity feels kinder when people know what can change from here.',
        },
      ],
      exercisePrompt: 'Write one sentence that describes a difficult moment without guessing the other person’s intent.',
      quiz: {
        id: 'quiz-4',
        prompt: 'What is a useful first move in a difficult conversation?',
        options: [
          { id: 'a', label: 'Describe the observable moment' },
          { id: 'b', label: 'List every past mistake' },
          { id: 'c', label: 'Wait until the issue disappears' },
        ],
        correctOptionId: 'a',
        explanation: 'Starting from what happened gives the conversation a shared reference point.',
      },
    },
    {
      id: 'lesson-5',
      order: 5,
      title: 'Build lasting connections',
      subtitle: 'Turn conversations into opportunities',
      durationMinutes: 14,
      summary: 'Keep the thread going with thoughtful follow-through.',
      outcomes: ['Remember the detail', 'Follow up with intention', 'Make the next invitation easy'],
      sections: [
        {
          heading: 'Make follow-through specific',
          body: 'A small reference to the conversation is more meaningful than a generic check-in. It shows that the exchange stayed with you.',
        },
        {
          heading: 'Give the next moment a shape',
          body: 'Offer one easy next step: a short call, a resource, or a shared question to continue exploring.',
        },
      ],
      exercisePrompt: 'Write a two-sentence follow-up that mentions one detail from a conversation and offers one simple next step.',
      quiz: {
        id: 'quiz-5',
        prompt: 'What makes a follow-up feel personal?',
        options: [
          { id: 'a', label: 'It uses the same message for everyone' },
          { id: 'b', label: 'It refers to a detail from the conversation' },
          { id: 'c', label: 'It is as long as possible' },
        ],
        correctOptionId: 'b',
        explanation: 'A specific detail signals that you were paying attention.',
      },
    },
  ],
}

export const practicePrompts: PracticePrompt[] = [
  {
    id: 'intro',
    title: 'Your 20-second introduction',
    prompt: 'Imagine you have just joined a small group. Introduce yourself in a way that makes the next question easy.',
    hints: ['Who you are', 'What you do', 'One detail you are curious about'],
  },
]
