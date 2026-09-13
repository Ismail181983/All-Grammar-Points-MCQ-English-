import { ModelQuestionSet } from '../types';

export const modelQuestionSets8to10: ModelQuestionSet[] = [
  {
    id: 8,
    title: 'Model Question 8',
    subtitle: 'English Grammar Competence - Set 8',
    description: 'Distance as single unit, subjunctive with demanded, future perfect continuous, causative get, and mass nouns.',
    totalQuestions: 25,
    questions: [
      {
        id: 1,
        question: 'Fifty miles ____ a long distance to travel on foot in a single day.',
        options: { A: 'are', B: 'is', C: 'were', D: 'have been' },
        correctAnswer: 'B',
        topic: 'Subject-Verb Agreement (Plural quantity/distance used as a single unit takes a singular verb)',
        explanation: 'When a plural noun of distance, time, weight, or money represents a single collective quantity or unit ("Fifty miles"), it takes a singular verb ("is").'
      },
      {
        id: 2,
        question: 'By the time the guest speaker arrives, the audience ____ in the auditorium for an hour.',
        options: {
          A: 'will wait',
          B: 'will have been waiting',
          C: 'was waiting',
          D: 'has been waiting'
        },
        correctAnswer: 'B',
        topic: 'Tense & Aspect (Future Perfect Continuous with by the time... for an hour)',
        explanation: 'An ongoing action leading up to a specific point of time in the future ("By the time... arrives... for an hour") is expressed in the Future Perfect Continuous tense ("will have been waiting").'
      },
      {
        id: 3,
        question: 'You should abstain ____ taking part in unethical practices and refrain ____ making derogatory remarks.',
        options: { A: 'from; from', B: 'to; with', C: 'of; from', D: 'with; of' },
        correctAnswer: 'A',
        topic: 'Appropriate Prepositions (abstain from, refrain from)',
        explanation: 'Both verbs "abstain" and "refrain" govern the preposition "from" followed by a gerund ("abstain from...", "refrain from...").'
      },
      {
        id: 4,
        question: '____ Nile is considered ____ longest river in ____ Africa.',
        options: {
          A: 'The; the; [no article]',
          B: '[no article]; the; Africa',
          C: 'The; a; the',
          D: 'A; the; [no article]'
        },
        correctAnswer: 'A',
        topic: 'Article Usage (The for specific rivers/superlatives; zero article for continents)',
        explanation: 'Rivers require "The" ("The Nile"), superlative adjectives require "the" ("the longest"), and continents take no article ("Africa").'
      },
      {
        id: 5,
        question: 'Select the correct passive form: "They say that he is an extraordinarily talented officer."',
        options: {
          A: 'He is said to be an extraordinarily talented officer.',
          B: 'That he is an extraordinarily talented officer is said by them.',
          C: 'It was said that he is an extraordinarily talented officer.',
          D: 'He was said to be an extraordinarily talented officer.'
        },
        correctAnswer: 'A',
        topic: 'Voice Transformation (Impersonal passive: He is said to be...)',
        explanation: 'Active structures with reporting verbs ("They say that he is...") typically transform into personal passive: "He is said to be an extraordinarily talented officer."'
      },
      {
        id: 6,
        question: 'Select the correct indirect speech: The host said to the guests, "Let us start the meeting without further delay."',
        options: {
          A: 'The host suggested to the guests that they should start the meeting without further delay.',
          B: 'The host requested the guests that they start the meeting without further delay.',
          C: 'The host ordered the guests to start the meeting without further delay.',
          D: 'The host told to the guests that let them start the meeting without further delay.'
        },
        correctAnswer: 'A',
        topic: 'Indirect Speech (Reporting suggestions with Let us → suggested that they should)',
        explanation: '"Let us" expresses a proposal or suggestion and is converted to indirect speech using "suggested/proposed to + object + that they should...".'
      },
      {
        id: 7,
        question: 'If I ____ in your position, I would accept the promotion without hesitation.',
        options: { A: 'am', B: 'were', C: 'had been', D: 'was' },
        correctAnswer: 'B',
        topic: 'Conditionals (2nd Conditional unreal present → were)',
        explanation: 'In hypothetical or unreal present conditions (second conditional), the subjunctive "were" is used with all grammatical persons ("If I were...").'
      },
      {
        id: 8,
        question: 'The committee demanded that the regional manager ____ a comprehensive report by Friday.',
        options: { A: 'submits', B: 'submit', C: 'submitted', D: 'will submit' },
        correctAnswer: 'B',
        topic: 'Subjunctive Mood (demanded that + base verb)',
        explanation: 'Verbs expressing command, demand, or insistence (demand, insist, recommend) trigger the present subjunctive mood, which requires the base form of the verb ("submit") without "-s".'
      },
      {
        id: 9,
        question: 'Seldom ____ such an astounding display of talent in a national competition.',
        options: {
          A: 'I have seen',
          B: 'have I seen',
          C: 'I saw',
          D: 'saw I'
        },
        correctAnswer: 'B',
        topic: 'Subject-Auxiliary Inversion (Seldom have I seen...)',
        explanation: 'When negative/restrictive adverbs such as "Seldom" begin a sentence, subject-auxiliary inversion takes place ("have I seen").'
      },
      {
        id: 10,
        question: 'The training program aims at improving leadership skills, fostering teamwork, and ____ clear communication.',
        options: {
          A: 'to encourage',
          B: 'encouraging',
          C: 'encouragement of',
          D: 'encourage'
        },
        correctAnswer: 'B',
        topic: 'Parallel Structure (Series of gerunds: improving, fostering, encouraging)',
        explanation: 'The preposition "at" governs a parallel series of gerunds: "improving...", "fostering...", and "encouraging...".'
      },
      {
        id: 11,
        question: 'Choose the grammatically correct sentence:',
        options: {
          A: 'Having finished the comprehensive report, it was submitted to the director by the manager.',
          B: 'Having finished the comprehensive report, the manager submitted it to the director.',
          C: 'Finishing the comprehensive report, the director received it from the manager.',
          D: 'Having finished the comprehensive report, submission was made by the manager.'
        },
        correctAnswer: 'B',
        topic: 'Dangling / Misplaced Modifiers (Introductory participle aligns with manager)',
        explanation: 'The subject performing the action "Having finished the comprehensive report" is "the manager", so "the manager" must immediately follow the introductory comma.'
      },
      {
        id: 12,
        question: 'The candidate ____ the selection board interviewed yesterday has been chosen for the executive role.',
        options: { A: 'who', B: 'whom', C: 'whose', D: 'which' },
        correctAnswer: 'B',
        topic: 'Pronoun Case (whom as the direct object of interviewed)',
        explanation: 'The relative pronoun is the grammatical direct object of the verb "interviewed", requiring the objective case "whom".'
      },
      {
        id: 13,
        question: 'This historical manuscript is well worth ____ for future generations.',
        options: { A: 'to preserve', B: 'preserving', C: 'preserve', D: 'preserved' },
        correctAnswer: 'B',
        topic: 'Non-Finite Verbs / Gerunds (worth + V-ing)',
        explanation: 'The adjective "worth" is followed by a gerund ("preserving"), not an infinitive ("to preserve").'
      },
      {
        id: 14,
        question: 'Select the correct complex sentence form of: "In spite of his severe injury, he continued playing."',
        options: {
          A: 'Although he was severely injured, he continued playing.',
          B: 'He was severely injured but he continued playing.',
          C: 'Despite his severe injury, he did not stop playing.',
          D: 'Owing to his injury, he continued playing.'
        },
        correctAnswer: 'A',
        topic: 'Transformation of Sentences (Simple to Complex using Although)',
        explanation: '"Although he was severely injured" is a subordinate clause of concession, creating a complex sentence with the independent clause "he continued playing".'
      },
      {
        id: 15,
        question: 'Choose the correct positive degree form of: "Shakespeare is greater than any other English dramatist."',
        options: {
          A: 'No other English dramatist is as great as Shakespeare.',
          B: 'Very few English dramatists are as great as Shakespeare.',
          C: 'Shakespeare is as great as any English dramatist.',
          D: 'Few English dramatists were greater than Shakespeare.'
        },
        correctAnswer: 'A',
        topic: 'Degrees of Comparison (greater than any other → No other... as great as)',
        explanation: 'The comparative phrase "greater than any other" converts to positive degree as "No other... is as great as".'
      },
      {
        id: 16,
        question: 'In the sentence "There is something mysterious about his sudden departure," the word "about" functions as a/an:',
        options: { A: 'Adverb', B: 'Preposition', C: 'Adjective', D: 'Conjunction' },
        correctAnswer: 'B',
        topic: 'Parts of Speech Identification (about introducing noun phrase = Preposition)',
        explanation: '"About" introduces the noun phrase "his sudden departure" and indicates relation, functioning as a Preposition.'
      },
      {
        id: 17,
        question: 'Identify the clause type: "This is the primary reason why he tendered his resignation."',
        options: {
          A: 'Noun Clause',
          B: 'Adjective Clause',
          C: 'Adverbial Clause of Reason',
          D: 'Prepositional Phrase'
        },
        correctAnswer: 'B',
        topic: 'Clause Identification (Adjective/Relative Clause modifying noun reason)',
        explanation: '"why he tendered his resignation" defines and modifies the antecedent noun "reason", functioning as an Adjective/Relative Clause.'
      },
      {
        id: 18,
        question: 'Few delegates attended the emergency workshop yesterday, ____?',
        options: { A: "didn't they", B: 'did they', C: "wasn't it", D: 'were they' },
        correctAnswer: 'B',
        topic: 'Tag Questions (Negative quantifier Few takes an affirmative tag did they)',
        explanation: '"Few" has a negative meaning (almost none), so the sentence is treated as negative and takes a positive question tag ("did they?").'
      },
      {
        id: 19,
        question: 'The project manager got the software developers ____ the bug before releasing the updates.',
        options: { A: 'fix', B: 'to fix', C: 'fixed', D: 'fixing' },
        correctAnswer: 'B',
        topic: 'Causative Verbs (get + person + to-infinitive)',
        explanation: 'The causative construction with "get" followed by an active human agent takes a to-infinitive: "got the software developers to fix".'
      },
      {
        id: 20,
        question: 'Identify the sentence that is free from redundancy or grammatical error:',
        options: {
          A: 'She is equally as intelligent as her elder sister.',
          B: 'He returned back the library book after two weeks.',
          C: 'The candidate answered all the questions confidently and accurately.',
          D: 'The reason for his absence was because he fell ill.'
        },
        correctAnswer: 'C',
        topic: 'Redundancy Elimination (Avoid equally as, return back, reason... was because)',
        explanation: '"Equally as", "returned back", and "the reason was because" are common redundant expressions. Option C is completely free of redundancy.'
      },
      {
        id: 21,
        question: 'He spoke so fast ____ the audience could hardly grasp the central message of his speech.',
        options: { A: 'that', B: 'than', C: 'as', D: 'when' },
        correctAnswer: 'A',
        topic: 'Conjunctions (so... that showing result)',
        explanation: 'The correlative conjunction "so [adjective/adverb]... that" introduces a clause of result or consequence.'
      },
      {
        id: 22,
        question: 'The young officer takes ____ her mother in both intelligence and determination.',
        options: { A: 'after', B: 'off', C: 'up', D: 'over' },
        correctAnswer: 'A',
        topic: 'Phrasal Verbs (take after = resemble in traits)',
        explanation: '"Take after" means to resemble an older family member in appearance, character, or disposition.'
      },
      {
        id: 23,
        question: 'The interior designer recommended replacing all the old ____ in the executive lounge.',
        options: { A: 'furnitures', B: 'furniture', C: 'items of furnitures', D: 'piece of furnitures' },
        correctAnswer: 'B',
        topic: 'Uncountable Nouns (furniture is uncountable; plural form furnitures is invalid)',
        explanation: '"Furniture" is an uncountable mass noun in English and cannot take an "-s" plural ending.'
      },
      {
        id: 24,
        question: 'A great deal of time and effort ____ spent on developing the new curriculum.',
        options: { A: 'were', B: 'was', C: 'have been', D: 'are' },
        correctAnswer: 'B',
        topic: 'Quantifiers (A great deal of + uncountable noun takes singular verb was)',
        explanation: '"A great deal of" quantifies uncountable nouns and treats the compound idea ("time and effort") as a singular mass, taking the singular verb "was".'
      },
      {
        id: 25,
        question: 'Identify the segment containing an error: "The police has arrested (A) / the primary suspect (B) / in connection with the bank robbery. (C) / No error (D)"',
        options: {
          A: 'The police has arrested',
          B: 'the primary suspect',
          C: 'in connection with the bank robbery',
          D: 'No error'
        },
        correctAnswer: 'A',
        topic: 'Pinpoint Error (police is a collective plural noun requiring plural verb have arrested)',
        explanation: 'In English, "the police" is a plural collective noun and always takes a plural verb: "The police have arrested", not "has arrested".'
      }
    ]
  },
  {
    id: 9,
    title: 'Model Question 9',
    subtitle: 'English Grammar Competence - Set 9',
    description: 'As well as agreement, past perfect prior event, passive of negative imperatives, and unreal past with high time.',
    totalQuestions: 25,
    questions: [
      {
        id: 1,
        question: 'The physics professor, as well as his laboratory assistants, ____ planning to conduct the high-voltage experiment tomorrow.',
        options: { A: 'are', B: 'is', C: 'were', D: 'have been' },
        correctAnswer: 'B',
        topic: 'Subject-Verb Agreement (as well as aligns verb with the first subject professor)',
        explanation: 'When two subjects are connected by "as well as", the verb agrees with the first subject ("The physics professor"), which is singular ("is").'
      },
      {
        id: 2,
        question: 'By the time the fire brigade reached the commercial complex, the blaze ____ to the adjacent residential buildings.',
        options: { A: 'spread', B: 'had spread', C: 'has spread', D: 'was spreading' },
        correctAnswer: 'B',
        topic: 'Tense & Aspect (Past Perfect for an action completed before another past event)',
        explanation: 'The spreading of the blaze occurred prior to the arrival of the fire brigade in the past, requiring the Past Perfect tense ("had spread").'
      },
      {
        id: 3,
        question: 'He is proficient ____ several foreign languages, but he remains oblivious ____ his own grammatical flaws.',
        options: { A: 'in; to', B: 'at; with', C: 'with; for', D: 'in; of' },
        correctAnswer: 'A',
        topic: 'Appropriate Prepositions (proficient in, oblivious to)',
        explanation: '"Proficient" is followed by "in" (proficient in languages), and "oblivious" is followed by "to" (oblivious to his flaws).'
      },
      {
        id: 4,
        question: '____ honest man is ____ noblest work of God.',
        options: { A: 'An; the', B: 'A; the', C: 'An; a', D: 'The; a' },
        correctAnswer: 'A',
        topic: 'Article Usage (An before vowel sound honest; the before superlative noblest)',
        explanation: '"Honest" begins with a silent \'h\' and vowel sound /ɒ/, taking "An". "Noblest" is a superlative adjective, requiring the definite article "the".'
      },
      {
        id: 5,
        question: 'Select the correct passive form: "Never betray your native country."',
        options: {
          A: 'Your native country should never be betrayed.',
          B: 'Let your native country never be betrayed.',
          C: 'You are told to never betray your native country.',
          D: 'Let not your native country betrayed.'
        },
        correctAnswer: 'B',
        topic: 'Passive Voice Transformation (Imperative negative: Let + obj + never + be + V3)',
        explanation: 'The standard passive form for negative imperative sentences with "never" is "Let + object + never + be + past participle": "Let your native country never be betrayed."'
      },
      {
        id: 6,
        question: 'Select the correct indirect speech: The tourist said, "What a magnificent monument this is!"',
        options: {
          A: 'The tourist exclaimed that that was a very magnificent monument.',
          B: 'The tourist exclaimed with wonder that that was a magnificent monument.',
          C: 'The tourist exclaimed that what a magnificent monument it was.',
          D: 'The tourist told that the monument was very magnificent.'
        },
        correctAnswer: 'B',
        topic: 'Indirect Speech (Exclamatory Narration: exclaimed with wonder/joy that...)',
        explanation: 'Exclamatory sentences expressing awe or admiration are reported using "exclaimed with wonder/admiration that that was a magnificent monument."'
      },
      {
        id: 7,
        question: 'Should you ____ any technical difficulty during the online examination, please inform the invigilator immediately.',
        options: { A: 'encounter', B: 'encountered', C: 'encounters', D: 'will encounter' },
        correctAnswer: 'A',
        topic: 'Conditionals (Inverted First Conditional: Should + subject + bare infinitive)',
        explanation: 'In an inverted first conditional beginning with "Should", the verb following the subject must be in its base/bare infinitive form ("encounter").'
      },
      {
        id: 8,
        question: 'It is high time the municipal corporation ____ the dilapidated drainage system in the town.',
        options: { A: 'repair', B: 'repaired', C: 'has repaired', D: 'should repair' },
        correctAnswer: 'B',
        topic: 'Pseudo-Subjunctive / Unreal Past (It is high time + past simple)',
        explanation: '"It is high time" / "It is time" followed by a subject clause requires the simple past subjunctive form ("repaired") to indicate an action that is overdue.'
      },
      {
        id: 9,
        question: 'In no way ____ responsible for the financial losses incurred during the previous fiscal year.',
        options: {
          A: 'the manager can be held',
          B: 'can the manager be held',
          C: 'the manager could held',
          D: 'can be the manager held'
        },
        correctAnswer: 'B',
        topic: 'Subject-Auxiliary Inversion after restrictive phrase (In no way can the manager be held...)',
        explanation: 'Negative phrases like "In no way" placed at the start of a sentence trigger subject-auxiliary inversion ("can the manager be held").'
      },
      {
        id: 10,
        question: 'Good speech writing requires defining a clear focus, gathering relevant evidence, and ____.',
        options: {
          A: 'organizing ideas logically',
          B: 'to organize ideas logically',
          C: 'logic in organizing ideas',
          D: 'ideas should be organized logically'
        },
        correctAnswer: 'A',
        topic: 'Parallel Structure (Series of gerund phrases: defining, gathering, organizing)',
        explanation: 'The series of requirements consists of gerund phrases: "defining...", "gathering...", and "organizing ideas logically".'
      },
      {
        id: 11,
        question: 'Choose the grammatically correct sentence:',
        options: {
          A: 'Walking down the street, the trees were swaying in the wind.',
          B: 'Walking down the street, we saw the trees swaying in the wind.',
          C: 'Walking down the street, a sudden gust of wind hit us.',
          D: 'While walking down the street, the wind blew our hats off.'
        },
        correctAnswer: 'B',
        topic: 'Misplaced / Dangling Modifiers (Participial phrase correctly modifies we)',
        explanation: 'The introductory participle "Walking down the street" must modify the subject who is walking ("we"), not the trees, gust of wind, or the wind.'
      },
      {
        id: 12,
        question: 'The dean strongly objected to ____ leaving the lecture hall before the presentation concluded.',
        options: { A: 'our', B: 'us', C: 'we', D: 'ours' },
        correctAnswer: 'A',
        topic: 'Pronoun Case (Possessive pronoun/determiner our preceding gerund leaving)',
        explanation: 'In formal grammar, a noun or pronoun modifying a gerund ("leaving") must be in the possessive case ("our leaving").'
      },
      {
        id: 13,
        question: 'The investment strategist warned us against ____ impulsive financial decisions during economic volatility.',
        options: { A: 'making', B: 'to make', C: 'make', D: 'made' },
        correctAnswer: 'A',
        topic: 'Non-Finite Verbs / Gerunds (Preposition against followed by gerund making)',
        explanation: 'The preposition "against" is followed by a gerund ("making"): "warned us against making".'
      },
      {
        id: 14,
        question: 'Select the correct compound sentence form of: "In spite of his illness, he attended the emergency board meeting."',
        options: {
          A: 'He was ill, yet he attended the emergency board meeting.',
          B: 'Although he was ill, he attended the emergency board meeting.',
          C: 'Despite his illness, he attended the emergency board meeting.',
          D: 'Being ill, he attended the emergency board meeting.'
        },
        correctAnswer: 'A',
        topic: 'Sentence Transformation (Simple to Compound using coordinating conjunction yet)',
        explanation: 'A compound sentence joins two independent clauses using a coordinating conjunction like "yet" or "but" ("He was ill, yet he attended...").'
      },
      {
        id: 15,
        question: 'Choose the grammatically correct sentence:',
        options: {
          A: 'Prevention is more better than cure.',
          B: 'Prevention is better than cure.',
          C: 'Prevention is the most better than cure.',
          D: 'Prevention is as better as cure.'
        },
        correctAnswer: 'B',
        topic: 'Degrees of Comparison (Avoid double comparative more better)',
        explanation: '"Better" is already the comparative form of "good/well". Using "more better" is an erroneous double comparative.'
      },
      {
        id: 16,
        question: 'In the sentence "He is the only candidate suitable for the position," the word "only" functions as a/an:',
        options: { A: 'Adverb', B: 'Adjective', C: 'Pronoun', D: 'Conjunction' },
        correctAnswer: 'B',
        topic: 'Identification of Parts of Speech (only modifying noun candidate = Adjective)',
        explanation: '"Only" directly precedes and modifies the noun "candidate", functioning as an Adjective.'
      },
      {
        id: 17,
        question: 'Identify the clause type: "Whatever you decide to do will be supported by the board."',
        options: {
          A: 'Noun Clause',
          B: 'Adjective Clause',
          C: 'Adverbial Clause of Condition',
          D: 'Relative Clause'
        },
        correctAnswer: 'A',
        topic: 'Clause Identification (Noun Clause acting as subject of verb will be supported)',
        explanation: 'The entire clause "Whatever you decide to do" serves as the grammatical subject of the sentence verb "will be supported", making it a Noun Clause.'
      },
      {
        id: 18,
        question: 'Open the window to let some fresh air in, ____?',
        options: { A: 'will you', B: "don't you", C: 'do you', D: "aren't you" },
        correctAnswer: 'A',
        topic: 'Tag Questions (Affirmative imperative takes will you)',
        explanation: 'An imperative sentence expressing a polite request or instruction typically takes the question tag "will you?".'
      },
      {
        id: 19,
        question: 'The IT technician had the main server ____ within two hours of the system crash.',
        options: { A: 'restore', B: 'restored', C: 'to restore', D: 'restoring' },
        correctAnswer: 'B',
        topic: 'Causative Verbs (have + object [thing] + past participle)',
        explanation: 'In the passive causative structure "have + object (thing) + past participle", the server receives the action: "had the main server restored".'
      },
      {
        id: 20,
        question: 'Identify the sentence that is free from redundancy or grammatical error:',
        options: {
          A: 'The university will grant a free gift to all new enrollees.',
          B: 'He briefed us about the situation in a short summary.',
          C: 'The committee came to a unanimous decision on the matter.',
          D: 'They retreated back to their original defensive positions.'
        },
        correctAnswer: 'C',
        topic: 'Redundancy Elimination (Avoid free gift, short summary, retreated back)',
        explanation: 'A gift is inherently free, a summary is inherently short, and retreat inherently means to move back. Option C has no redundancy.'
      },
      {
        id: 21,
        question: 'She took an extra coat with her ____ the temperature dropped unexpectedly during the night.',
        options: { A: 'in case', B: 'unless', C: 'provided', D: 'although' },
        correctAnswer: 'A',
        topic: 'Conjunctions (in case expressing precaution)',
        explanation: '"In case" is used to express precaution against a possible future event ("in case the temperature dropped").'
      },
      {
        id: 22,
        question: 'The structural proposal submitted by the union was ____ by management due to budget limits.',
        options: { A: 'turned down', B: 'turned off', C: 'turned out', D: 'turned on' },
        correctAnswer: 'A',
        topic: 'Phrasal Verbs (turn down = reject/decline)',
        explanation: '"Turn down" is a phrasal verb meaning to reject or decline an offer, request, or proposal.'
      },
      {
        id: 23,
        question: 'All the ____ carried by the passengers was thoroughly inspected at the security checkpoint.',
        options: { A: 'luggages', B: 'luggage', C: 'pieces of luggages', D: 'item of luggages' },
        correctAnswer: 'B',
        topic: 'Countable vs. Uncountable Nouns (luggage is uncountable)',
        explanation: '"Luggage" is an uncountable mass noun in English; it cannot be made plural as "luggages".'
      },
      {
        id: 24,
        question: 'A large number of eligible applicants ____ present at the recruitment venue this morning.',
        options: { A: 'was', B: 'were', C: 'is', D: 'has been' },
        correctAnswer: 'B',
        topic: 'Subject-Verb Agreement / Quantifiers (A large number of + plural noun takes plural verb)',
        explanation: '"A large number of" is an indefinite quantifier meaning "many", and takes a plural countable noun ("applicants") and a plural verb ("were").'
      },
      {
        id: 25,
        question: 'Identify the segment containing an error: "The teacher asked the student (A) / to why he was late (B) / for the special class. (C) / No error (D)"',
        options: {
          A: 'The teacher asked the student',
          B: 'to why he was late',
          C: 'for the special class',
          D: 'No error'
        },
        correctAnswer: 'B',
        topic: 'Pinpoint Error (asked + object + why...; infinitive to before why is redundant)',
        explanation: 'In indirect questions introduced by a wh-word ("why"), the preposition/infinitive marker "to" should not be placed before "why". It should simply be "why he was late".'
      }
    ]
  },
  {
    id: 10,
    title: 'Model Question 10',
    subtitle: 'English Grammar Competence - Set 10',
    description: 'One of those who rule, inverted 3rd conditional, passive gerunds, lest with should, and Greek plurals.',
    totalQuestions: 25,
    questions: [
      {
        id: 1,
        question: 'He is one of those rare visionary leaders who ____ never compromise on moral principles.',
        options: { A: 'does', B: 'do', C: 'is doing', D: 'has done' },
        correctAnswer: 'B',
        topic: 'Subject-Verb Agreement (one of those [plural noun] who + plural verb)',
        explanation: 'In the construction "one of those [plural noun] who...", the relative pronoun "who" refers to the plural antecedent ("visionary leaders"), requiring a plural verb ("do").'
      },
      {
        id: 2,
        question: 'By this time next year, the government ____ the construction of the cross-country express highway.',
        options: {
          A: 'completes',
          B: 'will complete',
          C: 'will have completed',
          D: 'had completed'
        },
        correctAnswer: 'C',
        topic: 'Tense & Aspect (Future Perfect with time indicator by this time next year)',
        explanation: '"By this time next year" denotes a completion deadline in the future, requiring the Future Perfect tense ("will have completed").'
      },
      {
        id: 3,
        question: 'He was deeply absorbed ____ his academic research and remained oblivious ____ the surrounding noise.',
        options: { A: 'in; to', B: 'with; of', C: 'at; to', D: 'in; of' },
        correctAnswer: 'A',
        topic: 'Appropriate Prepositions (absorbed in, oblivious to)',
        explanation: 'The appropriate prepositions are "absorbed in" (deeply engrossed) and "oblivious to" (unaware of).'
      },
      {
        id: 4,
        question: '____ honorable gentleman whom you met at the reception yesterday is ____ M.P. representing our district.',
        options: { A: 'A; a', B: 'The; an', C: 'An; the', D: 'The; a' },
        correctAnswer: 'B',
        topic: 'Article Usage (The for specific person; an before vowel sound /em/ in M.P.)',
        explanation: '"The" is used for the specific gentleman identified by the relative clause. The abbreviation "M.P." begins with a vowel sound /em/, requiring the indefinite article "an".'
      },
      {
        id: 5,
        question: 'Select the correct passive form: "I remember my mother taking me to the zoo as a child."',
        options: {
          A: 'I remember being taken to the zoo by my mother as a child.',
          B: 'I remember my mother was taking me to the zoo as a child.',
          C: 'Taking to the zoo by my mother is remembered by me as a child.',
          D: 'I remember to be taken to the zoo by my mother as a child.'
        },
        correctAnswer: 'A',
        topic: 'Passive Voice Transformation (Gerund object passive: remember being + V3)',
        explanation: 'The active gerund structure "taking me" changes to passive gerund: "remember being taken to the zoo by my mother".'
      },
      {
        id: 6,
        question: 'Select the correct indirect speech: He said, "Bravo! You have played exceptionally well."',
        options: {
          A: 'He applauded him, saying that he had played exceptionally well.',
          B: 'He exclaimed with joy that he played exceptionally well.',
          C: 'He told him bravo that he had played exceptionally well.',
          D: 'He praised him that he played exceptionally well.'
        },
        correctAnswer: 'A',
        topic: 'Indirect Speech (Reporting exclamations/applausus with applauded... saying that)',
        explanation: 'The interjection "Bravo!" signifies praise/applause and is converted to indirect speech using "applauded him, saying that he had played exceptionally well."'
      },
      {
        id: 7,
        question: 'Had I been informed about the sudden change in schedule, I ____ my travel arrangements accordingly.',
        options: {
          A: 'would alter',
          B: 'would have altered',
          C: 'will alter',
          D: 'had altered'
        },
        correctAnswer: 'B',
        topic: '3rd Conditional (Inverted Had I been... would have + V3)',
        explanation: 'An inverted third conditional ("Had I been informed...") represents an unreal past condition and requires "would have + past participle" ("would have altered") in the main clause.'
      },
      {
        id: 8,
        question: 'I wish I ____ more attention to the financial regulations during my tenure as executive director.',
        options: { A: 'paid', B: 'have paid', C: 'had paid', D: 'would pay' },
        correctAnswer: 'C',
        topic: 'Unreal Past / Subjunctive (I wish + past perfect for past regret)',
        explanation: '"I wish" expressing a regret about an event in the past takes the Past Perfect tense ("had paid").'
      },
      {
        id: 9,
        question: 'Rarely ____ such a remarkable consensus between two rival political factions in recent times.',
        options: {
          A: 'we have witnessed',
          B: 'have we witnessed',
          C: 'we saw',
          D: 'did we witnessed'
        },
        correctAnswer: 'B',
        topic: 'Subject-Auxiliary Inversion after restrictive adverb (Rarely have we...)',
        explanation: 'Restrictive adverbs like "Rarely" at the beginning of a clause trigger subject-auxiliary inversion ("have we witnessed").'
      },
      {
        id: 10,
        question: 'The new training software is designed for assessing employee skills, tracking individual progress, and ____.',
        options: {
          A: 'to generate performance reports',
          B: 'generating performance reports',
          C: 'performance reports generation',
          D: 'generated performance reports'
        },
        correctAnswer: 'B',
        topic: 'Parallel Structure (Series of gerunds: assessing, tracking, generating)',
        explanation: 'The preposition "for" coordinates a series of parallel gerunds: "assessing...", "tracking...", and "generating performance reports".'
      },
      {
        id: 11,
        question: 'Choose the grammatically correct sentence:',
        options: {
          A: 'Covered in thick snow, the hiker could barely climb the steep mountain path.',
          B: 'Covered in thick snow, the steep mountain path was difficult for the hiker to climb.',
          C: 'Covered in thick snow, climbing the steep mountain path was difficult for the hiker.',
          D: "Covered in thick snow, the hiker's path was almost impossible to climb."
        },
        correctAnswer: 'B',
        topic: 'Dangling / Misplaced Modifiers (Path is covered in snow, not the hiker)',
        explanation: 'The mountain path is what is covered in thick snow, so "the steep mountain path" must be the grammatical subject immediately following the introductory modifier.'
      },
      {
        id: 12,
        question: 'She is the only candidate ____ I think can handle the extreme pressure of this executive post.',
        options: { A: 'whom', B: 'who', C: 'which', D: 'whose' },
        correctAnswer: 'B',
        topic: 'Pronoun Case (who acts as subject of verb can handle; I think is parenthetical)',
        explanation: '"I think" is a parenthetical insertion; the relative pronoun functions as the subject of the verb "can handle", so the nominative case "who" is correct.'
      },
      {
        id: 13,
        question: 'The suspect was seen ____ the confidential folder into his coat before stepping out of the office.',
        options: { A: 'to slip', B: 'slip', C: 'slipped', D: 'to slipping' },
        correctAnswer: 'A',
        topic: 'Non-Finite Verbs / Passive Infinitive (was seen to slip)',
        explanation: 'Verbs of perception (see, hear, observe) take a bare infinitive in the active voice, but strictly require a full to-infinitive in the passive voice ("was seen to slip").'
      },
      {
        id: 14,
        question: 'Select the correct complex sentence form of: "Without working hard, you cannot expect to clear the civil services examination."',
        options: {
          A: 'Unless you work hard, you cannot expect to clear the civil services examination.',
          B: 'You work hard and you clear the civil services examination.',
          C: 'In spite of working hard, you clear the civil services examination.',
          D: 'Work hard or you cannot clear the civil services examination.'
        },
        correctAnswer: 'A',
        topic: 'Sentence Transformation (Simple to Complex using conditional clause Unless)',
        explanation: '"Unless you work hard" is a subordinate conditional clause, making the resulting sentence complex with the independent clause.'
      },
      {
        id: 15,
        question: 'Choose the correct comparative form of: "No other island in the world is as large as Greenland."',
        options: {
          A: 'Greenland is larger than any other island in the world.',
          B: 'Greenland is larger than most other islands in the world.',
          C: 'Greenland is the most largest island in the world.',
          D: 'Greenland is as large as any other island in the world.'
        },
        correctAnswer: 'A',
        topic: 'Degrees of Comparison (No other... as → larger than any other)',
        explanation: 'The positive degree statement "No other island... is as large as Greenland" converts to comparative degree as "Greenland is larger than any other island in the world."'
      },
      {
        id: 16,
        question: 'In the sentence "He liked the structural proposal, but his colleague strongly opposed it," the word "but" functions as a/an:',
        options: {
          A: 'Preposition',
          B: 'Coordinating Conjunction',
          C: 'Adverb',
          D: 'Relative Pronoun'
        },
        correctAnswer: 'B',
        topic: 'Parts of Speech Identification (but connecting two independent clauses)',
        explanation: '"But" links two independent clauses with equal grammatical status, functioning as a Coordinating Conjunction.'
      },
      {
        id: 17,
        question: 'Identify the clause type: "Since the meteorological department warned of a storm, the fishing trawlers stayed ashore."',
        options: {
          A: 'Noun Clause',
          B: 'Adjective Clause',
          C: 'Adverbial Clause of Reason',
          D: 'Adverbial Clause of Time'
        },
        correctAnswer: 'C',
        topic: 'Clause Identification (Adverbial Clause of Reason introduced by Since)',
        explanation: '"Since the meteorological department warned of a storm" explains the reason why the trawlers stayed ashore, functioning as an Adverbial Clause of Reason.'
      },
      {
        id: 18,
        question: 'I am eligible for the senior management post, ____?',
        options: { A: 'am I not', B: "aren't I", C: "isn't I", D: "don't I" },
        correctAnswer: 'B',
        topic: 'Tag Questions (Negative tag for I am is aren\'t I)',
        explanation: 'In colloquial and standard modern English, the contracted negative question tag for "I am" is "aren\'t I?".'
      },
      {
        id: 19,
        question: 'The manager had his assistant ____ all the meeting minutes before the executive session started.',
        options: { A: 'type', B: 'to type', C: 'typed', D: 'typing' },
        correctAnswer: 'A',
        topic: 'Causative Verbs (have + person + bare infinitive)',
        explanation: 'The causative construction "have + person (agent) + bare infinitive" takes the base form of the verb without "to": "had his assistant type".'
      },
      {
        id: 20,
        question: 'Identify the sentence that is free from redundancy or grammatical error:',
        options: {
          A: 'The consensus of opinion was reached after a long debate.',
          B: 'They postponed the meeting to a future date.',
          C: 'The committee reached a consensus after a lengthy discussion.',
          D: 'He unexpectedly surprised his colleagues with the announcement.'
        },
        correctAnswer: 'C',
        topic: 'Redundancy Elimination (Avoid consensus of opinion, postponed to a future date)',
        explanation: '"Consensus of opinion", "postponed to a future date", and "unexpectedly surprised" are redundant. Option C is clean and accurate.'
      },
      {
        id: 21,
        question: 'Walk fast ____ you should miss the last commuter train of the night.',
        options: { A: 'lest', B: 'unless', C: 'otherwise', D: 'in case' },
        correctAnswer: 'A',
        topic: 'Conjunctions (Lest... should)',
        explanation: '"Lest" means "for fear that" or "in order to prevent", and is traditionally paired with the auxiliary verb "should".'
      },
      {
        id: 22,
        question: 'After hours of intense cross-examination by the prosecutors, the suspect finally ____ and confessed.',
        options: { A: 'broke down', B: 'broke off', C: 'broke out', D: 'broke up' },
        correctAnswer: 'A',
        topic: 'Phrasal Verbs (break down = collapse emotionally/give in)',
        explanation: '"Break down" means to collapse emotionally or lose self-control and surrender to questioning.'
      },
      {
        id: 23,
        question: 'The panel evaluated the research proposal based on a single strict ____.',
        options: { A: 'criteria', B: 'criterion', C: 'criterias', D: 'criterions' },
        correctAnswer: 'B',
        topic: 'Foreign Singular vs. Plural Nouns (criterion [singular] vs. criteria [plural])',
        explanation: '"Criterion" is the singular noun of Greek origin; "criteria" is the plural form. Preceded by "a single strict", the singular "criterion" is required.'
      },
      {
        id: 24,
        question: '____ of the money collected during the flood relief drive was spent on emergency medical supplies.',
        options: { A: 'Many', B: 'Much', C: 'Few', D: 'A few' },
        correctAnswer: 'B',
        topic: 'Quantifiers with Uncountable Nouns (much of the money)',
        explanation: '"Money" is an uncountable mass noun, so it is quantified by "Much", not "Many" or "Few".'
      },
      {
        id: 25,
        question: 'Identify the segment containing an error: "Neither the lead actor (A) / nor the background dancers (B) / was ready for the final performance. (C) / No error (D)"',
        options: {
          A: 'Neither the lead actor',
          B: 'nor the background dancers',
          C: 'was ready for the final performance',
          D: 'No error'
        },
        correctAnswer: 'C',
        topic: 'Pinpoint Error (Proximity rule with neither... nor: plural subject dancers requires were ready)',
        explanation: 'In "neither... nor" structures, the verb agrees in number with the closer subject. Since "the background dancers" is plural, it requires "were ready", not "was ready".'
      }
    ]
  }
];
