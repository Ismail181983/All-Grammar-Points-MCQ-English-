import { ModelQuestionSet } from '../types';

export const modelQuestionSets31to35: ModelQuestionSet[] = [
  {
    id: 31,
    title: 'Model Question 31',
    subtitle: 'English Grammar Competence - Set 31',
    description: 'Comprehensive evaluation covering articles with unique nouns, prepositions of purpose and cause, causative verbs, conditional inversions, and reported speech.',
    totalQuestions: 25,
    questions: [
      {
        id: 1,
        question: 'Choose the correct article: He is ___ one-eyed deer hunter who lives in the village.',
        options: { A: 'a', B: 'an', C: 'the', D: 'no article' },
        correctAnswer: 'A',
        topic: 'Articles (Consonant sound /w/)',
        explanation: 'Although "one" begins with the vowel letter "o", it is phonetically pronounced with the consonant glide /w/ ("wun"). Words beginning with a consonant sound take the indefinite article "a".'
      },
      {
        id: 2,
        question: 'Choose the appropriate preposition: She is very keen ___ learning classical English literature.',
        options: { A: 'on', B: 'in', C: 'at', D: 'for' },
        correctAnswer: 'A',
        topic: 'Appropriate Preposition (keen on)',
        explanation: 'The adjective "keen" takes the preposition "on" ("keen on doing something"), meaning highly enthusiastic or eager about something.'
      },
      {
        id: 3,
        question: 'Choose the correct form of verb: By the time we arrive at the auditorium, the lecture ____.',
        options: { A: 'will have started', B: 'will start', C: 'starts', D: 'had started' },
        correctAnswer: 'A',
        topic: 'Future Perfect Tense (By the time + present, future perfect)',
        explanation: 'When "by the time" introduces a present tense clause referring to the future, the main clause requires the Future Perfect tense ("will have + V3") to show completion prior to that time.'
      },
      {
        id: 4,
        question: 'Subject-Verb Agreement: Bread and butter ____ his daily staple breakfast.',
        options: { A: 'is', B: 'are', C: 'were', D: 'have been' },
        correctAnswer: 'A',
        topic: 'Subject-Verb Agreement (Compound subject expressing single unit)',
        explanation: 'When two nouns joined by "and" express a single idea, dish, or unit (like "bread and butter", "slow and steady"), they take a singular verb ("is").'
      },
      {
        id: 5,
        question: 'Passive Voice: Change into passive – "The chef made us clean the kitchen counter."',
        options: {
          A: 'We were made to clean the kitchen counter by the chef.',
          B: 'We were made clean the kitchen counter by the chef.',
          C: 'The kitchen counter was made clean by us.',
          D: 'We had been made clean by the chef.'
        },
        correctAnswer: 'A',
        topic: 'Voice Change (Causative verb make in passive takes to-infinitive)',
        explanation: 'In the active voice, the causative verb "make" takes a bare infinitive ("made us clean"). In the passive voice, it requires a full to-infinitive: "We were made to clean...".'
      },
      {
        id: 6,
        question: 'Indirect Speech: He said to me, "Where did you buy this vintage watch?"',
        options: {
          A: 'He asked me where I had bought that vintage watch.',
          B: 'He asked me where had I bought that vintage watch.',
          C: 'He asked me where did I buy this vintage watch.',
          D: 'He told me where I bought that vintage watch.'
        },
        correctAnswer: 'A',
        topic: 'Indirect Speech (Wh-question with past simple shifting to past perfect)',
        explanation: 'In indirect wh-questions, the word order becomes assertive (subject before verb: "I had bought"), past simple ("did buy") backshifts to past perfect ("had bought"), and "this" changes to "that".'
      },
      {
        id: 7,
        question: 'Conditional Sentence: If you ____ the instructions carefully, you would not have made that blunder.',
        options: { A: 'had followed', B: 'followed', C: 'follow', D: 'would follow' },
        correctAnswer: 'A',
        topic: 'Third Conditional (Unfulfilled past condition)',
        explanation: 'The result clause contains "would not have made" (would have + V3), which indicates a Third Conditional requiring the Past Perfect ("had followed") in the if-clause.'
      },
      {
        id: 8,
        question: 'Identify the incorrect segment: "He is superior (A) / than me (B) / in administrative experience (C) / No error (D)"',
        options: { A: 'He is superior', B: 'than me', C: 'in administrative experience', D: 'No error' },
        correctAnswer: 'B',
        topic: 'Pinpoint Error (Latin comparative superior takes to, not than)',
        explanation: 'Latin comparative adjectives like "superior", "inferior", "senior", and "junior" strictly take the preposition "to", so "than me" is incorrect and must be "to me".'
      },
      {
        id: 9,
        question: 'Choose the correct form: It is high time we ____ against environmental pollution.',
        options: { A: 'took action', B: 'take action', C: 'have taken action', D: 'had taken action' },
        correctAnswer: 'A',
        topic: 'Right Form of Verbs (It is high time + past simple)',
        explanation: 'The phrase "It is high time" (or "It is time") followed by a subject requires the verb in the simple past tense ("took action") to express that the action is already overdue.'
      },
      {
        id: 10,
        question: 'Transformation: Change into simple sentence – "Since he was exhausted, he went to bed early."',
        options: {
          A: 'Being exhausted, he went to bed early.',
          B: 'He was exhausted and went to bed early.',
          C: 'He went to bed early because he was exhausted.',
          D: 'Although he was exhausted, he went to bed early.'
        },
        correctAnswer: 'A',
        topic: 'Transformation of Sentences (Complex to Simple using participle phrase)',
        explanation: 'A complex clause expressing cause ("Since he was exhausted") is converted to a simple sentence by using a present participle phrase ("Being exhausted").'
      },
      {
        id: 11,
        question: 'Identify the part of speech: The fast train travels very fast.',
        options: {
          A: 'The first "fast" is an adjective and the second "fast" is an adverb.',
          B: 'Both are adjectives.',
          C: 'Both are adverbs.',
          D: 'The first "fast" is an adverb and the second "fast" is an adjective.'
        },
        correctAnswer: 'A',
        topic: 'Parts of Speech (Fast as adjective and adverb)',
        explanation: 'The first "fast" modifies the noun "train" (adjective), while the second "fast" modifies the verb "travels" to describe how it travels (adverb of manner).'
      },
      {
        id: 12,
        question: 'Choose the correct conjunction: Walk swiftly ____ you should miss the morning commuter train.',
        options: { A: 'lest', B: 'unless', C: 'otherwise', D: 'or' },
        correctAnswer: 'A',
        topic: 'Conjunctions (Lest + should)',
        explanation: '"Lest" means "for fear that" or "in order to prevent", and is traditionally followed by "should" + base verb. Note that "lest" is negative in meaning and takes no additional "not".'
      },
      {
        id: 13,
        question: 'Choose the correct modal auxiliary: You ____ not have worried; the examination was postponed.',
        options: { A: 'need', B: 'must', C: 'ought', D: 'dare' },
        correctAnswer: 'A',
        topic: 'Modal Verbs (Need not have + past participle for unnecessary past action)',
        explanation: '"Need not have + V3" is used to express that an action was performed in the past, but in retrospect it was completely unnecessary.'
      },
      {
        id: 14,
        question: 'Choose the correct determiner: We have ____ hope of recovery, as the patient is sinking fast.',
        options: { A: 'little', B: 'a little', C: 'few', D: 'a few' },
        correctAnswer: 'A',
        topic: 'Determiners (Little with uncountable nouns expressing negative sense)',
        explanation: '"Hope" is an uncountable abstract noun. "Little" (without "a") expresses a negative meaning equivalent to "almost no hope", which matches the sinking condition of the patient.'
      },
      {
        id: 15,
        question: 'Identify the underlined clause: "I will meet you when the sun sets."',
        options: { A: 'Adverb clause of time', B: 'Noun clause', C: 'Adjective clause', D: 'Coordinate clause' },
        correctAnswer: 'A',
        topic: 'Identification of Clause (Adverb Clause of Time)',
        explanation: 'The subordinate clause "when the sun sets" answers the question "When will I meet you?", thereby modifying the verb "will meet" as an Adverb Clause of Time.'
      },
      {
        id: 16,
        question: 'Choose the appropriate preposition: The judge acquitted the defendant ____ all charges.',
        options: { A: 'of', B: 'from', C: 'with', D: 'for' },
        correctAnswer: 'A',
        topic: 'Appropriate Preposition (acquitted of)',
        explanation: 'The verb "acquit" takes the fixed preposition "of" to signify formally discharging or clearing someone from an accusation ("acquitted of the crime").'
      },
      {
        id: 17,
        question: 'Choose the correct tense form: I ____ in this residential area for more than a decade.',
        options: { A: 'have been living', B: 'am living', C: 'lived', D: 'was living' },
        correctAnswer: 'A',
        topic: 'Present Perfect Continuous Tense (for + duration)',
        explanation: 'An action that began in the past and continues into the present over a duration of time ("for more than a decade") demands the Present Perfect Continuous tense ("have been living").'
      },
      {
        id: 18,
        question: 'Passive Voice: Change into passive – "Do not look down upon the underprivileged."',
        options: {
          A: 'Let not the underprivileged be looked down upon.',
          B: 'Let the underprivileged not be look down upon.',
          C: 'The underprivileged should not look down upon.',
          D: 'Let the underprivileged be not looked down.'
        },
        correctAnswer: 'A',
        topic: 'Voice Change (Negative Imperative with phrasal preposition retained)',
        explanation: 'Negative imperatives in the passive voice follow the formula: "Let not + object + be + V3". The preposition "upon" in the phrasal verb "look down upon" must be retained.'
      },
      {
        id: 19,
        question: 'Indirect Speech: The general said to the soldiers, "March forward!"',
        options: {
          A: 'The general commanded the soldiers to march forward.',
          B: 'The general told the soldiers that they should march forward.',
          C: 'The general requested the soldiers to march forward.',
          D: 'The general asked the soldiers march forward.'
        },
        correctAnswer: 'A',
        topic: 'Indirect Speech (Military command converted using commanded)',
        explanation: 'Military orders from a commanding officer use the reporting verb "commanded" or "ordered", followed by the object and a to-infinitive: "commanded the soldiers to march forward".'
      },
      {
        id: 20,
        question: 'Choose the correct article: He made ___ unanimous decision during the conference.',
        options: { A: 'a', B: 'an', C: 'the', D: 'no article' },
        correctAnswer: 'A',
        topic: 'Articles (Vowel letter with consonant sound /juː/)',
        explanation: 'The word "unanimous" begins with the vowel letter "u", but its phonetic onset is the consonant sound /juː/ (yu-na-ni-mous), requiring the indefinite article "a".'
      },
      {
        id: 21,
        question: 'What does the idiom "burn the midnight oil" mean?',
        options: {
          A: 'To study or work late into the night',
          B: 'To waste valuable fuel',
          C: 'To cause an accidental fire',
          D: 'To wake up early before dawn'
        },
        correctAnswer: 'A',
        topic: 'Idioms & Phrases',
        explanation: 'The idiom "burn the midnight oil" originates from working by the light of an oil lamp late into the night, meaning to study or work diligently late into the night.'
      },
      {
        id: 22,
        question: 'Choose the correctly spelt word:',
        options: { A: 'Millennium', B: 'Millenium', C: 'Milennium', D: 'Millenniam' },
        correctAnswer: 'A',
        topic: 'Spelling Verification',
        explanation: 'The correct spelling is "Millennium" (M-I-L-L-E-N-N-I-U-M), with a double "l" and a double "n".'
      },
      {
        id: 23,
        question: 'Conditional Inversion: ____ you require any further assistance, please contact the front desk.',
        options: { A: 'Should', B: 'Were', C: 'Had', D: 'Would' },
        correctAnswer: 'A',
        topic: 'Conditional Inversion (Should inversion for First Conditional)',
        explanation: 'First conditional sentences can be inverted by replacing "If you should require..." with "Should you require...", providing a polite, formal conditional structure.'
      },
      {
        id: 24,
        question: 'Subject-Verb Agreement: A variety of exotic flowers ____ exhibited at the annual botanical fair.',
        options: { A: 'were', B: 'was', C: 'is', D: 'has been' },
        correctAnswer: 'A',
        topic: 'Subject-Verb Agreement (A variety of + plural noun takes plural verb)',
        explanation: 'The expression "A variety of" functions as a quantifier modifying the plural noun "exotic flowers", requiring a plural verb ("were") when referring to individual items in a collection.'
      },
      {
        id: 25,
        question: 'Literature: Who is the author of the tragic play "Othello"?',
        options: { A: 'William Shakespeare', B: 'Christopher Marlowe', C: 'Ben Jonson', D: 'John Webster' },
        correctAnswer: 'A',
        topic: 'English Literature',
        explanation: '"Othello, the Moor of Venice" is a famous tragedy written by William Shakespeare around 1603, centering on themes of jealousy, deception, and betrayal.'
      }
    ]
  },
  {
    id: 32,
    title: 'Model Question 32',
    subtitle: 'English Grammar Competence - Set 32',
    description: 'Advanced assessment focusing on non-finite verbs, participle clauses, subjunctive structures, correlative conjunctions, and vocabulary precision.',
    totalQuestions: 25,
    questions: [
      {
        id: 1,
        question: 'Choose the correct article: She graduated from ___ university located in the capital city.',
        options: { A: 'a', B: 'an', C: 'the', D: 'no article' },
        correctAnswer: 'A',
        topic: 'Articles (University initial sound /juː/)',
        explanation: '"University" begins with the vowel letter "u" but the phonetic initial sound is the consonant semi-vowel /juː/ (yu-ni-ver-si-ty), so it requires the article "a".'
      },
      {
        id: 2,
        question: 'Appropriate Preposition: The scholar is thoroughly versed ___ oriental languages.',
        options: { A: 'in', B: 'with', C: 'at', D: 'of' },
        correctAnswer: 'A',
        topic: 'Appropriate Preposition (versed in)',
        explanation: 'The adjective "versed" takes the preposition "in" ("versed in something"), meaning knowledgeable, skilled, or well-practiced in a particular discipline.'
      },
      {
        id: 3,
        question: 'Choose the correct form of verb: Scarcely had the president concluded his speech when the hall ____ with cheers.',
        options: { A: 'resounded', B: 'had resounded', C: 'resounds', D: 'was resounding' },
        correctAnswer: 'A',
        topic: 'Right Form of Verbs (Scarcely had...when + simple past)',
        explanation: 'In correlative clauses with "Scarcely had + subject + V3", the second clause introduced by "when" strictly takes the Simple Past tense ("resounded").'
      },
      {
        id: 4,
        question: 'Subject-Verb Agreement: Neither the manager nor the board members ____ willing to compromise.',
        options: { A: 'were', B: 'was', C: 'is', D: 'has been' },
        correctAnswer: 'A',
        topic: 'Subject-Verb Agreement (Proximity rule with neither...nor)',
        explanation: 'When subjects are connected by "neither...nor", the verb agrees with the subject closest to it. "The board members" is plural, so the verb must be plural ("were").'
      },
      {
        id: 5,
        question: 'Passive Voice: Change into passive – "They elected him chairman of the committee."',
        options: {
          A: 'He was elected chairman of the committee by them.',
          B: 'Chairman of the committee was elected him.',
          C: 'He had been elected chairman of the committee.',
          D: 'Chairman was elected by him to the committee.'
        },
        correctAnswer: 'A',
        topic: 'Voice Change (Factitive object / objective complement)',
        explanation: 'In sentences with a factitive verb and an objective complement ("elected him chairman"), only the direct object ("him" → "He") becomes the passive subject, while "chairman" remains the complement.'
      },
      {
        id: 6,
        question: 'Indirect Speech: The doctor said to the patient, "Do not skip your morning medication."',
        options: {
          A: 'The doctor advised the patient not to skip his morning medication.',
          B: 'The doctor ordered the patient that he should not skip medication.',
          C: 'The doctor forbade the patient not to skip his morning medication.',
          D: 'The doctor requested the patient do not skip medication.'
        },
        correctAnswer: 'A',
        topic: 'Indirect Speech (Negative imperative advice with advised + not to)',
        explanation: 'Negative imperatives expressing medical advice use "advised + object + not to + base verb". Note: if "forbade" were used, "not" would be excluded to avoid a double negative.'
      },
      {
        id: 7,
        question: 'Conditional: If he had taken my advice, he ____ in this difficult predicament now.',
        options: { A: 'would not be', B: 'would not have been', C: 'will not be', D: 'is not' },
        correctAnswer: 'A',
        topic: 'Mixed Conditional (Past condition with present outcome)',
        explanation: 'This is a mixed conditional: the condition is in the past ("If he had taken"), but the result refers to the present time ("now"), requiring "would not be" rather than "would not have been".'
      },
      {
        id: 8,
        question: 'Pinpoint Error: "The committee have (A) / reached an unanimous (B) / verdict regarding the dispute. (C) / No error (D)"',
        options: { A: 'The committee have', B: 'reached an unanimous', C: 'verdict regarding the dispute', D: 'No error' },
        correctAnswer: 'B',
        topic: 'Pinpoint Error (Article an before unanimous is incorrect; must be a unanimous)',
        explanation: 'Because "unanimous" begins with the consonant semi-vowel sound /juː/, the correct article is "a unanimous", not "an unanimous".'
      },
      {
        id: 9,
        question: 'Subjunctive Mood: The chairperson recommended that the meeting ____ till next Monday.',
        options: { A: 'be postponed', B: 'is postponed', C: 'was postponed', D: 'will be postponed' },
        correctAnswer: 'A',
        topic: 'Subjunctive Mood (recommended that + base verb be)',
        explanation: 'Verbs of recommendation, mandate, or suggestion ("recommended that") trigger the present subjunctive mood, requiring the uninflected base verb ("be postponed").'
      },
      {
        id: 10,
        question: 'Transformation: Change into negative – "As soon as the bell rang, the pupils dispersed."',
        options: {
          A: 'No sooner had the bell rung than the pupils dispersed.',
          B: 'No sooner did the bell ring when the pupils dispersed.',
          C: 'Hardly had the bell rung than the pupils dispersed.',
          D: 'Scarcely had the bell rung then the pupils dispersed.'
        },
        correctAnswer: 'A',
        topic: 'Transformation of Sentences (As soon as into No sooner...than)',
        explanation: 'Affirmative sentences with "As soon as" transform into negative using "No sooner had + subject + V3 ... than + past simple".'
      },
      {
        id: 11,
        question: 'Identify the verbal: Hearing the alarm, the guard rushed to the entrance.',
        options: { A: 'Present participle', B: 'Gerund', C: 'Infinitive', D: 'Verbal noun' },
        correctAnswer: 'A',
        topic: 'Non-finite Verbs (Present Participle expressing simultaneous action)',
        explanation: '"Hearing" modifies the subject "the guard" and denotes an action happening at the same time, functioning as a present participle (verbal adjective).'
      },
      {
        id: 12,
        question: 'Correlative Conjunctions: Not only the teacher but also the pupils ____ felicitated at the ceremony.',
        options: { A: 'were', B: 'was', C: 'is', D: 'has been' },
        correctAnswer: 'A',
        topic: 'Subject-Verb Agreement (Not only...but also proximity rule)',
        explanation: 'When subjects are joined by "not only...but also", the verb agrees with the closer subject ("the pupils" - plural), hence "were" is correct.'
      },
      {
        id: 13,
        question: 'Choose the appropriate modal: You ____ apologize at once; your remarks were completely uncalled for.',
        options: { A: 'ought to', B: 'might', C: 'could', D: 'would' },
        correctAnswer: 'A',
        topic: 'Modal Verbs (Moral obligation with ought to)',
        explanation: '"Ought to" expresses moral obligation, strong recommendation, or propriety, which fits the context of an uncalled-for remark demanding an apology.'
      },
      {
        id: 14,
        question: 'Choose the correct determiner: There are ____ vacant seats remaining in the auditorium, so hurry up.',
        options: { A: 'few', B: 'little', C: 'a few', D: 'much' },
        correctAnswer: 'A',
        topic: 'Determiners (Few meaning almost none with countable nouns)',
        explanation: '"Seats" is a countable plural noun. "Few" carries a negative sense ("almost none left"), which justifies the urgency expressed in "so hurry up".'
      },
      {
        id: 15,
        question: 'Identify the clause: "The report that he submitted yesterday contains grave inaccuracies."',
        options: { A: 'Adjective clause', B: 'Noun clause', C: 'Adverb clause', D: 'Independent clause' },
        correctAnswer: 'A',
        topic: 'Identification of Clause (Adjective Clause modifying report)',
        explanation: 'The relative clause "that he submitted yesterday" qualifies the antecedent noun "The report", functioning as an Adjective Clause.'
      },
      {
        id: 16,
        question: 'Appropriate Preposition: He is entirely devoid ____ any ethical sense.',
        options: { A: 'of', B: 'from', C: 'with', D: 'in' },
        correctAnswer: 'A',
        topic: 'Appropriate Preposition (devoid of)',
        explanation: 'The adjective "devoid" takes the preposition "of" ("devoid of something"), meaning completely lacking or empty of a quality.'
      },
      {
        id: 17,
        question: 'Right Form of Verb: Look! The children ____ joyfully around the garden fountain.',
        options: { A: 'are dancing', B: 'dance', C: 'danced', D: 'have danced' },
        correctAnswer: 'A',
        topic: 'Present Continuous Tense (Imperative cue Look!)',
        explanation: 'Exclamatory calls like "Look!" or "Listen!" draw immediate attention to an action happening right at the present moment, requiring the Present Continuous tense ("are dancing").'
      },
      {
        id: 18,
        question: 'Passive Voice: Change into passive – "One must keep one\'s promises."',
        options: {
          A: 'Promises must be kept.',
          B: 'One\'s promises must be kept by one.',
          C: 'Promises should be kept by one.',
          D: 'A promise must be kept.'
        },
        correctAnswer: 'A',
        topic: 'Voice Change (Indefinite pronoun one omitted in passive)',
        explanation: 'When "one" is used in an active sentence expressing a general duty, the passive form drops the indefinite pronoun: "Promises must be kept."'
      },
      {
        id: 19,
        question: 'Indirect Speech: He said, "May the Almighty grant you peace and prosperity."',
        options: {
          A: 'He prayed that the Almighty might grant me peace and prosperity.',
          B: 'He wished that the Almighty may grant me peace and prosperity.',
          C: 'He prayed the Almighty to grant me peace and prosperity.',
          D: 'He said that may the Almighty grant me peace and prosperity.'
        },
        correctAnswer: 'A',
        topic: 'Indirect Speech (Optative sentence prayer with prayed that + might)',
        explanation: 'In optative sentences invoking God or the Almighty, the reporting verb changes to "prayed", the conjunction is "that", and "may" backshifts to "might".'
      },
      {
        id: 20,
        question: 'Choose the correct article: He is ___ heir apparent to the ancestral throne.',
        options: { A: 'an', B: 'a', C: 'the', D: 'no article' },
        correctAnswer: 'A',
        topic: 'Articles (Silent initial h in heir)',
        explanation: 'The initial "h" in "heir" is completely silent (pronounced like "air" /eə/), so it begins with a vowel sound and takes the indefinite article "an".'
      },
      {
        id: 21,
        question: 'Idiom: "A wild goose chase" denotes:',
        options: {
          A: 'A foolish, hopeless, and futile pursuit',
          B: 'A thrilling hunting expedition',
          C: 'A profitable commercial venture',
          D: 'An easily achievable objective'
        },
        correctAnswer: 'A',
        topic: 'Idioms & Phrases',
        explanation: '"A wild goose chase" refers to a foolish search or pursuit of something that is unattainable or completely useless.'
      },
      {
        id: 22,
        question: 'Choose the correctly spelt word:',
        options: { A: 'Surveillance', B: 'Surveilance', C: 'Surveillence', D: 'Survalience' },
        correctAnswer: 'A',
        topic: 'Spelling Verification',
        explanation: 'The correct spelling is "Surveillance" (S-U-R-V-E-I-L-L-A-N-C-E), with double "l" and ending in "-ance".'
      },
      {
        id: 23,
        question: 'Conditional Inversion: ____ I in your position, I would refrain from making hasty decisions.',
        options: { A: 'Were', B: 'Had', C: 'Should', D: 'Am' },
        correctAnswer: 'A',
        topic: 'Conditional Inversion (Were I in your position)',
        explanation: 'Second conditional inversion for hypothetical present situations replaces "If I were in your position" with "Were I in your position".'
      },
      {
        id: 24,
        question: 'Subject-Verb Agreement: More than one candidate ____ rejected during the primary screening.',
        options: { A: 'was', B: 'were', C: 'are', D: 'have been' },
        correctAnswer: 'A',
        topic: 'Subject-Verb Agreement (More than one + singular noun takes singular verb)',
        explanation: 'Although logically plural, the formal grammatical structure "More than one + singular noun" requires a singular verb ("was rejected").'
      },
      {
        id: 25,
        question: 'Literature: Who wrote the classic Victorian novel "Great Expectations"?',
        options: { A: 'Charles Dickens', B: 'Thomas Hardy', C: 'William Makepeace Thackeray', D: 'George Eliot' },
        correctAnswer: 'A',
        topic: 'English Literature',
        explanation: '"Great Expectations" is one of Charles Dickens\' most acclaimed novels, depicting the personal growth and development of the orphan Pip.'
      }
    ]
  },
  {
    id: 33,
    title: 'Model Question 33',
    subtitle: 'English Grammar Competence - Set 33',
    description: 'In-depth examination of collective noun concord, inversion after negative adverbs, subjunctive demand clauses, and vocabulary collocations.',
    totalQuestions: 25,
    questions: [
      {
        id: 1,
        question: 'Choose the correct article: Honest governance is ___ virtue cherished by all citizens.',
        options: { A: 'a', B: 'an', C: 'the', D: 'no article' },
        correctAnswer: 'A',
        topic: 'Articles (Virtue as a countable particular quality)',
        explanation: '"Virtue" when referring to a specific admirable moral quality begins with the consonant sound /v/ and takes the indefinite article "a".'
      },
      {
        id: 2,
        question: 'Appropriate Preposition: He has an instinctive aversion ____ ostentatious displays of wealth.',
        options: { A: 'to', B: 'against', C: 'with', D: 'for' },
        correctAnswer: 'A',
        topic: 'Appropriate Preposition (aversion to)',
        explanation: 'The noun "aversion" takes the preposition "to" (or sometimes "towards"), signifying a strong dislike or disinclination toward something.'
      },
      {
        id: 3,
        question: 'Right Form of Verb: No sooner had the bell rung than the eager students ____ out of the classroom.',
        options: { A: 'rushed', B: 'had rushed', C: 'rushes', D: 'were rushing' },
        correctAnswer: 'A',
        topic: 'Right Form of Verbs (No sooner had...than + simple past)',
        explanation: 'In the correlative pattern "No sooner had + subject + V3", the clause following "than" is always cast in the Simple Past tense ("rushed").'
      },
      {
        id: 4,
        question: 'Subject-Verb Agreement: The jury ____ divided in their opinions regarding the culpability of the accused.',
        options: { A: 'were', B: 'was', C: 'is', D: 'has been' },
        correctAnswer: 'A',
        topic: 'Subject-Verb Agreement (Noun of multitude divided in opinions)',
        explanation: 'When a collective noun ("jury") indicates members acting separately or holding differing views (emphasized by the plural pronoun "their"), it takes a plural verb ("were").'
      },
      {
        id: 5,
        question: 'Passive Voice: Change into passive – "Whom did you invite to the annual alumni banquet?"',
        options: {
          A: 'Who was invited to the annual alumni banquet by you?',
          B: 'Whom was invited to the annual alumni banquet by you?',
          C: 'Who were invited to the annual alumni banquet by you?',
          D: 'By whom were you invited to the annual alumni banquet?'
        },
        correctAnswer: 'A',
        topic: 'Voice Change (Interrogative Whom converts to Who in passive)',
        explanation: 'In passive voice, the active interrogative object "Whom" transforms into the subjective pronoun "Who", followed by the singular auxiliary "was" and the past participle "invited".'
      },
      {
        id: 6,
        question: 'Indirect Speech: "Let us discuss the matter calmly," said the mediator.',
        options: {
          A: 'The mediator proposed that they should discuss the matter calmly.',
          B: 'The mediator told that they discuss the matter calmly.',
          C: 'The mediator requested to discuss the matter calmly.',
          D: 'The mediator ordered that let them discuss the matter calmly.'
        },
        correctAnswer: 'A',
        topic: 'Indirect Speech (Proposal with Let us changes to proposed that...should)',
        explanation: 'Sentences beginning with "Let us" convey a suggestion or proposal. The reporting verb changes to "proposed" or "suggested", connected by "that", and takes "they should + base verb".'
      },
      {
        id: 7,
        question: 'Conditional: If the weather ____ favorable, we will set sail across the bay tomorrow morning.',
        options: { A: 'is', B: 'will be', C: 'was', D: 'would be' },
        correctAnswer: 'A',
        topic: 'First Conditional (If + simple present, will + base verb)',
        explanation: 'In a First Conditional sentence referring to a probable future event, the conditional if-clause takes the Simple Present tense ("is"), never future "will be".'
      },
      {
        id: 8,
        question: 'Pinpoint Error: "Neither the captain (A) / nor his sailors (B) / was aware of the impending storm. (C) / No error (D)"',
        options: { A: 'Neither the captain', B: 'nor his sailors', C: 'was aware of the impending storm', D: 'No error' },
        correctAnswer: 'C',
        topic: 'Pinpoint Error (Subject sailors is plural, requiring were aware)',
        explanation: 'According to the proximity concord rule for "neither...nor", the verb must agree with the nearer subject "his sailors" (plural), requiring "were aware" instead of "was aware".'
      },
      {
        id: 9,
        question: 'Subjunctive Mood: The inspector insisted that every record ____ submitted immediately.',
        options: { A: 'be', B: 'is', C: 'was', D: 'should be' },
        correctAnswer: 'A',
        topic: 'Subjunctive Mood (insisted that + base form be)',
        explanation: 'Verbs expressing demand or insistence like "insisted that" govern the present subjunctive mood, using the bare infinitive "be" regardless of the subject.'
      },
      {
        id: 10,
        question: 'Transformation: Change into complex – "He admitted his guilt."',
        options: {
          A: 'He admitted that he was guilty.',
          B: 'He admitted of being guilty.',
          C: 'His guilt was admitted by him.',
          D: 'He was guilty and he admitted it.'
        },
        correctAnswer: 'A',
        topic: 'Transformation of Sentences (Simple to Complex using that-clause)',
        explanation: 'Expanding the noun phrase "his guilt" into a dependent noun clause "that he was guilty" converts the simple sentence into a complex sentence.'
      },
      {
        id: 11,
        question: 'Identify the word class: "Smoking is strictly prohibited in the public concourse."',
        options: { A: 'Gerund', B: 'Participle', C: 'Infinitive', D: 'Finite verb' },
        correctAnswer: 'A',
        topic: 'Parts of Speech (Gerund functioning as subject)',
        explanation: '"Smoking" is a verb ending in "-ing" that functions as the grammatical subject of the sentence (verbal noun), so it is a Gerund.'
      },
      {
        id: 12,
        question: 'Conjunction: Hardly had I entered the conference hall ____ the presentation commenced.',
        options: { A: 'when', B: 'than', C: 'then', D: 'before' },
        correctAnswer: 'A',
        topic: 'Correlative Conjunctions (Hardly...when)',
        explanation: '"Hardly" and "Scarcely" are correlative adverbs paired with "when" (or "before") to introduce the subsequent event.'
      },
      {
        id: 13,
        question: 'Modal Auxiliary: She ____ play the piano masterfully when she was only seven years old.',
        options: { A: 'could', B: 'can', C: 'may', D: 'might' },
        correctAnswer: 'A',
        topic: 'Modal Verbs (Past general ability with could)',
        explanation: '"Could" is the past tense form of "can" used to express general physical or mental ability in the past.'
      },
      {
        id: 14,
        question: 'Determiners: There is ____ milk left in the carton; we cannot make tea for the guests.',
        options: { A: 'little', B: 'a little', C: 'few', D: 'a few' },
        correctAnswer: 'A',
        topic: 'Determiners (Little with uncountable nouns indicating scarcity)',
        explanation: '"Milk" is an uncountable noun. "Little" (without "a") expresses negative quantity (almost none), matching the inability to make tea.'
      },
      {
        id: 15,
        question: 'Identify the clause: "That honesty is the best policy requires no demonstration."',
        options: { A: 'Noun clause as subject', B: 'Adjective clause', C: 'Adverb clause', D: 'Noun clause as object' },
        correctAnswer: 'A',
        topic: 'Identification of Clause (Noun Clause functioning as Subject)',
        explanation: 'The dependent clause "That honesty is the best policy" serves as the subject of the main verb "requires", making it a Noun Clause as subject.'
      },
      {
        id: 16,
        question: 'Appropriate Preposition: His explanation is not compatible ____ the established facts.',
        options: { A: 'with', B: 'to', C: 'at', D: 'for' },
        correctAnswer: 'A',
        topic: 'Appropriate Preposition (compatible with)',
        explanation: 'The adjective "compatible" takes the preposition "with" ("compatible with something"), meaning able to exist or occur together without conflict.'
      },
      {
        id: 17,
        question: 'Right Form of Verb: Since 2010, the company ____ phenomenal growth in foreign exports.',
        options: { A: 'has experienced', B: 'experienced', C: 'is experiencing', D: 'had experienced' },
        correctAnswer: 'A',
        topic: 'Present Perfect Tense (Since + starting point continuing to present)',
        explanation: '"Since 2010" marks a starting point extending up to the present moment, requiring the Present Perfect tense ("has experienced").'
      },
      {
        id: 18,
        question: 'Passive Voice: Change into passive – "They are demolishing the dilapidated warehouse."',
        options: {
          A: 'The dilapidated warehouse is being demolished by them.',
          B: 'The dilapidated warehouse was being demolished by them.',
          C: 'The dilapidated warehouse has been demolished by them.',
          D: 'The dilapidated warehouse is demolished by them.'
        },
        correctAnswer: 'A',
        topic: 'Voice Change (Present Continuous Passive: is/are + being + V3)',
        explanation: 'Present continuous active ("are demolishing") transforms into present continuous passive: "is being + past participle (demolished)".'
      },
      {
        id: 19,
        question: 'Indirect Speech: "What a spectacular goal!" cried the jubilant spectator.',
        options: {
          A: 'The jubilant spectator exclaimed with joy that it was a very spectacular goal.',
          B: 'The jubilant spectator said that the goal is very spectacular.',
          C: 'The jubilant spectator cried that what a spectacular goal it was.',
          D: 'The jubilant spectator exclaimed that the goal had been spectacular.'
        },
        correctAnswer: 'A',
        topic: 'Indirect Speech (Exclamatory sentence with exclaimed with joy)',
        explanation: 'In exclamatory sentences expressing joy, the reporting verb changes to "exclaimed with joy", the exclamatory structure converts into an assertive statement, and "what a" turns into "a very".'
      },
      {
        id: 20,
        question: 'Choose the correct article: He is ___ honest civil servant recognized for his integrity.',
        options: { A: 'an', B: 'a', C: 'the', D: 'no article' },
        correctAnswer: 'A',
        topic: 'Articles (Silent h in honest)',
        explanation: '"Honest" begins with a silent "h", producing an initial vowel sound /ɒ/, requiring the indefinite article "an".'
      },
      {
        id: 21,
        question: 'Idiom: "To beat around the bush" means:',
        options: {
          A: 'To avoid talking about the main topic directly',
          B: 'To clear bushes in a forest',
          C: 'To punish someone severely',
          D: 'To complete a task ahead of schedule'
        },
        correctAnswer: 'A',
        topic: 'Idioms & Phrases',
        explanation: '"To beat around the bush" is a common idiom meaning to discuss a matter without arriving at the point, often to avoid an uncomfortable topic.'
      },
      {
        id: 22,
        question: 'Choose the correctly spelt word:',
        options: { A: 'Mischievous', B: 'Mischievious', C: 'Mischevous', D: 'Mischivous' },
        correctAnswer: 'A',
        topic: 'Spelling Verification',
        explanation: 'The correct spelling is "Mischievous" (M-I-S-C-H-I-E-V-O-U-S). Adding an extra "i" before "ous" (mischievious) is a common error.'
      },
      {
        id: 23,
        question: 'Negative Inversion: Seldom ____ such sheer determination and perseverance in a young athlete.',
        options: { A: 'have I witnessed', B: 'I have witnessed', C: 'I witnessed', D: 'witnessed I' },
        correctAnswer: 'A',
        topic: 'Inversion after Negative Adverbs (Seldom + auxiliary + subject + verb)',
        explanation: 'When a negative or restrictive adverb like "Seldom", "Rarely", or "Never" begins a sentence, the subject and auxiliary verb invert: "Seldom have I witnessed...".'
      },
      {
        id: 24,
        question: 'Subject-Verb Agreement: Ten thousand dollars ____ a colossal sum of money for the project.',
        options: { A: 'is', B: 'are', C: 'were', D: 'have been' },
        correctAnswer: 'A',
        topic: 'Subject-Verb Agreement (Quantities of money as singular unit)',
        explanation: 'Sums of money ("Ten thousand dollars"), periods of time, and units of measurement take a singular verb when considered as a single collective amount.'
      },
      {
        id: 25,
        question: 'Literature: Who composed the famous Romantic poem "Kubla Khan"?',
        options: { A: 'Samuel Taylor Coleridge', B: 'William Wordsworth', C: 'Percy Bysshe Shelley', D: 'Lord Byron' },
        correctAnswer: 'A',
        topic: 'English Literature',
        explanation: '"Kubla Khan; or, A Vision in a Dream: A Fragment" is a celebrated poem composed by Samuel Taylor Coleridge in 1797 and published in 1816.'
      }
    ]
  },
  {
    id: 34,
    title: 'Model Question 34',
    subtitle: 'English Grammar Competence - Set 34',
    description: 'Rigorous assessment covering subjunctive conditional inversions, sequence of tenses in relative clauses, voice change with adjuncts, and idiom subtleties.',
    totalQuestions: 25,
    questions: [
      {
        id: 1,
        question: 'Choose the correct article: Mt. Everest is ___ highest peak in the Himalayan range.',
        options: { A: 'the', B: 'a', C: 'an', D: 'no article' },
        correctAnswer: 'A',
        topic: 'Articles (Superlative adjective requires the)',
        explanation: 'Superlative adjectives ("highest", "most beautiful", "greatest") strictly take the definite article "the".'
      },
      {
        id: 2,
        question: 'Appropriate Preposition: The defendant pleaded ignorance ___ the newly enacted municipal statutes.',
        options: { A: 'of', B: 'to', C: 'in', D: 'at' },
        correctAnswer: 'A',
        topic: 'Appropriate Preposition (ignorance of)',
        explanation: 'The noun "ignorance" takes the preposition "of" ("ignorance of the law/facts"), meaning lack of knowledge or awareness regarding something.'
      },
      {
        id: 3,
        question: 'Right Form of Verb: If the authorities had intervened earlier, the catastrophe ____ averted.',
        options: { A: 'could have been', B: 'can be', C: 'could be', D: 'would be' },
        correctAnswer: 'A',
        topic: 'Third Conditional Passive (had intervened -> could have been + V3)',
        explanation: 'In a Third Conditional in the passive voice, the if-clause with past perfect ("had intervened") pairs with "could/would have been + past participle" ("could have been averted").'
      },
      {
        id: 4,
        question: 'Subject-Verb Agreement: The secretary and treasurer ____ absent from yesterday\'s executive session.',
        options: { A: 'was', B: 'were', C: 'are', D: 'have been' },
        correctAnswer: 'A',
        topic: 'Subject-Verb Agreement (Single person holding dual designations)',
        explanation: 'When two designations are joined by "and" with the definite article "The" preceding only the first designation ("The secretary and treasurer"), one person holds both roles, requiring a singular verb ("was").'
      },
      {
        id: 5,
        question: 'Passive Voice: Change into passive – "The police caught the fugitive red-handed."',
        options: {
          A: 'The fugitive was caught red-handed by the police.',
          B: 'The fugitive had been caught red-handed by the police.',
          C: 'Red-handed was the fugitive caught by the police.',
          D: 'The fugitive was being caught red-handed.'
        },
        correctAnswer: 'A',
        topic: 'Voice Change (Simple Past Passive with predicate adjective retained)',
        explanation: 'Simple past active ("caught") transforms into simple past passive ("was caught"). The objective complement / predicate adjective "red-handed" is retained directly after the past participle.'
      },
      {
        id: 6,
        question: 'Indirect Speech: She said to her brother, "May success attend your endeavors!"',
        options: {
          A: 'She wished that success might attend her brother\'s endeavors.',
          B: 'She prayed that success may attend her brother\'s endeavors.',
          C: 'She asked her brother that success might attend his endeavors.',
          D: 'She exclaimed that success attended his endeavors.'
        },
        correctAnswer: 'A',
        topic: 'Indirect Speech (Optative wish with wished that + might)',
        explanation: 'In optative expressions of goodwill and blessing, the reporting verb changes to "wished", the conjunction is "that", and "may" backshifts to "might".'
      },
      {
        id: 7,
        question: 'Conditionals: Unless you ____ harder, you cannot expect to attain top honors.',
        options: { A: 'work', B: 'do not work', C: 'will work', D: 'worked' },
        correctAnswer: 'A',
        topic: 'Conditionals (Unless = if not; no double negative allowed)',
        explanation: '"Unless" is equivalent to "if not" and already carries negative force; therefore, the clause takes an affirmative present verb ("work"), not "do not work".'
      },
      {
        id: 8,
        question: 'Pinpoint Error: "Each of the participants (A) / were presented with (B) / a commemorative trophy. (C) / No error (D)"',
        options: { A: 'Each of the participants', B: 'were presented with', C: 'a commemorative trophy', D: 'No error' },
        correctAnswer: 'B',
        topic: 'Pinpoint Error (Each of takes singular verb was presented)',
        explanation: 'The distributive pronoun "Each of" takes a singular verb, so "were presented with" is an error and must be replaced by "was presented with".'
      },
      {
        id: 9,
        question: 'Right Form of Verb: He talks as if he ____ the owner of this sprawling estate.',
        options: { A: 'were', B: 'is', C: 'was', D: 'has been' },
        correctAnswer: 'A',
        topic: 'Subjunctive Mood (as if + past subjunctive were for unreal present)',
        explanation: 'Clauses following "as if" or "as though" representing an unreal, counter-factual present state require the past subjunctive "were" for all subjects.'
      },
      {
        id: 10,
        question: 'Transformation: Change into affirmative – "No sooner had he left than the storm broke."',
        options: {
          A: 'As soon as he left, the storm broke.',
          B: 'Hardly had he left when the storm broke.',
          C: 'Scarcely did he leave then the storm broke.',
          D: 'When he had left, the storm broke.'
        },
        correctAnswer: 'A',
        topic: 'Transformation of Sentences (No sooner...than into As soon as)',
        explanation: 'The negative correlative structure "No sooner...than" transforms into an affirmative sentence using "As soon as" followed by simple past clauses.'
      },
      {
        id: 11,
        question: 'Identify the verbal: "Barking dogs seldom bite."',
        options: { A: 'Participle', B: 'Gerund', C: 'Infinitive', D: 'Verbal noun' },
        correctAnswer: 'A',
        topic: 'Non-finite Verbs (Participial Adjective)',
        explanation: '"Barking" is a present participle functioning as an adjective modifying the noun "dogs".'
      },
      {
        id: 12,
        question: 'Conjunction: She was neither dismayed by failure ____ elated by triumph.',
        options: { A: 'nor', B: 'or', C: 'and', D: 'but' },
        correctAnswer: 'A',
        topic: 'Correlative Conjunctions (Neither...nor)',
        explanation: '"Neither" must strictly be paired with its correlative counterpart "nor".'
      },
      {
        id: 13,
        question: 'Modal Verbs: Drivers ____ obey traffic signals to prevent road fatalities.',
        options: { A: 'must', B: 'might', C: 'may', D: 'would' },
        correctAnswer: 'A',
        topic: 'Modal Verbs (Must expressing mandatory obligation)',
        explanation: '"Must" expresses strict legal necessity, compulsory obligation, and imperative duty.'
      },
      {
        id: 14,
        question: 'Determiners: There are ____ reasons to support this progressive legislative reform.',
        options: { A: 'many', B: 'much', C: 'little', D: 'a little' },
        correctAnswer: 'A',
        topic: 'Determiners (Many with countable plural nouns)',
        explanation: '"Reasons" is a plural countable noun, which takes the quantifier "many". "Much" and "little" are strictly used with uncountable nouns.'
      },
      {
        id: 15,
        question: 'Identify the clause: "The gentleman who delivered the keynote speech is a renowned astrophysicist."',
        options: { A: 'Adjective clause', B: 'Noun clause', C: 'Adverb clause', D: 'Prepositional clause' },
        correctAnswer: 'A',
        topic: 'Identification of Clause (Adjective clause qualifying gentleman)',
        explanation: 'The subordinate clause "who delivered the keynote speech" qualifies the noun "The gentleman", functioning as a defining Adjective (Relative) Clause.'
      },
      {
        id: 16,
        question: 'Appropriate Preposition: He has a profound appetite ____ acquiring multidisciplinary knowledge.',
        options: { A: 'for', B: 'in', C: 'at', D: 'with' },
        correctAnswer: 'A',
        topic: 'Appropriate Preposition (appetite for)',
        explanation: 'The noun "appetite" when used figuratively for a strong craving or desire takes the preposition "for" ("an appetite for learning").'
      },
      {
        id: 17,
        question: 'Right Form of Verb: The train ____ before we could reach the railway platform.',
        options: { A: 'had departed', B: 'departed', C: 'has departed', D: 'departs' },
        correctAnswer: 'A',
        topic: 'Past Perfect Tense (Action completed prior to another past action)',
        explanation: 'When two past events are linked by "before", the earlier action takes the Past Perfect tense ("had departed") and the subsequent action takes simple past ("could reach").'
      },
      {
        id: 18,
        question: 'Passive Voice: Change into passive – "The mechanic has repaired our vehicle."',
        options: {
          A: 'Our vehicle has been repaired by the mechanic.',
          B: 'Our vehicle had been repaired by the mechanic.',
          C: 'Our vehicle is repaired by the mechanic.',
          D: 'Our vehicle was repaired by the mechanic.'
        },
        correctAnswer: 'A',
        topic: 'Voice Change (Present Perfect Passive: has/have + been + V3)',
        explanation: 'Present perfect active ("has repaired") changes into present perfect passive: "has been repaired".'
      },
      {
        id: 19,
        question: 'Indirect Speech: He said, "I have been reviewing these documents all afternoon."',
        options: {
          A: 'He said that he had been reviewing those documents all afternoon.',
          B: 'He said that he has been reviewing these documents all afternoon.',
          C: 'He said that he was reviewing those documents all afternoon.',
          D: 'He told that he had reviewed those documents all afternoon.'
        },
        correctAnswer: 'A',
        topic: 'Indirect Speech (Present perfect continuous backshifts to past perfect continuous)',
        explanation: 'In indirect speech, the present perfect continuous ("have been reviewing") shifts to the past perfect continuous ("had been reviewing"), and "these" shifts to "those".'
      },
      {
        id: 20,
        question: 'Choose the correct article: She is ___ heir to an illustrious aristocratic lineage.',
        options: { A: 'an', B: 'a', C: 'the', D: 'no article' },
        correctAnswer: 'A',
        topic: 'Articles (Silent initial h)',
        explanation: '"Heir" is pronounced with an initial vowel sound /eə/, making "an heir" the correct grammatical choice.'
      },
      {
        id: 21,
        question: 'Idiom: "To take the bull by the horns" means:',
        options: {
          A: 'To confront a difficult situation boldly and decisively',
          B: 'To participate in a bullfight',
          C: 'To act rashly without consideration',
          D: 'To evade danger by fleeing'
        },
        correctAnswer: 'A',
        topic: 'Idioms & Phrases',
        explanation: 'The idiom "take the bull by the horns" means to face a danger or tackle a daunting problem directly with courage and determination.'
      },
      {
        id: 22,
        question: 'Choose the correctly spelt word:',
        options: { A: 'Bureaucracy', B: 'Beurocracy', C: 'Bureaucrasy', D: 'Bureacracy' },
        correctAnswer: 'A',
        topic: 'Spelling Verification',
        explanation: 'The correct spelling is "Bureaucracy" (B-U-R-E-A-U-C-R-A-C-Y), derived from the French "bureau".'
      },
      {
        id: 23,
        question: 'Conditional Inversion: ____ he attended the preliminary briefing, he would know the safety protocols.',
        options: { A: 'Had', B: 'Should', C: 'Were', D: 'Did' },
        correctAnswer: 'A',
        topic: 'Third Conditional Inversion (Had he attended)',
        explanation: 'Inverted Third Conditional replaces "If he had attended" with "Had he attended", expressing a past contrary-to-fact situation.'
      },
      {
        id: 24,
        question: 'Subject-Verb Agreement: The quality of these agricultural yields ____ truly exceptional.',
        options: { A: 'is', B: 'are', C: 'were', D: 'have been' },
        correctAnswer: 'A',
        topic: 'Subject-Verb Agreement (Head noun quality is singular)',
        explanation: 'The grammatical subject of the sentence is the singular head noun "The quality", not the intervening plural noun phrase "these agricultural yields". Therefore, the verb must be singular ("is").'
      },
      {
        id: 25,
        question: 'Literature: Who is the author of the epic allegorical poem "The Faerie Queene"?',
        options: { A: 'Edmund Spenser', B: 'Geoffrey Chaucer', C: 'John Milton', D: 'Philip Sidney' },
        correctAnswer: 'A',
        topic: 'English Literature',
        explanation: '"The Faerie Queene" is an English epic poem published in the 1590s by Edmund Spenser, celebrating the Tudor dynasty and Queen Elizabeth I.'
      }
    ]
  },
  {
    id: 35,
    title: 'Model Question 35',
    subtitle: 'English Grammar Competence - Set 35',
    description: 'Mastery-level assessment testing cleft sentences, subjunctive complements, inverted syntax, complex clauses, and classical literary milestones.',
    totalQuestions: 25,
    questions: [
      {
        id: 1,
        question: 'Choose the correct article: He is ___ honourable magistrate known for his impartiality.',
        options: { A: 'an', B: 'a', C: 'the', D: 'no article' },
        correctAnswer: 'A',
        topic: 'Articles (Silent initial h)',
        explanation: '"Honourable" begins with a silent "h", producing the initial vowel sound /ɒ/, requiring the indefinite article "an".'
      },
      {
        id: 2,
        question: 'Appropriate Preposition: His conduct is not at all conducive ____ maintaining harmonious relations.',
        options: { A: 'to', B: 'for', C: 'with', D: 'at' },
        correctAnswer: 'A',
        topic: 'Appropriate Preposition (conducive to)',
        explanation: 'The adjective "conducive" takes the preposition "to" ("conducive to something"), meaning making a certain situation or outcome likely or possible.'
      },
      {
        id: 3,
        question: 'Right Form of Verb: By the time the fire brigade reached the scene, the warehouse ____ to ashes.',
        options: { A: 'had been reduced', B: 'was reduced', C: 'reduced', D: 'has been reduced' },
        correctAnswer: 'A',
        topic: 'Past Perfect Passive (Action completed before another past action)',
        explanation: 'The warehouse was destroyed prior to the arrival of the fire brigade, requiring the Past Perfect Passive tense ("had been reduced").'
      },
      {
        id: 4,
        question: 'Subject-Verb Agreement: Neither the principal nor the tutors ____ present at the council.',
        options: { A: 'were', B: 'was', C: 'is', D: 'has been' },
        correctAnswer: 'A',
        topic: 'Subject-Verb Agreement (Proximity concord with neither...nor)',
        explanation: 'When subjects are connected by "neither...nor", the verb agrees with the closer subject ("the tutors" - plural), hence "were" is required.'
      },
      {
        id: 5,
        question: 'Passive Voice: Change into passive – "One should respect one\'s mentors."',
        options: {
          A: 'Mentors should be respected.',
          B: 'One\'s mentors should be respected by one.',
          C: 'Mentors must be respected by one.',
          D: 'A mentor should be respected.'
        },
        correctAnswer: 'A',
        topic: 'Voice Change (Omission of generic agent one)',
        explanation: 'In general ethical maxims using the indefinite pronoun "one", the passive voice omits the agent: "Mentors should be respected."'
      },
      {
        id: 6,
        question: 'Indirect Speech: He said to me, "Do you intend to contest the upcoming election?"',
        options: {
          A: 'He inquired of me whether I intended to contest the upcoming election.',
          B: 'He asked me that if I intended to contest the election.',
          C: 'He told me if did I intend to contest the election.',
          D: 'He inquired me whether I intend to contest the election.'
        },
        correctAnswer: 'A',
        topic: 'Indirect Speech (Yes/No Question with whether + assertive order)',
        explanation: 'Yes/no interrogatives in indirect speech change the reporting verb to "inquired of" / "asked", use "whether" or "if" as connector, and backshift present simple ("intend") to past simple ("intended").'
      },
      {
        id: 7,
        question: 'Conditionals: Had we known of your financial hardship, we ____ you immediate assistance.',
        options: { A: 'would have offered', B: 'would offer', C: 'will offer', D: 'had offered' },
        correctAnswer: 'A',
        topic: 'Third Conditional Inversion (Had we known ... would have offered)',
        explanation: 'An inverted Third Conditional ("Had we known...") expresses an unfulfilled past condition, requiring "would have + past participle" in the result clause.'
      },
      {
        id: 8,
        question: 'Pinpoint Error: "The list of successful candidates (A) / have been displayed (B) / on the central notice board. (C) / No error (D)"',
        options: { A: 'The list of successful candidates', B: 'have been displayed', C: 'on the central notice board', D: 'No error' },
        correctAnswer: 'B',
        topic: 'Pinpoint Error (Singular head noun list requires has been displayed)',
        explanation: 'The head noun of the subject is "The list" (singular), not the intervening prepositional phrase "of successful candidates". Thus, the verb must be singular ("has been displayed").'
      },
      {
        id: 9,
        question: 'Subjunctive Mood: The commander demanded that the prisoner ____ immediately before him.',
        options: { A: 'be brought', B: 'is brought', C: 'was brought', D: 'would be brought' },
        correctAnswer: 'A',
        topic: 'Subjunctive Mood (demanded that + base form be brought)',
        explanation: 'Mandative verbs like "demanded that" require the present subjunctive mood, using the uninflected base verb "be brought".'
      },
      {
        id: 10,
        question: 'Transformation: Change into complex sentence – "In spite of his severe poverty, he remained scrupulously honest."',
        options: {
          A: 'Although he was severely poor, he remained scrupulously honest.',
          B: 'He was poor but he remained honest.',
          C: 'Despite his poverty he was honest.',
          D: 'Being poor, he was honest.'
        },
        correctAnswer: 'A',
        topic: 'Transformation of Sentences (Simple with In spite of to Complex with Although)',
        explanation: 'Prepositional concession phrases ("In spite of his poverty") expand into subordinate clauses introduced by "Although" ("Although he was severely poor"), creating a complex sentence.'
      },
      {
        id: 11,
        question: 'Identify the verbal: "Walking in the morning is salubrious for physical health."',
        options: { A: 'Gerund', B: 'Present participle', C: 'Infinitive', D: 'Past participle' },
        correctAnswer: 'A',
        topic: 'Non-finite Verbs (Gerund as subject of sentence)',
        explanation: '"Walking" functions as the grammatical noun subject of the sentence, making it a Gerund.'
      },
      {
        id: 12,
        question: 'Conjunction: Scarcely had the train halted at the platform ____ the impatient passengers surged forward.',
        options: { A: 'when', B: 'than', C: 'then', D: 'while' },
        correctAnswer: 'A',
        topic: 'Correlative Conjunctions (Scarcely...when)',
        explanation: '"Scarcely" is paired with "when" (or "before") to connect the subsequent event.'
      },
      {
        id: 13,
        question: 'Modal Verbs: You ____ not have purchased that surplus equipment; our existing stock is more than adequate.',
        options: { A: 'need', B: 'must', C: 'dare', D: 'ought' },
        correctAnswer: 'A',
        topic: 'Modal Verbs (Need not have done for unnecessary past action)',
        explanation: '"Need not have + V3" indicates an action that was carried out in the past but was in fact unnecessary.'
      },
      {
        id: 14,
        question: 'Determiners: There are ____ viable alternatives available to resolve this diplomatic deadlock.',
        options: { A: 'few', B: 'little', C: 'a little', D: 'much' },
        correctAnswer: 'A',
        topic: 'Determiners (Few with plural countable nouns expressing scarcity)',
        explanation: '"Alternatives" is a plural countable noun. "Few" carries a negative sense ("almost none"), fitting the context of a deadlock.'
      },
      {
        id: 15,
        question: 'Identify the clause: "He proved conclusively that the historical manuscript was an authentic document."',
        options: { A: 'Noun clause as direct object', B: 'Adjective clause', C: 'Adverb clause of result', D: 'Independent clause' },
        correctAnswer: 'A',
        topic: 'Identification of Clause (Noun Clause as Direct Object)',
        explanation: 'The clause "that the historical manuscript was an authentic document" acts as the direct object of the transitive verb "proved", making it a Noun Clause.'
      },
      {
        id: 16,
        question: 'Appropriate Preposition: He has been diagnosed as deficient ____ vital micronutrients.',
        options: { A: 'in', B: 'of', C: 'with', D: 'at' },
        correctAnswer: 'A',
        topic: 'Appropriate Preposition (deficient in)',
        explanation: 'The adjective "deficient" takes the preposition "in" ("deficient in vitamins/iron"), meaning not having enough of a specified quality or ingredient.'
      },
      {
        id: 17,
        question: 'Right Form of Verb: If he ____ here now, he would arbitrate the conflict with equanimity.',
        options: { A: 'were', B: 'was', C: 'is', D: 'had been' },
        correctAnswer: 'A',
        topic: 'Second Conditional (Subjunctive were for unreal present)',
        explanation: 'Second conditional sentences expressing an unreal present condition ("now") require the subjunctive past "were" for all persons.'
      },
      {
        id: 18,
        question: 'Passive Voice: Change into passive – "The curator showed the delegation the rare antiquities."',
        options: {
          A: 'The delegation was shown the rare antiquities by the curator.',
          B: 'The rare antiquities was shown to the delegation by the curator.',
          C: 'The delegation had been shown the rare antiquities.',
          D: 'The rare antiquities were showed to the delegation.'
        },
        correctAnswer: 'A',
        topic: 'Voice Change (Ditransitive verb with indirect object made subject)',
        explanation: 'For ditransitive verbs with two objects (indirect object "the delegation" and direct object "the rare antiquities"), making the personal indirect object the passive subject is standard and preferred: "The delegation was shown...".'
      },
      {
        id: 19,
        question: 'Indirect Speech: "Alas! Our valiant champion has fallen," mourned the citizens.',
        options: {
          A: 'The citizens exclaimed with profound grief that their valiant champion had fallen.',
          B: 'The citizens mourned that their champion has fallen.',
          C: 'The citizens cried with sorrow that our champion fell.',
          D: 'The citizens said sadly that their champion was fallen.'
        },
        correctAnswer: 'A',
        topic: 'Indirect Speech (Exclamatory grief with exclaimed with grief/sorrow)',
        explanation: 'Exclamatory sentences with "Alas!" convert using "exclaimed with grief/sorrow that", with the present perfect ("has fallen") backshifting to past perfect ("had fallen") and possessive "our" becoming "their".'
      },
      {
        id: 20,
        question: 'Choose the correct article: She is ___ European delegate participating in the climate summit.',
        options: { A: 'a', B: 'an', C: 'the', D: 'no article' },
        correctAnswer: 'A',
        topic: 'Articles (Consonant sound /juː/ in European)',
        explanation: '"European" begins with the vowel letters "Eu", but phonetically starts with the consonant glide /juː/ (yu-ro-pe-an), so it takes the indefinite article "a".'
      },
      {
        id: 21,
        question: 'Idiom: "A bolt from the blue" signifies:',
        options: {
          A: 'A sudden, totally unexpected and shocking event',
          B: 'A flash of lightning in a thunderstorm',
          C: 'A predictable seasonal disaster',
          D: 'A deliberate act of betrayal'
        },
        correctAnswer: 'A',
        topic: 'Idioms & Phrases',
        explanation: '"A bolt from the blue" refers to a complete surprise or shock, like a sudden bolt of lightning striking from a clear blue sky.'
      },
      {
        id: 22,
        question: 'Choose the correctly spelt word:',
        options: { A: 'Embarrassment', B: 'Embarassment', C: 'Embarrasment', D: 'Embarasment' },
        correctAnswer: 'A',
        topic: 'Spelling Verification',
        explanation: 'The correct spelling is "Embarrassment" (E-M-B-A-R-R-A-S-S-M-E-N-T), with double "r" and double "s".'
      },
      {
        id: 23,
        question: 'Conditional Inversion: ____ I endowed with immense riches, I would establish philanthropic foundations.',
        options: { A: 'Were', B: 'Had', C: 'Should', D: 'Could' },
        correctAnswer: 'A',
        topic: 'Conditional Inversion (Were I endowed with)',
        explanation: 'Inverted Second Conditional for hypothetical present states begins with "Were + subject + adjective/participle": "Were I endowed with...".'
      },
      {
        id: 24,
        question: 'Subject-Verb Agreement: Neither of the two competing proposals ____ viable.',
        options: { A: 'is', B: 'are', C: 'were', D: 'have been' },
        correctAnswer: 'A',
        topic: 'Subject-Verb Agreement (Neither of takes singular verb)',
        explanation: '"Neither of" refers to "not one nor the other of two" and strictly takes a singular verb ("is") in standard formal English.'
      },
      {
        id: 25,
        question: 'Literature: Who wrote the famous metaphysical poem "The Canonization"?',
        options: { A: 'John Donne', B: 'George Herbert', C: 'Andrew Marvell', D: 'Henry Vaughan' },
        correctAnswer: 'A',
        topic: 'English Literature',
        explanation: '"The Canonization" is a famous metaphysical poem by John Donne, beginning with the iconic line "For God\'s sake hold your tongue, and let me love".'
      }
    ]
  }
];
