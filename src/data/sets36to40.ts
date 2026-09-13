import { ModelQuestionSet } from '../types';

export const modelQuestionSets36to40: ModelQuestionSet[] = [
  {
    id: 36,
    title: 'Model Question 36',
    subtitle: 'English Grammar & Literature - Set 36',
    description: 'Competitive exam evaluation covering subject-verb agreement with correlatives, articles, gerund idioms, mandative subjunctive, inversion, and Elizabethan literature.',
    totalQuestions: 25,
    questions: [
      {
        id: 1,
        question: 'Neither the manager nor his assistants ___ willing to take responsibility for the error.',
        options: { A: 'was', B: 'is', C: 'were', D: 'has been' },
        correctAnswer: 'C',
        topic: 'Subject-Verb Agreement (Neither...nor)',
        explanation: 'When subjects are connected by "neither... nor", the verb agrees in number and person with the nearer subject ("his assistants", which is plural, hence "were").'
      },
      {
        id: 2,
        question: 'He is ___ European scholar of considerable reputation.',
        options: { A: 'a', B: 'an', C: 'the', D: 'no article' },
        correctAnswer: 'A',
        topic: 'Articles (Consonant sound /juː/)',
        explanation: 'Although "European" begins with vowel letters "Eu", it is pronounced with an initial consonant sound /juː/ (like "you"). Words beginning with a consonant sound take the indefinite article "a".'
      },
      {
        id: 3,
        question: 'I look forward to ___ from you soon.',
        options: { A: 'hear', B: 'hearing', C: 'heard', D: 'have heard' },
        correctAnswer: 'B',
        topic: 'Verb Forms & Gerunds (look forward to + V-ing)',
        explanation: 'In the phrasal verb "look forward to", "to" is a preposition, not an infinitive marker. Prepositions are followed by nouns or gerunds (-ing form), so "hearing" is correct.'
      },
      {
        id: 4,
        question: 'If I ___ you, I would reconsider the proposal.',
        options: { A: 'am', B: 'was', C: 'were', D: 'had been' },
        correctAnswer: 'C',
        topic: 'Conditionals (Second Conditional Subjunctive)',
        explanation: 'In hypothetical or unreal present conditional clauses (Second Conditional), the subjunctive verb form "were" is used for all persons and numbers.'
      },
      {
        id: 5,
        question: 'The person to ___ I spoke was very helpful.',
        options: { A: 'who', B: 'whom', C: 'which', D: 'whose' },
        correctAnswer: 'B',
        topic: 'Relative Pronouns (Preposition + whom)',
        explanation: 'When a relative pronoun follows a preposition (here, "to"), it must be in the objective case ("whom") when referring to human antecedents.'
      },
      {
        id: 6,
        question: 'The committee recommended that he ___ immediately.',
        options: { A: 'resigns', B: 'resigned', C: 'resign', D: 'would resign' },
        correctAnswer: 'C',
        topic: 'Subjunctive Mood (Mandative Subjunctive)',
        explanation: 'Verbs of recommendation, demand, or request (recommend, insist, demand, suggest) followed by a "that"-clause take the mandative subjunctive bare infinitive form ("resign") regardless of subject person or number.'
      },
      {
        id: 7,
        question: 'Walking down the street, ___.',
        options: {
          A: 'the rain began',
          B: 'I saw an old friend',
          C: 'an old friend was seen',
          D: 'the shops appeared crowded'
        },
        correctAnswer: 'B',
        topic: 'Correction of Sentences (Dangling Modifier)',
        explanation: 'An introductory participial phrase ("Walking down the street") must logically modify the grammatical subject immediately following it. "I" was walking down the street, whereas "the rain" or "the shops" could not walk.'
      },
      {
        id: 8,
        question: 'The more you practise, ___.',
        options: {
          A: 'the better you become',
          B: 'better you become',
          C: 'the best you become',
          D: 'you become better'
        },
        correctAnswer: 'A',
        topic: 'Transformation & Clauses (Parallel Comparative)',
        explanation: 'Parallel progressive constructions use the double comparative formula: "The + comparative..., the + comparative...". Hence "The more you practise, the better you become".'
      },
      {
        id: 9,
        question: 'Never ___ such a magnificent performance.',
        options: { A: 'I have seen', B: 'have I seen', C: 'I saw', D: 'saw I' },
        correctAnswer: 'B',
        topic: 'Transformation & Clauses (Inversion with Negative Adverb)',
        explanation: 'When a negative or restrictive adverb like "Never", "Rarely", or "Seldom" begins a sentence, grammatical inversion is triggered where the auxiliary verb precedes the subject: "have I seen".'
      },
      {
        id: 10,
        question: 'Nobody came to the meeting, ___?',
        options: { A: 'did they', B: 'didn\'t they', C: 'did he', D: 'wasn\'t he' },
        correctAnswer: 'A',
        topic: 'Sentence Structures (Tag Question)',
        explanation: '"Nobody" is inherently negative, so the tag must be positive ("did"). Indefinite pronouns referring to persons take the plural pronoun "they" in tag questions, giving "did they?".'
      },
      {
        id: 11,
        question: 'Geoffrey Chaucer is traditionally known as the:',
        options: {
          A: 'Father of English Drama',
          B: 'Father of English Poetry',
          C: 'Father of English Novel',
          D: 'Father of English Prose'
        },
        correctAnswer: 'B',
        topic: 'General Grammar & Literature (Geoffrey Chaucer)',
        explanation: 'Geoffrey Chaucer (c. 1340–1400), author of The Canterbury Tales, is acclaimed by John Dryden and literary historians as the "Father of English Poetry".'
      },
      {
        id: 12,
        question: 'The Canterbury Tales was written by:',
        options: {
          A: 'John Gower',
          B: 'William Langland',
          C: 'Geoffrey Chaucer',
          D: 'Thomas More'
        },
        correctAnswer: 'C',
        topic: 'General Grammar & Literature (Chaucer)',
        explanation: 'The Canterbury Tales is the masterwork collection of Middle English stories written in the late 14th century by Geoffrey Chaucer.'
      },
      {
        id: 13,
        question: 'By the time the police arrived, the thief ___.',
        options: { A: 'escaped', B: 'has escaped', C: 'had escaped', D: 'was escaping' },
        correctAnswer: 'C',
        topic: 'Tense (Past Perfect Tense)',
        explanation: 'When two events occurred in the past, the action that was completed before the other requires the Past Perfect tense ("had + V3"), while the subsequent action uses Simple Past ("arrived").'
      },
      {
        id: 14,
        question: 'The quality of the products, rather than their prices, ___ responsible for the decline in sales.',
        options: { A: 'are', B: 'were', C: 'have been', D: 'is' },
        correctAnswer: 'D',
        topic: 'Subject-Verb Agreement (Intervening Parenthetical Phrase)',
        explanation: 'Phrases introduced by "rather than", "as well as", or "along with" are parenthetical and do not alter the grammatical number of the true subject ("The quality", singular, hence "is").'
      },
      {
        id: 15,
        question: 'He is averse ___ taking unnecessary risks.',
        options: { A: 'from', B: 'with', C: 'to', D: 'for' },
        correctAnswer: 'C',
        topic: 'Prepositions (Appropriate Preposition: averse to)',
        explanation: 'The adjective "averse" takes the preposition "to" ("averse to something / doing something"), signifying strong disinclination or opposition.'
      },
      {
        id: 16,
        question: 'He stopped ___ when the teacher entered.',
        options: { A: 'talking', B: 'to talk', C: 'talk', D: 'talked' },
        correctAnswer: 'A',
        topic: 'Verb Forms & Gerunds (Stop + Gerund vs Infinitive)',
        explanation: '"Stop + gerund" means to discontinue an ongoing activity (he ceased speaking). "Stop + infinitive" would mean pausing in order to begin speaking.'
      },
      {
        id: 17,
        question: 'Only after the investigation ___ the truth become known.',
        options: { A: 'did', B: 'was', C: 'had', D: 'has' },
        correctAnswer: 'A',
        topic: 'Transformation & Clauses (Inversion after Only after)',
        explanation: 'When a sentence begins with "Only after...", subject-auxiliary inversion is triggered in the main clause: "did (auxiliary) + the truth (subject) + become (base verb)".'
      },
      {
        id: 18,
        question: '“He is too weak to walk.” The equivalent sentence is:',
        options: {
          A: 'He is so weak that he cannot walk.',
          B: 'He is so weak that he can walk.',
          C: 'He is very weak but walks.',
          D: 'He is weak enough to walk.'
        },
        correctAnswer: 'A',
        topic: 'Transformation & Clauses (too...to into so...that)',
        explanation: 'The structure "too + adjective + to-infinitive" transforms into the complex negative equivalent "so + adjective + that + subject + cannot/could not + verb".'
      },
      {
        id: 19,
        question: 'Who wrote Doctor Faustus?',
        options: {
          A: 'Ben Jonson',
          B: 'Christopher Marlowe',
          C: 'John Webster',
          D: 'Thomas Kyd'
        },
        correctAnswer: 'B',
        topic: 'General Grammar & Literature (Christopher Marlowe)',
        explanation: 'The Tragical History of the Life and Death of Doctor Faustus was written by the Elizabethan dramatist Christopher Marlowe.'
      },
      {
        id: 20,
        question: 'The Faerie Queene was written by:',
        options: {
          A: 'Christopher Marlowe',
          B: 'Edmund Spenser',
          C: 'Philip Sidney',
          D: 'Ben Jonson'
        },
        correctAnswer: 'B',
        topic: 'General Grammar & Literature (Edmund Spenser)',
        explanation: 'The Faerie Queene is an epic allegorical poem composed by Edmund Spenser, published in the 1590s and dedicated to Queen Elizabeth I.'
      },
      {
        id: 21,
        question: 'The new policy aims to reduce costs, improve efficiency and ___.',
        options: {
          A: 'increasing productivity',
          B: 'increase productivity',
          C: 'increased productivity',
          D: 'to increasing productivity'
        },
        correctAnswer: 'B',
        topic: 'Correction of Sentences (Parallel Structure)',
        explanation: 'Items joined in a series with coordinating conjunctions must maintain parallel grammatical form: "to reduce (costs), [to] improve (efficiency) and [to] increase (productivity)".'
      },
      {
        id: 22,
        question: 'It is high time the government ___ effective measures.',
        options: { A: 'takes', B: 'took', C: 'has taken', D: 'will take' },
        correctAnswer: 'B',
        topic: 'Tense (It is high time + Past Simple)',
        explanation: 'The idiom "It is high time" followed by a subject clause requires the subjunctive past simple verb form ("took") to indicate that an action is urgently overdue.'
      },
      {
        id: 23,
        question: 'People believe that the minister has resigned.',
        options: {
          A: 'The minister is believed to have resigned.',
          B: 'The minister was believed to resign.',
          C: 'The minister has believed to resign.',
          D: 'The minister is believed that he resigned.'
        },
        correctAnswer: 'A',
        topic: 'Voice Change (Passive with Perfect Infinitive)',
        explanation: 'When reporting present beliefs about an earlier completed event, the passive takes "Subject + is/are believed + to have + V3": "The minister is believed to have resigned".'
      },
      {
        id: 24,
        question: '“Friends, Romans, countrymen, lend me your ears” is spoken by:',
        options: { A: 'Brutus', B: 'Antony', C: 'Caesar', D: 'Cassius' },
        correctAnswer: 'B',
        topic: 'General Grammar & Literature (Shakespeare\'s Julius Caesar)',
        explanation: 'This iconic opening line is delivered by Mark Antony in Act III, Scene 2 of William Shakespeare\'s Julius Caesar during Caesar\'s funeral oration.'
      },
      {
        id: 25,
        question: 'A poem mourning the death of a person is called a/an:',
        options: { A: 'ode', B: 'elegy', C: 'epic', D: 'satire' },
        correctAnswer: 'B',
        topic: 'General Grammar & Literature (Literary Forms - Elegy)',
        explanation: 'An elegy is a sorrowful, reflective poem typically lamenting the death of an individual or mourning human mortality.'
      }
    ]
  },
  {
    id: 37,
    title: 'Model Question 37',
    subtitle: 'English Grammar & Literature - Set 37',
    description: 'Comprehensive test covering subject-verb agreement with "a number of", wish subjunctives, causative passive voice, indirect questions, Romantic poetry, and Victorian novels.',
    totalQuestions: 25,
    questions: [
      {
        id: 1,
        question: 'A number of important documents ___ missing from the archive.',
        options: { A: 'is', B: 'was', C: 'are', D: 'has' },
        correctAnswer: 'C',
        topic: 'Subject-Verb Agreement (A number of vs The number of)',
        explanation: '"A number of + plural noun" takes a plural verb ("are"), meaning several or many. In contrast, "The number of + plural noun" takes a singular verb.'
      },
      {
        id: 2,
        question: 'I wish I ___ more carefully before making the decision.',
        options: { A: 'think', B: 'thought', C: 'had thought', D: 'have thought' },
        correctAnswer: 'C',
        topic: 'Subjunctive Mood (Wish about past regret)',
        explanation: 'When expressing regret about a past action with "I wish", the past perfect tense ("had + V3") is required.'
      },
      {
        id: 3,
        question: '___ Ganges is one of the major rivers of the Indian subcontinent.',
        options: { A: 'A', B: 'An', C: 'The', D: 'No article' },
        correctAnswer: 'C',
        topic: 'Articles (Proper names of rivers take definite article The)',
        explanation: 'Definite article "The" must precede names of rivers, seas, oceans, mountain ranges, and groups of islands.'
      },
      {
        id: 4,
        question: 'Between you and ___, the plan is unlikely to succeed.',
        options: { A: 'I', B: 'me', C: 'myself', D: 'mine' },
        correctAnswer: 'B',
        topic: 'Parts of Speech (Pronoun case after preposition)',
        explanation: '"Between" is a preposition, so pronouns following it must be in the objective case ("Between you and me", not "Between you and I").'
      },
      {
        id: 5,
        question: 'He is senior ___ me by five years.',
        options: { A: 'than', B: 'from', C: 'to', D: 'with' },
        correctAnswer: 'C',
        topic: 'Prepositions (Latin comparatives take to)',
        explanation: 'Latin comparative adjectives ending in "-ior" (senior, junior, superior, inferior) are followed by "to", never "than".'
      },
      {
        id: 6,
        question: 'I do not know ___ he will accept the offer.',
        options: { A: 'what', B: 'whether', C: 'which', D: 'whose' },
        correctAnswer: 'B',
        topic: 'Transformation & Clauses (Conjunction whether for alternative possibility)',
        explanation: '"Whether" introduces an indirect question expressing doubt or choice between alternatives ("whether or not").'
      },
      {
        id: 7,
        question: 'If he had worked harder, he ___ the examination.',
        options: {
          A: 'would pass',
          B: 'would have passed',
          C: 'will pass',
          D: 'passed'
        },
        correctAnswer: 'B',
        topic: 'Conditionals (Third Conditional)',
        explanation: 'The Third Conditional formula is "If + Past Perfect, Subject + would have + V3".'
      },
      {
        id: 8,
        question: 'They made him apologize.',
        options: {
          A: 'He was made apologize.',
          B: 'He was made to apologize.',
          C: 'He made to apologize.',
          D: 'He was made apologizing.'
        },
        correctAnswer: 'B',
        topic: 'Voice Change (Passive of causative make takes to-infinitive)',
        explanation: 'The causative verb "make" takes a bare infinitive in the active voice ("made him apologize"), but requires a full to-infinitive in the passive ("He was made to apologize").'
      },
      {
        id: 9,
        question: 'He said to me, “Do you know the answer?”',
        options: {
          A: 'He asked me if I knew the answer.',
          B: 'He told me if I knew the answer.',
          C: 'He asked me that I knew the answer.',
          D: 'He said whether I know the answer.'
        },
        correctAnswer: 'A',
        topic: 'Narration (Indirect Speech of Yes/No Question)',
        explanation: 'In reporting a Yes/No question, use the reporting verb "asked", conjunction "if/whether", backshift present tense to past ("knew"), and change word order to assertive ("I knew").'
      },
      {
        id: 10,
        question: 'She denied ___ the confidential information.',
        options: { A: 'reveal', B: 'to reveal', C: 'revealing', D: 'revealed' },
        correctAnswer: 'C',
        topic: 'Verb Forms & Gerunds (Verbs followed by Gerund)',
        explanation: 'The verb "deny" is standardly followed by a gerund ("revealing"), not an infinitive.'
      },
      {
        id: 11,
        question: '“The Rime of the Ancient Mariner” was written by:',
        options: { A: 'Wordsworth', B: 'Coleridge', C: 'Shelley', D: 'Keats' },
        correctAnswer: 'B',
        topic: 'General Grammar & Literature (Samuel Taylor Coleridge)',
        explanation: '“The Rime of the Ancient Mariner” is the longest major poem by English poet Samuel Taylor Coleridge, opening the collection Lyrical Ballads (1798).'
      },
      {
        id: 12,
        question: 'Lyrical Ballads was first published in:',
        options: { A: '1789', B: '1798', C: '1805', D: '1812' },
        correctAnswer: 'B',
        topic: 'General Grammar & Literature (Lyrical Ballads publication)',
        explanation: 'Lyrical Ballads, with a Few Other Poems, co-authored by Wordsworth and Coleridge, was published in 1798, marking the dawn of the English Romantic period.'
      },
      {
        id: 13,
        question: 'He worked hard ___ he might succeed.',
        options: { A: 'so that', B: 'because', C: 'although', D: 'unless' },
        correctAnswer: 'A',
        topic: 'Transformation & Clauses (Conjunction of purpose: so that)',
        explanation: '"So that" is a subordinating conjunction of purpose followed by modal auxiliary "may" (in present) or "might" (in past).'
      },
      {
        id: 14,
        question: 'She likes reading, swimming and ___.',
        options: { A: 'to dance', B: 'dancing', C: 'dance', D: 'danced' },
        correctAnswer: 'B',
        topic: 'Correction of Sentences (Parallelism with Gerunds)',
        explanation: 'Coordinated items in a list must follow the same grammatical structure: reading, swimming, and dancing (all gerunds).'
      },
      {
        id: 15,
        question: 'Rarely ___ such an opportunity.',
        options: {
          A: 'one gets',
          B: 'does one get',
          C: 'one does get',
          D: 'gets one'
        },
        correctAnswer: 'B',
        topic: 'Transformation & Clauses (Inversion after Rarely)',
        explanation: 'Negative/restrictive frequency adverbs ("Rarely", "Seldom") at the beginning of a clause trigger inversion with auxiliary verb: "does (auxiliary) + one (subject) + get (base verb)".'
      },
      {
        id: 16,
        question: 'The committee recommended that he ___ immediately.',
        options: { A: 'resigns', B: 'resigned', C: 'resign', D: 'would resign' },
        correctAnswer: 'C',
        topic: 'Subjunctive Mood (Mandative Subjunctive)',
        explanation: 'In the mandative subjunctive after "recommended that", the base form of the verb "resign" is used without -s or modal auxiliary.'
      },
      {
        id: 17,
        question: 'The doctor insisted that the patient ___ in bed.',
        options: { A: 'stays', B: 'stayed', C: 'stay', D: 'staying' },
        correctAnswer: 'C',
        topic: 'Subjunctive Mood (Mandative Subjunctive after insist)',
        explanation: 'The verb "insisted that" governs the mandative subjunctive, which requires the base form of the verb "stay".'
      },
      {
        id: 18,
        question: 'The candidate ___ the committee selected had excellent credentials.',
        options: { A: 'who', B: 'whom', C: 'whose', D: 'which' },
        correctAnswer: 'B',
        topic: 'Relative Pronouns (Objective case whom)',
        explanation: 'The committee selected "him" (object of the verb selected), so the relative pronoun in the objective case "whom" is grammatically required.'
      },
      {
        id: 19,
        question: '“Ode to the West Wind” was written by:',
        options: { A: 'Byron', B: 'Shelley', C: 'Keats', D: 'Blake' },
        correctAnswer: 'B',
        topic: 'General Grammar & Literature (Percy Bysshe Shelley)',
        explanation: '“Ode to the West Wind” was composed by the English Romantic poet Percy Bysshe Shelley in 1819.'
      },
      {
        id: 20,
        question: 'Wuthering Heights was written by:',
        options: {
          A: 'Emily Brontë',
          B: 'Charlotte Brontë',
          C: 'Anne Brontë',
          D: 'George Eliot'
        },
        correctAnswer: 'A',
        topic: 'General Grammar & Literature (Emily Brontë)',
        explanation: 'Wuthering Heights is the sole novel of Emily Brontë, published in 1847 under the pen name Ellis Bell.'
      },
      {
        id: 21,
        question: 'The papers are being checked. The active form is:',
        options: {
          A: 'The teacher checks the papers.',
          B: 'The teacher is checking the papers.',
          C: 'The teacher checked the papers.',
          D: 'The teacher has checked the papers.'
        },
        correctAnswer: 'B',
        topic: 'Voice Change (Passive to Active Continuous)',
        explanation: '"are being checked" is present continuous passive, so its active counterpart is present continuous: "is/are checking".'
      },
      {
        id: 22,
        question: 'Unless you ___ immediately, you may miss the opportunity.',
        options: { A: 'act', B: 'acted', C: 'will act', D: 'would act' },
        correctAnswer: 'A',
        topic: 'Conditionals (First Conditional with unless)',
        explanation: 'Clauses introduced by "unless" (meaning "if not") express a real condition and take present simple tense ("act"), not future "will".'
      },
      {
        id: 23,
        question: 'He suggested that I ___ there.',
        options: { A: 'went', B: 'should go', C: 'to go', D: 'going' },
        correctAnswer: 'B',
        topic: 'Subjunctive Mood (Mandative suggestion with should + V1)',
        explanation: 'After "suggest that", British and formal English permits either the bare subjunctive ("go") or "should + base verb" ("should go").'
      },
      {
        id: 24,
        question: '“The Rape of the Lock” is a famous example of a:',
        options: {
          A: 'tragic drama',
          B: 'mock-epic',
          C: 'pastoral elegy',
          D: 'historical novel'
        },
        correctAnswer: 'B',
        topic: 'General Grammar & Literature (Alexander Pope - Mock-Epic)',
        explanation: 'Alexander Pope\'s “The Rape of the Lock” (1712/1714) is celebrated as the pinnacle of the mock-heroic / mock-epic genre in English poetry.'
      },
      {
        id: 25,
        question: 'Robinson Crusoe was written by:',
        options: {
          A: 'Daniel Defoe',
          B: 'Jonathan Swift',
          C: 'Laurence Sterne',
          D: 'Tobias Smollett'
        },
        correctAnswer: 'A',
        topic: 'General Grammar & Literature (Daniel Defoe)',
        explanation: 'Robinson Crusoe was written by Daniel Defoe and published in 1719, recognized as one of the earliest English novels.'
      }
    ]
  },
  {
    id: 38,
    title: 'Model Question 38',
    subtitle: 'English Grammar & Literature - Set 38',
    description: 'High-yield exam questions covering "the number of", past perfect reporting, musical instruments articles, correlative conjunctions, and 17th-18th century classic literature.',
    totalQuestions: 25,
    questions: [
      {
        id: 1,
        question: 'The number of applicants for the post ___ increased considerably this year.',
        options: { A: 'have', B: 'has', C: 'are', D: 'were' },
        correctAnswer: 'B',
        topic: 'Subject-Verb Agreement (The number of takes singular)',
        explanation: '"The number of" denotes a singular statistical figure and strictly takes a singular verb ("has"), unlike "a number of" which is plural.'
      },
      {
        id: 2,
        question: 'He told me that he ___ the film before.',
        options: { A: 'saw', B: 'has seen', C: 'had seen', D: 'sees' },
        correctAnswer: 'C',
        topic: 'Tense (Sequence of Tenses in Reported Speech)',
        explanation: 'When the reporting verb is in the past ("told"), a prior completed event ("before") must be in the Past Perfect tense ("had seen").'
      },
      {
        id: 3,
        question: 'He plays ___ violin remarkably well.',
        options: { A: 'a', B: 'an', C: 'the', D: 'no article' },
        correctAnswer: 'C',
        topic: 'Articles (Musical instruments take the)',
        explanation: 'Names of musical instruments when played as an instrument take the definite article "the" ("play the violin", "play the piano").'
      },
      {
        id: 4,
        question: 'This is the house ___ roof was damaged in the storm.',
        options: { A: 'which', B: 'that', C: 'whose', D: 'whom' },
        correctAnswer: 'C',
        topic: 'Relative Pronouns (Possessive whose for non-living objects)',
        explanation: '"Whose" is standardly used as the possessive relative pronoun for both persons and inanimate objects (alternative to "of which the roof").'
      },
      {
        id: 5,
        question: 'He is proficient ___ English and French.',
        options: { A: 'at', B: 'on', C: 'in', D: 'with' },
        correctAnswer: 'C',
        topic: 'Prepositions (Appropriate Preposition: proficient in)',
        explanation: 'The adjective "proficient" is followed by the preposition "in" when referring to a language, subject, or discipline ("proficient in English").'
      },
      {
        id: 6,
        question: 'This is the place ___ the treaty was signed.',
        options: { A: 'which', B: 'when', C: 'where', D: 'what' },
        correctAnswer: 'C',
        topic: 'Transformation & Clauses (Relative adverb where for place)',
        explanation: '"Where" functions as the relative adverb denoting location, modifying the antecedent noun "the place".'
      },
      {
        id: 7,
        question: 'Had I known the truth, I ___ differently.',
        options: {
          A: 'would act',
          B: 'would have acted',
          C: 'will act',
          D: 'acted'
        },
        correctAnswer: 'B',
        topic: 'Conditionals (Inverted Third Conditional)',
        explanation: '"Had I known" is the inverted form of "If I had known" (Third Conditional), which requires "would have + V3" ("would have acted") in the main clause.'
      },
      {
        id: 8,
        question: 'Someone has stolen my wallet.',
        options: {
          A: 'My wallet has stolen.',
          B: 'My wallet has been stolen.',
          C: 'My wallet was stolen by someone.',
          D: 'My wallet is stolen.'
        },
        correctAnswer: 'B',
        topic: 'Voice Change (Passive of Present Perfect)',
        explanation: 'The passive of "has + V3" is "has been + V3". In indefinite agent constructions ("someone"), "by someone" is omitted in standard formal English.'
      },
      {
        id: 9,
        question: 'The teacher said, “Open your books.”',
        options: {
          A: 'The teacher told the students to open their books.',
          B: 'The teacher said the students open books.',
          C: 'The teacher asked that open books.',
          D: 'The teacher told that they opened books.'
        },
        correctAnswer: 'A',
        topic: 'Narration (Indirect Speech of Imperative Sentences)',
        explanation: 'Imperative sentences transform into indirect speech using "told/ordered/asked + object + to-infinitive": "told the students to open their books".'
      },
      {
        id: 10,
        question: 'He avoided ___ directly to the issue.',
        options: { A: 'referring', B: 'to refer', C: 'refer', D: 'referred' },
        correctAnswer: 'A',
        topic: 'Verb Forms & Gerunds (Avoid + Gerund)',
        explanation: 'The verb "avoid" is followed by a gerund ("referring"), never by an infinitive.'
      },
      {
        id: 11,
        question: 'The Pilgrim\'s Progress was written by:',
        options: {
          A: 'John Bunyan',
          B: 'John Milton',
          C: 'Samuel Pepys',
          D: 'Daniel Defoe'
        },
        correctAnswer: 'A',
        topic: 'General Grammar & Literature (John Bunyan)',
        explanation: 'The Pilgrim\'s Progress from This World, to That Which Is to Come is a Christian allegory written by John Bunyan, published in 1678.'
      },
      {
        id: 12,
        question: 'The central subject of Paradise Lost is:',
        options: {
          A: 'Norman Conquest',
          B: 'Fall of Man',
          C: 'French Revolution',
          D: 'Crusades'
        },
        correctAnswer: 'B',
        topic: 'General Grammar & Literature (Milton\'s Paradise Lost)',
        explanation: 'John Milton\'s epic poem Paradise Lost (1667) depicts the biblical account of the Fall of Man — the temptation and disobedience of Adam and Eve in Eden.'
      },
      {
        id: 13,
        question: 'What he says and what he does ___ often inconsistent.',
        options: { A: 'is', B: 'was', C: 'are', D: 'has been' },
        correctAnswer: 'C',
        topic: 'Subject-Verb Agreement (Compound noun clauses joined by and)',
        explanation: 'Two distinct noun clauses joined by "and" ("what he says" AND "what he does") constitute a plural subject requiring a plural verb ("are").'
      },
      {
        id: 14,
        question: 'More than one candidate ___ complained about the procedure.',
        options: { A: 'have', B: 'are', C: 'has', D: 'were' },
        correctAnswer: 'C',
        topic: 'Subject-Verb Agreement (More than one + singular noun)',
        explanation: 'The grammatical idiom "More than one + singular noun" is followed by a singular verb ("has"), despite its semantically plural meaning.'
      },
      {
        id: 15,
        question: 'He is indifferent ___ criticism.',
        options: { A: 'for', B: 'with', C: 'to', D: 'from' },
        correctAnswer: 'C',
        topic: 'Prepositions (Appropriate Preposition: indifferent to)',
        explanation: 'The adjective "indifferent" requires the preposition "to" ("indifferent to something"), meaning having no sympathy or concern.'
      },
      {
        id: 16,
        question: 'The sooner we start, ___.',
        options: {
          A: 'the sooner we shall finish',
          B: 'sooner we finish',
          C: 'the soonest we finish',
          D: 'sooner shall we finish'
        },
        correctAnswer: 'A',
        topic: 'Transformation & Clauses (Parallel double comparative)',
        explanation: 'Proportional correlation requires "the + comparative ..., the + comparative ...": "The sooner we start, the sooner we shall finish".'
      },
      {
        id: 17,
        question: 'Not only ___ late, but he also forgot the documents.',
        options: {
          A: 'he arrived',
          B: 'did he arrive',
          C: 'he did arrive',
          D: 'arrived he'
        },
        correctAnswer: 'B',
        topic: 'Transformation & Clauses (Inversion after Not only)',
        explanation: 'When "Not only" heads a clause, negative inversion applies: auxiliary verb + subject + main verb ("did he arrive").'
      },
      {
        id: 18,
        question: 'The candidate was praised for being intelligent, hardworking and ___.',
        options: { A: 'honesty', B: 'honest', C: 'honestly', D: 'to be honest' },
        correctAnswer: 'B',
        topic: 'Correction of Sentences (Parallelism of Adjectives)',
        explanation: 'Parallel structure requires parallel parts of speech: "intelligent" (adjective), "hardworking" (adjective), and "honest" (adjective).'
      },
      {
        id: 19,
        question: 'Who wrote Gulliver\'s Travels?',
        options: {
          A: 'Daniel Defoe',
          B: 'Jonathan Swift',
          C: 'Henry Fielding',
          D: 'Samuel Richardson'
        },
        correctAnswer: 'B',
        topic: 'General Grammar & Literature (Jonathan Swift)',
        explanation: 'Gulliver\'s Travels (1726) is a renowned satire on human nature and travel tales written by Jonathan Swift.'
      },
      {
        id: 20,
        question: 'The Spectator was associated with:',
        options: {
          A: 'Richard Steele and Joseph Addison',
          B: 'Wordsworth and Coleridge',
          C: 'Pope and Dryden',
          D: 'Swift and Defoe'
        },
        correctAnswer: 'A',
        topic: 'General Grammar & Literature (Addison & Steele)',
        explanation: 'The Spectator was a daily publication founded by Joseph Addison and Richard Steele in London, running from 1711 to 1712.'
      },
      {
        id: 21,
        question: 'I remember ___ him at the conference last year.',
        options: { A: 'meet', B: 'meeting', C: 'to meet', D: 'met' },
        correctAnswer: 'B',
        topic: 'Verb Forms & Gerunds (Remember + Gerund vs Infinitive)',
        explanation: '"Remember + gerund" denotes recalling a past action that already took place ("meeting him last year").'
      },
      {
        id: 22,
        question: 'Remember ___ the door before you leave.',
        options: { A: 'locking', B: 'lock', C: 'to lock', D: 'locked' },
        correctAnswer: 'C',
        topic: 'Verb Forms & Gerunds (Remember + Infinitive for duties)',
        explanation: '"Remember + to-infinitive" denotes keeping in mind to perform an upcoming obligation or action ("remember to lock").'
      },
      {
        id: 23,
        question: 'No sooner had he reached the station than the train ___.',
        options: { A: 'leaves', B: 'has left', C: 'left', D: 'had left' },
        correctAnswer: 'C',
        topic: 'Transformation & Clauses (No sooner had... than + past simple)',
        explanation: 'In the correlative formula "No sooner had + Subject + V3 than...", the clause after "than" takes Simple Past tense ("left").'
      },
      {
        id: 24,
        question: 'A Dictionary of the English Language was compiled by:',
        options: {
          A: 'Samuel Johnson',
          B: 'John Dryden',
          C: 'Jonathan Swift',
          D: 'William Wordsworth'
        },
        correctAnswer: 'A',
        topic: 'General Grammar & Literature (Dr. Samuel Johnson)',
        explanation: 'Dr. Samuel Johnson published his landmark work, A Dictionary of the English Language, in 1755 after nine years of work.'
      },
      {
        id: 25,
        question: 'A dramatic monologue is particularly associated with:',
        options: {
          A: 'Robert Browning',
          B: 'John Milton',
          C: 'William Blake',
          D: 'Alexander Pope'
        },
        correctAnswer: 'A',
        topic: 'General Grammar & Literature (Robert Browning - Dramatic Monologue)',
        explanation: 'The Victorian poet Robert Browning is celebrated as the master of the dramatic monologue (exemplified in "My Last Duchess").'
      }
    ]
  },
  {
    id: 39,
    title: 'Model Question 39',
    subtitle: 'English Grammar & Literature - Set 39',
    description: 'Grammar and literature evaluation covering compound subject agreement, subjunctive "would rather", comparative degrees of two, tag questions with negative adverbs, and 19th-20th century novels.',
    totalQuestions: 25,
    questions: [
      {
        id: 1,
        question: 'The poet and philosopher ___ invited to address the students.',
        options: { A: 'were', B: 'have been', C: 'was', D: 'are' },
        correctAnswer: 'C',
        topic: 'Subject-Verb Agreement (Single person holding dual titles)',
        explanation: 'When one article ("The") precedes the first noun and none precedes the second ("The poet and philosopher"), both titles refer to the same individual, requiring a singular verb ("was").'
      },
      {
        id: 2,
        question: 'I would rather you ___ the matter confidential.',
        options: { A: 'keep', B: 'kept', C: 'will keep', D: 'have kept' },
        correctAnswer: 'B',
        topic: 'Subjunctive Mood (would rather + subject + past subjunctive)',
        explanation: 'When "would rather" has a different subject clause following it, the verb is in the past subjunctive ("kept") to indicate a present or future preference.'
      },
      {
        id: 3,
        question: 'There isn\'t ___ milk left in the refrigerator.',
        options: { A: 'many', B: 'few', C: 'much', D: 'several' },
        correctAnswer: 'C',
        topic: 'Parts of Speech (Quantifiers with uncountable nouns)',
        explanation: '"Milk" is an uncountable noun. In negative sentences, "much" is used for uncountable quantities, whereas "many" is for countables.'
      },
      {
        id: 4,
        question: 'Everyone must bring ___ own identity card.',
        options: { A: 'their', B: 'his or her', C: 'our', D: 'its' },
        correctAnswer: 'B',
        topic: 'Parts of Speech (Pronoun-Antecedent Agreement)',
        explanation: 'In traditional formal examination grammar, the indefinite singular pronoun "Everyone" takes the singular pronoun phrase "his or her".'
      },
      {
        id: 5,
        question: 'The new policy is conducive ___ economic growth.',
        options: { A: 'for', B: 'to', C: 'with', D: 'at' },
        correctAnswer: 'B',
        topic: 'Prepositions (Appropriate Preposition: conducive to)',
        explanation: 'The adjective "conducive" takes the preposition "to" ("conducive to something"), meaning tending to promote or assist.'
      },
      {
        id: 6,
        question: 'I remember the day ___ we first met.',
        options: { A: 'where', B: 'when', C: 'which', D: 'what' },
        correctAnswer: 'B',
        topic: 'Transformation & Clauses (Relative adverb of time: when)',
        explanation: 'The relative adverb "when" modifies nouns referring to time, such as "the day".'
      },
      {
        id: 7,
        question: 'If you had followed my advice, you ___ in trouble now.',
        options: {
          A: 'would not be',
          B: 'would not have been',
          C: 'will not be',
          D: 'are not'
        },
        correctAnswer: 'A',
        topic: 'Conditionals (Mixed Conditional: Past condition with Present result)',
        explanation: 'This is a mixed conditional: the condition is in the past ("had followed"), but the consequence is in the present ("now"), which requires "would + base verb" ("would not be").'
      },
      {
        id: 8,
        question: 'Who wrote this remarkable novel?',
        options: {
          A: 'By whom was this remarkable novel written?',
          B: 'By whom this novel was written?',
          C: 'Who was this novel written?',
          D: 'By who was this novel written?'
        },
        correctAnswer: 'A',
        topic: 'Voice Change (Active to passive of interrogative who)',
        explanation: 'Active questions beginning with "Who" change to "By whom + auxiliary + subject + past participle?": "By whom was this remarkable novel written?".'
      },
      {
        id: 9,
        question: 'She said, “I have finished my work.”',
        options: {
          A: 'She said that she finished her work.',
          B: 'She said that she had finished her work.',
          C: 'She said that she has finished my work.',
          D: 'She said she finishes her work.'
        },
        correctAnswer: 'B',
        topic: 'Narration (Present Perfect to Past Perfect)',
        explanation: 'In indirect narration with a past reporting verb, Present Perfect ("have finished") backshifts to Past Perfect ("had finished"), and first-person pronouns shift to third person ("her").'
      },
      {
        id: 10,
        question: 'He is accustomed to ___ early.',
        options: { A: 'get up', B: 'getting up', C: 'got up', D: 'have got up' },
        correctAnswer: 'B',
        topic: 'Verb Forms & Gerunds (accustomed to + Gerund)',
        explanation: 'In the fixed phrase "be accustomed to", "to" is a preposition, which requires a gerund ("getting up").'
      },
      {
        id: 11,
        question: 'Who wrote Pride and Prejudice?',
        options: {
          A: 'Charlotte Brontë',
          B: 'Jane Austen',
          C: 'George Eliot',
          D: 'Emily Brontë'
        },
        correctAnswer: 'B',
        topic: 'General Grammar & Literature (Jane Austen)',
        explanation: 'Pride and Prejudice is a classic 1813 romantic novel written by Jane Austen.'
      },
      {
        id: 12,
        question: 'Jane Eyre was written by:',
        options: {
          A: 'Emily Brontë',
          B: 'Charlotte Brontë',
          C: 'Jane Austen',
          D: 'George Eliot'
        },
        correctAnswer: 'B',
        topic: 'General Grammar & Literature (Charlotte Brontë)',
        explanation: 'Jane Eyre was published in 1847 by Charlotte Brontë under the pen name Currer Bell.'
      },
      {
        id: 13,
        question: 'The poet and the philosopher ___ invited separately.',
        options: { A: 'was', B: 'has been', C: 'is', D: 'were' },
        correctAnswer: 'D',
        topic: 'Subject-Verb Agreement (Two separate entities with articles)',
        explanation: 'When both nouns are preceded by the article ("The poet and the philosopher"), they denote two distinct individuals, requiring a plural verb ("were").'
      },
      {
        id: 14,
        question: 'He is ___ of the two brothers.',
        options: { A: 'tallest', B: 'taller', C: 'the taller', D: 'more tall' },
        correctAnswer: 'C',
        topic: 'Transformation & Clauses (Definite article with comparative of two)',
        explanation: 'When comparing specifically two entities with "of the two...", the comparative degree takes the definite article: "the taller of the two brothers".'
      },
      {
        id: 15,
        question: 'The climate of this region is preferable ___ that of the coastal area.',
        options: { A: 'than', B: 'from', C: 'to', D: 'over' },
        correctAnswer: 'C',
        topic: 'Prepositions (Appropriate Preposition: preferable to)',
        explanation: '"Preferable" is followed by the preposition "to", never by "than".'
      },
      {
        id: 16,
        question: 'Never told me, ___?',
        options: { A: 'did you', B: 'didn\'t you', C: 'were you', D: 'have you' },
        correctAnswer: 'A',
        topic: 'Sentence Structures (Tag question with negative adverb)',
        explanation: '"Never" renders the declarative statement negative, requiring an affirmative tag ("did you?").'
      },
      {
        id: 17,
        question: 'Let\'s go for a walk, ___?',
        options: { A: 'shall we', B: 'will we', C: 'do we', D: 'aren\'t we' },
        correctAnswer: 'A',
        topic: 'Sentence Structures (Tag question with Let\'s)',
        explanation: 'Proposals or suggestions introduced by "Let\'s" (Let us) strictly take the question tag "shall we?".'
      },
      {
        id: 18,
        question: 'The manager was angry ___ the employee for his negligence.',
        options: { A: 'at', B: 'with', C: 'to', D: 'on' },
        correctAnswer: 'B',
        topic: 'Prepositions (Appropriate Preposition: angry with a person)',
        explanation: 'One is angry "with" a person, but angry "at" a situation, thing, or conduct.'
      },
      {
        id: 19,
        question: '“She Walks in Beauty” was written by:',
        options: { A: 'Keats', B: 'Shelley', C: 'Byron', D: 'Coleridge' },
        correctAnswer: 'C',
        topic: 'General Grammar & Literature (Lord Byron)',
        explanation: '“She Walks in Beauty” is a short lyrical poem written in 1814 by Lord Byron (George Gordon Byron).'
      },
      {
        id: 20,
        question: 'Who wrote The Old Man and the Sea?',
        options: {
          A: 'Ernest Hemingway',
          B: 'Mark Twain',
          C: 'John Steinbeck',
          D: 'F. Scott Fitzgerald'
        },
        correctAnswer: 'A',
        topic: 'General Grammar & Literature (Ernest Hemingway)',
        explanation: 'The Old Man and the Sea (1952) was written by American author Ernest Hemingway and awarded the Pulitzer Prize for Fiction.'
      },
      {
        id: 21,
        question: 'He cannot help ___ at his strange behaviour.',
        options: { A: 'laugh', B: 'to laugh', C: 'laughing', D: 'laughed' },
        correctAnswer: 'C',
        topic: 'Verb Forms & Gerunds (cannot help + Gerund)',
        explanation: 'The idiomatic expression "cannot help" is always followed by a gerund ("laughing"). If "cannot help but" were used, it would take a bare infinitive.'
      },
      {
        id: 22,
        question: 'The man ___ beside the door is my uncle.',
        options: { A: 'stand', B: 'stood', C: 'standing', D: 'to stand' },
        correctAnswer: 'C',
        topic: 'Parts of Speech (Present Participle as reduced relative clause)',
        explanation: '"Standing beside the door" is a present participial phrase functioning adjectivally to modify "The man" (reduced from "who is standing").'
      },
      {
        id: 23,
        question: 'So difficult ___ the examination that many candidates gave up.',
        options: { A: 'was', B: 'were', C: 'did', D: 'had' },
        correctAnswer: 'A',
        topic: 'Transformation & Clauses (Inversion after So + Adjective)',
        explanation: 'When an emphatic clause starts with "So + adjective", it triggers subject-verb inversion: "was (verb) + the examination (singular subject)".'
      },
      {
        id: 24,
        question: '“Animal Farm” was written by:',
        options: {
          A: 'George Orwell',
          B: 'Aldous Huxley',
          C: 'H. G. Wells',
          D: 'Graham Greene'
        },
        correctAnswer: 'A',
        topic: 'General Grammar & Literature (George Orwell)',
        explanation: 'Animal Farm is an allegorical anti-totalitarian novella written by George Orwell (Eric Arthur Blair), published in 1945.'
      },
      {
        id: 25,
        question: 'A sonnet traditionally contains:',
        options: { A: '10 lines', B: '12 lines', C: '14 lines', D: '16 lines' },
        correctAnswer: 'C',
        topic: 'General Grammar & Literature (Literary Forms - Sonnet)',
        explanation: 'A sonnet is a fixed poetic form traditionally consisting of 14 lines written in iambic pentameter with a structured rhyme scheme.'
      }
    ]
  },
  {
    id: 40,
    title: 'Model Question 40',
    subtitle: 'English Grammar & Literature - Set 40',
    description: 'Comprehensive mastery test featuring plural units of measurement as singular nouns, zero conditionals, subjunctive were-inversion, imperative passive with let, and Shakespearean romances.',
    totalQuestions: 25,
    questions: [
      {
        id: 1,
        question: 'Ten miles ___ a long distance to walk in this heat.',
        options: { A: 'are', B: 'were', C: 'have been', D: 'is' },
        correctAnswer: 'D',
        topic: 'Subject-Verb Agreement (Distance/Time/Money as single entity)',
        explanation: 'Plural expressions of distance, weight, time, or monetary amounts viewed as a single quantitative unit take a singular verb ("is").'
      },
      {
        id: 2,
        question: 'It is high time the government ___ effective measures.',
        options: { A: 'takes', B: 'took', C: 'has taken', D: 'will take' },
        correctAnswer: 'B',
        topic: 'Tense (It is high time + Past Simple Subjunctive)',
        explanation: 'The phrase "It is high time" followed by a subject requires the past simple tense ("took") to express urgency.'
      },
      {
        id: 3,
        question: 'He went to ___ school to meet the principal.',
        options: { A: 'a', B: 'an', C: 'the', D: 'no article' },
        correctAnswer: 'C',
        topic: 'Articles (School for secondary purpose takes the)',
        explanation: 'When institutions like school, prison, hospital, or church are visited for a secondary purpose (not as a pupil studying, but to meet the principal), the definite article "the" is required.'
      },
      {
        id: 4,
        question: 'The two brothers blamed ___ for the misunderstanding.',
        options: {
          A: 'themselves',
          B: 'each other',
          C: 'one',
          D: 'himself'
        },
        correctAnswer: 'B',
        topic: 'Parts of Speech (Reciprocal Pronouns: each other vs one another)',
        explanation: '"Each other" is used for reciprocal interaction between two persons, whereas "one another" is used for more than two.'
      },
      {
        id: 5,
        question: 'He was charged ___ theft.',
        options: { A: 'for', B: 'with', C: 'of', D: 'on' },
        correctAnswer: 'B',
        topic: 'Prepositions (Appropriate Preposition: charged with vs accused of)',
        explanation: 'One is "charged with" a crime, but "accused of" a crime.'
      },
      {
        id: 6,
        question: 'Whatever he does, ___ him.',
        options: { A: 'support', B: 'supports', C: 'supporting', D: 'to support' },
        correctAnswer: 'A',
        topic: 'Sentence Structures (Imperative clause)',
        explanation: 'The main clause is an imperative sentence addressed to the implied second-person subject "you", which takes the base verb form "support".'
      },
      {
        id: 7,
        question: 'If water reaches 100°C, it ___.',
        options: { A: 'boiled', B: 'boils', C: 'will boil', D: 'would boil' },
        correctAnswer: 'B',
        topic: 'Conditionals (Zero Conditional for scientific facts)',
        explanation: 'The Zero Conditional describes universal scientific truths and laws of nature: "If + present simple, present simple" ("boils").'
      },
      {
        id: 8,
        question: 'They saw him crossing the road.',
        options: {
          A: 'He was seen crossing the road.',
          B: 'He was seen to crossing the road.',
          C: 'He was seen cross the road.',
          D: 'He saw to cross the road.'
        },
        correctAnswer: 'A',
        topic: 'Voice Change (Passive of verbs of perception with participle)',
        explanation: 'Verbs of perception (see, hear, notice) followed by a present participle retain the participle in the passive: "He was seen crossing the road".'
      },
      {
        id: 9,
        question: 'He said, “Let us go for a walk.”',
        options: {
          A: 'He suggested that they should go for a walk.',
          B: 'He ordered us to go for a walk.',
          C: 'He said that let us walk.',
          D: 'He requested that we went walking.'
        },
        correctAnswer: 'A',
        topic: 'Narration (Indirect Speech with Let us)',
        explanation: '"Let us" expressing a suggestion changes to: reporting verb "suggested/proposed + that + they/we + should + base verb".'
      },
      {
        id: 10,
        question: 'He stopped ___ to the teacher.',
        options: { A: 'talking', B: 'talked', C: 'to talk', D: 'talk' },
        correctAnswer: 'C',
        topic: 'Verb Forms & Gerunds (Stop + to-infinitive of purpose)',
        explanation: 'Here, the context denotes pausing in order to speak with the teacher, which requires the infinitive of purpose: "stopped to talk".'
      },
      {
        id: 11,
        question: '“Ode to a Nightingale” was written by:',
        options: {
          A: 'John Keats',
          B: 'Shelley',
          C: 'Byron',
          D: 'Wordsworth'
        },
        correctAnswer: 'A',
        topic: 'General Grammar & Literature (John Keats)',
        explanation: '“Ode to a Nightingale” is one of John Keats\'s famous 1819 odes, reflecting on mortality, beauty, and art.'
      },
      {
        id: 12,
        question: 'The “Spenserian stanza” consists of:',
        options: { A: '8 lines', B: '9 lines', C: '10 lines', D: '14 lines' },
        correctAnswer: 'B',
        topic: 'General Grammar & Literature (Poetic Meter - Spenserian Stanza)',
        explanation: 'Invented by Edmund Spenser for The Faerie Queene, a Spenserian stanza contains 9 lines: 8 iambic pentameters followed by a final hexameter (alexandrine), rhyming ababbcbcc.'
      },
      {
        id: 13,
        question: 'A committee of experts ___ appointed to investigate the matter.',
        options: { A: 'were', B: 'have', C: 'was', D: 'are' },
        correctAnswer: 'C',
        topic: 'Subject-Verb Agreement (Collective noun acting as a unit)',
        explanation: '"A committee" acting as a singular corporate body takes a singular verb ("was appointed").'
      },
      {
        id: 14,
        question: 'The evidence is ___ sufficient to establish his innocence.',
        options: { A: 'very', B: 'much', C: 'quite', D: 'enough' },
        correctAnswer: 'C',
        topic: 'Parts of Speech (Degree Adverb quite)',
        explanation: '"Sufficient" is an absolute or limit adjective, so it is naturally modified by "quite" (meaning completely/fully), not "very".'
      },
      {
        id: 15,
        question: 'He speaks English ___ than his brother.',
        options: {
          A: 'fluent',
          B: 'fluently',
          C: 'more fluently',
          D: 'most fluently'
        },
        correctAnswer: 'C',
        topic: 'Parts of Speech (Comparative of Adverb: more fluently)',
        explanation: 'To modify the verb "speaks" in a comparison between two, use the comparative adverb "more fluently".'
      },
      {
        id: 16,
        question: 'He left early lest he ___ the last train.',
        options: { A: 'misses', B: 'missed', C: 'should miss', D: 'will miss' },
        correctAnswer: 'C',
        topic: 'Transformation & Clauses (Conjunction lest takes should)',
        explanation: 'The conjunction "lest" (meaning "for fear that") must be followed by modal auxiliary "should" or a bare subjunctive verb, and never takes a negative word.'
      },
      {
        id: 17,
        question: 'Were he more careful, he ___ fewer mistakes.',
        options: {
          A: 'would make',
          B: 'would have made',
          C: 'will make',
          D: 'made'
        },
        correctAnswer: 'A',
        topic: 'Conditionals (Inverted Second Conditional: Were + subject)',
        explanation: '"Were he more careful" is the inverted form of "If he were more careful" (Second Conditional), which takes "would + base verb" ("would make") in the main clause.'
      },
      {
        id: 18,
        question: 'Let him do the work.',
        options: {
          A: 'Let the work be done by him.',
          B: 'Let the work done by him.',
          C: 'Let him be done the work.',
          D: 'The work let be done.'
        },
        correctAnswer: 'A',
        topic: 'Voice Change (Passive of imperative with Let)',
        explanation: 'Imperative sentences with "Let" transform into passive using the rule: "Let + object + be + past participle (V3) + by + agent" -> "Let the work be done by him".'
      },
      {
        id: 19,
        question: 'The Tempest is generally regarded as one of Shakespeare\'s:',
        options: {
          A: 'histories',
          B: 'early comedies',
          C: 'late romances',
          D: 'Roman tragedies'
        },
        correctAnswer: 'C',
        topic: 'General Grammar & Literature (Shakespeare\'s Late Romances)',
        explanation: 'The Tempest (c. 1610–1611) is classified among William Shakespeare\'s late romances (or tragicomedies), exploring reconciliation and magic.'
      },
      {
        id: 20,
        question: 'Prospero is a character in:',
        options: { A: 'The Tempest', B: 'Hamlet', C: 'Othello', D: 'Richard III' },
        correctAnswer: 'A',
        topic: 'General Grammar & Literature (Shakespeare\'s The Tempest)',
        explanation: 'Prospero, the rightful Duke of Milan and sorcerer stranded on an enchanted island, is the protagonist of Shakespeare\'s The Tempest.'
      },
      {
        id: 21,
        question: 'Having finished the assignment, ___.',
        options: {
          A: 'the television was switched on',
          B: 'I went to bed',
          C: 'the book was closed',
          D: 'the room became quiet'
        },
        correctAnswer: 'B',
        topic: 'Correction of Sentences (Perfect Participle and Subject Agreement)',
        explanation: 'The agent who finished the assignment must be the grammatical subject of the main clause. "I went to bed" provides the logical actor, avoiding a dangling participle.'
      },
      {
        id: 22,
        question: 'Neither the teacher ___ the students knew the answer.',
        options: { A: 'or', B: 'nor', C: 'and', D: 'but' },
        correctAnswer: 'B',
        topic: 'Parts of Speech (Correlative Conjunction: neither...nor)',
        explanation: '"Neither" correlatively pairs with "nor", whereas "either" pairs with "or".'
      },
      {
        id: 23,
        question: 'The candidate was praised for being intelligent, hardworking and ___.',
        options: { A: 'honesty', B: 'honest', C: 'honestly', D: 'to be honest' },
        correctAnswer: 'B',
        topic: 'Correction of Sentences (Parallelism in adjective lists)',
        explanation: 'The sentence requires adjectives in parallel: intelligent, hardworking, and honest.'
      },
      {
        id: 24,
        question: 'The central subject of Paradise Lost is:',
        options: {
          A: 'the Norman Conquest',
          B: 'the Fall of Man',
          C: 'the French Revolution',
          D: 'the Crusades'
        },
        correctAnswer: 'B',
        topic: 'General Grammar & Literature (Milton\'s Paradise Lost)',
        explanation: 'John Milton stated his epic poem\'s intention to "assert Eternal Providence, and justify the ways of God to men" through the Fall of Man.'
      },
      {
        id: 25,
        question: 'The Pilgrim\'s Progress is best described as:',
        options: {
          A: 'historical romance',
          B: 'allegory',
          C: 'comedy',
          D: 'epic poem'
        },
        correctAnswer: 'B',
        topic: 'General Grammar & Literature (Literary Genres - Allegory)',
        explanation: 'John Bunyan\'s The Pilgrim\'s Progress is a profound religious allegory tracing Christian\'s journey from the City of Destruction to the Celestial City.'
      }
    ]
  }
];
