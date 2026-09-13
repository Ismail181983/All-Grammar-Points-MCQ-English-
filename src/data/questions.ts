import { ModelQuestionSet } from '../types';
import { enrichAllModelQuestionSets } from '../utils/categories';
import { modelQuestionSets6and7 } from './sets6and7';
import { modelQuestionSets8to10 } from './sets8to10';
import { modelQuestionSets11to15 } from './sets11to15';
import { modelQuestionSets16to20 } from './sets16to20';
import { modelQuestionSets21to25 } from './sets21to25';
import { modelQuestionSets26to30 } from './sets26to30';
import { modelQuestionSets31to35 } from './sets31to35';
import { modelQuestionSets36to40 } from './sets36to40';
import { modelQuestionSets41to45 } from './sets41to45';

const sets1to5: ModelQuestionSet[] = [
  {
    "id": 1,
    "title": "Model Question 1",
    "subtitle": "English Grammar Competence - Set 1",
    "description": "Essential grammar evaluation covering parts of speech, articles, prepositions, conditionals, subject-verb agreement, voice, narration, idioms, and literature.",
    "totalQuestions": 25,
    "questions": [
      {
        "id": 1,
        "question": "Identify the part of speech of the underlined word: He works hard to support his family.",
        "options": {
          "A": "Adjective",
          "B": "Adverb",
          "C": "Noun",
          "D": "Preposition"
        },
        "correctAnswer": "B",
        "topic": "Parts of Speech (Adverb of Manner)",
        "explanation": "In this sentence, \"hard\" modifies the verb \"works\" to indicate the manner in which he works, functioning as an adverb of manner. While \"hard\" can also be an adjective (e.g., \"a hard exam\"), when qualifying a verb it is an adverb."
      },
      {
        "id": 2,
        "question": "Choose the correct article: He is ___ M.A. in English.",
        "options": {
          "A": "a",
          "B": "an",
          "C": "the",
          "D": "no article"
        },
        "correctAnswer": "B",
        "topic": "Articles (Abbreviation with initial vowel sound /em/)",
        "explanation": "The abbreviation \"M.A.\" begins with the letter \"M\", which is pronounced with an initial vowel sound /em/ (beginning with the vowel sound /e/). Abbreviations starting with a vowel sound take the indefinite article \"an\"."
      },
      {
        "id": 3,
        "question": "Choose the correct preposition: He is senior ___ me.",
        "options": {
          "A": "than",
          "B": "from",
          "C": "to",
          "D": "with"
        },
        "correctAnswer": "C",
        "topic": "Appropriate Preposition (Latin comparative senior takes to)",
        "explanation": "Latin comparative adjectives ending in \"-ior\" (senior, junior, superior, inferior, prior, posterior) are always followed by the preposition \"to\", never by the comparative conjunction \"than\"."
      },
      {
        "id": 4,
        "question": "Choose the correct form of the verb: If I ___ you, I would accept the offer.",
        "options": {
          "A": "am",
          "B": "was",
          "C": "were",
          "D": "had been"
        },
        "correctAnswer": "C",
        "topic": "Second Conditional (Subjunctive were for unreal present)",
        "explanation": "In second conditional sentences denoting an unreal, hypothetical, or contrary-to-fact present situation, the past subjunctive \"were\" is used for all persons and numbers (including \"I\" and \"he\")."
      },
      {
        "id": 5,
        "question": "Choose the correct sentence.",
        "options": {
          "A": "Neither of the boys are present.",
          "B": "Neither of the boys is present.",
          "C": "Neither of the boys have been present.",
          "D": "Neither of boys is present."
        },
        "correctAnswer": "B",
        "topic": "Subject-Verb Agreement (Neither of takes singular verb)",
        "explanation": "\"Neither of\" refers to not one nor the other of two individuals and strictly takes a singular verb (\"is\") in standard formal English. Also, the definite article \"the\" is required before \"boys\"."
      },
      {
        "id": 6,
        "question": "The passive form of \u201cPeople speak English all over the world\u201d is:",
        "options": {
          "A": "English is spoken all over the world.",
          "B": "English was spoken all over the world.",
          "C": "English has spoken all over the world.",
          "D": "English speaks all over the world."
        },
        "correctAnswer": "A",
        "topic": "Voice Change (Simple Present Passive)",
        "explanation": "The active sentence is in simple present tense (\"speak\"). Its passive formula is: Object as subject (\"English\") + is/are (\"is\") + past participle (\"spoken\") + adjunct (\"all over the world\"). The vague agent \"by people\" is omitted."
      },
      {
        "id": 7,
        "question": "Change into indirect speech: He said, \u201cI am busy.\u201d",
        "options": {
          "A": "He said that I was busy.",
          "B": "He said that he was busy.",
          "C": "He said that he is busy.",
          "D": "He said he had been busy."
        },
        "correctAnswer": "B",
        "topic": "Direct & Indirect Speech (Assertive Narration)",
        "explanation": "When the reporting verb is in the past tense (\"said\"), the first-person pronoun \"I\" shifts to \"he\", and the present tense verb \"am\" backshifts to the past tense \"was\": \"He said that he was busy.\""
      },
      {
        "id": 8,
        "question": "Choose the correct synonym of Abundant.",
        "options": {
          "A": "Scarce",
          "B": "Plentiful",
          "C": "Limited",
          "D": "Rare"
        },
        "correctAnswer": "B",
        "topic": "Synonyms & Vocabulary",
        "explanation": "\"Abundant\" means existing or available in large, overflowing quantities. Hence, \"Plentiful\" is its exact synonym, whereas \"Scarce\", \"Limited\", and \"Rare\" are its antonyms."
      },
      {
        "id": 9,
        "question": "Choose the antonym of Optimistic.",
        "options": {
          "A": "Hopeful",
          "B": "Positive",
          "C": "Pessimistic",
          "D": "Confident"
        },
        "correctAnswer": "C",
        "topic": "Antonyms & Vocabulary",
        "explanation": "\"Optimistic\" describes someone who expects positive outcomes and looks at the bright side. Its direct opposite is \"Pessimistic\", which describes someone who anticipates the worst."
      },
      {
        "id": 10,
        "question": "What does the idiom \u201cat sixes and sevens\u201d mean?",
        "options": {
          "A": "In order",
          "B": "In confusion",
          "C": "Very quickly",
          "D": "Very carefully"
        },
        "correctAnswer": "B",
        "topic": "Idioms & Phrases",
        "explanation": "The idiom \"at sixes and sevens\" is an English idiomatic expression that describes a state of total confusion, disarray, or disorder."
      },
      {
        "id": 11,
        "question": "Choose the correctly spelt word.",
        "options": {
          "A": "Accomodation",
          "B": "Acommodation",
          "C": "Accommodation",
          "D": "Accommadation"
        },
        "correctAnswer": "C",
        "topic": "Spelling Verification",
        "explanation": "The correct spelling is \"Accommodation\" (A-C-C-O-M-M-O-D-A-T-I-O-N), featuring both a double \"c\" and a double \"m\"."
      },
      {
        "id": 12,
        "question": "\u201cTo call a spade a spade\u201d means:",
        "options": {
          "A": "To insult someone",
          "B": "To speak frankly",
          "C": "To tell a lie",
          "D": "To avoid an issue"
        },
        "correctAnswer": "B",
        "topic": "Idioms & Phrases",
        "explanation": "\"To call a spade a spade\" means to speak candidly, frankly, and directly about something, calling things by their real names without euphemism."
      },
      {
        "id": 13,
        "question": "Choose the correct sentence.",
        "options": {
          "A": "He has been living here since five years.",
          "B": "He has been living here for five years.",
          "C": "He is living here since five years.",
          "D": "He lived here since five years."
        },
        "correctAnswer": "B",
        "topic": "Tenses & Prepositions of Time (for + duration vs since + point of time)",
        "explanation": "\"For\" is used with a duration or period of time (\"five years\"), whereas \"since\" is used for a specific starting point in time (e.g., \"since 2018\"). An ongoing action over a duration demands \"has been living ... for five years\"."
      },
      {
        "id": 14,
        "question": "Which one is a gerund?",
        "options": {
          "A": "Swimming is a good exercise.",
          "B": "He is swimming now.",
          "C": "The swimming boy is my brother.",
          "D": "He swam across the river."
        },
        "correctAnswer": "A",
        "topic": "Non-finite Verbs (Gerund vs Participle)",
        "explanation": "A gerund is a verb form ending in \"-ing\" that functions as a noun. In sentence A, \"Swimming\" is the subject of the sentence (verbal noun). In B, it is part of the finite verb, and in C, it is a participial adjective."
      },
      {
        "id": 15,
        "question": "Choose the correct word: The news ___ true.",
        "options": {
          "A": "are",
          "B": "were",
          "C": "is",
          "D": "have"
        },
        "correctAnswer": "C",
        "topic": "Subject-Verb Agreement (Singular noun news)",
        "explanation": "\"News\" is an uncountable noun that is plural in outward form but strictly singular in grammatical meaning and agreement, so it takes the singular verb \"is\"."
      },
      {
        "id": 16,
        "question": "\u201cLook after\u201d means:",
        "options": {
          "A": "Search",
          "B": "Take care of",
          "C": "Observe",
          "D": "Follow"
        },
        "correctAnswer": "B",
        "topic": "Phrasal Verbs",
        "explanation": "The phrasal verb \"look after\" means to take care of, attend to, or mind someone or something."
      },
      {
        "id": 17,
        "question": "Choose the correct comparative form: No other metal is ___ gold.",
        "options": {
          "A": "precious than",
          "B": "more precious than",
          "C": "most precious than",
          "D": "as precious than"
        },
        "correctAnswer": "B",
        "topic": "Degree of Comparison (Comparative form with than)",
        "explanation": "When comparing two entities using \"than\", polysyllabic adjectives form their comparative degree with \"more\" (\"more precious than\")."
      },
      {
        "id": 18,
        "question": "Choose the appropriate word: The principal ___ the students to maintain discipline.",
        "options": {
          "A": "advised",
          "B": "advised to",
          "C": "advised that",
          "D": "advice"
        },
        "correctAnswer": "A",
        "topic": "Right Form of Verbs (Transitive verb advise + object + to-infinitive)",
        "explanation": "\"Advise\" is a transitive verb followed directly by its object and a to-infinitive (\"advised the students to maintain\"). \"Advice\" is a noun, not a verb."
      },
      {
        "id": 19,
        "question": "What is the noun form of \u201chonest\u201d?",
        "options": {
          "A": "Honesty",
          "B": "Honestness",
          "C": "Honestly",
          "D": "Honestism"
        },
        "correctAnswer": "A",
        "topic": "Parts of Speech (Noun formation)",
        "explanation": "The abstract noun form of the adjective \"honest\" is \"Honesty\". \"Honestly\" is an adverb, while the other forms do not exist in standard English."
      },
      {
        "id": 20,
        "question": "Choose the correct sentence.",
        "options": {
          "A": "He is good in mathematics.",
          "B": "He is good at mathematics.",
          "C": "He is good on mathematics.",
          "D": "He is good with mathematics."
        },
        "correctAnswer": "B",
        "topic": "Appropriate Preposition (good at a subject)",
        "explanation": "The adjective \"good\" takes the fixed preposition \"at\" to denote skill, proficiency, or competence in a subject, sport, or activity (\"good at mathematics\")."
      },
      {
        "id": 21,
        "question": "\u201cA man of letters\u201d means:",
        "options": {
          "A": "A postman",
          "B": "A literary person",
          "C": "A businessman",
          "D": "An illiterate man"
        },
        "correctAnswer": "B",
        "topic": "Idioms & Phrases",
        "explanation": "\"A man of letters\" is a traditional idiom referring to a literary person, scholar, or author devoted to literature and intellectual pursuits."
      },
      {
        "id": 22,
        "question": "Choose the correct spelling.",
        "options": {
          "A": "Privilege",
          "B": "Priviledge",
          "C": "Privelege",
          "D": "Privillage"
        },
        "correctAnswer": "A",
        "topic": "Spelling Verification",
        "explanation": "The correct spelling is \"Privilege\" (P-R-I-V-I-L-E-G-E). There is no letter \"d\" in the word."
      },
      {
        "id": 23,
        "question": "Fill in the blank: The meeting was postponed ___ the chairman's illness.",
        "options": {
          "A": "because",
          "B": "because of",
          "C": "although",
          "D": "despite"
        },
        "correctAnswer": "B",
        "topic": "Prepositional Phrases (because of + noun phrase)",
        "explanation": "\"Because of\" is a compound preposition followed by a noun phrase (\"the chairman's illness\"), whereas \"because\" is a conjunction requiring a full subject-verb clause."
      },
      {
        "id": 24,
        "question": "Which sentence is correct?",
        "options": {
          "A": "The sceneries of Cox's Bazar are beautiful.",
          "B": "The scenery of Cox's Bazar is beautiful.",
          "C": "The scenery of Cox's Bazar are beautiful.",
          "D": "The sceneries of Cox's Bazar is beautiful."
        },
        "correctAnswer": "B",
        "topic": "Countable vs Uncountable Nouns (Scenery is uncountable)",
        "explanation": "\"Scenery\" is an uncountable noun with no plural form (there is no word \"sceneries\") and always takes a singular verb (\"is\")."
      },
      {
        "id": 25,
        "question": "Who wrote \u201cParadise Lost\u201d?",
        "options": {
          "A": "William Shakespeare",
          "B": "John Milton",
          "C": "Geoffrey Chaucer",
          "D": "John Keats"
        },
        "correctAnswer": "B",
        "topic": "English Literature",
        "explanation": "\"Paradise Lost\" is the masterwork 17th-century blank verse epic poem written by the English poet John Milton, first published in 1667."
      }
    ]
  },
  {
    "id": 2,
    "title": "Model Question 2",
    "subtitle": "English Grammar Competence - Set 2",
    "description": "Comprehensive evaluation covering prepositions, conditional inversion, participles, singular concord with one of, passive interrogatives, and literary masterworks.",
    "totalQuestions": 25,
    "questions": [
      {
        "id": 1,
        "question": "Choose the correct word: He is accustomed ___ hard work.",
        "options": {
          "A": "with",
          "B": "at",
          "C": "to",
          "D": "for"
        },
        "correctAnswer": "C",
        "topic": "Appropriate Preposition (accustomed to)",
        "explanation": "The adjective \"accustomed\" takes the preposition \"to\" (\"accustomed to + noun/gerund\"), meaning habitual, used to, or familiar with something."
      },
      {
        "id": 2,
        "question": "Choose the correct form: Had I known the matter, I ___ you.",
        "options": {
          "A": "would tell",
          "B": "would have told",
          "C": "will tell",
          "D": "told"
        },
        "correctAnswer": "B",
        "topic": "Third Conditional (Inverted Had I known)",
        "explanation": "In an inverted third conditional sentence beginning with \"Had + subject + past participle\", the main clause requires \"would have + past participle\" (\"would have told\")."
      },
      {
        "id": 3,
        "question": "Identify the underlined part: He came running.",
        "options": {
          "A": "Gerund",
          "B": "Present participle",
          "C": "Infinitive",
          "D": "Adjective"
        },
        "correctAnswer": "B",
        "topic": "Non-finite Verbs (Present Participle of accompanying action)",
        "explanation": "\"Running\" describes the manner and simultaneous action accompanying the finite verb \"came\", functioning as a present participle."
      },
      {
        "id": 4,
        "question": "Choose the correct sentence.",
        "options": {
          "A": "One of my friends live in Dhaka.",
          "B": "One of my friends lives in Dhaka.",
          "C": "One of my friend lives in Dhaka.",
          "D": "One of my friends living in Dhaka."
        },
        "correctAnswer": "B",
        "topic": "Subject-Verb Agreement (One of + plural noun + singular verb)",
        "explanation": "\"One of\" is followed by a plural noun (\"my friends\") but takes a singular verb (\"lives\") because the true grammatical subject is the singular pronoun \"One\"."
      },
      {
        "id": 5,
        "question": "The antonym of \u201cTransparent\u201d is:",
        "options": {
          "A": "Clear",
          "B": "Obvious",
          "C": "Opaque",
          "D": "Visible"
        },
        "correctAnswer": "C",
        "topic": "Antonyms & Vocabulary",
        "explanation": "\"Transparent\" means allowing light to pass through so objects behind can be distinctly seen. Its direct antonym is \"Opaque\", which means not letting light through."
      },
      {
        "id": 6,
        "question": "The synonym of \u201cBenevolent\u201d is:",
        "options": {
          "A": "Cruel",
          "B": "Kind",
          "C": "Selfish",
          "D": "Hostile"
        },
        "correctAnswer": "B",
        "topic": "Synonyms & Vocabulary",
        "explanation": "\"Benevolent\" means well-meaning, kindly, and generous. Hence, \"Kind\" is its direct synonym, while \"Cruel\" and \"Hostile\" are its antonyms."
      },
      {
        "id": 7,
        "question": "\u201cA blessing in disguise\u201d means:",
        "options": {
          "A": "An obvious blessing",
          "B": "Something apparently bad that proves beneficial",
          "C": "A religious ceremony",
          "D": "An unexpected punishment"
        },
        "correctAnswer": "B",
        "topic": "Idioms & Phrases",
        "explanation": "\"A blessing in disguise\" is an idiom referring to an apparent misfortune or bad event that eventually has good or favorable results."
      },
      {
        "id": 8,
        "question": "Choose the correctly spelt word.",
        "options": {
          "A": "Conscientious",
          "B": "Consciencious",
          "C": "Conscientous",
          "D": "Conscentious"
        },
        "correctAnswer": "A",
        "topic": "Spelling Verification",
        "explanation": "The correct spelling is \"Conscientious\" (C-O-N-S-C-I-E-N-T-I-O-U-S), meaning wishing to do one's work or duty thoroughly and honestly."
      },
      {
        "id": 9,
        "question": "Passive voice: \u201cWho wrote this letter?\u201d",
        "options": {
          "A": "By whom was this letter written?",
          "B": "By whom this letter was written?",
          "C": "Who was this letter written?",
          "D": "This letter was written by whom?"
        },
        "correctAnswer": "A",
        "topic": "Voice Change (Interrogative Who to By whom)",
        "explanation": "In passive voice, interrogative \"Who\" transforms into \"By whom\", followed by auxiliary \"was\", the subject \"this letter\", and past participle \"written\" with inverted interrogative word order."
      },
      {
        "id": 10,
        "question": "Indirect speech: He said to me, \u201cDo you know the man?\u201d",
        "options": {
          "A": "He asked me if I knew the man.",
          "B": "He asked me that I knew the man.",
          "C": "He told me if I know the man.",
          "D": "He said to me whether I knew the man."
        },
        "correctAnswer": "A",
        "topic": "Indirect Speech (Yes/No Question with if + past simple)",
        "explanation": "For reporting yes/no questions, the reporting verb changes to \"asked\", the conjunction is \"if\" (or \"whether\"), and the simple present (\"Do you know\") backshifts to simple past (\"I knew\")."
      },
      {
        "id": 11,
        "question": "Choose the correct article: ___ Himalayas are the highest mountains in the world.",
        "options": {
          "A": "A",
          "B": "An",
          "C": "The",
          "D": "No article"
        },
        "correctAnswer": "C",
        "topic": "Articles (Mountain ranges take the)",
        "explanation": "Chains or ranges of mountains (like the Himalayas, the Alps, the Rockies) strictly take the definite article \"The\". Note that individual mountain peaks (like Mount Everest) take no article."
      },
      {
        "id": 12,
        "question": "Choose the correct preposition: He died ___ cancer.",
        "options": {
          "A": "from",
          "B": "of",
          "C": "by",
          "D": "with"
        },
        "correctAnswer": "B",
        "topic": "Appropriate Preposition (die of a disease)",
        "explanation": "One \"dies of\" an illness or disease (e.g., cancer, cholera, malaria). One \"dies from\" an external cause (e.g., wound, overwork), and \"dies for\" a noble cause."
      },
      {
        "id": 13,
        "question": "Choose the correct form: The train ___ before we reached the station.",
        "options": {
          "A": "leaves",
          "B": "left",
          "C": "had left",
          "D": "has left"
        },
        "correctAnswer": "C",
        "topic": "Past Perfect Tense (Action prior to another past action with before)",
        "explanation": "When two past actions are connected by \"before\", the earlier completed action takes the Past Perfect tense (\"had left\") and the later action takes the Simple Past tense (\"reached\")."
      },
      {
        "id": 14,
        "question": "Which one is an adjective?",
        "options": {
          "A": "Beauty",
          "B": "Beautiful",
          "C": "Beautifully",
          "D": "Beautify"
        },
        "correctAnswer": "B",
        "topic": "Parts of Speech (Adjective identification)",
        "explanation": "\"Beautiful\" is an adjective describing qualities of a noun. \"Beauty\" is a noun, \"beautifully\" is an adverb, and \"beautify\" is a verb."
      },
      {
        "id": 15,
        "question": "Choose the correct sentence.",
        "options": {
          "A": "Mathematics are an interesting subject.",
          "B": "Mathematics is an interesting subject.",
          "C": "Mathematics have an interesting subject.",
          "D": "Mathematics were interesting subjects."
        },
        "correctAnswer": "B",
        "topic": "Subject-Verb Agreement (Academic subjects ending in -ics are singular)",
        "explanation": "Names of academic fields and disciplines ending in \"-ics\" (mathematics, physics, economics, politics) are singular in meaning and take a singular verb (\"is\")."
      },
      {
        "id": 16,
        "question": "\u201cTo make both ends meet\u201d means:",
        "options": {
          "A": "To become rich",
          "B": "To live within one's income",
          "C": "To waste money",
          "D": "To borrow money"
        },
        "correctAnswer": "B",
        "topic": "Idioms & Phrases",
        "explanation": "\"To make both ends meet\" is an idiom meaning to earn just enough money to live on and pay for basic necessities without going into debt."
      },
      {
        "id": 17,
        "question": "The word \u201cubiquitous\u201d means:",
        "options": {
          "A": "Rare",
          "B": "Present everywhere",
          "C": "Dangerous",
          "D": "Ancient"
        },
        "correctAnswer": "B",
        "topic": "Vocabulary & Word Meaning",
        "explanation": "\"Ubiquitous\" means present, appearing, or found everywhere simultaneously; omnipresent."
      },
      {
        "id": 18,
        "question": "Choose the correct sentence.",
        "options": {
          "A": "I prefer tea than coffee.",
          "B": "I prefer tea to coffee.",
          "C": "I prefer tea from coffee.",
          "D": "I prefer tea over than coffee."
        },
        "correctAnswer": "B",
        "topic": "Appropriate Preposition (prefer takes to)",
        "explanation": "The verb \"prefer\" takes the preposition \"to\" to express a choice between two things (\"prefer tea to coffee\"), never \"than\"."
      },
      {
        "id": 19,
        "question": "Choose the correct form: No sooner had he arrived ___ the rain started.",
        "options": {
          "A": "when",
          "B": "than",
          "C": "then",
          "D": "while"
        },
        "correctAnswer": "B",
        "topic": "Correlative Conjunctions (No sooner...than)",
        "explanation": "\"No sooner\" is a comparative expression and must strictly be paired with \"than\" (not \"when\", which pairs with \"scarcely/hardly\")."
      },
      {
        "id": 20,
        "question": "What is the plural of \u201ccriterion\u201d?",
        "options": {
          "A": "Criterions",
          "B": "Criteria",
          "C": "Criteriones",
          "D": "Criterias"
        },
        "correctAnswer": "B",
        "topic": "Number & Plural Formation (Greek loan words)",
        "explanation": "\"Criterion\" is a Greek-derived noun whose plural form is \"criteria\" (formed by changing the singular suffix \"-on\" to \"-a\")."
      },
      {
        "id": 21,
        "question": "\u201cCall in question\u201d means:",
        "options": {
          "A": "To ask a question",
          "B": "To challenge or dispute",
          "C": "To invite someone",
          "D": "To answer a question"
        },
        "correctAnswer": "B",
        "topic": "Idioms & Phrases",
        "explanation": "\"Call in question\" is an idiom that means to dispute, challenge, or cast doubt upon the validity or truth of something."
      },
      {
        "id": 22,
        "question": "Choose the correct spelling.",
        "options": {
          "A": "Questionnaire",
          "B": "Questionaire",
          "C": "Questionnare",
          "D": "Quastionnaire"
        },
        "correctAnswer": "A",
        "topic": "Spelling Verification",
        "explanation": "The correct spelling is \"Questionnaire\" (Q-U-E-S-T-I-O-N-N-A-I-R-E), containing a double \"n\" and ending in \"-aire\"."
      },
      {
        "id": 23,
        "question": "Choose the correct sentence.",
        "options": {
          "A": "The rich is not always happy.",
          "B": "The rich are not always happy.",
          "C": "The riches are not always happy.",
          "D": "Rich are not always happy."
        },
        "correctAnswer": "B",
        "topic": "Subject-Verb Agreement (The + Adjective as plural collective noun)",
        "explanation": "When the definite article \"The\" precedes an adjective without a following noun (\"the rich\", \"the poor\"), it denotes the entire class of people as a plural collective noun, requiring a plural verb (\"are\")."
      },
      {
        "id": 24,
        "question": "Who is known as the \u201cBard of Avon\u201d?",
        "options": {
          "A": "John Milton",
          "B": "William Shakespeare",
          "C": "William Wordsworth",
          "D": "Samuel Johnson"
        },
        "correctAnswer": "B",
        "topic": "English Literature",
        "explanation": "William Shakespeare is universally known as the \"Bard of Avon\" because he was born and buried in Stratford-upon-Avon, England."
      },
      {
        "id": 25,
        "question": "Which one is an example of a complex sentence?",
        "options": {
          "A": "He came and sat down.",
          "B": "He came to sit down.",
          "C": "When he came, I was reading.",
          "D": "He came; I sat down."
        },
        "correctAnswer": "C",
        "topic": "Clauses & Sentence Structure (Complex Sentence)",
        "explanation": "A complex sentence consists of one principal independent clause (\"I was reading\") and at least one subordinate dependent clause introduced by a subordinating conjunction (\"When he came\")."
      }
    ]
  },
  {
    "id": 3,
    "title": "Model Question 3",
    "subtitle": "English Grammar Competence - Set 3",
    "description": "Thorough assessment covering affection for, third conditional clauses, neither...nor, European article /ju\u02d0/, universal truths in narration, and Romantic poetry.",
    "totalQuestions": 25,
    "questions": [
      {
        "id": 1,
        "question": "Choose the correct preposition: He has great affection ___ his parents.",
        "options": {
          "A": "on",
          "B": "for",
          "C": "with",
          "D": "at"
        },
        "correctAnswer": "B",
        "topic": "Appropriate Preposition (affection for)",
        "explanation": "The noun \"affection\" takes the preposition \"for\" (\"affection for someone\"). Note that the adjective form \"affectionate\" takes the preposition \"to\"."
      },
      {
        "id": 2,
        "question": "Choose the correct form: If he ___ harder, he would have succeeded.",
        "options": {
          "A": "worked",
          "B": "works",
          "C": "had worked",
          "D": "would work"
        },
        "correctAnswer": "C",
        "topic": "Third Conditional (If + past perfect, would have + V3)",
        "explanation": "Third conditional sentences expressing an unfulfilled past condition follow the rule: \"If + past perfect (had worked) ... would have + past participle (would have succeeded)\"."
      },
      {
        "id": 3,
        "question": "Choose the correct sentence.",
        "options": {
          "A": "Neither Rahim nor Karim have done it.",
          "B": "Neither Rahim nor Karim has done it.",
          "C": "Neither Rahim nor Karim are done it.",
          "D": "Neither Rahim nor Karim were done it."
        },
        "correctAnswer": "B",
        "topic": "Subject-Verb Agreement (Neither...nor with two singular subjects)",
        "explanation": "When two singular subjects (\"Rahim\", \"Karim\") are joined by \"neither...nor\", the verb must be singular (\"has done\")."
      },
      {
        "id": 4,
        "question": "The synonym of \u201cMeticulous\u201d is:",
        "options": {
          "A": "Careless",
          "B": "Careful",
          "C": "Negligent",
          "D": "Hasty"
        },
        "correctAnswer": "B",
        "topic": "Synonyms & Vocabulary",
        "explanation": "\"Meticulous\" means showing great attention to detail; very careful and precise. \"Careful\" is its direct synonym, whereas \"Careless\" and \"Negligent\" are its antonyms."
      },
      {
        "id": 5,
        "question": "The antonym of \u201cHostile\u201d is:",
        "options": {
          "A": "Friendly",
          "B": "Angry",
          "C": "Violent",
          "D": "Aggressive"
        },
        "correctAnswer": "A",
        "topic": "Antonyms & Vocabulary",
        "explanation": "\"Hostile\" means showing or feeling opposition, animosity, or unfriendliness. Its direct antonym is \"Friendly\"."
      },
      {
        "id": 6,
        "question": "\u201cTo hit the nail on the head\u201d means:",
        "options": {
          "A": "To hurt someone",
          "B": "To make a mistake",
          "C": "To say exactly the right thing",
          "D": "To work very hard"
        },
        "correctAnswer": "C",
        "topic": "Idioms & Phrases",
        "explanation": "\"To hit the nail on the head\" is an idiom meaning to describe exactly what is causing a situation or problem, or to say precisely the right thing."
      },
      {
        "id": 7,
        "question": "Choose the correct spelling.",
        "options": {
          "A": "Millenium",
          "B": "Millennium",
          "C": "Milennium",
          "D": "Millenniam"
        },
        "correctAnswer": "B",
        "topic": "Spelling Verification",
        "explanation": "The correct spelling is \"Millennium\" (M-I-L-L-E-N-N-I-U-M), having both a double \"l\" and a double \"n\"."
      },
      {
        "id": 8,
        "question": "Choose the correct article: He is ___ European.",
        "options": {
          "A": "a",
          "B": "an",
          "C": "the",
          "D": "no article"
        },
        "correctAnswer": "A",
        "topic": "Articles (European begins with consonant sound /ju\u02d0/)",
        "explanation": "Although \"European\" begins with vowel letters, its phonetic onset is the consonant glide sound /ju\u02d0/ (yu-ro-pe-an). Words starting with /ju\u02d0/ take the article \"a\"."
      },
      {
        "id": 9,
        "question": "Passive voice: \u201cThey laughed at him.\u201d",
        "options": {
          "A": "He was laughed by them.",
          "B": "He was laughed at by them.",
          "C": "He had laughed at them.",
          "D": "He is laughed at them."
        },
        "correctAnswer": "B",
        "topic": "Voice Change (Prepositional verb retains preposition in passive)",
        "explanation": "In group/prepositional verbs like \"laugh at\", the preposition must be retained next to the verb in the passive voice: \"He was laughed at by them\"."
      },
      {
        "id": 10,
        "question": "Indirect speech: The teacher said, \u201cThe earth moves round the sun.\u201d",
        "options": {
          "A": "The teacher said that the earth moved round the sun.",
          "B": "The teacher said that the earth moves round the sun.",
          "C": "The teacher said the earth had moved round the sun.",
          "D": "The teacher told that the earth moves round the sun."
        },
        "correctAnswer": "B",
        "topic": "Indirect Speech (Universal truths do not change tense)",
        "explanation": "Universal scientific truths, geographic realities, and perpetual facts never backshift in reported speech, even when the reporting verb is past (\"said\"). Hence \"moves\" remains \"moves\"."
      },
      {
        "id": 11,
        "question": "Choose the correct word: He is ___ honest man.",
        "options": {
          "A": "a",
          "B": "an",
          "C": "the",
          "D": "no article"
        },
        "correctAnswer": "B",
        "topic": "Articles (Silent h in honest)",
        "explanation": "The initial letter \"h\" in \"honest\" is silent (pronounced with vowel sound /\u0252/), requiring the indefinite article \"an\"."
      },
      {
        "id": 12,
        "question": "Identify the clause: \u201cI know where he lives.\u201d",
        "options": {
          "A": "Adjective clause",
          "B": "Adverb clause",
          "C": "Noun clause",
          "D": "Principal clause"
        },
        "correctAnswer": "C",
        "topic": "Identification of Clause (Noun clause as direct object)",
        "explanation": "The subordinate clause \"where he lives\" acts as the direct object of the transitive verb \"know\" (answering \"What do I know?\"), so it is a Noun Clause."
      },
      {
        "id": 13,
        "question": "Choose the correct form: The committee ___ divided in its opinion.",
        "options": {
          "A": "are",
          "B": "were",
          "C": "is",
          "D": "have"
        },
        "correctAnswer": "C",
        "topic": "Subject-Verb Agreement (Collective noun with singular pronoun its)",
        "explanation": "The singular possessive pronoun \"its\" signals that the collective noun \"committee\" is treated as a unified singular body, requiring the singular verb \"is\"."
      },
      {
        "id": 14,
        "question": "Choose the correct sentence.",
        "options": {
          "A": "He is one of those men who works hard.",
          "B": "He is one of those men who work hard.",
          "C": "He is one of those man who work hard.",
          "D": "He is one of those men who has worked hard."
        },
        "correctAnswer": "B",
        "topic": "Subject-Verb Agreement (one of those + plural noun + who + plural verb)",
        "explanation": "In \"one of those men who...\", the relative pronoun \"who\" refers to the plural antecedent \"men\", requiring a plural verb (\"work\")."
      },
      {
        "id": 15,
        "question": "What is the adjective form of \u201ccourage\u201d?",
        "options": {
          "A": "Courageous",
          "B": "Couragely",
          "C": "Couragement",
          "D": "Courageable"
        },
        "correctAnswer": "A",
        "topic": "Parts of Speech (Adjective formation)",
        "explanation": "The adjective form of the abstract noun \"courage\" is \"Courageous\", meaning possessing or showing bravery."
      },
      {
        "id": 16,
        "question": "\u201cA man of straw\u201d means:",
        "options": {
          "A": "A strong man",
          "B": "A weak or insignificant person",
          "C": "A farmer",
          "D": "An illiterate man"
        },
        "correctAnswer": "B",
        "topic": "Idioms & Phrases",
        "explanation": "\"A man of straw\" is an idiom used to describe a person who is weak, insignificant, or lacking substance and character."
      },
      {
        "id": 17,
        "question": "Choose the correct preposition: He is blind ___ one eye.",
        "options": {
          "A": "by",
          "B": "with",
          "C": "in",
          "D": "at"
        },
        "correctAnswer": "C",
        "topic": "Appropriate Preposition (blind in one eye)",
        "explanation": "Physical sight deficiency in one eye takes \"blind in\" (\"blind in one eye / blind in the left eye\"). Figuratively overlooking faults takes \"blind to\" (\"blind to his son's faults\")."
      },
      {
        "id": 18,
        "question": "Choose the correct sentence.",
        "options": {
          "A": "He has gone to home.",
          "B": "He has gone home.",
          "C": "He has gone at home.",
          "D": "He has gone in home."
        },
        "correctAnswer": "B",
        "topic": "Preposition Omission (home as adverb of direction)",
        "explanation": "When \"home\" is used following motion verbs (go, come, arrive, reach), it functions as an adverb of direction and does not take a preposition (\"gone home\")."
      },
      {
        "id": 19,
        "question": "Choose the correct form: I wish I ___ a bird.",
        "options": {
          "A": "am",
          "B": "was",
          "C": "were",
          "D": "have been"
        },
        "correctAnswer": "C",
        "topic": "Subjunctive Mood (Unreal wish with were)",
        "explanation": "After expressions of hypothetical, unattainable wishes with \"wish\", the past subjunctive \"were\" is used for all persons (\"I wish I were a bird\")."
      },
      {
        "id": 20,
        "question": "The word \u201cephemeral\u201d means:",
        "options": {
          "A": "Permanent",
          "B": "Short-lived",
          "C": "Ancient",
          "D": "Powerful"
        },
        "correctAnswer": "B",
        "topic": "Vocabulary & Word Meaning",
        "explanation": "\"Ephemeral\" means lasting for a very short time, transitory, or fleeting. \"Short-lived\" is its synonym, while \"Permanent\" is its antonym."
      },
      {
        "id": 21,
        "question": "Choose the correct spelling.",
        "options": {
          "A": "Separate",
          "B": "Seperate",
          "C": "Separete",
          "D": "Sepparate"
        },
        "correctAnswer": "A",
        "topic": "Spelling Verification",
        "explanation": "The correct spelling is \"Separate\" (S-E-P-A-R-A-T-E), with an \"a\" following the \"p\" (mnemonic: there is \"a rat\" in separate)."
      },
      {
        "id": 22,
        "question": "\u201cPut up with\u201d means:",
        "options": {
          "A": "Tolerate",
          "B": "Construct",
          "C": "Accommodate",
          "D": "Postpone"
        },
        "correctAnswer": "A",
        "topic": "Phrasal Verbs",
        "explanation": "The phrasal verb \"put up with\" means to endure, tolerate, or bear someone or something unpleasant."
      },
      {
        "id": 23,
        "question": "Which sentence contains a participle?",
        "options": {
          "A": "I like swimming.",
          "B": "The crying child needs attention.",
          "C": "Swimming is good exercise.",
          "D": "To swim is enjoyable."
        },
        "correctAnswer": "B",
        "topic": "Non-finite Verbs (Participial Adjective)",
        "explanation": "In sentence B, \"crying\" is a present participle functioning as an adjective qualifying the noun \"child\". In A and C, \"swimming\" is a gerund; in D, \"to swim\" is an infinitive."
      },
      {
        "id": 24,
        "question": "Who wrote \u201cThe Rime of the Ancient Mariner\u201d?",
        "options": {
          "A": "S. T. Coleridge",
          "B": "John Keats",
          "C": "P. B. Shelley",
          "D": "William Wordsworth"
        },
        "correctAnswer": "A",
        "topic": "English Literature",
        "explanation": "\"The Rime of the Ancient Mariner\" is the famous Romantic poem written by Samuel Taylor Coleridge, published in 1798 in \"Lyrical Ballads\"."
      },
      {
        "id": 25,
        "question": "Choose the correct transformation: \u201cAs soon as he saw the police, he ran away.\u201d",
        "options": {
          "A": "No sooner did he see the police than he ran away.",
          "B": "No sooner had he seen the police when he ran away.",
          "C": "No sooner he saw the police than he ran away.",
          "D": "No sooner did he see the police when he ran away."
        },
        "correctAnswer": "A",
        "topic": "Transformation of Sentences (As soon as into No sooner did...than)",
        "explanation": "\"As soon as\" converts into \"No sooner did + subject + base verb (see) ... than\" or \"No sooner had + subject + V3 (seen) ... than\". Option A correctly pairs with \"than\" and auxiliary inversion."
      }
    ]
  },
  {
    "id": 4,
    "title": "Model Question 4",
    "subtitle": "English Grammar Competence - Set 4",
    "description": "Essential assessment covering uncountable furniture, obsolete synonyms, French leave idiom, addicted to, future perfect tense, and 20th-century poetry.",
    "totalQuestions": 25,
    "questions": [
      {
        "id": 1,
        "question": "Choose the correct sentence.",
        "options": {
          "A": "The furniture in this room are expensive.",
          "B": "The furniture in this room is expensive.",
          "C": "The furnitures in this room are expensive.",
          "D": "The furniture in this room have expensive."
        },
        "correctAnswer": "B",
        "topic": "Countable vs Uncountable Nouns (Furniture is uncountable)",
        "explanation": "\"Furniture\" is an uncountable mass noun that has no plural form (there is no word \"furnitures\") and strictly takes a singular verb (\"is\")."
      },
      {
        "id": 2,
        "question": "Choose the synonym of \u201cObsolete\u201d.",
        "options": {
          "A": "Modern",
          "B": "Outdated",
          "C": "Current",
          "D": "New"
        },
        "correctAnswer": "B",
        "topic": "Synonyms & Vocabulary",
        "explanation": "\"Obsolete\" means no longer produced or used; archaic and out of date. \"Outdated\" is its direct synonym, while \"Modern\" and \"Current\" are antonyms."
      },
      {
        "id": 3,
        "question": "Choose the antonym of \u201cBenevolent\u201d.",
        "options": {
          "A": "Kind",
          "B": "Generous",
          "C": "Malevolent",
          "D": "Helpful"
        },
        "correctAnswer": "C",
        "topic": "Antonyms & Vocabulary",
        "explanation": "\"Benevolent\" (wishing goodwill to others) is the exact opposite of \"Malevolent\" (wishing evil or harm to others)."
      },
      {
        "id": 4,
        "question": "\u201cTo take French leave\u201d means:",
        "options": {
          "A": "To leave without permission",
          "B": "To leave for France",
          "C": "To take a long holiday",
          "D": "To resign from a job"
        },
        "correctAnswer": "A",
        "topic": "Idioms & Phrases",
        "explanation": "The idiom \"to take French leave\" means an unauthorized departure, or leaving work or a social gathering without asking for permission or announcing one's exit."
      },
      {
        "id": 5,
        "question": "Choose the correct spelling.",
        "options": {
          "A": "Indispensible",
          "B": "Indispensable",
          "C": "Indispansable",
          "D": "Indispensabel"
        },
        "correctAnswer": "B",
        "topic": "Spelling Verification",
        "explanation": "The correct spelling is \"Indispensable\" (I-N-D-I-S-P-E-N-S-A-B-L-E), ending in \"-able\", meaning absolutely essential or necessary."
      },
      {
        "id": 6,
        "question": "Choose the correct preposition: He is addicted ___ gambling.",
        "options": {
          "A": "with",
          "B": "at",
          "C": "to",
          "D": "for"
        },
        "correctAnswer": "C",
        "topic": "Appropriate Preposition (addicted to)",
        "explanation": "The adjective \"addicted\" takes the preposition \"to\" (\"addicted to something\"), expressing strong physical or psychological dependence on a habit."
      },
      {
        "id": 7,
        "question": "Choose the correct form: By next year, I ___ this course.",
        "options": {
          "A": "complete",
          "B": "completed",
          "C": "will have completed",
          "D": "have completed"
        },
        "correctAnswer": "C",
        "topic": "Future Perfect Tense (By + future time)",
        "explanation": "The time marker \"By + future point in time\" (\"By next year\") specifies an action that will be completed prior to that future moment, demanding the Future Perfect tense (\"will have completed\")."
      },
      {
        "id": 8,
        "question": "Passive voice: \u201cOpen the door.\u201d",
        "options": {
          "A": "Let the door be opened.",
          "B": "Let the door opened.",
          "C": "The door is opened.",
          "D": "The door was opened."
        },
        "correctAnswer": "A",
        "topic": "Voice Change (Imperative passive with Let)",
        "explanation": "Imperative sentences expressing an order or instruction follow the passive formula: \"Let + object (\"the door\") + be + past participle (\"opened\")\"."
      },
      {
        "id": 9,
        "question": "Indirect speech: He said to me, \u201cPlease help me.\u201d",
        "options": {
          "A": "He requested me to help him.",
          "B": "He told me please help him.",
          "C": "He requested that help me.",
          "D": "He said me to help him."
        },
        "correctAnswer": "A",
        "topic": "Indirect Speech (Imperative Request with requested)",
        "explanation": "The polite word \"Please\" turns the reporting verb into \"requested\", drops \"please\", and changes the imperative verb into a to-infinitive: \"He requested me to help him.\""
      },
      {
        "id": 10,
        "question": "Identify the part of speech: He arrived after the meeting.",
        "options": {
          "A": "Adjective",
          "B": "Adverb",
          "C": "Preposition",
          "D": "Conjunction"
        },
        "correctAnswer": "C",
        "topic": "Parts of Speech (Preposition connecting noun phrase)",
        "explanation": "In this sentence, \"after\" precedes the noun phrase \"the meeting\" to indicate a time relationship, functioning as a preposition. (If followed by a clause with subject and verb, it would be a conjunction)."
      },
      {
        "id": 11,
        "question": "Choose the correct article: He is ___ university student.",
        "options": {
          "A": "an",
          "B": "a",
          "C": "the",
          "D": "no article"
        },
        "correctAnswer": "B",
        "topic": "Articles (Initial consonant sound /ju\u02d0/ in university)",
        "explanation": "Although \"university\" begins with the vowel letter \"u\", its pronunciation begins with the consonant semi-vowel /ju\u02d0/ (yu-ni-ver-si-ty), so it takes the indefinite article \"a\"."
      },
      {
        "id": 12,
        "question": "Choose the correct sentence.",
        "options": {
          "A": "Each of the students have a book.",
          "B": "Each of the students has a book.",
          "C": "Each students has a book.",
          "D": "Each of student have books."
        },
        "correctAnswer": "B",
        "topic": "Subject-Verb Agreement (Each of + plural noun + singular verb)",
        "explanation": "\"Each of\" is followed by a plural noun (\"the students\") but takes a singular verb (\"has\") because \"Each\" considers items or individuals one by one."
      },
      {
        "id": 13,
        "question": "What is the noun form of \u201cdecide\u201d?",
        "options": {
          "A": "Decisive",
          "B": "Decision",
          "C": "Deciding",
          "D": "Decidement"
        },
        "correctAnswer": "B",
        "topic": "Parts of Speech (Noun formation)",
        "explanation": "The noun form derived from the verb \"decide\" is \"Decision\". \"Decisive\" is an adjective, and \"decidement\" is not an English word."
      },
      {
        "id": 14,
        "question": "\u201cTo read between the lines\u201d means:",
        "options": {
          "A": "To read quickly",
          "B": "To understand the hidden meaning",
          "C": "To read loudly",
          "D": "To skip difficult passages"
        },
        "correctAnswer": "B",
        "topic": "Idioms & Phrases",
        "explanation": "\"To read between the lines\" means to discover, infer, or understand a hidden or implied meaning that is not openly or explicitly stated."
      },
      {
        "id": 15,
        "question": "Choose the correct word: He is senior ___ all the other officers.",
        "options": {
          "A": "than",
          "B": "from",
          "C": "to",
          "D": "with"
        },
        "correctAnswer": "C",
        "topic": "Appropriate Preposition (senior takes to)",
        "explanation": "Latin comparatives (senior, junior, superior, inferior) are always accompanied by the preposition \"to\", never \"than\"."
      },
      {
        "id": 16,
        "question": "Choose the correct sentence.",
        "options": {
          "A": "He has been working here since 2015.",
          "B": "He has been working here for 2015.",
          "C": "He is working here since 2015.",
          "D": "He had been working here since 2015."
        },
        "correctAnswer": "A",
        "topic": "Tenses & Prepositions of Time (since + specific point in time)",
        "explanation": "A specific starting point in time (\"2015\") continuing up to the present requires \"since\" paired with the Present Perfect Continuous tense (\"has been working\")."
      },
      {
        "id": 17,
        "question": "The word \u201cgregarious\u201d means:",
        "options": {
          "A": "Sociable",
          "B": "Solitary",
          "C": "Hostile",
          "D": "Silent"
        },
        "correctAnswer": "A",
        "topic": "Vocabulary & Word Meaning",
        "explanation": "\"Gregarious\" describes a person fond of company; sociable, friendly, and outgoing. Its direct antonym is \"Solitary\"."
      },
      {
        "id": 18,
        "question": "Choose the correct spelling.",
        "options": {
          "A": "Entrepreneur",
          "B": "Entreprenuer",
          "C": "Enterpreneur",
          "D": "Entreprneur"
        },
        "correctAnswer": "A",
        "topic": "Spelling Verification",
        "explanation": "The correct spelling is \"Entrepreneur\" (E-N-T-R-E-P-R-E-N-E-U-R), ending in \"-neur\" (borrowed from French)."
      },
      {
        "id": 19,
        "question": "Choose the correct transformation: \u201cHe is too weak to walk.\u201d",
        "options": {
          "A": "He is so weak that he cannot walk.",
          "B": "He is so weak that he can walk.",
          "C": "He is very weak but he cannot walk.",
          "D": "He is weak enough to walk."
        },
        "correctAnswer": "A",
        "topic": "Transformation of Sentences (too...to into so...that + cannot)",
        "explanation": "The simple sentence pattern \"too + adjective + to-infinitive\" transforms into the complex structure: \"so + adjective + that + subject + cannot / could not + base verb\"."
      },
      {
        "id": 20,
        "question": "Which one is an infinitive?",
        "options": {
          "A": "To read",
          "B": "Reading",
          "C": "Read",
          "D": "Readable"
        },
        "correctAnswer": "A",
        "topic": "Non-finite Verbs (Infinitive identification)",
        "explanation": "An infinitive is the basic uninflected form of a verb preceded by the particle \"to\" (\"To read\"). \"Reading\" is a participle or gerund."
      },
      {
        "id": 21,
        "question": "Choose the correct preposition: He congratulated me ___ my success.",
        "options": {
          "A": "for",
          "B": "on",
          "C": "at",
          "D": "with"
        },
        "correctAnswer": "B",
        "topic": "Appropriate Preposition (congratulate on)",
        "explanation": "The verb \"congratulate\" takes the fixed preposition \"on\" (or \"upon\") followed by the occasion or achievement (\"congratulated me on my success\"), never \"for\"."
      },
      {
        "id": 22,
        "question": "Who wrote \u201cThe Waste Land\u201d?",
        "options": {
          "A": "T. S. Eliot",
          "B": "W. B. Yeats",
          "C": "Ezra Pound",
          "D": "W. H. Auden"
        },
        "correctAnswer": "A",
        "topic": "English Literature",
        "explanation": "\"The Waste Land\" is the landmark 1922 modernist poem written by T. S. Eliot, exploring themes of post-war disillusionment and spiritual paralysis."
      },
      {
        "id": 23,
        "question": "Which one is a compound sentence?",
        "options": {
          "A": "He came and sat down.",
          "B": "When he came, I was sleeping.",
          "C": "He came, and I went away.",
          "D": "Coming home, he found me."
        },
        "correctAnswer": "C",
        "topic": "Sentence Structure (Compound Sentence with coordinating conjunction)",
        "explanation": "A compound sentence contains at least two independent clauses joined by a coordinating conjunction. Sentence C consists of two distinct clauses (\"He came\" and \"I went away\") joined by \", and\"."
      },
      {
        "id": 24,
        "question": "Choose the correct form: The police ___ investigating the case.",
        "options": {
          "A": "is",
          "B": "are",
          "C": "was",
          "D": "has"
        },
        "correctAnswer": "B",
        "topic": "Subject-Verb Agreement (Police is a plural collective noun)",
        "explanation": "\"Police\" is a plural noun of multitude in English and strictly takes a plural verb (\"are\")."
      },
      {
        "id": 25,
        "question": "\u201cGive up\u201d means:",
        "options": {
          "A": "Continue",
          "B": "Abandon",
          "C": "Collect",
          "D": "Increase"
        },
        "correctAnswer": "B",
        "topic": "Phrasal Verbs",
        "explanation": "The phrasal verb \"give up\" means to abandon, cease doing, or surrender an effort, habit, or claim."
      }
    ]
  },
  {
    "id": 5,
    "title": "Model Question 5",
    "subtitle": "English Grammar Competence - Set 5",
    "description": "Thorough evaluation covering neither...nor proximity, magnanimous, indifferent to, exclamatory narration with alas, heir silent h, and Jane Austen classics.",
    "totalQuestions": 25,
    "questions": [
      {
        "id": 1,
        "question": "Choose the correct sentence.",
        "options": {
          "A": "Neither he nor his friends was present.",
          "B": "Neither he nor his friends were present.",
          "C": "Neither he or his friends were present.",
          "D": "Neither he nor his friends is present."
        },
        "correctAnswer": "B",
        "topic": "Subject-Verb Agreement (neither...nor proximity rule)",
        "explanation": "When subjects are connected by \"neither...nor\", the verb agrees in person and number with the subject closest to it. \"His friends\" is plural, so the verb must be plural (\"were\")."
      },
      {
        "id": 2,
        "question": "The synonym of \u201cMagnanimous\u201d is:",
        "options": {
          "A": "Generous",
          "B": "Cruel",
          "C": "Selfish",
          "D": "Miserly"
        },
        "correctAnswer": "A",
        "topic": "Synonyms & Vocabulary",
        "explanation": "\"Magnanimous\" means very generous, forgiving, and noble, especially toward a rival or someone less powerful. Hence, \"Generous\" is its synonym."
      },
      {
        "id": 3,
        "question": "The antonym of \u201cDiligent\u201d is:",
        "options": {
          "A": "Industrious",
          "B": "Hardworking",
          "C": "Lazy",
          "D": "Active"
        },
        "correctAnswer": "C",
        "topic": "Antonyms & Vocabulary",
        "explanation": "\"Diligent\" means having or showing care and conscientious effort in one's work; hardworking. Its direct antonym is \"Lazy\"."
      },
      {
        "id": 4,
        "question": "\u201cTo throw cold water on\u201d means:",
        "options": {
          "A": "To encourage",
          "B": "To discourage",
          "C": "To surprise",
          "D": "To congratulate"
        },
        "correctAnswer": "B",
        "topic": "Idioms & Phrases",
        "explanation": "The idiom \"to throw cold water on\" means to discourage someone from doing something, or to dampen enthusiasm for a plan or idea."
      },
      {
        "id": 5,
        "question": "Choose the correctly spelt word.",
        "options": {
          "A": "Exaggerate",
          "B": "Exaggarate",
          "C": "Exagerate",
          "D": "Exaggerete"
        },
        "correctAnswer": "A",
        "topic": "Spelling Verification",
        "explanation": "The correct spelling is \"Exaggerate\" (E-X-A-G-G-E-R-A-T-E), containing a double \"g\" and a single \"r\"."
      },
      {
        "id": 6,
        "question": "Choose the correct preposition: He is indifferent ___ my proposal.",
        "options": {
          "A": "with",
          "B": "at",
          "C": "to",
          "D": "for"
        },
        "correctAnswer": "C",
        "topic": "Appropriate Preposition (indifferent to)",
        "explanation": "The adjective \"indifferent\" takes the preposition \"to\" (\"indifferent to something\"), meaning having no particular interest or concern; unconcerned."
      },
      {
        "id": 7,
        "question": "Choose the correct form: When I reached the station, the train ___.",
        "options": {
          "A": "leaves",
          "B": "has left",
          "C": "had left",
          "D": "lefting"
        },
        "correctAnswer": "C",
        "topic": "Past Perfect Tense (Past action completed before another past event)",
        "explanation": "The departure of the train occurred prior to the speaker reaching the station in the past, demanding the Past Perfect tense (\"had left\")."
      },
      {
        "id": 8,
        "question": "Passive voice: \u201cSomeone has stolen my bag.\u201d",
        "options": {
          "A": "My bag has been stolen.",
          "B": "My bag had stolen.",
          "C": "My bag is stolen by someone.",
          "D": "My bag has stolen."
        },
        "correctAnswer": "A",
        "topic": "Voice Change (Present Perfect Passive: has been + V3)",
        "explanation": "Present perfect active (\"has stolen\") transforms into present perfect passive (\"has been stolen\"). The indefinite agent \"by someone\" is omitted."
      },
      {
        "id": 9,
        "question": "Indirect speech: He said, \u201cAlas! I am undone.\u201d",
        "options": {
          "A": "He exclaimed with sorrow that he was undone.",
          "B": "He said sadly I am undone.",
          "C": "He exclaimed that I was undone.",
          "D": "He told that he had undone."
        },
        "correctAnswer": "A",
        "topic": "Indirect Speech (Exclamation of sorrow with exclaimed with sorrow)",
        "explanation": "\"Alas!\" expresses grief and sorrow, turning the reporting verb into \"exclaimed with sorrow (or grief)\", followed by \"that\", with \"I\" changing to \"he\" and \"am\" changing to \"was\"."
      },
      {
        "id": 10,
        "question": "Identify the underlined word: He came early.",
        "options": {
          "A": "Noun",
          "B": "Adjective",
          "C": "Adverb",
          "D": "Preposition"
        },
        "correctAnswer": "C",
        "topic": "Parts of Speech (Adverb of Time)",
        "explanation": "\"Early\" modifies the finite verb \"came\", indicating the time of arrival, functioning as an adverb of time."
      },
      {
        "id": 11,
        "question": "Choose the correct article: He is ___ heir to a large property.",
        "options": {
          "A": "a",
          "B": "an",
          "C": "the",
          "D": "no article"
        },
        "correctAnswer": "B",
        "topic": "Articles (Silent h in heir)",
        "explanation": "The initial letter \"h\" in \"heir\" is silent (pronounced like \"air\" /e\u0259/), so it begins with a vowel sound and requires the indefinite article \"an\"."
      },
      {
        "id": 12,
        "question": "Choose the correct sentence.",
        "options": {
          "A": "The number of students are increasing.",
          "B": "The number of students is increasing.",
          "C": "A number of students is increasing.",
          "D": "The numbers of student is increasing."
        },
        "correctAnswer": "B",
        "topic": "Subject-Verb Agreement (The number of + singular verb)",
        "explanation": "\"The number of\" designates a single statistical figure and always takes a singular verb (\"is\"). In contrast, \"A number of\" means several and takes a plural verb."
      },
      {
        "id": 13,
        "question": "Choose the noun form of \u201cstrong\u201d.",
        "options": {
          "A": "Strongly",
          "B": "Strength",
          "C": "Strongness",
          "D": "Stronger"
        },
        "correctAnswer": "B",
        "topic": "Parts of Speech (Noun formation)",
        "explanation": "The abstract noun form of the adjective \"strong\" is \"Strength\". \"Strongly\" is an adverb, and \"stronger\" is a comparative adjective."
      },
      {
        "id": 14,
        "question": "\u201cA white elephant\u201d means:",
        "options": {
          "A": "A rare animal",
          "B": "A costly but useless possession",
          "C": "A valuable gift",
          "D": "A sacred animal"
        },
        "correctAnswer": "B",
        "topic": "Idioms & Phrases",
        "explanation": "\"A white elephant\" is an idiom for a possession that is extremely costly to maintain and burdensome, while providing very little utility or profit."
      },
      {
        "id": 15,
        "question": "Choose the correct preposition: He is capable ___ doing the work.",
        "options": {
          "A": "to",
          "B": "for",
          "C": "of",
          "D": "with"
        },
        "correctAnswer": "C",
        "topic": "Appropriate Preposition (capable of + gerund)",
        "explanation": "The adjective \"capable\" takes the preposition \"of\" followed by a noun or gerund (\"capable of doing\"). Note that \"able\" takes a to-infinitive (\"able to do\")."
      },
      {
        "id": 16,
        "question": "Choose the correct sentence.",
        "options": {
          "A": "I look forward to meet you.",
          "B": "I look forward to meeting you.",
          "C": "I look forward meeting you.",
          "D": "I look forward for meeting you."
        },
        "correctAnswer": "B",
        "topic": "Phrasal Verbs with Preposition (look forward to + gerund)",
        "explanation": "In \"look forward to\", the word \"to\" is a preposition, not an infinitive marker. Prepositions must be followed by a noun or gerund (\"meeting\")."
      },
      {
        "id": 17,
        "question": "The word \u201cpragmatic\u201d means:",
        "options": {
          "A": "Practical",
          "B": "Theoretical",
          "C": "Emotional",
          "D": "Impractical"
        },
        "correctAnswer": "A",
        "topic": "Vocabulary & Word Meaning",
        "explanation": "\"Pragmatic\" means dealing with matters sensibly and realistically in a way that is based on practical rather than theoretical considerations."
      },
      {
        "id": 18,
        "question": "Choose the correct spelling.",
        "options": {
          "A": "Maintenance",
          "B": "Maintainance",
          "C": "Maintanence",
          "D": "Maintenence"
        },
        "correctAnswer": "A",
        "topic": "Spelling Verification",
        "explanation": "The correct spelling is \"Maintenance\" (M-A-I-N-T-E-N-A-N-C-E), having \"-ten-\" in the middle rather than \"-tain-\"."
      },
      {
        "id": 19,
        "question": "Choose the correct transformation: \u201cEverybody loves flowers.\u201d",
        "options": {
          "A": "Flowers are loved by everybody.",
          "B": "Flowers were loved by everybody.",
          "C": "Flowers have loved everybody.",
          "D": "Flowers love everybody."
        },
        "correctAnswer": "A",
        "topic": "Voice Change (Simple Present Passive)",
        "explanation": "Simple present active (\"loves\") changes to simple present passive: Plural subject (\"Flowers\") + \"are\" + past participle (\"loved\") + by agent (\"by everybody\")."
      },
      {
        "id": 20,
        "question": "Identify the clause: \u201cThose who work hard succeed.\u201d",
        "options": {
          "A": "Noun clause",
          "B": "Adverb clause",
          "C": "Adjective/Relative clause",
          "D": "Independent clause"
        },
        "correctAnswer": "C",
        "topic": "Identification of Clause (Adjective Clause modifying pronoun Those)",
        "explanation": "The subordinate clause \"who work hard\" qualifies and defines the demonstrative pronoun \"Those\", functioning as an Adjective (Relative) Clause."
      },
      {
        "id": 21,
        "question": "Choose the correct preposition: He is responsible ___ the project.",
        "options": {
          "A": "of",
          "B": "for",
          "C": "to",
          "D": "at"
        },
        "correctAnswer": "B",
        "topic": "Appropriate Preposition (responsible for)",
        "explanation": "One is \"responsible for\" a task, duty, action, or outcome (\"responsible for the project\"). One is \"responsible to\" an authority or superior."
      },
      {
        "id": 22,
        "question": "Who wrote \u201cPride and Prejudice\u201d?",
        "options": {
          "A": "Jane Austen",
          "B": "Charlotte Bront\u00eb",
          "C": "Emily Bront\u00eb",
          "D": "George Eliot"
        },
        "correctAnswer": "A",
        "topic": "English Literature",
        "explanation": "\"Pride and Prejudice\" is the classic romantic novel written by English author Jane Austen, first published in 1813."
      },
      {
        "id": 23,
        "question": "Which sentence is complex?",
        "options": {
          "A": "Work hard or you will fail.",
          "B": "He worked hard and succeeded.",
          "C": "Although he is poor, he is honest.",
          "D": "He worked hard; he succeeded."
        },
        "correctAnswer": "C",
        "topic": "Sentence Structure (Complex Sentence with although)",
        "explanation": "Sentence C contains an independent principal clause (\"he is honest\") and a subordinate dependent clause introduced by the subordinating conjunction \"Although\" (\"Although he is poor\"), making it a complex sentence."
      },
      {
        "id": 24,
        "question": "Choose the correct form: Ten miles ___ a long distance to walk.",
        "options": {
          "A": "are",
          "B": "were",
          "C": "is",
          "D": "have"
        },
        "correctAnswer": "C",
        "topic": "Subject-Verb Agreement (Measurement of distance as single unit)",
        "explanation": "Expressions of distance, measurement, time, or monetary sums (\"Ten miles\") are regarded as a single unified amount and take a singular verb (\"is\")."
      },
      {
        "id": 25,
        "question": "\u201cIn lieu of\u201d means:",
        "options": {
          "A": "In addition to",
          "B": "Instead of",
          "C": "In spite of",
          "D": "Because of"
        },
        "correctAnswer": "B",
        "topic": "Prepositional Phrases",
        "explanation": "The phrase \"in lieu of\" (from Old French \"lieu\" meaning place) means in place of, or instead of."
      }
    ]
  }
];

const rawModelQuestionSets: ModelQuestionSet[] = [
  ...sets1to5,
  ...modelQuestionSets6and7,
  ...modelQuestionSets8to10,
  ...modelQuestionSets11to15,
  ...modelQuestionSets16to20,
  ...modelQuestionSets21to25,
  ...modelQuestionSets26to30,
  ...modelQuestionSets31to35,
  ...modelQuestionSets36to40,
  ...modelQuestionSets41to45
];

export const modelQuestionSets: ModelQuestionSet[] = enrichAllModelQuestionSets(rawModelQuestionSets);
