import { GrammarCategory } from '../types';

export interface GrammarFact {
  id: number;
  title: string;
  category: GrammarCategory;
  rule: string;
  exampleCorrect: string;
  exampleIncorrect?: string;
  explanation: string;
  proTip?: string;
}

export const DAILY_GRAMMAR_FACTS: GrammarFact[] = [
  {
    id: 1,
    title: 'The Subjunctive "Were" with Wishes & Hypotheses',
    category: 'Conditionals',
    rule: 'In hypothetical conditionals and wishes ("if I were", "I wish I were"), always use "were" regardless of the subject (even with I, he, she, or it).',
    exampleCorrect: 'If she were the Prime Minister, she would reform education.',
    exampleIncorrect: 'If she was the Prime Minister, she would reform education.',
    explanation: 'The subjunctive mood expresses unreal or contrary-to-fact situations. Formal grammar strictly requires "were" over "was".',
    proTip: 'Remember: "If I were a bird..." not "If I was a bird..."',
  },
  {
    id: 2,
    title: '"Neither... Nor" Follows the Nearest Subject',
    category: 'Subject-Verb Agreement',
    rule: 'When subjects are connected by "either... or" or "neither... nor", the verb agrees in person and number with the subject closest to it.',
    exampleCorrect: 'Neither the manager nor the employees were informed.',
    exampleIncorrect: 'Neither the manager nor the employees was informed.',
    explanation: '"Employees" is plural and sits immediately adjacent to the verb, so the plural verb "were" is required.',
    proTip: 'Flip it: "Neither the employees nor the manager was informed" is also correct!',
  },
  {
    id: 3,
    title: 'Senior, Junior, Superior & Inferior Take "To"',
    category: 'Prepositions',
    rule: 'Latin comparatives ending in "-ior" (senior, junior, superior, inferior, anterior, posterior) are always followed by the preposition "to", never "than".',
    exampleCorrect: 'He is senior to me by three years in the civil service.',
    exampleIncorrect: 'He is senior than me by three years.',
    explanation: 'Comparative adjectives derived from Latin take "to". Similarly, "prefer" and "preferable" take "to", not "than".',
    proTip: 'Never say "prefer coffee than tea"; say "prefer coffee to tea".',
  },
  {
    id: 4,
    title: 'Universal Truths Never Change Tense in Narration',
    category: 'Narration',
    rule: 'When converting direct speech to indirect speech, universal truths, scientific facts, and habitual truths retain their present tense even if the reporting verb is in the past.',
    exampleCorrect: 'The teacher said that the Earth moves around the Sun.',
    exampleIncorrect: 'The teacher said that the Earth moved around the Sun.',
    explanation: 'Because the Earth continually revolves around the sun, shifting into past tense would falsely imply the action ceased.',
    proTip: 'The same applies to mathematical facts: "He said that two and two make four."',
  },
  {
    id: 5,
    title: 'Passive Voice with "Know" Requires "To", Not "By"',
    category: 'Voice Change',
    rule: 'Certain verbs in the passive voice take specific prepositions other than "by". "Know" takes "to", "satisfy" takes "with", "surprise" takes "at".',
    exampleCorrect: 'He is known to me.',
    exampleIncorrect: 'He is known by me.',
    explanation: 'The passive participle of "know" pairs conventionally with "to" when describing acquaintance or recognition.',
    proTip: 'Watch out: "Annoyed at/with", "Pleased with", "Shocked at", "Marveled at".',
  },
  {
    id: 6,
    title: 'The Inversion Rule with Negative Adverbs',
    category: 'Correction of Sentences',
    rule: 'When a negative or restrictive adverbial (hardly, scarcely, seldom, rarely, no sooner) begins a sentence, subject-auxiliary inversion is mandatory.',
    exampleCorrect: 'Hardly had he arrived when the torrential rain began.',
    exampleIncorrect: 'Hardly he had arrived when the rain began.',
    explanation: 'Fronting negative adverbs creates dramatic emphasis and shifts the auxiliary verb before the subject ("had he arrived").',
    proTip: 'Pairing rules: "No sooner... than", "Hardly / Scarcely... when".',
  },
  {
    id: 7,
    title: '"Lest" Always Pairs with "Should"',
    category: 'Parts of Speech',
    rule: '"Lest" means "for fear that" or "to avoid the risk of". It is inherently negative and must be followed by "should" (or the bare subjunctive verb). Never use "not" after lest.',
    exampleCorrect: 'Walk fast lest you should miss the morning train.',
    exampleIncorrect: 'Walk fast lest you should not miss the train.',
    explanation: 'Since "lest" already contains a negative meaning, adding "not" creates an incorrect double negative.',
    proTip: 'Modern subjunctive: "Walk fast lest you miss the train" is also acceptable.',
  },
  {
    id: 8,
    title: '"Die Of" vs "Die From" vs "Die For"',
    category: 'Prepositions',
    rule: 'Use "die of" for disease, starvation, or thirst. Use "die from" for external causes or indirect results (wound, overwork). Use "die for" for noble causes (country, belief).',
    exampleCorrect: 'The patriot died for his country, while the patient died of cholera.',
    exampleIncorrect: 'The patient died from cholera.',
    explanation: 'Appropriate prepositions with "die" depend strictly on the agent or motive of demise.',
    proTip: 'Also: "Die by" violence or poison; "Die in" an accident or bed.',
  },
  {
    id: 9,
    title: 'The Third Conditional Formula (Unfulfilled Past)',
    category: 'Conditionals',
    rule: 'Third conditional sentences reflect impossible past scenarios. Pattern: If + Past Perfect [had + V3], would have + V3.',
    exampleCorrect: 'If you had warned me earlier, I would have avoided the trap.',
    exampleIncorrect: 'If you would have warned me, I would have avoided the trap.',
    explanation: 'Never use "would have" inside the "if" clause. Keep "would have" in the result clause only.',
    proTip: 'Inverted style: "Had you warned me earlier, I would have avoided the trap."',
  },
  {
    id: 10,
    title: 'Gerund After Prepositional Phrases with "To"',
    category: 'Parts of Speech',
    rule: 'While infinitive "to" takes a base verb, prepositional idioms ending in "to" (look forward to, with a view to, be used to, accustomed to) must be followed by a Gerund (-ing).',
    exampleCorrect: 'I look forward to meeting you in Dhaka.',
    exampleIncorrect: 'I look forward to meet you in Dhaka.',
    explanation: 'Here, "to" is a genuine preposition governing an object noun/gerund, not part of the infinitive marker.',
    proTip: 'Common culprits: "with a view to learning", "addicted to smoking", "object to having".',
  },
  {
    id: 11,
    title: 'Subject Complement Pronoun Case',
    category: 'Parts of Speech',
    rule: 'In formal standard English, a pronoun following the linking verb "to be" functions as a predicate nominative and must be in the subjective case.',
    exampleCorrect: 'It is I who am responsible for organizing this tournament.',
    exampleIncorrect: 'It is me who is responsible for organizing this tournament.',
    explanation: 'Because "it" is linked through the copular verb "is", the nominative "I" is grammatically pure. Notice "who am" agrees with "I"!',
    proTip: 'Test it: "It was he who called", not "It was him who called".',
  },
  {
    id: 12,
    title: 'Uncountable Nouns Never Take "A/An" or Plural "-s"',
    category: 'Parts of Speech',
    rule: 'Nouns like advice, information, furniture, luggage, bread, poetry, and machinery are uncountable in English and cannot be made plural or preceded by "a/an".',
    exampleCorrect: 'He gave me a valuable piece of advice.',
    exampleIncorrect: 'He gave me many advices.',
    explanation: 'To express quantity with uncountable nouns, use partitive counters like "a piece of advice" or "two items of furniture".',
    proTip: 'Never say "sceneries" or "poetries"; use "scenery" and "poems / poetry".',
  },
  {
    id: 13,
    title: 'The Dangers of the Dangling Modifier',
    category: 'Correction of Sentences',
    rule: 'An introductory participial phrase must be logically followed immediately by the subject executing that action, otherwise it dangles.',
    exampleCorrect: 'Walking through the forest, the hiker spotted a rare owl.',
    exampleIncorrect: 'Walking through the forest, a rare owl was spotted by the hiker.',
    explanation: 'In the incorrect sentence, the owl appears to be walking through the forest!',
    proTip: 'Always ask: "Who is doing the action in the opening phrase?" Put that subject right after the comma.',
  },
  {
    id: 14,
    title: 'Collective Nouns: Singular vs Plural Sense',
    category: 'Subject-Verb Agreement',
    rule: 'Collective nouns (committee, jury, team, family) take a singular verb when acting as a unified body, but plural verbs when members act individually or disagree.',
    exampleCorrect: 'The committee has submitted its unanimous report.',
    exampleIncorrect: 'The jury has divided in their opinions.',
    explanation: 'When divided, members act as separate individuals: "The jury were divided in their opinions."',
    proTip: 'American English favors singular verbs; British English often uses plural for sports teams.',
  },
  {
    id: 15,
    title: 'Modal Verbs Take Bare Infinitives Without "To"',
    category: 'Parts of Speech',
    rule: 'Pure modal auxiliary verbs (can, could, will, would, shall, should, may, might, must) must be followed by the bare base form of the verb without "to" or inflections.',
    exampleCorrect: 'She must submit the report before noon.',
    exampleIncorrect: 'She must to submit the report before noon.',
    explanation: 'Modals never take "-s" in third person singular and never take infinitive "to".',
    proTip: 'Exceptions are semi-modals: "ought to" and "used to", which intrinsically contain "to".',
  },
  {
    id: 16,
    title: '"One of the..." Takes Plural Noun, but Singular Verb',
    category: 'Subject-Verb Agreement',
    rule: 'The construction "One of the + plural noun" takes a singular verb because the true syntactic subject is "One".',
    exampleCorrect: 'One of the candidates has been shortlisted for the scholarship.',
    exampleIncorrect: 'One of the candidates have been shortlisted.',
    explanation: '"Candidates" is the object of the preposition "of". The real subject is "One", which is singular.',
    proTip: 'Watch out for relative clauses: "He is one of the candidates who HAVE qualified" (here "who" refers to candidates)!',
  },
  {
    id: 17,
    title: 'Future Tense is Banned in Time and Condition Clauses',
    category: 'Tense',
    rule: 'In subordinate clauses of time (when, as soon as, before, after, until) and condition (if, unless), use the Simple Present tense instead of Future tense.',
    exampleCorrect: 'When he arrives in Chittagong, I will greet him.',
    exampleIncorrect: 'When he will arrive in Chittagong, I will greet him.',
    explanation: 'English syntax reserves "will/shall" for the main clause; the adverbial clause defaults to the present tense.',
    proTip: 'Same with "until": "Wait until the doctor arrives", never "until the doctor will arrive".',
  },
  {
    id: 18,
    title: '"Between" (Two) vs "Among" (Three or More)',
    category: 'Prepositions',
    rule: 'Generally, use "between" when referring to two distinct entities, and "among" when referring to an indistinct group of three or more.',
    exampleCorrect: 'The treaty was negotiated between the two neighboring nations.',
    exampleIncorrect: 'Divide the chocolates between all five children.',
    explanation: 'For five children, write "Divide the chocolates among all five children."',
    proTip: 'Nuance: "Between" CAN be used for 3+ when naming distinct, individual entities: "Trade between Bangladesh, India, and Nepal."',
  },
  {
    id: 19,
    title: 'Parallel Structure with Correlative Conjunctions',
    category: 'Parts of Speech',
    rule: 'Elements paired by "not only... but also", "both... and", and "either... or" must match in grammatical structure (noun with noun, verb with verb, etc.).',
    exampleCorrect: 'She is not only talented but also hardworking.',
    exampleIncorrect: 'She not only has talent but also is hardworking.',
    explanation: 'Parallelism ensures cadence and clarity: adjective paired with adjective.',
    proTip: 'Place the correlative words directly before the parallel items.',
  },
  {
    id: 20,
    title: 'The Quirks of "No Sooner Did / Had"',
    category: 'Tense',
    rule: 'When "No sooner" uses "did", the following verb must be bare infinitive (V1). When it uses "had", the following verb must be past participle (V3).',
    exampleCorrect: 'No sooner did the bell ring than the students left.',
    exampleIncorrect: 'No sooner did the bell rang than the students left.',
    explanation: 'The auxiliary "did" absorbs past tense, returning the main verb to base form.',
    proTip: '"No sooner had the bell RUNG..." vs "No sooner did the bell RING...". Both take "than"!',
  },
];

/**
 * Returns today's daily grammar fact deterministically based on today's calendar date.
 */
export function getDailyGrammarFact(dateOverride?: Date): GrammarFact {
  const d = dateOverride || new Date();
  // Generate consistent day hash from year, month, and day
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const dayOfYear = (year * 372) + (month * 31) + day;
  const index = Math.abs(dayOfYear) % DAILY_GRAMMAR_FACTS.length;
  return DAILY_GRAMMAR_FACTS[index];
}

/**
 * Returns a random grammar fact different from current one
 */
export function getRandomGrammarFact(excludeId?: number): GrammarFact {
  const candidates = excludeId
    ? DAILY_GRAMMAR_FACTS.filter((f) => f.id !== excludeId)
    : DAILY_GRAMMAR_FACTS;
  const index = Math.floor(Math.random() * candidates.length);
  return candidates[index];
}
