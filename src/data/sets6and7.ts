import { ModelQuestionSet } from '../types';

export const modelQuestionSets6and7: ModelQuestionSet[] = [
  {
    id: 6,
    title: 'Model Question 6',
    subtitle: 'English Grammar Competence - Set 6',
    description: 'Collective nouns, mixed conditionals, inversion, dangling modifiers, causative verbs, and redundancy elimination.',
    totalQuestions: 25,
    questions: [
      {
        id: 1,
        question: 'The jury ____ divided in their opinions regarding the credibility of the key witness.',
        options: { A: 'was', B: 'were', C: 'is', D: 'has been' },
        correctAnswer: 'B',
        topic: 'Subject-Verb Agreement (Collective noun with divided opinion → plural verb)',
        explanation: 'When members of a collective noun (like jury, committee, council) act individually or hold differing/divided opinions ("divided in their opinions"), the noun takes a plural verb ("were").'
      },
      {
        id: 2,
        question: 'Ten years ____ since the groundbreaking discovery was announced at the international summit.',
        options: { A: 'passed', B: 'have passed', C: 'had passed', D: 'pass' },
        correctAnswer: 'B',
        topic: 'Tense & Aspect (Present Perfect with since clause)',
        explanation: 'When "since" is used as a conjunction introducing a time reference in the past simple ("since the discovery was announced"), the main clause takes the present perfect tense ("have passed").'
      },
      {
        id: 3,
        question: 'The company was exempted ____ paying taxes due to its contributions ____ charitable causes.',
        options: { A: 'from; to', B: 'of; for', C: 'with; to', D: 'from; for' },
        correctAnswer: 'A',
        topic: 'Appropriate Prepositions (exempted from, contribution to)',
        explanation: 'The appropriate preposition after "exempted" is "from" (exempted from paying taxes), and the noun "contribution" takes "to" (contributions to charitable causes).'
      },
      {
        id: 4,
        question: '____ Amazon is ____ longest river in South America by discharge volume.',
        options: { A: 'The; the', B: '[no article]; the', C: 'The; a', D: 'An; the' },
        correctAnswer: 'A',
        topic: 'Article Usage (The with rivers; superlative the longest)',
        explanation: 'Names of rivers take the definite article "The" ("The Amazon"), and superlative adjectives also require "the" ("the longest").'
      },
      {
        id: 5,
        question: 'Select the correct passive form: "They expect us to deliver the results before sundown."',
        options: {
          A: 'We are expected to deliver the results before sundown.',
          B: 'It is expected us to deliver the results before sundown.',
          C: 'We were expected to deliver the results before sundown.',
          D: 'Delivery of results is expected before sundown.'
        },
        correctAnswer: 'A',
        topic: 'Passive Voice Transformation (Active infinitive object → subject passive)',
        explanation: '"They expect us..." in the present tense transforms into passive voice as "We are expected to deliver the results before sundown."'
      },
      {
        id: 6,
        question: 'Select the correct indirect speech: She said, "Shall I open the window for some fresh air?"',
        options: {
          A: 'She asked if she shall open the window for some fresh air.',
          B: 'She asked whether she should open the window for some fresh air.',
          C: 'She said that she would open the window for some fresh air.',
          D: 'She inquired if she will open the window for some fresh air.'
        },
        correctAnswer: 'B',
        topic: 'Indirect Speech (Reporting suggestions/offers with whether... should)',
        explanation: 'In indirect questions offering or suggesting an action ("Shall I...?"), "shall" changes to "should" and is reported with "asked whether/if she should open...".'
      },
      {
        id: 7,
        question: 'If he ____ the requisite skills during his training, he would hold a senior position today.',
        options: { A: 'acquired', B: 'had acquired', C: 'acquires', D: 'has acquired' },
        correctAnswer: 'B',
        topic: 'Mixed Conditionals (Past unreal condition → Present result)',
        explanation: 'This is a mixed conditional where a past unreal condition ("had acquired" during training) produces a present hypothetical result ("would hold a senior position today").'
      },
      {
        id: 8,
        question: 'He talks about quantum mechanics as though he ____ a Nobel laureate in physics.',
        options: { A: 'is', B: 'was', C: 'were', D: 'has been' },
        correctAnswer: 'C',
        topic: 'Unreal Past / Subjunctive (as though + were)',
        explanation: 'After "as though" / "as if" expressing an untrue or hypothetical condition, the subjunctive mood requires "were" regardless of the singular subject.'
      },
      {
        id: 9,
        question: 'Little ____ that the innocent statement would ignite such a heated political controversy.',
        options: {
          A: 'the minister suspected',
          B: 'did the minister suspect',
          C: 'had the minister suspect',
          D: 'the minister did suspect'
        },
        correctAnswer: 'B',
        topic: 'Subject-Auxiliary Inversion (Little did the minister suspect...)',
        explanation: 'When a negative or restrictive adverb like "Little" begins a sentence, subject-auxiliary inversion is mandatory: auxiliary "did" + subject "the minister" + base verb "suspect".'
      },
      {
        id: 10,
        question: 'Effective leadership requires setting clear goals, inspiring team members, and ____ accountable for outcomes.',
        options: {
          A: 'holding oneself',
          B: 'to hold oneself',
          C: 'one holds oneself',
          D: 'hold oneself'
        },
        correctAnswer: 'A',
        topic: 'Parallel Structure (Series of gerunds: setting, inspiring, holding)',
        explanation: 'Parallel structure requires coordinating elements in the same grammatical form: gerunds "setting...", "inspiring...", and "holding...".'
      },
      {
        id: 11,
        question: 'Choose the grammatically correct sentence:',
        options: {
          A: 'Exhausted from the long hike, a cool drink refreshed the traveler.',
          B: 'Exhausted from the long hike, the traveler felt refreshed by a cool drink.',
          C: 'Exhausted from the long hike, it was a cool drink that refreshed the traveler.',
          D: 'Feeling exhausted from the long hike, a cool drink was consumed by the traveler.'
        },
        correctAnswer: 'B',
        topic: 'Dangling / Misplaced Modifiers (Modifier aligns with subject traveler)',
        explanation: 'The introductory participial modifier "Exhausted from the long hike" must logically modify the human subject ("the traveler"), not the inanimate "cool drink".'
      },
      {
        id: 12,
        question: 'The committee will interview three applicants, all of ____ have extensive experience in renewable energy.',
        options: { A: 'who', B: 'whom', C: 'which', D: 'whose' },
        correctAnswer: 'B',
        topic: 'Pronoun Case (all of whom as prepositional object for humans)',
        explanation: 'Prepositions require objective case relative pronouns for persons. After "all of", "whom" is grammatically required ("all of whom").'
      },
      {
        id: 13,
        question: 'The audit team recommended ____ all outdated financial ledger records immediately.',
        options: { A: 'to archive', B: 'archiving', C: 'archive', D: 'archived' },
        correctAnswer: 'B',
        topic: 'Non-Finite Verbs / Gerunds (recommend + V-ing)',
        explanation: 'The verb "recommend" directly takes a gerund (V-ing) when not followed by a that-clause: "recommended archiving".'
      },
      {
        id: 14,
        question: 'Select the correct simple sentence form of: "Because he was ill, he could not attend the convocation."',
        options: {
          A: 'Owing to his illness, he could not attend the convocation.',
          B: 'He was ill and so he could not attend the convocation.',
          C: 'Since he was ill, he missed the convocation.',
          D: 'He could not attend the convocation as he was ill.'
        },
        correctAnswer: 'A',
        topic: 'Transformation of Sentences (Complex to Simple using Owing to + noun phrase)',
        explanation: 'A simple sentence must contain only one independent clause. "Owing to his illness" is a prepositional phrase, leaving "he could not attend the convocation" as the single main clause.'
      },
      {
        id: 15,
        question: 'Choose the grammatically correct comparative sentence:',
        options: {
          A: 'Platinum is heavier than all metals.',
          B: 'Platinum is heavier than any other metal.',
          C: 'Platinum is more heavy than all other metals.',
          D: 'Platinum is the most heaviest metal.'
        },
        correctAnswer: 'B',
        topic: 'Degrees of Comparison (heavier than any other exclusion rule)',
        explanation: 'When comparing a member of a group with other members of the same group in the comparative degree, "any other" must be used to exclude the subject itself.'
      },
      {
        id: 16,
        question: 'In the sentence "He is an early riser and gets up early every morning," the words "early" function respectively as:',
        options: {
          A: 'Adverb; Adjective',
          B: 'Adjective; Adverb',
          C: 'Adjective; Adjective',
          D: 'Adverb; Adverb'
        },
        correctAnswer: 'B',
        topic: 'Parts of Speech Identification (early modifying noun vs. modifying verb)',
        explanation: 'In "early riser", "early" modifies the noun "riser" and is an Adjective. In "gets up early", "early" modifies the phrasal verb "gets up" and is an Adverb.'
      },
      {
        id: 17,
        question: 'Identify the clause type: "I am confident that our team will win the championship."',
        options: {
          A: 'Noun Clause',
          B: 'Adjective Clause',
          C: 'Adverbial Clause of Reason',
          D: 'Prepositional Phrase'
        },
        correctAnswer: 'A',
        topic: 'Clause Identification (Noun clause acting as adjective complement)',
        explanation: '"that our team will win the championship" acts as a noun clause functioning as the complement of the predicate adjective "confident".'
      },
      {
        id: 18,
        question: 'Nobody called while I was out on a business meeting, ____?',
        options: { A: 'did they', B: "didn't they", C: 'did he', D: "didn't he" },
        correctAnswer: 'A',
        topic: 'Tag Questions (Negative subject Nobody takes positive tag with they)',
        explanation: '"Nobody" is inherently negative, so the question tag must be positive ("did"). Indefinite pronouns referring to persons (nobody, somebody, everyone) take the plural pronoun "they" in question tags.'
      },
      {
        id: 19,
        question: 'The coach had the players ____ twenty laps around the stadium before starting drills.',
        options: { A: 'run', B: 'to run', C: 'ran', D: 'running' },
        correctAnswer: 'A',
        topic: 'Causative Verbs (have + person + bare infinitive)',
        explanation: 'The causative structure "have + person (agent) + bare infinitive" requires the base form of the verb without "to": "had the players run".'
      },
      {
        id: 20,
        question: 'Identify the sentence that is free from redundancy or grammatical error:',
        options: {
          A: 'He reverted back to his old habits despite warnings.',
          B: 'The police investigated into the matter thoroughly.',
          C: 'She briefly summarized the main points of the report.',
          D: 'They reached to a final agreement after long discussions.'
        },
        correctAnswer: 'C',
        topic: 'Redundancy Elimination (Avoid revert back, investigate into, reach to)',
        explanation: '"Revert" already contains "back", "investigate" does not take "into", and "reach" does not take "to". Option C is completely free of redundancy.'
      },
      {
        id: 21,
        question: 'The project faced severe funding shortages; ____, the team completed the prototype within the deadline.',
        options: { A: 'nevertheless', B: 'consequently', C: 'furthermore', D: 'therefore' },
        correctAnswer: 'A',
        topic: 'Conjunctive Adverbs (nevertheless showing contrast)',
        explanation: '"Nevertheless" is a conjunctive adverb indicating contrast / concession between facing severe shortages and still completing the prototype on time.'
      },
      {
        id: 22,
        question: 'The company had to ____ several workforce positions due to structural reorganization.',
        options: { A: 'lay off', B: 'lay down', C: 'lay out', D: 'lay in' },
        correctAnswer: 'A',
        topic: 'Phrasal Verbs (lay off = terminate employment)',
        explanation: '"Lay off" means to discharge or terminate employees, especially temporarily or due to restructuring.'
      },
      {
        id: 23,
        question: 'The chief of staff asked for three ____ of bread to feed the delegates.',
        options: { A: 'loafs', B: 'loaves', C: 'loaf', D: 'piece of loafs' },
        correctAnswer: 'B',
        topic: 'Noun Pluralization (loaf → loaves)',
        explanation: 'Nouns ending in "-f" like "loaf" form their regular plural by changing "-f" to "-ves": "loaves".'
      },
      {
        id: 24,
        question: "There is ____ chance of rain today, so you don't need to carry an umbrella.",
        options: { A: 'a little', B: 'little', C: 'few', D: 'a few' },
        correctAnswer: 'B',
        topic: 'Quantifiers with Uncountable Nouns (little = almost none)',
        explanation: '"Chance" is uncountable, eliminating "few/a few". "Little" has a negative meaning (almost none/negligible), fitting the conclusion "so you don\'t need to carry an umbrella".'
      },
      {
        id: 25,
        question: 'Identify the segment containing an error: "Neither the CEO (A) / nor the members of the board (B) / was willing to compromise. (C) / No error (D)"',
        options: {
          A: 'Neither the CEO',
          B: 'nor the members of the board',
          C: 'was willing to compromise',
          D: 'No error'
        },
        correctAnswer: 'C',
        topic: 'Pinpoint Error (Proximity rule with neither... nor: nearest subject members requires were)',
        explanation: 'In "neither... nor", the verb agrees with the closer subject. "The members of the board" is plural, so it requires the plural auxiliary verb "were willing to compromise", not "was".'
      }
    ]
  },
  {
    id: 7,
    title: 'Model Question 7',
    subtitle: 'English Grammar Competence - Set 7',
    description: 'Fractions of uncountables, sequence of tenses, Latin comparatives, subjunctive mood, and restrictive inversions.',
    totalQuestions: 25,
    questions: [
      {
        id: 1,
        question: 'Two-thirds of the arable land in this agricultural region ____ brought under modern irrigation techniques.',
        options: { A: 'have been', B: 'has been', C: 'were', D: 'are being' },
        correctAnswer: 'B',
        topic: 'Subject-Verb Agreement (Fractions of uncountable nouns take singular verb)',
        explanation: 'When fractions (like "two-thirds of") quantify an uncountable or mass noun ("arable land"), the verb is singular ("has been").'
      },
      {
        id: 2,
        question: 'Hardly had the keynote address ended when the audience ____ into enthusiastic applause.',
        options: { A: 'erupted', B: 'erupts', C: 'had erupted', D: 'has erupted' },
        correctAnswer: 'A',
        topic: 'Tense / Sequence of Tenses (Hardly had... when + past simple)',
        explanation: 'The correlative construction "Hardly had + subject + past participle... when" is followed by the simple past tense ("erupted").'
      },
      {
        id: 3,
        question: 'The remuneration offered by the corporation should be commensurate ____ your professional qualifications and experience.',
        options: { A: 'with', B: 'to', C: 'for', D: 'of' },
        correctAnswer: 'A',
        topic: 'Appropriate Prepositions (commensurate with)',
        explanation: 'The adjective "commensurate" strictly takes the preposition "with" to mean proportionate or corresponding in size or degree.'
      },
      {
        id: 4,
        question: '____ Pacific Ocean is ____ deepest body of water on Earth, containing the Mariana Trench.',
        options: { A: 'The; the', B: '[no article]; the', C: 'The; a', D: 'A; the' },
        correctAnswer: 'A',
        topic: 'Article Usage (The with oceans; superlative degree the deepest)',
        explanation: 'Oceans take the definite article "The" ("The Pacific Ocean"), and superlative adjectives require "the" ("the deepest").'
      },
      {
        id: 5,
        question: 'Select the correct passive form: "The board of directors is considering your application for the managerial post."',
        options: {
          A: 'Your application for the managerial post is being considered by the board of directors.',
          B: 'Your application for the managerial post was considered by the board of directors.',
          C: 'Your application for the managerial post is considered by the board of directors.',
          D: 'The managerial post for your application is being considered by the board of directors.'
        },
        correctAnswer: 'A',
        topic: 'Passive Voice Transformation (Present Continuous passive: is being considered)',
        explanation: 'Active present continuous ("is considering") converts to passive continuous form: "is being considered".'
      },
      {
        id: 6,
        question: 'Select the correct indirect speech: He said, "I may leave for London tomorrow evening."',
        options: {
          A: 'He said that he might leave for London the following evening.',
          B: 'He told that he may leave for London tomorrow evening.',
          C: 'He said that he would leave for London the next evening.',
          D: 'He said that he might have left for London the following evening.'
        },
        correctAnswer: 'A',
        topic: 'Indirect Speech (Reporting modals may → might and time expression tomorrow evening → the following evening)',
        explanation: 'Modal "may" shifts back to "might", pronoun "I" shifts to "he", and time adverbial "tomorrow evening" changes to "the following evening".'
      },
      {
        id: 7,
        question: 'If the regulatory body ____ the financial proposal last month, the project would be operational today.',
        options: { A: 'had approved', B: 'approved', C: 'approves', D: 'would approve' },
        correctAnswer: 'A',
        topic: 'Mixed Conditionals (Past condition had approved → Present result would be)',
        explanation: 'A past unreal action ("last month") takes the past perfect ("had approved") to result in a present state ("would be operational today").'
      },
      {
        id: 8,
        question: 'I would rather you ____ the sensitive documents to any unauthorized person.',
        options: { A: "didn't disclose", B: "don't disclose", C: "won't disclose", D: "hadn't disclose" },
        correctAnswer: 'A',
        topic: 'Unreal Past / Subjunctive (would rather + past simple for present reference)',
        explanation: 'When "would rather" has a different subject clause referring to present or future preference, it takes the past simple ("didn\'t disclose").'
      },
      {
        id: 9,
        question: 'On no account ____ leave the confidential files unattended on the office desk.',
        options: { A: 'you should', B: 'should you', C: 'you must', D: 'you ought to' },
        correctAnswer: 'B',
        topic: 'Subject-Auxiliary Inversion after restrictive phrase (On no account should you...)',
        explanation: 'Negative/restrictive prepositional phrases like "On no account" placed at the start of a sentence trigger subject-auxiliary inversion ("should you").'
      },
      {
        id: 10,
        question: 'The new software is not only user-friendly ____.',
        options: {
          A: 'but also highly efficient in processing large datasets',
          B: 'but it is also highly efficient in processing large datasets',
          C: 'and also highly efficient to process large datasets',
          D: 'but also processes large datasets with high efficiency'
        },
        correctAnswer: 'A',
        topic: 'Parallel Structure (not only [adjective phrase]... but also [adjective phrase])',
        explanation: '"Not only" is followed by an adjective ("user-friendly"), so "but also" must parallel it with an adjective phrase ("highly efficient...").'
      },
      {
        id: 11,
        question: 'Choose the grammatically correct sentence:',
        options: {
          A: 'While reading the morning newspaper, the tea cooled down completely.',
          B: 'While reading the morning newspaper, he let his tea cool down completely.',
          C: 'Reading the morning newspaper, a cold cup of tea was left on the table.',
          D: 'While he was reading the morning newspaper, the cup of tea was cooling down by him.'
        },
        correctAnswer: 'B',
        topic: 'Dangling / Misplaced Modifiers (Introductory modifier correctly aligns with he)',
        explanation: '"While reading the morning newspaper" is an action performed by a person ("he"), not by "the tea" or "a cold cup of tea".'
      },
      {
        id: 12,
        question: 'The administrative panel will interview ____ meets all the published prerequisites for the research fellowship.',
        options: { A: 'whoever', B: 'whomever', C: 'whom', D: 'whichever' },
        correctAnswer: 'A',
        topic: 'Pronoun Case (whoever as subject of the verb meets)',
        explanation: 'The pronoun serves as the subject of the clause verb "meets", hence nominative case "whoever" is required.'
      },
      {
        id: 13,
        question: 'The suspect finally admitted ____ confidential company information to an external agency.',
        options: { A: 'to leak', B: 'leaking', C: 'leak', D: 'to have leaked' },
        correctAnswer: 'B',
        topic: 'Non-Finite Verbs / Gerunds (admit + V-ing)',
        explanation: 'The verb "admit" is conventionally followed by a gerund ("leaking") when acknowledging an action.'
      },
      {
        id: 14,
        question: 'Select the correct complex sentence form of: "With all his wisdom, he committed a grave mistake."',
        options: {
          A: 'Although he was wise, he committed a grave mistake.',
          B: 'In spite of his wisdom, he committed a grave mistake.',
          C: 'He was wise and so he committed a grave mistake.',
          D: 'Despite being wise, he committed a grave mistake.'
        },
        correctAnswer: 'A',
        topic: 'Transformation of Sentences (Simple to Complex using Although)',
        explanation: 'A complex sentence requires an independent clause and at least one dependent clause introduced by a subordinating conjunction like "Although".'
      },
      {
        id: 15,
        question: 'Choose the grammatically correct comparative sentence:',
        options: {
          A: 'Prior to this assignment, he was senior than all other managers.',
          B: 'Prior to this assignment, he was senior to all other managers.',
          C: 'Prior to this assignment, he was more senior than all other managers.',
          D: 'Prior to this assignment, he was senior than any other manager.'
        },
        correctAnswer: 'B',
        topic: 'Degrees of Comparison (Latin comparative adjectives like senior take to, not than)',
        explanation: 'Comparative adjectives derived from Latin ending in "-ior" (senior, junior, prior, superior, inferior) are followed by "to", never "than".'
      },
      {
        id: 16,
        question: 'In the sentence "There is no fast rule about this process, but you must move fast," the second "fast" functions as a/an:',
        options: { A: 'Adjective', B: 'Adverb', C: 'Noun', D: 'Verb' },
        correctAnswer: 'B',
        topic: 'Identification of Parts of Speech (fast modifying action verb move = Adverb)',
        explanation: '"Fast" in "move fast" modifies the verb "move", so it functions as an Adverb.'
      },
      {
        id: 17,
        question: 'Identify the clause type: "This is the very site where the historic treaty was signed."',
        options: {
          A: 'Noun Clause',
          B: 'Adjective Clause',
          C: 'Adverbial Clause of Place',
          D: 'Prepositional Phrase'
        },
        correctAnswer: 'B',
        topic: 'Clause Identification (Adjective/Relative Clause modifying noun site)',
        explanation: '"where the historic treaty was signed" modifies the preceding noun "site", making it a relative or adjective clause.'
      },
      {
        id: 18,
        question: 'I am expected to present the quarterly progress report today, ____?',
        options: { A: "aren't I", B: "amn't I", C: "isn't I", D: "don't I" },
        correctAnswer: 'A',
        topic: 'Tag Questions (Negative tag for I am is aren\'t I)',
        explanation: 'In standard English, the negative question tag for "I am" is "aren\'t I?".'
      },
      {
        id: 19,
        question: 'The project coordinator made the team members ____ overtime to complete the pending audits.',
        options: { A: 'work', B: 'to work', C: 'worked', D: 'working' },
        correctAnswer: 'A',
        topic: 'Causative Verbs (make + person + bare infinitive)',
        explanation: 'The causative verb "make" in active voice takes a bare infinitive without "to": "made the team members work".'
      },
      {
        id: 20,
        question: 'Identify the sentence that is free from redundancy or grammatical error:',
        options: {
          A: 'He recalled back the vivid memories of his early childhood.',
          B: 'She adequately addressed all the main concerns raised by the panel.',
          C: 'The reason why he resigned was because he felt underappreciated.',
          D: 'They postponed the project until later in the future.'
        },
        correctAnswer: 'B',
        topic: 'Redundancy Elimination (Avoid recall back, reason... was because, later in the future)',
        explanation: '"Recall back", "the reason was because", and "later in the future" are all redundant. Option B is concise and grammatically sound.'
      },
      {
        id: 21,
        question: 'You will not be granted entry into the examination hall ____ you produce a valid admit card.',
        options: { A: 'unless', B: 'until', C: 'provided', D: 'if' },
        correctAnswer: 'A',
        topic: 'Conjunctions (unless = if... not, used for conditions)',
        explanation: '"Unless" means "if not" and introduces the conditional requirement for entry: unless you produce a valid admit card.'
      },
      {
        id: 22,
        question: 'We had to ____ our travel plans because of the sudden strike announced by the transport union.',
        options: { A: 'put off', B: 'put out', C: 'put up with', D: 'put down' },
        correctAnswer: 'A',
        topic: 'Phrasal Verbs (put off = postpone)',
        explanation: '"Put off" means to delay or postpone an event or plan.'
      },
      {
        id: 23,
        question: 'Several interesting ____ were observed during the laboratory experiment on cellular division.',
        options: { A: 'phenomenons', B: 'phenomena', C: 'phenomenas', D: 'phenomenon' },
        correctAnswer: 'B',
        topic: 'Irregular Noun Pluralization (phenomenon [singular] → phenomena [plural])',
        explanation: '"Phenomenon" is a singular Greek-derived noun; its correct plural form is "phenomena".'
      },
      {
        id: 24,
        question: '____ men are completely content with their present economic status in life.',
        options: { A: 'Few', B: 'A few', C: 'Little', D: 'A little' },
        correctAnswer: 'A',
        topic: 'Quantifiers (few with plural countable nouns indicates scarcity / almost none)',
        explanation: '"Men" is a countable plural noun. "Few" carries a negative connotation meaning "almost no one", which logically fits the sentiment.'
      },
      {
        id: 25,
        question: 'Identify the segment containing an error: "Many a student (A) / have attempted this examination (B) / without proper preparation. (C) / No error (D)"',
        options: {
          A: 'Many a student',
          B: 'have attempted this examination',
          C: 'without proper preparation',
          D: 'No error'
        },
        correctAnswer: 'B',
        topic: 'Pinpoint Error (Many a + singular noun requires a singular verb: has attempted)',
        explanation: 'The phrase "Many a" is followed by a singular countable noun ("student") and strictly takes a singular verb ("has attempted", not "have attempted").'
      }
    ]
  }
];
