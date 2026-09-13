export interface GrammarDictionaryTerm {
  id: string;
  term: string;
  pronunciation?: string;
  partOfSpeechTag?: string;
  category:
    | 'Parts of Speech'
    | 'Verb Forms & Tenses'
    | 'Sentence Structures'
    | 'Clauses & Phrases'
    | 'Transformations'
    | 'Agreement & Syntax'
    | 'Modifiers & Usage';
  shortDefinition: string;
  formulaOrRule?: string;
  fullExplanation: string;
  examples: {
    sentence: string;
    explanation?: string;
    isCorrect?: boolean;
  }[];
  commonMistake?: string;
  examTip?: string;
  relatedTerms?: string[];
}

export const GRAMMAR_DICTIONARY_CATEGORIES: GrammarDictionaryTerm['category'][] = [
  'Parts of Speech',
  'Verb Forms & Tenses',
  'Sentence Structures',
  'Clauses & Phrases',
  'Transformations',
  'Agreement & Syntax',
  'Modifiers & Usage',
];

export const GRAMMAR_DICTIONARY_TERMS: GrammarDictionaryTerm[] = [
  {
    id: 'abstract-noun',
    term: 'Abstract Noun',
    pronunciation: '/ˈæb.strækt naʊn/',
    partOfSpeechTag: 'Noun',
    category: 'Parts of Speech',
    shortDefinition: 'A noun denoting an idea, quality, state, or emotion rather than a concrete physical object.',
    formulaOrRule: 'Root word + suffix (-tion, -ity, -ness, -hood, -dom, -ship, -ment)',
    fullExplanation:
      'Abstract nouns refer to entities that cannot be perceived with the five physical senses (touch, sight, hearing, smell, or taste). For competitive exams, remember that abstract nouns are generally uncountable and take singular verbs unless used in a specialized idiomatic plural sense.',
    examples: [
      {
        sentence: 'Honesty is the best policy.',
        explanation: '"Honesty" is an abstract quality acting as the singular subject.',
        isCorrect: true,
      },
      {
        sentence: 'His bravery in the battlefield was applauded by all.',
        explanation: '"Bravery" represents a state of mind / personal trait.',
        isCorrect: true,
      },
    ],
    commonMistake: 'Using indefinite articles (a/an) before abstract nouns without qualification (e.g. "He showed a courage" is incorrect; say "He showed courage").',
    examTip: 'Abstract nouns modified by "of + noun" often take "the" (e.g. "The courage of the soldier was admirable").',
    relatedTerms: ['Collective Noun', 'Countable Noun', 'Uncountable Noun'],
  },
  {
    id: 'active-voice',
    term: 'Active Voice',
    pronunciation: '/ˈæk.tɪv vɔɪs/',
    partOfSpeechTag: 'Voice',
    category: 'Transformations',
    shortDefinition: 'A sentence structure where the subject explicitly performs the action denoted by the verb.',
    formulaOrRule: 'Subject (Agent) + Verb + Object (Receiver)',
    fullExplanation:
      'In the active voice, the grammatical subject is the doer of the action. This structure emphasizes direct agency, vigour, and clarity in writing. In English transformation tests, active voice is converted to passive by making the object the new subject.',
    examples: [
      {
        sentence: 'The committee approved the newly drafted syllabus.',
        explanation: '"The committee" (subject) performs the action "approved".',
        isCorrect: true,
      },
      {
        sentence: 'Alexander Graham Bell invented the telephone.',
        explanation: 'Bell performs the action directly on the object "telephone".',
        isCorrect: true,
      },
    ],
    commonMistake: 'Confusing intransitive verbs (verbs without direct objects, like "die", "arrive", "sleep") with transitive verbs; intransitive verbs cannot be converted to passive voice.',
    examTip: 'If the question asks for the passive of "Who broke the glass?", look for "By whom was the glass broken?".',
    relatedTerms: ['Passive Voice', 'Transitive Verb', 'Intransitive Verb'],
  },
  {
    id: 'adjective-clause',
    term: 'Adjective Clause (Relative Clause)',
    pronunciation: '/ˈædʒ.ək.tɪv klɔːz/',
    partOfSpeechTag: 'Clause',
    category: 'Clauses & Phrases',
    shortDefinition: 'A dependent subordinate clause that modifies a noun or pronoun like a single-word adjective.',
    formulaOrRule: 'Relative Pronoun (who, whom, whose, which, that) or Relative Adverb (where, when, why) + Subject + Verb',
    fullExplanation:
      'An adjective clause immediately follows the antecedent noun it modifies. Essential (restrictive) adjective clauses define the noun without commas; non-essential (non-restrictive) clauses supply bonus parenthetical detail and must be enclosed in commas.',
    examples: [
      {
        sentence: 'The candidate who scored highest was awarded the scholarship.',
        explanation: '"who scored highest" qualifies the antecedent noun "The candidate".',
        isCorrect: true,
      },
      {
        sentence: 'Dhaka, which is the capital of Bangladesh, is densely populated.',
        explanation: 'Non-restrictive relative clause offset by commas.',
        isCorrect: true,
      },
    ],
    commonMistake: 'Using "that" in non-restrictive relative clauses surrounded by commas (e.g. "Dhaka, that is the capital..." is incorrect).',
    examTip: 'Check the subject/object case: Use "who" for subjects of the relative clause and "whom" for objects of verbs/prepositions.',
    relatedTerms: ['Relative Pronoun', 'Noun Clause', 'Adverbial Clause'],
  },
  {
    id: 'adverbial-clause',
    term: 'Adverbial Clause',
    pronunciation: '/ædˈvɜː.bi.əl klɔːz/',
    partOfSpeechTag: 'Clause',
    category: 'Clauses & Phrases',
    shortDefinition: 'A dependent clause that modifies a verb, adjective, or adverb, indicating time, cause, purpose, condition, or concession.',
    formulaOrRule: 'Subordinating Conjunction (because, although, since, when, if, unless, lest) + Subject + Verb',
    fullExplanation:
      'Adverbial clauses answer questions such as When? Where? Why? Under what conditions? or To what degree? If an adverbial clause precedes the main independent clause, it is traditionally followed by a comma.',
    examples: [
      {
        sentence: 'Although he worked diligently, he missed the deadline.',
        explanation: 'Adverbial clause of concession introduced by "Although".',
        isCorrect: true,
      },
      {
        sentence: 'Walk carefully lest you should stumble.',
        explanation: 'Adverbial clause of purpose with mandatory modal "should" after "lest".',
        isCorrect: true,
      },
    ],
    commonMistake: 'Using negative words ("not") after "unless" or "lest" (e.g. "lest you should not fall" is a double-negative error; use "lest you should fall").',
    examTip: 'The conjunction "lest" takes subjunctive bare infinitive or "should + verb", never "will" or "may".',
    relatedTerms: ['Subordinating Conjunction', 'Conditional Sentence', 'Complex Sentence'],
  },
  {
    id: 'appositive',
    term: 'Appositive / Noun in Apposition',
    pronunciation: '/əˈpɒz.ə.tɪv/',
    partOfSpeechTag: 'Syntax',
    category: 'Sentence Structures',
    shortDefinition: 'A noun or noun phrase placed immediately adjacent to another noun to rename, identify, or explain it.',
    formulaOrRule: 'Noun, [Appositive Phrase], Main Verb...',
    fullExplanation:
      'An appositive clarifies or renames an immediately preceding noun. Non-restrictive appositives are separated by a pair of commas. The true subject of the verb is the main noun, never the appositive inside the commas.',
    examples: [
      {
        sentence: 'Kazi Nazrul Islam, the national poet of Bangladesh, wrote fiery verses.',
        explanation: '"the national poet of Bangladesh" is in apposition to "Kazi Nazrul Islam".',
        isCorrect: true,
      },
    ],
    commonMistake: 'Matching the main verb with the appositive instead of the grammatical head noun (e.g. "My brother, together with his friends, [is/are]..." - the subject is singular "brother").',
    examTip: 'Cross out comma-enclosed appositives when checking subject-verb agreement in complex exam questions.',
    relatedTerms: ['Subject-Verb Agreement', 'Parenthetical Expression'],
  },
  {
    id: 'bare-infinitive',
    term: 'Bare Infinitive',
    pronunciation: '/beər ɪnˈfɪn.ɪ.tɪv/',
    partOfSpeechTag: 'Verb Form',
    category: 'Verb Forms & Tenses',
    shortDefinition: 'The base form of a verb used without the marker "to".',
    formulaOrRule: 'Modal Auxiliary / Causative / Perception Verb + V1 (base form)',
    fullExplanation:
      'The bare infinitive is required after modal auxiliaries (can, could, may, might, shall, should, will, would, must), certain causative verbs (make, let, have), and verbs of sensory perception (hear, see, watch, notice, feel) in the active voice.',
    examples: [
      {
        sentence: 'The strict officer made the recruit run five laps.',
        explanation: '"run" is a bare infinitive governed by the causative verb "made".',
        isCorrect: true,
      },
      {
        sentence: 'I saw him cross the busy highway.',
        explanation: '"cross" is a bare infinitive governed by the sensory perception verb "saw".',
        isCorrect: true,
      },
    ],
    commonMistake: 'Inserting "to" after "make" or "let" in the active voice (e.g. "He made me to cry" is incorrect; say "He made me cry").',
    examTip: 'Note the voice shift: while active "make" takes a bare infinitive ("He made me do it"), passive "make" requires full infinitive ("I was made to do it").',
    relatedTerms: ['Infinitive', 'Causative Verb', 'Gerund'],
  },
  {
    id: 'causative-verb',
    term: 'Causative Verb',
    pronunciation: '/ˈkɔː.zə.tɪv vɜːb/',
    partOfSpeechTag: 'Verb',
    category: 'Verb Forms & Tenses',
    shortDefinition: 'A verb indicating that a person or entity causes another agent to perform an action or causes a state to occur.',
    formulaOrRule: 'Make/Let/Have + Person + V1 (bare infinitive) | Get + Person + to + V1 | Have/Get + Object + V3 (past participle)',
    fullExplanation:
      'The primary causative verbs in English grammar are Make (compel), Have (request/assign), Let (permit), Get (persuade), and Help (assist). Formulas differ critically depending on whether the object is a human agent (active) or a thing being acted upon (passive).',
    examples: [
      {
        sentence: 'She got the technician to repair her laptop.',
        explanation: '"get + person" requires "to + verb".',
        isCorrect: true,
      },
      {
        sentence: 'I had my car washed yesterday afternoon.',
        explanation: '"have + object (thing) + V3" conveys that another party performed the service.',
        isCorrect: true,
      },
    ],
    commonMistake: 'Writing "She had the mechanic to fix her car" instead of "She had the mechanic fix her car" (have + person takes bare infinitive).',
    examTip: 'Memorize: Make/Have + person = V1. Get + person = to + V1. Have/Get + thing = V3.',
    relatedTerms: ['Bare Infinitive', 'Past Participle', 'Transitive Verb'],
  },
  {
    id: 'collective-noun',
    term: 'Collective Noun',
    pronunciation: '/kəˈlek.tɪv naʊn/',
    partOfSpeechTag: 'Noun',
    category: 'Parts of Speech',
    shortDefinition: 'A noun representing a collection of individuals regarded as a single unified entity.',
    formulaOrRule: 'Group acting in unison = Singular Verb; Group acting as separate individuals = Plural Verb',
    fullExplanation:
      'Examples include jury, committee, council, flock, herd, army, and family. When the group acts with unified consensus, use singular pronouns and verbs ("The jury has reached its verdict"). When individual members act separately or in conflict, use plural verbs ("The jury were divided in their opinions").',
    examples: [
      {
        sentence: 'The committee has submitted its annual audit report.',
        explanation: 'Unified single action takes singular "has" and neuter pronoun "its".',
        isCorrect: true,
      },
      {
        sentence: 'The committee are arguing among themselves.',
        explanation: 'Divided internal opinions require plural "are" and "themselves".',
        isCorrect: true,
      },
    ],
    commonMistake: 'Mixing singular verbs with plural pronouns (e.g. "The jury has reached their verdict" is incorrect; use "its").',
    examTip: 'In BCS and admission tests, words like "cattle", "people", "poultry", and "gentry" are always plural and never take singular verbs or "s".',
    relatedTerms: ['Subject-Verb Agreement', 'Abstract Noun', 'Countable Noun'],
  },
  {
    id: 'complex-sentence',
    term: 'Complex Sentence',
    pronunciation: '/ˈkɒm.pleks ˈsen.təns/',
    partOfSpeechTag: 'Sentence Structure',
    category: 'Sentence Structures',
    shortDefinition: 'A sentence containing exactly one independent clause and at least one dependent (subordinate) clause.',
    formulaOrRule: 'Independent Clause + Subordinating Conjunction (or Relative Pronoun) + Dependent Clause',
    fullExplanation:
      'In a complex sentence, the dependent clause cannot stand alone as a complete grammatical thought and relies on the independent clause. Typical subordinating conjunctions include because, although, since, whereas, if, unless, that, while, and relative pronouns who, which, that.',
    examples: [
      {
        sentence: 'Because he prepared systematically, he secured the top rank.',
        explanation: 'Dependent adverbial clause ("Because...") attached to independent clause.',
        isCorrect: true,
      },
    ],
    commonMistake: 'Confusing complex with compound sentences; compound sentences use coordinating conjunctions (FANBOYS) linking two independent clauses.',
    examTip: 'Transformation rule: Simple: "In spite of his poverty..." -> Complex: "Though he was poor..." -> Compound: "He was poor, but...".',
    relatedTerms: ['Compound Sentence', 'Subordinating Conjunction', 'Independent Clause'],
  },
  {
    id: 'compound-sentence',
    term: 'Compound Sentence',
    pronunciation: '/ˈkɒm.paʊnd ˈsen.təns/',
    partOfSpeechTag: 'Sentence Structure',
    category: 'Sentence Structures',
    shortDefinition: 'A sentence composed of two or more independent clauses joined by a coordinating conjunction or a semicolon.',
    formulaOrRule: 'Independent Clause + , + Coordinating Conjunction (FANBOYS: For, And, Nor, But, Or, Yet, So) + Independent Clause',
    fullExplanation:
      'Both clauses in a compound sentence are structurally equal and could stand independently as complete sentences. When joining with a coordinating conjunction, a comma must precede the conjunction.',
    examples: [
      {
        sentence: 'The rain stopped, yet the players remained in the pavilion.',
        explanation: 'Two complete thoughts linked by the coordinating conjunction "yet".',
        isCorrect: true,
      },
    ],
    commonMistake: 'Creating a comma splice by joining two independent clauses with only a comma without a coordinating conjunction.',
    examTip: 'Remember the acronym FANBOYS: For, And, Nor, But, Or, Yet, So.',
    relatedTerms: ['Coordinating Conjunction', 'Complex Sentence', 'Independent Clause'],
  },
  {
    id: 'conditional-third',
    term: 'Third Conditional (Past Unreal)',
    pronunciation: '/θɜːd kənˈdɪʃ.ən.əl/',
    partOfSpeechTag: 'Conditional',
    category: 'Verb Forms & Tenses',
    shortDefinition: 'A conditional sentence referring to an impossible past condition and its hypothetical past result.',
    formulaOrRule: 'If + Past Perfect (had + V3), Subject + would/could/might + have + V3',
    fullExplanation:
      'The third conditional expresses regret or counterfactual reflection about an event that did not happen in the past. An inverted variant without "if" begins with "Had + Subject + V3".',
    examples: [
      {
        sentence: 'If she had studied more methodically, she would have cleared the examination.',
        explanation: 'Past hypothetical condition; she did not study and did not pass.',
        isCorrect: true,
      },
      {
        sentence: 'Had I known your contact details, I would have notified you.',
        explanation: 'Inverted third conditional omitting "if".',
        isCorrect: true,
      },
    ],
    commonMistake: 'Using "would have" in the "if" clause (e.g. "If I would have known..." is incorrect; say "If I had known...").',
    examTip: 'Watch out for "Had + Subject + V3" at the start of a sentence: the main clause must always take "would have + V3", not "would + V1".',
    relatedTerms: ['Inversion', 'Subjunctive Mood', 'Past Perfect Tense'],
  },
  {
    id: 'dangling-modifier',
    term: 'Dangling Modifier',
    pronunciation: '/ˈdæŋ.ɡlɪŋ ˈmɒd.ɪ.faɪ.ər/',
    partOfSpeechTag: 'Syntax Error',
    category: 'Modifiers & Usage',
    shortDefinition: 'A phrase (often participial) whose intended subject is missing from the sentence, falsely modifying another noun.',
    formulaOrRule: 'Introductory Participial Phrase must be immediately followed by its logical agent as the subject.',
    fullExplanation:
      'When an introductory participle lacks a logical agent to attach to, it grammatically "dangles" or attaches to whatever noun follows the comma, generating comical or syntactically invalid sentences.',
    examples: [
      {
        sentence: 'Walking across the campus, a sudden downpour soaked him.',
        explanation: 'Incorrect: The downpour was not walking across the campus.',
        isCorrect: false,
      },
      {
        sentence: 'Walking across the campus, he was soaked by a sudden downpour.',
        explanation: 'Correct: "he" is the logical doer of "walking".',
        isCorrect: true,
      },
    ],
    commonMistake: 'Placing passive clauses immediately after introductory verbal phrases so the real actor is buried in a prepositional phrase.',
    examTip: 'In sentence correction questions, immediately inspect the noun right after the first comma following an "-ing" or "-ed" introductory phrase.',
    relatedTerms: ['Participle', 'Misplaced Modifier', 'Participial Phrase'],
  },
  {
    id: 'direct-speech',
    term: 'Direct Speech',
    pronunciation: '/daɪˈrekt spiːtʃ/',
    partOfSpeechTag: 'Narration',
    category: 'Transformations',
    shortDefinition: 'Reporting the exact words spoken by a speaker, enclosed within quotation marks.',
    formulaOrRule: 'Reporting Subject + Reporting Verb + , + "Exact Spoken Sentence."',
    fullExplanation:
      'In direct speech, original pronouns, verb tenses, punctuation marks, and deictic words of time and place (here, now, today, tomorrow) remain unchanged inside inverted commas.',
    examples: [
      {
        sentence: 'He said, "I have completed my assignment today."',
        explanation: 'The actual spoken sentence is enclosed within quotation marks.',
        isCorrect: true,
      },
    ],
    commonMistake: 'Forgetting capital letters at the start of quoted sentences or placing periods outside quotation marks.',
    examTip: 'When converting to indirect speech, shift tenses back one step if the reporting verb is in the past (e.g. said).',
    relatedTerms: ['Indirect Speech (Narration)', 'Reporting Verb', 'Tense'],
  },
  {
    id: 'gerund',
    term: 'Gerund',
    pronunciation: '/ˈdʒer.ənd/',
    partOfSpeechTag: 'Verbal Noun',
    category: 'Verb Forms & Tenses',
    shortDefinition: 'A non-finite verb form ending in -ing that functions syntactically as a noun.',
    formulaOrRule: 'Verb + -ing = Noun (acting as Subject, Direct Object, Object of Preposition, or Subject Complement)',
    fullExplanation:
      'Although derived from a verb and capable of taking objects or adverbial modifiers, a gerund behaves as a noun in the sentence. A preceding noun or pronoun modifying a gerund should strictly be in the possessive case in formal English (e.g. "my singing", "his leaving").',
    examples: [
      {
        sentence: 'Swimming every morning keeps him vigorous and active.',
        explanation: '"Swimming" is a gerund functioning as the grammatical subject.',
        isCorrect: true,
      },
      {
        sentence: 'She insisted on his accompanying her to the symposium.',
        explanation: '"accompanying" is a gerund preceded by the possessive adjective "his".',
        isCorrect: true,
      },
    ],
    commonMistake: 'Using an objective pronoun instead of a possessive before a gerund (e.g. "I dislike him coming late" is informal; formal exam standard requires "his coming").',
    examTip: 'Fixed prepositional phrases like "with a view to", "look forward to", "accustomed to", "be used to" must always be followed by a gerund (-ing form), not base verb.',
    relatedTerms: ['Participle', 'Infinitive', 'Verbal Noun'],
  },
  {
    id: 'indirect-speech',
    term: 'Indirect Speech (Narration)',
    pronunciation: '/ˌɪn.daɪˈrekt spiːtʃ/',
    partOfSpeechTag: 'Narration',
    category: 'Transformations',
    shortDefinition: 'Reporting the substance of a speaker\'s utterance without using their exact verbatim words or quotation marks.',
    formulaOrRule: 'Reporting Subject + Reporting Verb + that/if/wh-word + Transformed Clause (Backshifted Tense + Adjusted Pronouns & Adverbs)',
    fullExplanation:
      'When the reporting verb is in the past tense (said, asked, told), verb tenses in the subordinate clause typically backshift (Simple Present -> Simple Past, Present Perfect -> Past Perfect). Universal truths and scientific facts remain in the present tense.',
    examples: [
      {
        sentence: 'He said that he had completed his assignment that day.',
        explanation: 'Indirect transformation of "I have completed my assignment today."',
        isCorrect: true,
      },
      {
        sentence: 'The teacher said that the Earth revolves around the sun.',
        explanation: 'Universal scientific fact retains simple present tense despite past reporting verb.',
        isCorrect: true,
      },
    ],
    commonMistake: 'Keeping interrogative word order in indirect questions (e.g. "He asked where was I going" is incorrect; say "He asked where I was going").',
    examTip: 'Indirect questions ALWAYS take assertive word order: Subordinating word (if/whether/wh-) + Subject + Verb.',
    relatedTerms: ['Direct Speech', 'Reporting Verb', 'Assertive Sentence'],
  },
  {
    id: 'inversion',
    term: 'Inversion (Grammatical Inversion)',
    pronunciation: '/ɪnˈvɜː.ʃən/',
    partOfSpeechTag: 'Syntax',
    category: 'Agreement & Syntax',
    shortDefinition: 'A syntactic construction in which the auxiliary verb precedes the subject, typically for emphasis or drama.',
    formulaOrRule: 'Negative / Restrictive Adverbial (Hardly, Scarcely, Seldom, Never, No sooner) + Auxiliary Verb + Subject + Main Verb',
    fullExplanation:
      'Negative and limiting adverbs placed at the beginning of a sentence trigger inversion. The auxiliary verb moves before the subject, imitating question word order, although the sentence remains a declarative statement ending in a period.',
    examples: [
      {
        sentence: 'Scarcely had he entered the auditorium when the lights went out.',
        explanation: 'Inversion after "Scarcely" followed by correlative conjunction "when".',
        isCorrect: true,
      },
      {
        sentence: 'No sooner did the train halt than the passengers rushed out.',
        explanation: 'Inversion after "No sooner" followed by correlative conjunction "than".',
        isCorrect: true,
      },
    ],
    commonMistake: 'Pairing "No sooner" with "when" or "then" instead of "than" (e.g. "No sooner had he left when it rained" is incorrect; use "than it rained").',
    examTip: 'Memorize the exact correlative pairs: "Hardly... when", "Scarcely... when/before", "No sooner... than".',
    relatedTerms: ['Correlative Conjunction', 'Subject-Verb Agreement', 'Auxiliary Verb'],
  },
  {
    id: 'participle-present',
    term: 'Present Participle',
    pronunciation: '/ˈprez.ənt ˈpɑː.tɪ.sɪ.pəl/',
    partOfSpeechTag: 'Verbal Adjective',
    category: 'Verb Forms & Tenses',
    shortDefinition: 'A non-finite verb ending in -ing functioning as an adjective or forming continuous/progressive verb tenses.',
    formulaOrRule: 'Verb + -ing = Adjective (modifying a Noun) or Continuous Tense (be + V-ing)',
    fullExplanation:
      'Unlike a gerund which functions as a noun, a participle functions as an adjective or active verb form. Present participles signify ongoing, active states or actions happening concurrently with the main verb.',
    examples: [
      {
        sentence: 'Do not alight from a running train.',
        explanation: '"running" modifies the noun "train" as an adjective.',
        isCorrect: true,
      },
      {
        sentence: 'Hearing the alarm, the guard leaped from his seat.',
        explanation: '"Hearing the alarm" is a participial phrase modifying the subject "the guard".',
        isCorrect: true,
      },
    ],
    commonMistake: 'Confusing present participles with gerunds. Test: If you can replace it with "something" or "it", it is a gerund (noun); if it describes what kind, it is a participle (adjective).',
    examTip: 'MCQ classic: In "A barking dog seldom bites", what is "barking"? Answer: Present Participle.',
    relatedTerms: ['Gerund', 'Past Participle', 'Dangling Modifier'],
  },
  {
    id: 'passive-voice',
    term: 'Passive Voice',
    pronunciation: '/ˈpæs.ɪv vɔɪs/',
    partOfSpeechTag: 'Voice',
    category: 'Transformations',
    shortDefinition: 'A sentence structure where the subject undergoes the action rather than performing it.',
    formulaOrRule: 'Object becomes Subject + Form of "to be" + Past Participle (V3) + (by + Agent)',
    fullExplanation:
      'Passive voice is employed when the recipient or result of the action is the focal point, or when the agent is unknown, irrelevant, or obvious. The tense of the original active verb is carried entirely by the auxiliary verb "be".',
    examples: [
      {
        sentence: 'The resolution was adopted unanimously by the council.',
        explanation: 'Past simple passive: "was" + V3 ("adopted").',
        isCorrect: true,
      },
      {
        sentence: 'Rice is eaten in almost every household in Bangladesh.',
        explanation: 'Passive sentence with agent omitted because it is self-evident.',
        isCorrect: true,
      },
    ],
    commonMistake: 'Attempting to passivize intransitive verbs (e.g. "He arrived yesterday" cannot be converted to passive).',
    examTip: 'For imperative sentences like "Do it at once", the passive form is "Let it be done at once".',
    relatedTerms: ['Active Voice', 'Transitive Verb', 'Past Participle'],
  },
  {
    id: 'phrasal-verb',
    term: 'Phrasal Verb',
    pronunciation: '/ˌfreɪ.zəl ˈvɜːb/',
    partOfSpeechTag: 'Idiomatic Verb',
    category: 'Parts of Speech',
    shortDefinition: 'A compound verb formed by combining a base verb with a preposition or adverbial particle, producing an idiomatic meaning.',
    formulaOrRule: 'Base Verb + Particle(s) = Idiomatic Meaning distinct from individual words',
    fullExplanation:
      'Phrasal verbs frequently appear in competitive examinations because their meanings cannot be deduced literally. They can be separable (pronoun object must go in between: "call him up") or inseparable ("look after the children").',
    examples: [
      {
        sentence: 'The scheduled committee meeting was called off due to heavy rain.',
        explanation: '"call off" idiomatically means "to cancel".',
        isCorrect: true,
      },
      {
        sentence: 'You must cut down on unnecessary expenditure.',
        explanation: '"cut down on" idiomatically means "to reduce".',
        isCorrect: true,
      },
    ],
    commonMistake: 'Confusing similar particles, such as "put off" (postpone) versus "put out" (extinguish) versus "put up with" (tolerate).',
    examTip: 'Top 5 high-frequency exam phrasal verbs: Call off (cancel), Give in (yield), Look down upon (despise), Bring about (cause), Pass away (die).',
    relatedTerms: ['Preposition', 'Idiom', 'Transitive Verb'],
  },
  {
    id: 'relative-pronoun',
    term: 'Relative Pronoun',
    pronunciation: '/ˈrel.ə.tɪv ˈprəʊ.naʊn/',
    partOfSpeechTag: 'Pronoun',
    category: 'Parts of Speech',
    shortDefinition: 'A pronoun that introduces an adjective (relative) clause and relates it back to an antecedent noun or pronoun.',
    formulaOrRule: 'Antecedent Noun + Relative Pronoun (Who, Whom, Whose, Which, That) + Subordinate Clause',
    fullExplanation:
      'Relative pronouns serve dual syntactic roles: they link clauses like conjunctions and stand in place of nouns like pronouns. "Who" is subjective for humans; "whom" is objective for humans; "whose" indicates possession; "which" refers to things/animals; "that" refers to both people and things in restrictive clauses.',
    examples: [
      {
        sentence: 'The doctor whom you consulted yesterday is a renowned cardiologist.',
        explanation: '"whom" is in the objective case, functioning as the object of "consulted".',
        isCorrect: true,
      },
      {
        sentence: 'All that glitters is not gold.',
        explanation: 'After words like "all", "none", "only", "the same", "that" is preferred over "which".',
        isCorrect: true,
      },
    ],
    commonMistake: 'Using "who" when the pronoun is the object of a preposition (e.g. "To who did you give the book?" is incorrect; use "To whom...").',
    examTip: 'Whenever an antecedent is preceded by superlatives or qualifiers like "the only", "all", "none", prefer "that" instead of "who/which".',
    relatedTerms: ['Adjective Clause', 'Antecedent', 'Pronoun-Antecedent Agreement'],
  },
  {
    id: 'subject-verb-agreement',
    term: 'Subject-Verb Agreement (Concord)',
    pronunciation: '/ˈsʌb.dʒɪkt vɜːb əˈɡriː.mənt/',
    partOfSpeechTag: 'Syntax Rule',
    category: 'Agreement & Syntax',
    shortDefinition: 'The foundational grammatical rule requiring a finite verb to agree with its subject in person and number.',
    formulaOrRule: 'Singular Subject -> Singular Verb; Plural Subject -> Plural Verb',
    fullExplanation:
      'Subject-verb agreement dictates that singular subjects take singular verbs (which end in -s in the third-person simple present) and plural subjects take plural verbs. The rule is complicated by intervening phrases ("as well as", "together with"), correlative conjunctions ("either... or", "neither... nor"), and indefinite pronouns.',
    examples: [
      {
        sentence: 'The principal, along with several senior faculty members, has arrived.',
        explanation: '"along with..." is a parenthetical prepositional phrase; the true subject is singular "principal".',
        isCorrect: true,
      },
      {
        sentence: 'Neither the manager nor the employees were informed in advance.',
        explanation: 'In "neither... nor", the verb agrees with the closer subject ("employees").',
        isCorrect: true,
      },
    ],
    commonMistake: 'Letting words that intervene between subject and verb (like prepositional phrases) confuse the number of the true subject.',
    examTip: '"One of the + plural noun + who + plural verb" versus "The only one of the + plural noun + who + singular verb".',
    relatedTerms: ['Collective Noun', 'Correlative Conjunction', 'Inversion'],
  },
  {
    id: 'subjunctive-mood',
    term: 'Subjunctive Mood',
    pronunciation: '/səbˈdʒʌŋk.tɪv muːd/',
    partOfSpeechTag: 'Mood',
    category: 'Verb Forms & Tenses',
    shortDefinition: 'A verb form used to express wishes, recommendations, commands, hypothetical conditions, or states contrary to fact.',
    formulaOrRule: 'Mandative: Suggest/Demand/Insist + that + Subject + [Bare Infinitive V1] | Hypothetical: If + Subject + were',
    fullExplanation:
      'The mandative subjunctive requires the base form of the verb (bare infinitive) regardless of person or number (no -s ending, no "should"). The hypothetical past subjunctive uses "were" for all subjects in unreal conditions.',
    examples: [
      {
        sentence: 'The magistrate ordered that the prisoner be released immediately.',
        explanation: 'Subjunctive bare infinitive "be" instead of "is" or "was".',
        isCorrect: true,
      },
      {
        sentence: 'If I were a billionaire, I would establish public research libraries.',
        explanation: 'Hypothetical subjunctive: "were" used with singular first-person "I".',
        isCorrect: true,
      },
    ],
    commonMistake: 'Adding "-s" to the verb in mandative clauses (e.g. "I insist that he attends" is non-standard in formal exams; use "attend").',
    examTip: 'High-yield exam trigger verbs for mandative subjunctive: insist, suggest, recommend, demand, advise, require, propose.',
    relatedTerms: ['Bare Infinitive', 'Third Conditional', 'Imperative'],
  },
  {
    id: 'tag-question',
    term: 'Tag Question',
    pronunciation: '/tæɡ ˈkwes.tʃən/',
    partOfSpeechTag: 'Interrogative',
    category: 'Sentence Structures',
    shortDefinition: 'A mini-question tagged onto the end of a declarative statement to request confirmation or agreement.',
    formulaOrRule: 'Positive Statement + Negative Tag (Auxiliary + n\'t + Pronoun)? | Negative Statement + Positive Tag (Auxiliary + Pronoun)?',
    fullExplanation:
      'Tag questions use the auxiliary verb corresponding to the main statement\'s tense. Words with inherently negative connotations (seldom, hardly, scarcely, few, little, never, neither) make the main clause negative, thereby demanding an affirmative tag.',
    examples: [
      {
        sentence: 'Barking dogs seldom bite, do they?',
        explanation: '"seldom" makes the clause negative, requiring the positive tag "do they?".',
        isCorrect: true,
      },
      {
        sentence: 'Let\'s arrange a study circle this weekend, shall we?',
        explanation: 'Imperatives introduced with "Let\'s" strictly take the tag "shall we?".',
        isCorrect: true,
      },
    ],
    commonMistake: 'Using "aren\'t I?" instead of "am I not?" or using "don\'t they" when an auxiliary is already present in the sentence.',
    examTip: 'Remember: "I am right, aren\'t I?", "Let us go (permission), will you?", and "Let\'s go (suggestion), shall we?".',
    relatedTerms: ['Auxiliary Verb', 'Inversion', 'Imperative'],
  },
];
