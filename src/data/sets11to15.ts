import { ModelQuestionSet } from '../types';

export const modelQuestionSets11to15: ModelQuestionSet[] = [
  {
    id: 11,
    title: 'Model Question 11',
    subtitle: 'Competitive Grammar MCQ - Set 11',
    description: 'Abstract nouns, European article exception, distributive neither of, conditional would accept, voice & speech.',
    totalQuestions: 25,
    questions: [
      {
        id: 1,
        question: 'The word “honesty” is a/an—',
        options: {
          A: 'Adjective',
          B: 'Abstract noun',
          C: 'Common noun',
          D: 'Adverb'
        },
        correctAnswer: 'B',
        topic: 'Classification of Nouns (Abstract Noun)',
        explanation: '“Honesty” (সততা) কোনো গুণ বা অবস্থার নাম যা ইন্দ্রিয় দ্বারা স্পর্শ বা দেখা যায় না; এটি গুণবাচক বিশেষ্য বা Abstract Noun। এটি Adjective “honest” থেকে গঠিত হয়েছে।'
      },
      {
        id: 2,
        question: 'He is ___ European.',
        options: {
          A: 'a',
          B: 'an',
          C: 'the',
          D: 'no article'
        },
        correctAnswer: 'A',
        topic: 'Articles (Vowel letter sounding like consonant /juː/)',
        explanation: 'শব্দটি Vowel ‘E’ দিয়ে শুরু হলেও এর উচ্চারণ কনসোনেন্ট গ্লাইড ‘ইউ’ (/juː/ - You) এর মতো হওয়ায় এর পূর্বে ‘an’ না বসে ‘a’ বসে। সুতরাং "He is a European" সঠিক।'
      },
      {
        id: 3,
        question: 'Neither of the boys ___ present.',
        options: {
          A: 'are',
          B: 'were',
          C: 'is',
          D: 'have'
        },
        correctAnswer: 'C',
        topic: 'Subject-Verb Agreement (Distributive Pronoun "Neither of")',
        explanation: '“Neither of + plural noun” থাকলে grammatically মূল subject হলো “Neither”, যা সর্বদাই singular। তাই এর সাথে singular verb “is” ব্যবহৃত হয়।'
      },
      {
        id: 4,
        question: 'I have known him ___ 2018.',
        options: {
          A: 'for',
          B: 'since',
          C: 'from',
          D: 'by'
        },
        correctAnswer: 'B',
        topic: 'Prepositions of Time (Point of Time with Since in Present Perfect)',
        explanation: 'নির্দিষ্ট সূচনাকাল বা Point of Time (যেমন: 2018) নির্দেশ করতে Present Perfect Tense-এ “since” ব্যবহৃত হয়। সময়সীমা বা Period of Time নির্দেশ করলে “for” হতো।'
      },
      {
        id: 5,
        question: 'If I were you, I ___ the offer.',
        options: {
          A: 'accept',
          B: 'accepted',
          C: 'would accept',
          D: 'will accept'
        },
        correctAnswer: 'C',
        topic: 'Second Conditional (Subjunctive "If I were..., I would + V1")',
        explanation: 'কাল্পনিক বা অবাস্তব Second Conditional বাক্যে If-clause এ Past Subjunctive “were” থাকলে main clause এ “would + base form of verb” (would accept) ব্যবহৃত হয়।'
      },
      {
        id: 6,
        question: 'He ___ to school every day.',
        options: {
          A: 'go',
          B: 'goes',
          C: 'is go',
          D: 'going'
        },
        correctAnswer: 'B',
        topic: 'Present Simple Tense (Habitual Action & Third Person Singular)',
        explanation: '“Every day” অভ্যাসগত কাজ (Habitual Fact) নির্দেশ করায় বাক্যটি Present Simple Tense হবে। Subject “He” 3rd person singular হওয়ায় মূল verb “go” এর সাথে “-es” যুক্ত হয়ে “goes” হয়।'
      },
      {
        id: 7,
        question: 'The passive form of “They built the bridge” is—',
        options: {
          A: 'The bridge built by them.',
          B: 'The bridge was built by them.',
          C: 'The bridge is built by them.',
          D: 'The bridge had built by them.'
        },
        correctAnswer: 'B',
        topic: 'Voice Change (Past Indefinite Passive: was/were + V3)',
        explanation: 'Active বাক্যটি Past Indefinite Tense-এ আছে। Passive-এ Object “The bridge” Subject হয়, এরপর auxiliary verb “was” এবং মূল verb-এর Past Participle “built” + “by them” বসে।'
      },
      {
        id: 8,
        question: 'He said, “I am busy.” The indirect form is—',
        options: {
          A: 'He said that I am busy.',
          B: 'He said that he was busy.',
          C: 'He said that he is busy.',
          D: 'He said he had busy.'
        },
        correctAnswer: 'B',
        topic: 'Direct to Indirect Narration (Simple Present to Simple Past)',
        explanation: 'Reporting verb “said” (past tense) হওয়ায় Reported Speech-এর 1st person pronoun “I” পরিবর্তিত হয়ে “he” হবে এবং Present Simple “am” পরিবর্তিত হয়ে Past Simple “was” হবে।'
      },
      {
        id: 9,
        question: 'Which is an adjective?',
        options: {
          A: 'Beautiful',
          B: 'Beauty',
          C: 'Beautifully',
          D: 'Beautify'
        },
        correctAnswer: 'A',
        topic: 'Parts of Speech / Suffix Analysis (-ful suffix indicates Adjective)',
        explanation: '“Beautiful” হলো Adjective (সুন্দর)। “Beauty” হলো Noun (সৌন্দর্য), “Beautifully” হলো Adverb (সুন্দরভাবে), এবং “Beautify” হলো Verb (সৌন্দর্যমণ্ডিত করা)।'
      },
      {
        id: 10,
        question: 'He speaks English ___.',
        options: {
          A: 'fluent',
          B: 'fluently',
          C: 'fluency',
          D: 'more fluent'
        },
        correctAnswer: 'B',
        topic: 'Adverb of Manner (Modifying the action verb "speaks")',
        explanation: 'Verb “speaks” এর ধরন প্রকাশ করতে Adverb of Manner প্রয়োজন। “Fluent” এর Adverb রূপ হলো “fluently” (স্বতঃস্ফূর্তভাবে)।'
      },
      {
        id: 11,
        question: 'I look forward to ___ from you.',
        options: {
          A: 'hear',
          B: 'hearing',
          C: 'heard',
          D: 'have heard'
        },
        correctAnswer: 'B',
        topic: 'Phrasal Verb followed by Gerund ("look forward to + V-ing")',
        explanation: '“Look forward to”, “with a view to”, “be used to” ইত্যাদি prepositional phrase-এর পরের “to” হলো Preposition, তাই এর পরে Verb-এর সাথে “-ing” যুক্ত হয়ে Gerund (“hearing”) হয়।'
      },
      {
        id: 12,
        question: 'The plural of “criterion” is—',
        options: {
          A: 'criterions',
          B: 'criteria',
          C: 'criteriones',
          D: 'criterias'
        },
        correctAnswer: 'B',
        topic: 'Irregular Foreign Plural Nouns (Greek -on to -a)',
        explanation: '“Criterion” গ্রিক ভাষার শব্দ। গ্রিক নিয়মে শব্দের শেষে “-on” থাকলে বহুবচনে তা পরিবর্তিত হয়ে “-a” হয় (যেমন: criterion -> criteria, phenomenon -> phenomena)।'
      },
      {
        id: 13,
        question: '“Alas!” is a/an—',
        options: {
          A: 'Adverb',
          B: 'Interjection',
          C: 'Conjunction',
          D: 'Preposition'
        },
        correctAnswer: 'B',
        topic: 'Parts of Speech (Interjection expressing sorrow/grief)',
        explanation: '“Alas!” মনের আকস্মিক দুঃখ বা শোকের অনুভূতি প্রকাশকারী একটি বিস্ময়সূচক অব্যয় বা Interjection।'
      },
      {
        id: 14,
        question: 'The man ___ came here yesterday is my uncle.',
        options: {
          A: 'which',
          B: 'whom',
          C: 'who',
          D: 'whose'
        },
        correctAnswer: 'C',
        topic: 'Relative Pronouns (Subjective case "who" for persons)',
        explanation: 'Antecedent “The man” একজন ব্যক্তি এবং relative clause-এর verb “came” এর Subjective case প্রয়োজন, তাই Relative Pronoun হিসেবে “who” বসবে।'
      },
      {
        id: 15,
        question: 'It is high time we ___ home.',
        options: {
          A: 'go',
          B: 'went',
          C: 'have gone',
          D: 'will go'
        },
        correctAnswer: 'B',
        topic: 'Special Expressions ("It is high time + subject + past indefinite V2")',
        explanation: '“It is high time / It is time” এর পর Subject থাকলে পরবর্তী verb-টি Past Indefinite (V2) হয়, যা কোনো কাজ করার এখনই মোক্ষম বা উপযুক্ত সময় অতিক্রম হতে চলেছে নির্দেশ করে। তাই “went” সঠিক।'
      },
      {
        id: 16,
        question: 'He is senior ___ me.',
        options: {
          A: 'than',
          B: 'from',
          C: 'to',
          D: 'with'
        },
        correctAnswer: 'C',
        topic: 'Latin Comparatives taking preposition "to" (senior, junior, superior, inferior)',
        explanation: 'Latin Comparative Adjective যেমন: senior, junior, superior, inferior, prior ইত্যাদির পর তুলনার্থে “than” না বসে preposition “to” বসে।'
      },
      {
        id: 17,
        question: 'Which sentence is correct?',
        options: {
          A: 'Each of the students have a book.',
          B: 'Each of the students has a book.',
          C: 'Each students has a book.',
          D: 'Each student have a book.'
        },
        correctAnswer: 'B',
        topic: 'Subject-Verb Agreement (Each of + plural noun + singular verb)',
        explanation: '“Each of the students” এর ক্ষেত্রে head word হলো distributive pronoun “Each”, যা singular। তাই verb-টিও singular “has” হবে। Option B সম্পূর্ণ নির্ভুল।'
      },
      {
        id: 18,
        question: '“To err is human.” Here “to err” is a/an—',
        options: {
          A: 'Gerund',
          B: 'Infinitive',
          C: 'Participle',
          D: 'Finite verb'
        },
        correctAnswer: 'B',
        topic: 'Non-finite Verbs (Infinitive: to + base verb as subject)',
        explanation: '“To + verb এর base form” (to err) যখন বাক্যের Subject হিসেবে কাজ করে তখন তাকে Infinitive বলা হয়।'
      },
      {
        id: 19,
        question: 'The word “running” in “The running water is cold” is a—',
        options: {
          A: 'Gerund',
          B: 'Present participle',
          C: 'Infinitive',
          D: 'Finite verb'
        },
        correctAnswer: 'B',
        topic: 'Non-finite Verbs (Present Participle functioning as Adjective)',
        explanation: '“The running water”-এ “running” শব্দটি Noun “water” এর পূর্বে বসে তার অবস্থা নির্দেশকারী Adjective হিসেবে কাজ করছে। Verb + ing যখন Adjective-এর কাজ করে, তখন তা Present Participle।'
      },
      {
        id: 20,
        question: 'He prevented me ___ going there.',
        options: {
          A: 'to',
          B: 'from',
          C: 'for',
          D: 'with'
        },
        correctAnswer: 'B',
        topic: 'Appropriate Prepositions (prevent someone from doing something)',
        explanation: '“Prevent” verb-টির পর কাউকে কোনো কাজ করা থেকে বিরত রাখার অর্থে উপযুক্ত Preposition হিসেবে “from” বসে এবং এরপর gerund (going) ব্যবহৃত হয়।'
      },
      {
        id: 21,
        question: 'No sooner had he arrived ___ the rain started.',
        options: {
          A: 'when',
          B: 'than',
          C: 'then',
          D: 'and'
        },
        correctAnswer: 'B',
        topic: 'Correlative Conjunctions (No sooner had... than)',
        explanation: '“No sooner had... than” একটি বাধ্যতামূলক Correlative Conjunction জোড়। অপরপক্ষে “Hardly/Scarcely had...” থাকলে “when/before” বসে।'
      },
      {
        id: 22,
        question: 'Choose the correct sentence.',
        options: {
          A: 'He is one of those men who works hard.',
          B: 'He is one of those men who work hard.',
          C: 'He is one of those man who work hard.',
          D: 'He is one of those men who working hard.'
        },
        correctAnswer: 'B',
        topic: 'Relative Clause Antecedent Agreement ("one of those + plural noun + who + plural verb")',
        explanation: '“One of those + plural noun (men) + who” কাঠামোতে Relative Pronoun “who” তার পূর্বপদ Plural Antecedent “men” কে নির্দেশ করে, তাই relative clause-এর verb-টিও Plural (“work”) হবে।'
      },
      {
        id: 23,
        question: 'The comparative form of “little” meaning amount is—',
        options: {
          A: 'lesser',
          B: 'less',
          C: 'least',
          D: 'littler'
        },
        correctAnswer: 'B',
        topic: 'Degrees of Comparison (Irregular: little -> less -> least)',
        explanation: 'পরিমাণবাচক Adjective “little” এর Comparative রূপ হলো “less” এবং Superlative রূপ হলো “least”।'
      },
      {
        id: 24,
        question: 'You have finished the work, ___?',
        options: {
          A: 'haven\'t you',
          B: 'have you',
          C: 'don\'t you',
          D: 'didn\'t you'
        },
        correctAnswer: 'A',
        topic: 'Tag Questions (Affirmative statement with auxiliary "have" takes negative tag)',
        explanation: 'মূল বক্তব্যটি Present Perfect Tense-এ Affirmative এবং এতে auxiliary verb রয়েছে “have”। ফলে Question Tag হবে Negative: “haven\'t you?”।'
      },
      {
        id: 25,
        question: '“In spite of his poverty, he is honest.” The underlined phrase is a—',
        options: {
          A: 'Noun phrase',
          B: 'Adjective phrase',
          C: 'Prepositional phrase',
          D: 'Adverb clause'
        },
        correctAnswer: 'C',
        topic: 'Phrase Identification (Prepositional Phrase beginning with "In spite of")',
        explanation: '“In spite of his poverty” অংশটি Compound Preposition “In spite of” দ্বারা শুরু হয়ে তার Noun Object “poverty” দ্বারা সমাপ্ত হয়েছে। এটি একটি Prepositional Phrase যা বাক্যে Adverbial হিসেবে কাজ করে।'
      }
    ]
  },
  {
    id: 12,
    title: 'Model Question 12',
    subtitle: 'Competitive Grammar MCQ - Set 12',
    description: 'Subject-verb with -ics nouns, future perfect, imperative passive, causative make, and degree of comparison.',
    totalQuestions: 25,
    questions: [
      {
        id: 1,
        question: 'Which word is a pronoun?',
        options: {
          A: 'Quickly',
          B: 'They',
          C: 'Honest',
          D: 'Honesty'
        },
        correctAnswer: 'B',
        topic: 'Parts of Speech (Personal Pronoun)',
        explanation: '“They” হলো 3rd Person Plural Personal Pronoun। “Quickly” হলো Adverb, “Honest” হলো Adjective এবং “Honesty” হলো Noun।'
      },
      {
        id: 2,
        question: 'He is ___ best player in the team.',
        options: {
          A: 'a',
          B: 'an',
          C: 'the',
          D: 'no article'
        },
        correctAnswer: 'C',
        topic: 'Articles with Superlative Adjectives ("the + superlative")',
        explanation: 'Superlative Degree (“best”) এর পূর্বে নির্দিষ্টতা প্রকাশে Definite Article “the” বসে।'
      },
      {
        id: 3,
        question: 'Mathematics ___ my favourite subject.',
        options: {
          A: 'are',
          B: 'were',
          C: 'is',
          D: 'have'
        },
        correctAnswer: 'C',
        topic: 'Subject-Verb Agreement (Subjects ending in -ics are singular in meaning)',
        explanation: 'অধ্যায় বা বিষয়ের নাম যেমন Mathematics, Physics, Economics ইত্যাদি দেখতে Plural হলেও অর্থে Singular, তাই এরা Singular Verb “is” গ্রহণ করে।'
      },
      {
        id: 4,
        question: 'She has been studying ___ three hours.',
        options: {
          A: 'since',
          B: 'for',
          C: 'from',
          D: 'by'
        },
        correctAnswer: 'B',
        topic: 'Prepositions of Time (For + Period of duration in continuous tenses)',
        explanation: '“Three hours” হলো সময়ের ব্যাপ্তি বা Period of Time, তাই এর পূর্বে “for” বসবে। নির্দিষ্ট শুরুর সময় হলে “since” বসতো।'
      },
      {
        id: 5,
        question: 'I wish I ___ a bird.',
        options: {
          A: 'am',
          B: 'were',
          C: 'have been',
          D: 'will be'
        },
        correctAnswer: 'B',
        topic: 'Subjunctive Mood / Unreal Wish ("I wish + subject + were")',
        explanation: '“I wish” দ্বারা কোনো অসম্ভব বা কাল্পনিক ইচ্ছা প্রকাশে Subject যাই হোক না কেন Subjunctive Past Verb হিসেবে “were” বসে।'
      },
      {
        id: 6,
        question: 'By next year, he ___ his degree.',
        options: {
          A: 'completes',
          B: 'completed',
          C: 'will have completed',
          D: 'has completed'
        },
        correctAnswer: 'C',
        topic: 'Future Perfect Tense ("By + future time indicator")',
        explanation: 'ভবিষ্যতের কোনো নির্দিষ্ট সময়ের মধ্যে কোনো কাজ সম্পন্ন হয়ে থাকবে বুঝালে Future Perfect Tense (will have + V3) ব্যবহৃত হয়। তাই “will have completed” সঠিক।'
      },
      {
        id: 7,
        question: '“Open the door.” The passive form is—',
        options: {
          A: 'Let the door be opened.',
          B: 'Let the door opened.',
          C: 'The door is opened.',
          D: 'The door has opened.'
        },
        correctAnswer: 'A',
        topic: 'Imperative Sentence Passive Voice (Let + Object + be + V3)',
        explanation: 'Object-যুক্ত Imperative বাক্যের Passive Voice গঠন: Let + Object (the door) + be + Past Participle (opened)।'
      },
      {
        id: 8,
        question: 'She said, “Do you know him?” The indirect speech is—',
        options: {
          A: 'She asked if I knew him.',
          B: 'She said if I know him.',
          C: 'She asked that I know him.',
          D: 'She told if I knew him.'
        },
        correctAnswer: 'A',
        topic: 'Indirect Speech (Yes/No Interrogative with asked + if + past assertive order)',
        explanation: 'Yes/No প্রশ্নবোধক বাক্যে reporting verb “said” পরিবর্তিত হয়ে “asked” হয়, লিঙ্কার হিসেবে “if” বসে এবং reported speech assertive-এ রূপান্তরিত হয়ে past indefinite (“I knew him”) হয়।'
      },
      {
        id: 9,
        question: 'Which is an adverb?',
        options: {
          A: 'Slow',
          B: 'Slowly',
          C: 'Slowness',
          D: 'Slower'
        },
        correctAnswer: 'B',
        topic: 'Parts of Speech (Formation of Adverbs from Adjectives: -ly)',
        explanation: 'Adjective “slow” এর সাথে “-ly” প্রত্যয় যুক্ত হয়ে Adverb of manner “slowly” (ধীরে ধীরে) গঠিত হয়।'
      },
      {
        id: 10,
        question: 'He arrived ___ than I expected.',
        options: {
          A: 'lately',
          B: 'later',
          C: 'latest',
          D: 'late'
        },
        correctAnswer: 'B',
        topic: 'Degrees of Comparison (Comparative form "later" with "than")',
        explanation: 'বাক্যে তুলনামূলক শব্দ “than” থাকায় সময়ের ক্ষেত্রে “late” এর Comparative রূপ “later” ব্যবহৃত হবে।'
      },
      {
        id: 11,
        question: 'I am accustomed to ___ early.',
        options: {
          A: 'rise',
          B: 'rising',
          C: 'rose',
          D: 'have risen'
        },
        correctAnswer: 'B',
        topic: 'Prepositional Phrases followed by Gerund ("accustomed to + V-ing")',
        explanation: '“Accustomed to” (অভ্যস্ত) ফ্রেজটির “to” হলো একটি Preposition, যার পরে Verb-এর সাথে “-ing” যুক্ত হয়ে Gerund (“rising”) হয়।'
      },
      {
        id: 12,
        question: 'The feminine form of “nephew” is—',
        options: {
          A: 'niece',
          B: 'daughter',
          C: 'aunt',
          D: 'sister'
        },
        correctAnswer: 'A',
        topic: 'Gender of Nouns (Masculine & Feminine Pairs)',
        explanation: '“Nephew” (ভাইপো বা ভাগ্নে) এর বিপরীত লিঙ্গ বা Feminine Gender হলো “niece” (ভাইঝি বা ভাগ্নি)।'
      },
      {
        id: 13,
        question: 'The plural of “phenomenon” is—',
        options: {
          A: 'phenomenons',
          B: 'phenomena',
          C: 'phenomenas',
          D: 'phenomenon'
        },
        correctAnswer: 'B',
        topic: 'Foreign Plural Nouns (Greek loanword -on to -a)',
        explanation: 'গ্রিক শব্দ “phenomenon” (প্রাকৃতিক বা লক্ষণীয় ঘটনা) এর বহুবচন হলো “phenomena”।'
      },
      {
        id: 14,
        question: 'He divided the money ___ the two brothers.',
        options: {
          A: 'among',
          B: 'between',
          C: 'into',
          D: 'with'
        },
        correctAnswer: 'B',
        topic: 'Prepositions (Between for two persons vs. Among for more than two)',
        explanation: 'দুজনের মধ্যে কোনো কিছু ভাগ করে দেওয়া বুঝালে “between” বসে, আর দুইয়ের অধিক ব্যক্তির মধ্যে হলে “among” বসে। এখানে “the two brothers” থাকায় “between” সঠিক।'
      },
      {
        id: 15,
        question: 'Either Rahim or Karim ___ responsible.',
        options: {
          A: 'are',
          B: 'were',
          C: 'is',
          D: 'have'
        },
        correctAnswer: 'C',
        topic: 'Subject-Verb Agreement (Either... or connecting two singular subjects)',
        explanation: '“Either... or” দ্বারা দুটি Singular Subject (“Rahim”, “Karim”) যুক্ত হলে verb-টিও Singular (“is”) হয়।'
      },
      {
        id: 16,
        question: 'The synonym of “abandon” is—',
        options: {
          A: 'retain',
          B: 'forsake',
          C: 'obtain',
          D: 'protect'
        },
        correctAnswer: 'B',
        topic: 'Vocabulary / Synonyms (abandon = forsake / give up)',
        explanation: '“Abandon” শব্দের অর্থ পরিত্যাগ করা বা ছেড়ে যাওয়া। এর সঠিক সমার্থক শব্দ হলো “forsake” (পরিত্যাগ করা)।'
      },
      {
        id: 17,
        question: 'The antonym of “scarce” is—',
        options: {
          A: 'rare',
          B: 'insufficient',
          C: 'abundant',
          D: 'deficient'
        },
        correctAnswer: 'C',
        topic: 'Vocabulary / Antonyms (scarce = rare/in short supply; antonym = abundant)',
        explanation: '“Scarce” অর্থ দুর্লভ বা অপ্রতুল। এর বিপরীতার্থক বা Antonym হলো “abundant” (প্রচুর বা পর্যাপ্ত)।'
      },
      {
        id: 18,
        question: 'He made me ___ the letter.',
        options: {
          A: 'to write',
          B: 'writing',
          C: 'write',
          D: 'wrote'
        },
        correctAnswer: 'C',
        topic: 'Causative Verbs (make + object + bare infinitive)',
        explanation: 'Causative verb “make” এর পর Object থাকলে এর পরে কোনো ‘to’ ছাড়াই Verb-এর Base Form (Bare Infinitive) বসে। তাই “write” সঠিক।'
      },
      {
        id: 19,
        question: 'Having ___ the work, he went home.',
        options: {
          A: 'finish',
          B: 'finished',
          C: 'finishing',
          D: 'finishes'
        },
        correctAnswer: 'B',
        topic: 'Perfect Participle (Having + Past Participle V3)',
        explanation: 'একটি কাজ সম্পন্ন হওয়ার পর আরেকটি কাজ শুরু হওয়া বুঝাতে Perfect Participle ব্যবহৃত হয়, যার গঠন: Having + Past Participle (finished)।'
      },
      {
        id: 20,
        question: 'He is too weak ___ walk.',
        options: {
          A: 'that',
          B: 'for',
          C: 'to',
          D: 'so'
        },
        correctAnswer: 'C',
        topic: 'Sentence Structures (too + adjective + to-infinitive)',
        explanation: '“Too + adjective + to + V1” একটি নেতিবাচক ফলাফল নির্দেশক কাঠামো (সে এত দুর্বল যে হাঁটতে পারে না)। তাই ফাঁকা স্থানে “to” বসবে।'
      },
      {
        id: 21,
        question: 'Hardly had I reached the station ___ the train left.',
        options: {
          A: 'than',
          B: 'when',
          C: 'then',
          D: 'and'
        },
        correctAnswer: 'B',
        topic: 'Correlative Conjunctions (Hardly had... when)',
        explanation: '“Hardly had...” বা “Scarcely had...” এর সাথে অপর অংশে লিঙ্কার হিসেবে “when” (বা before) বসে।'
      },
      {
        id: 22,
        question: 'Choose the correct sentence.',
        options: {
          A: 'He as well as his friends are guilty.',
          B: 'He as well as his friends is guilty.',
          C: 'He as well as his friends were guilty.',
          D: 'He as well as his friends have guilty.'
        },
        correctAnswer: 'B',
        topic: 'Subject-Verb Agreement (Subjects joined by "as well as" agree with the first subject)',
        explanation: 'দুটি Subject যদি “as well as”, “along with”, “together with” দ্বারা যুক্ত হয়, তবে Verb প্রথম Subject (“He”) অনুযায়ী নির্ধারিত হয়। যেহেতু “He” singular, তাই verb হবে “is”।'
      },
      {
        id: 23,
        question: '“The boy who is honest is respected.” The clause “who is honest” is—',
        options: {
          A: 'Adverb clause',
          B: 'Noun clause',
          C: 'Adjective clause',
          D: 'Principal clause'
        },
        correctAnswer: 'C',
        topic: 'Clause Identification (Adjective / Relative Clause qualifying a noun)',
        explanation: '“Who is honest” ক্লজটি তার পূর্ববর্তী Noun “The boy” কে বিশেষায়িত বা modify করছে, তাই এটি একটি Adjective Clause।'
      },
      {
        id: 24,
        question: 'Let us go out, ___?',
        options: {
          A: 'shall we',
          B: 'will we',
          C: 'do we',
          D: 'don\'t we'
        },
        correctAnswer: 'A',
        topic: 'Tag Questions (Imperative proposals with "Let us / Let\'s" take "shall we")',
        explanation: '“Let us” বা “Let\'s” দিয়ে প্রস্তাব বা আহ্বানমূলক বাক্য শুরু হলে তার Question Tag হিসেবে সর্বদা “shall we?” বসে।'
      },
      {
        id: 25,
        question: '“He runs faster than I do.” This is a—',
        options: {
          A: 'Positive degree',
          B: 'Comparative degree',
          C: 'Superlative degree',
          D: 'Absolute degree'
        },
        correctAnswer: 'B',
        topic: 'Degrees of Comparison (Comparative Adverb with "than")',
        explanation: 'বাক্যে তুলনামূলক রূপ “faster” এবং তুলনামূলক কনজাংশন “than” ব্যবহৃত হয়েছে, যা পরিষ্কারভাবে Comparative Degree নির্দেশ করে।'
      }
    ]
  },
  {
    id: 13,
    title: 'Model Question 13',
    subtitle: 'Competitive Grammar MCQ - Set 13',
    description: 'The rich as plural, distance as singular, subjunctive with would rather, clause identification, and accommodation spelling.',
    totalQuestions: 25,
    questions: [
      {
        id: 1,
        question: '“The rich” means—',
        options: {
          A: 'Rich man',
          B: 'Rich people',
          C: 'Richness',
          D: 'A rich person'
        },
        correctAnswer: 'B',
        topic: 'Nominal Adjectives ("The + adjective" represents a plural collective class)',
        explanation: 'Adjective-এর পূর্বে “The” বসলে তা সমগ্র শ্রেণীকে নির্দেশ করে Plural Common Noun-এ পরিণত হয়। তাই “The rich” এর অর্থ “ধনী ব্যক্তিরা” বা “Rich people”।'
      },
      {
        id: 2,
        question: 'He bought ___ umbrella yesterday.',
        options: {
          A: 'a',
          B: 'an',
          C: 'the',
          D: 'no article'
        },
        correctAnswer: 'B',
        topic: 'Articles (Vowel sound /ʌ/ takes "an")',
        explanation: '“Umbrella” শব্দটি স্বরধ্বনি বা Vowel Sound /ʌ/ দিয়ে উচ্চারিত হওয়ায় এর পূর্বে Indefinite Article হিসেবে “an” বসে।'
      },
      {
        id: 3,
        question: 'Ten miles ___ a long distance.',
        options: {
          A: 'are',
          B: 'were',
          C: 'is',
          D: 'have'
        },
        correctAnswer: 'C',
        topic: 'Subject-Verb Agreement (Plural measurement of distance acting as a single unit)',
        explanation: 'দূরত্ব, সময় বা ওজনের পরিমাণ দেখতে Plural হলেও যখন তা একটি অবিভাজ্য একক বা একক দূরত্ব প্রকাশ করে, তখন Verb Singular (“is”) হয়।'
      },
      {
        id: 4,
        question: 'He is good ___ mathematics.',
        options: {
          A: 'in',
          B: 'at',
          C: 'on',
          D: 'for'
        },
        correctAnswer: 'B',
        topic: 'Appropriate Prepositions ("good at" = skilled/proficient)',
        explanation: 'কোনো বিষয় বা দক্ষতায় পারদর্শী বুঝাতে Appropriate Preposition হিসেবে “good at” ব্যবহৃত হয় (যেমন: good at mathematics)।'
      },
      {
        id: 5,
        question: 'Unless you work hard, you ___ fail.',
        options: {
          A: 'would',
          B: 'will',
          C: 'should',
          D: 'might have'
        },
        correctAnswer: 'B',
        topic: 'First Conditional with "Unless" (Unless + Present Simple, will + V1)',
        explanation: '“Unless” (যদি না) যুক্ত First Conditional বাক্যে শর্তাধীন অংশটি Present Indefinite হলে ফলাফলের অংশটি Future Indefinite (will + V1: will fail) হয়।'
      },
      {
        id: 6,
        question: 'When I reached home, my father ___.',
        options: {
          A: 'sleeps',
          B: 'slept',
          C: 'was sleeping',
          D: 'has slept'
        },
        correctAnswer: 'C',
        topic: 'Sequence of Tenses (Interrupted Past Action: Past Continuous with Simple Past)',
        explanation: 'অতীতে একটি কাজ চলাকালে অন্য একটি কাজ ঘটলে চলমান কাজটি Past Continuous (was sleeping) এবং সংঘটিত কাজটি Past Simple (reached) হয়।'
      },
      {
        id: 7,
        question: 'The passive of “Who wrote this poem?” is—',
        options: {
          A: 'By whom was this poem written?',
          B: 'Who was this poem written?',
          C: 'By whom this poem wrote?',
          D: 'This poem was wrote by whom?'
        },
        correctAnswer: 'A',
        topic: 'Voice Change (Interrogative "Who" becomes "By whom + aux + sub + V3")',
        explanation: 'Past Indefinite Interrogative বাক্যে “Who” এর স্থলে “By whom” বসে, তারপর auxiliary verb “was”, তারপর subject “this poem” এবং verb এর V3 “written” বসে।'
      },
      {
        id: 8,
        question: 'He said, “I have finished the work.”',
        options: {
          A: 'He said that he had finished the work.',
          B: 'He said that he has finished the work.',
          C: 'He said that I had finished the work.',
          D: 'He told he finished the work.'
        },
        correctAnswer: 'A',
        topic: 'Indirect Speech (Present Perfect transforms to Past Perfect)',
        explanation: 'Past reporting verb “said” থাকায় Present Perfect “have finished” রূপান্তরিত হয়ে Past Perfect “had finished” হবে এবং “I” পরিবর্তিত হয়ে “he” হবে।'
      },
      {
        id: 9,
        question: '“Wisdom” is a/an—',
        options: {
          A: 'Concrete noun',
          B: 'Abstract noun',
          C: 'Material noun',
          D: 'Proper noun'
        },
        correctAnswer: 'B',
        topic: 'Classification of Nouns (Abstract Noun derived from "wise")',
        explanation: '“Wisdom” (প্রজ্ঞা/জ্ঞান) কোনো গুণ বা মানসিক ধারণার নাম যা স্পর্শ বা দেখা যায় না; এটি গুণবাচক বা Abstract Noun।'
      },
      {
        id: 10,
        question: 'Which sentence contains a conjunction?',
        options: {
          A: 'He runs quickly.',
          B: 'He is poor but honest.',
          C: 'He is an honest man.',
          D: 'He went there yesterday.'
        },
        correctAnswer: 'B',
        topic: 'Parts of Speech (Coordinating Conjunction "but")',
        explanation: 'বাক্য B-তে “but” হলো একটি Adversative Coordinating Conjunction, যা “poor” ও “honest” দুটি বিপরীত ভাবসম্পন্ন শব্দকে সংযুক্ত করেছে।'
      },
      {
        id: 11,
        question: 'He is accustomed ___ hard work.',
        options: {
          A: 'with',
          B: 'to',
          C: 'for',
          D: 'by'
        },
        correctAnswer: 'B',
        topic: 'Appropriate Prepositions (accustomed to)',
        explanation: 'কোনো কিছুতে অভ্যস্ত বুঝাতে “accustomed” এর পর সর্বদা Preposition হিসেবে “to” বসে।'
      },
      {
        id: 12,
        question: 'I would rather ___ than beg.',
        options: {
          A: 'die',
          B: 'to die',
          C: 'dying',
          D: 'died'
        },
        correctAnswer: 'A',
        topic: 'Modal Idioms ("would rather + bare infinitive")',
        explanation: '“Would rather” এর পর কোনো ‘to’ ছাড়া Verb-এর Base Form (Bare Infinitive) বসে। তাই “die” সঠিক (আমি বরং মারা যাব তবুও ভিক্ষা করব না)।'
      },
      {
        id: 13,
        question: 'The man ___ car was stolen went to the police.',
        options: {
          A: 'who',
          B: 'whom',
          C: 'whose',
          D: 'which'
        },
        correctAnswer: 'C',
        topic: 'Relative Pronouns (Possessive Relative Pronoun "whose + noun")',
        explanation: 'এখানে ব্যক্তির মালিকানা (লোকটির গাড়ি) প্রকাশ করায় Possessive Relative Pronoun হিসেবে “whose” বসবে।'
      },
      {
        id: 14,
        question: 'He denied ___ the money.',
        options: {
          A: 'steal',
          B: 'to steal',
          C: 'stealing',
          D: 'stolen'
        },
        correctAnswer: 'C',
        topic: 'Verbs followed by Gerund (deny + V-ing)',
        explanation: '“Deny” verb-টির পর Direct Object হিসেবে Infinitive না বসে Gerund (stealing) ব্যবহৃত হয়।'
      },
      {
        id: 15,
        question: '“Being tired, he went to bed.” “Being tired” is—',
        options: {
          A: 'Gerund phrase',
          B: 'Participial phrase',
          C: 'Infinitive phrase',
          D: 'Noun clause'
        },
        correctAnswer: 'B',
        topic: 'Non-finite Phrases (Participial Phrase modifying subject)',
        explanation: '“Being tired” অংশটি Present Participle “Being” দ্বারা শুরু হয়ে বাক্যের Subject “he”-এর অবস্থা বর্ণনা করছে, তাই এটি একটি Participial Phrase।'
      },
      {
        id: 16,
        question: 'Each boy and each girl ___ given a prize.',
        options: {
          A: 'were',
          B: 'are',
          C: 'was',
          D: 'have'
        },
        correctAnswer: 'C',
        topic: 'Subject-Verb Agreement (Singular distributive "Each... and each...")',
        explanation: '“And” দ্বারা যুক্ত দুটি Singular Noun-এর পূর্বে যদি “each” বা “every” থাকে, তবে Verb-টি সর্বদাই Singular হয়। Passive-এ তাই “was” সঠিক।'
      },
      {
        id: 17,
        question: 'She has lived here ___ 2010.',
        options: {
          A: 'for',
          B: 'since',
          C: 'from',
          D: 'during'
        },
        correctAnswer: 'B',
        topic: 'Prepositions with Perfect Tenses (Point of time with since)',
        explanation: '2010 একটি নির্দিষ্ট সূচনা সাল (Point of time) হওয়ায় Present Perfect Tense-এ “since” বসবে।'
      },
      {
        id: 18,
        question: 'Which is correctly spelt?',
        options: {
          A: 'Accomodation',
          B: 'Accommodation',
          C: 'Acommodation',
          D: 'Accommadation'
        },
        correctAnswer: 'B',
        topic: 'Spelling Rules (Double \'c\' and double \'m\' in Accommodation)',
        explanation: '“Accommodation” শব্দে দুটি ‘c’ এবং দুটি ‘m’ রয়েছে (A-C-C-O-M-M-O-D-A-T-I-O-N)। এটি বিভিন্ন প্রতিযোগিতামূলক পরীক্ষায় বহুল জিজ্ঞাসিত।'
      },
      {
        id: 19,
        question: 'He succeeded ___ his efforts.',
        options: {
          A: 'because',
          B: 'despite',
          C: 'through',
          D: 'although'
        },
        correctAnswer: 'C',
        topic: 'Preposition of Means / Instrument ("through" = by means of)',
        explanation: '“Through his efforts” অর্থ হলো তার প্রচেষ্টার মাধ্যমে বা বদৌলতে। “Because” ও “although” হলো Conjunction যা পুরো ক্লজ দাবি করে।'
      },
      {
        id: 20,
        question: '“Unless” means—',
        options: {
          A: 'if',
          B: 'if not',
          C: 'because',
          D: 'although'
        },
        correctAnswer: 'B',
        topic: 'Conjunctions / Semantic Meaning ("Unless" = "If not")',
        explanation: '“Unless” একটি নেতিবাচক শর্তবোধক Conjunction যার আক্ষরিক অর্থ “If not” (যদি না)।'
      },
      {
        id: 21,
        question: 'If he had worked hard, he ___ passed.',
        options: {
          A: 'would',
          B: 'will have',
          C: 'would have',
          D: 'had'
        },
        correctAnswer: 'C',
        topic: 'Third Conditional (If + Past Perfect -> would have + V3)',
        explanation: 'Third Conditional-এ If-clause এ Past Perfect (had worked) থাকলে অপর অংশে “would have + V3” (would have passed) বসে।'
      },
      {
        id: 22,
        question: 'The opposite of “hostile” is—',
        options: {
          A: 'friendly',
          B: 'harmful',
          C: 'cruel',
          D: 'angry'
        },
        correctAnswer: 'A',
        topic: 'Vocabulary / Antonyms (hostile = antagonistic/unfriendly; antonym = friendly)',
        explanation: '“Hostile” শব্দের অর্থ শত্রুভাবাপন্ন বা বিরোধী। এর সরাসরি বিপরীতার্থক বা Antonym হলো “friendly” (বন্ধুত্বপূর্ণ/সদয়)।'
      },
      {
        id: 23,
        question: 'Choose the correct sentence.',
        options: {
          A: 'One should do his duty.',
          B: 'One should do one\'s duty.',
          C: 'One should do their duty.',
          D: 'One should does one\'s duty.'
        },
        correctAnswer: 'B',
        topic: 'Pronoun Consistency (Indefinite pronoun "one" requires possessive "one\'s")',
        explanation: 'Indefinite Pronoun হিসেবে “One” Subject হিসেবে বসলে তার Possessive রূপ সর্বদা “one\'s” হবে, কখনো “his” বা “their” হবে না।'
      },
      {
        id: 24,
        question: '“What he said is true.” The clause “What he said” is—',
        options: {
          A: 'Adjective clause',
          B: 'Adverb clause',
          C: 'Noun clause',
          D: 'Coordinate clause'
        },
        correctAnswer: 'C',
        topic: 'Clause Identification (Noun Clause acting as Subject of the verb "is")',
        explanation: '“What he said” অংশটি মূল verb “is” এর Subject হিসেবে কাজ করছে। কোনো ক্লজ যদি Subject-এর কাজ করে, তবে তা একটি Noun Clause।'
      },
      {
        id: 25,
        question: 'You needn\'t go, ___?',
        options: {
          A: 'need you',
          B: 'needn\'t you',
          C: 'do you',
          D: 'don\'t you'
        },
        correctAnswer: 'A',
        topic: 'Tag Questions (Modal "needn\'t" takes affirmative tag "need you")',
        explanation: 'মূল বাক্যে “needn\'t” একটি Negative Modal Auxiliary হিসেবে ব্যবহৃত হয়েছে। তাই Question Tag হবে Affirmative: “need you?”।'
      }
    ]
  },
  {
    id: 14,
    title: 'Model Question 14',
    subtitle: 'Competitive Grammar MCQ - Set 14',
    description: 'Cattle subject-verb agreement, inverted conditionals, collective nouns, verbs of perception, and privilege spelling.',
    totalQuestions: 25,
    questions: [
      {
        id: 1,
        question: 'The word “childhood” is a/an—',
        options: {
          A: 'Proper noun',
          B: 'Abstract noun',
          C: 'Material noun',
          D: 'Collective noun'
        },
        correctAnswer: 'B',
        topic: 'Classification of Nouns (Abstract Noun representing a state of life)',
        explanation: '“Childhood” (শৈশব) কোনো স্পর্শযোগ্য বস্তু নয়, বরং জীবনের একটি অবস্থার নাম। “-hood” প্রত্যয়যুক্ত অধিকাংশ শব্দই Abstract Noun।'
      },
      {
        id: 2,
        question: 'He is ___ honest officer.',
        options: {
          A: 'a',
          B: 'an',
          C: 'the',
          D: 'no article'
        },
        correctAnswer: 'B',
        topic: 'Articles (Silent "H" with initial vowel sound /ɒ/ takes "an")',
        explanation: '“Honest” শব্দের ‘H’ অনুচ্চারিত (silent) থাকে এবং এর উচ্চারণ স্বরধ্বনি /ɒ/ (অ) দিয়ে শুরু হওয়ায় পূর্বে “an” বসে।'
      },
      {
        id: 3,
        question: 'The cattle ___ grazing in the field.',
        options: {
          A: 'is',
          B: 'was',
          C: 'are',
          D: 'has'
        },
        correctAnswer: 'C',
        topic: 'Subject-Verb Agreement (Plural Nouns without -s: cattle, poultry, people)',
        explanation: '“Cattle” (গবাদিপশু) দেখতে Singular মনে হলেও এটি সর্বদা Plural Common Noun, তাই এর সাথে Plural Verb “are” বসবে।'
      },
      {
        id: 4,
        question: 'She is afraid ___ snakes.',
        options: {
          A: 'from',
          B: 'of',
          C: 'with',
          D: 'by'
        },
        correctAnswer: 'B',
        topic: 'Appropriate Prepositions (afraid of something)',
        explanation: 'কোনো কিছুতে ভীত বুঝাতে Adjective “afraid” এর পর Appropriate Preposition হিসেবে “of” বসে।'
      },
      {
        id: 5,
        question: 'Had I known it, I ___ you.',
        options: {
          A: 'tell',
          B: 'told',
          C: 'would tell',
          D: 'would have told'
        },
        correctAnswer: 'D',
        topic: 'Conditional Inversion (Had + Subject + V3 = Third Conditional -> would have + V3)',
        explanation: '“Had I known it” মূলত “If I had known it” এর ইনভার্শন বা Third Conditional রূপ। তাই অপর অংশে “would have + V3” (would have told) বসবে।'
      },
      {
        id: 6,
        question: 'He ___ here since morning.',
        options: {
          A: 'works',
          B: 'worked',
          C: 'has been working',
          D: 'is working'
        },
        correctAnswer: 'C',
        topic: 'Present Perfect Continuous Tense (Action continuing since morning)',
        explanation: 'সকাল থেকে কাজটি শুরু হয়ে এখনও চলছে বুঝাতে “since morning” এর সাথে Present Perfect Continuous Tense (“has been working”) ব্যবহৃত হয়।'
      },
      {
        id: 7,
        question: 'The passive of “People speak English all over the world” is—',
        options: {
          A: 'English is spoken all over the world.',
          B: 'English was spoken all over the world.',
          C: 'English has spoken all over the world.',
          D: 'English speaks all over the world.'
        },
        correctAnswer: 'A',
        topic: 'Voice Change (Present Indefinite Passive: is + V3, agent omitted)',
        explanation: 'Present Indefinite Tense-এ Object “English” singular হওয়ায় “is spoken” হয়। সাধারণ বা অনির্দিষ্ট কর্তা “by people” প্যাসিভ বাক্যে স্বাভাবিকভাবেই উহ্য রাখা হয়।'
      },
      {
        id: 8,
        question: 'He said, “I will go tomorrow.”',
        options: {
          A: 'He said that he would go the next day.',
          B: 'He said that he will go tomorrow.',
          C: 'He said he would go tomorrow.',
          D: 'He told that he will go next day.'
        },
        correctAnswer: 'A',
        topic: 'Indirect Speech (will -> would, tomorrow -> the next day)',
        explanation: 'Reporting verb past tense হওয়ায় “will” পরিবর্তিত হয়ে “would” হয় এবং সময়সূচক শব্দ “tomorrow” পরিবর্তিত হয়ে “the next day” হয়।'
      },
      {
        id: 9,
        question: 'Which is a collective noun?',
        options: {
          A: 'Team',
          B: 'Honesty',
          C: 'Gold',
          D: 'Childhood'
        },
        correctAnswer: 'A',
        topic: 'Classification of Nouns (Collective Noun denoting a group)',
        explanation: '“Team” (দল) একজাতীয় কতগুলো ব্যক্তি বা খেলোয়াড়ের সমষ্টিকে বুঝায়, তাই এটি Collective Noun।'
      },
      {
        id: 10,
        question: '“Very” is generally a/an—',
        options: {
          A: 'Adjective',
          B: 'Adverb',
          C: 'Pronoun',
          D: 'Conjunction'
        },
        correctAnswer: 'B',
        topic: 'Parts of Speech (Adverb of Degree)',
        explanation: '“Very” মূলত Adverb of Degree, যা Adjective (যেমন: very good) বা অন্য কোনো Adverb (যেমন: very fast) এর তীব্রতা নির্দেশ করে।'
      },
      {
        id: 11,
        question: 'He insisted ___ going there.',
        options: {
          A: 'to',
          B: 'on',
          C: 'for',
          D: 'at'
        },
        correctAnswer: 'B',
        topic: 'Appropriate Prepositions (insist on + gerund)',
        explanation: '“Insist” (জেদ বা পীড়াপীড়ি করা) verb-টির পর সর্বদা Preposition হিসেবে “on” বসে এবং এরপর Gerund (“going”) হয়।'
      },
      {
        id: 12,
        question: 'I saw him ___ across the road.',
        options: {
          A: 'cross',
          B: 'crossed',
          C: 'crosses',
          D: 'to crossed'
        },
        correctAnswer: 'A',
        topic: 'Verbs of Perception (see + object + bare infinitive / present participle)',
        explanation: 'অনুভূতিসূচক ক্রিয়া (verbs of perception: see, watch, hear) এর পর Object থাকলে সম্পূর্ণ কাজটি বোঝাতে Bare Infinitive (“cross”) বসে।'
      },
      {
        id: 13,
        question: '“Swimming is good exercise.” Here “Swimming” is a—',
        options: {
          A: 'Present participle',
          B: 'Gerund',
          C: 'Adjective',
          D: 'Finite verb'
        },
        correctAnswer: 'B',
        topic: 'Non-finite Verbs (Gerund acting as subject noun)',
        explanation: 'Verb + ing যখন বাক্যে Noun এর ন্যায় Subject হিসেবে কাজ করে (সাঁতার একটি ভালো ব্যায়াম), তখন তাকে Gerund বলা হয়।'
      },
      {
        id: 14,
        question: 'He has ___ his promise.',
        options: {
          A: 'broke',
          B: 'break',
          C: 'broken',
          D: 'breaking'
        },
        correctAnswer: 'C',
        topic: 'Right Form of Verbs (has/have/had + Past Participle V3)',
        explanation: 'Present Perfect Tense-এ auxiliary verb “has” এর পর মূল verb-এর Past Participle রূপ “broken” ব্যবহৃত হয়।'
      },
      {
        id: 15,
        question: 'Neither he nor his brothers ___ guilty.',
        options: {
          A: 'is',
          B: 'was',
          C: 'are',
          D: 'has'
        },
        correctAnswer: 'C',
        topic: 'Subject-Verb Agreement (Neither... nor proximity rule with plural close subject)',
        explanation: '“Neither... nor” দ্বারা যুক্ত বাক্যে Verb তার নিকটতম Subject অনুসারে নির্ধারিত হয়। এখানে নিকটতম Subject “his brothers” plural হওয়ায় verb হবে “are”।'
      },
      {
        id: 16,
        question: 'He is superior ___ his colleagues.',
        options: {
          A: 'than',
          B: 'from',
          C: 'to',
          D: 'with'
        },
        correctAnswer: 'C',
        topic: 'Latin Comparatives (superior, inferior, senior, junior take "to")',
        explanation: 'Latin Comparative Adjective “superior” (উচ্চতর/শ্রেষ্ঠ) এর পর তুলনার্থে সর্বদা “to” বসে।'
      },
      {
        id: 17,
        question: '“Despite being ill, he attended the meeting.” The word “despite” is a—',
        options: {
          A: 'Conjunction',
          B: 'Preposition',
          C: 'Adverb',
          D: 'Adjective'
        },
        correctAnswer: 'B',
        topic: 'Parts of Speech (Preposition of Concession taking a noun/gerund phrase)',
        explanation: '“Despite” (সত্ত্বেও) একটি Preposition, যার পর Noun Phrase বা Gerund Phrase (“being ill”) বসে। যদি পুরো ক্লজ বসত তবে Conjunction “Although” হতো।'
      },
      {
        id: 18,
        question: 'Choose the correct spelling.',
        options: {
          A: 'Priviledge',
          B: 'Privilege',
          C: 'Privelege',
          D: 'Privillage'
        },
        correctAnswer: 'B',
        topic: 'Spelling Rules (P-R-I-V-I-L-E-G-E)',
        explanation: 'সঠিক বানান হলো “Privilege” (সুবিধা/অধিকার)। এতে কোনো ‘d’ বর্ণ নেই এবং ‘v’ এর পর ‘i’ বসে।'
      },
      {
        id: 19,
        question: 'He speaks as if he ___ everything.',
        options: {
          A: 'knows',
          B: 'knew',
          C: 'has known',
          D: 'will know'
        },
        correctAnswer: 'B',
        topic: 'Subjunctive after "as if / as though" (Present + as if + Past Subjunctive)',
        explanation: 'প্রথম অংশ Present Indefinite হলে “as if / as though” (যেন) এর পরবর্তী অংশটি Past Indefinite / Past Subjunctive (“knew”) হয়।'
      },
      {
        id: 20,
        question: 'The superlative form of “bad” is—',
        options: {
          A: 'badder',
          B: 'worse',
          C: 'worst',
          D: 'baddest'
        },
        correctAnswer: 'C',
        topic: 'Degrees of Comparison (Irregular: bad -> worse -> worst)',
        explanation: '“Bad” (Positive) এর Comparative রূপ হলো “worse” এবং Superlative রূপ হলো “worst”।'
      },
      {
        id: 21,
        question: '“He is too proud to beg.” The sentence can be transformed into—',
        options: {
          A: 'He is so proud that he cannot beg.',
          B: 'He is very proud and begs.',
          C: 'He is proud enough to beg.',
          D: 'He is not proud to beg.'
        },
        correctAnswer: 'A',
        topic: 'Transformation of Sentences (Simple too... to -> Complex so... that cannot)',
        explanation: '“Too... to” যুক্ত Simple Sentence-কে Complex করতে “too” এর স্থানে “so” এবং “to” এর স্থানে “that + subject + cannot” বসে।'
      },
      {
        id: 22,
        question: 'Choose the correct sentence.',
        options: {
          A: 'The news are true.',
          B: 'The news is true.',
          C: 'The news have true.',
          D: 'The news were true always.'
        },
        correctAnswer: 'B',
        topic: 'Subject-Verb Agreement (Uncountable noun "news" is singular)',
        explanation: '“News” শব্দটি দেখতে Plural মনে হলেও এটি একটি Uncountable Singular Noun, তাই এর সাথে Singular Verb “is” বসে।'
      },
      {
        id: 23,
        question: 'The man came here ___ purpose.',
        options: {
          A: 'in',
          B: 'on',
          C: 'with',
          D: 'by'
        },
        correctAnswer: 'B',
        topic: 'Idiomatic Prepositional Phrases ("on purpose" = deliberately)',
        explanation: 'ইচ্ছাকৃতভাবে বা উদ্দেশ্যপ্রণোদিতভাবে বুঝাতে সুনির্দিষ্ট Prepositional Phrase হলো “on purpose”।'
      },
      {
        id: 24,
        question: 'Scarcely had he entered ___ the bell rang.',
        options: {
          A: 'than',
          B: 'when',
          C: 'then',
          D: 'and'
        },
        correctAnswer: 'B',
        topic: 'Correlative Conjunctions (Scarcely had... when)',
        explanation: '“Scarcely had...” এবং “Hardly had...” এর পরের ক্লজের পূর্বে “when” (বা before) বসে।'
      },
      {
        id: 25,
        question: '“Unless you obey me” is a/an—',
        options: {
          A: 'Noun clause',
          B: 'Adjective clause',
          C: 'Adverb clause',
          D: 'Principal clause'
        },
        correctAnswer: 'C',
        topic: 'Clause Identification (Adverb Clause of Condition)',
        explanation: '“Unless you obey me” ক্লজটি শর্ত নির্দেশ করছে এবং Subordinating Conjunction “unless” দ্বারা শুরু হয়েছে, তাই এটি একটি Adverb Clause of Condition।'
      }
    ]
  },
  {
    id: 15,
    title: 'Model Question 15',
    subtitle: 'Competitive Grammar MCQ - Set 15',
    description: 'Musical instrument articles, zero conditional, Wh- indirect speech, eleventh hour idiom, and separate spelling.',
    totalQuestions: 25,
    questions: [
      {
        id: 1,
        question: '“The jury” is a—',
        options: {
          A: 'Abstract noun',
          B: 'Collective noun',
          C: 'Material noun',
          D: 'Proper noun'
        },
        correctAnswer: 'B',
        topic: 'Classification of Nouns (Collective Noun)',
        explanation: '“Jury” (বিচারকমণ্ডলী) একদল বিচারকের সমষ্টিকে নির্দেশ করায় এটি একটি Collective Noun।'
      },
      {
        id: 2,
        question: 'He plays ___ violin very well.',
        options: {
          A: 'a',
          B: 'an',
          C: 'the',
          D: 'no article'
        },
        correctAnswer: 'C',
        topic: 'Articles (Definite article "the" with musical instruments when played)',
        explanation: 'বাদ্যযন্ত্র বাজানোর ক্ষেত্রে বাদ্যযন্ত্রের নামের পূর্বে Definite Article “the” ব্যবহৃত হয় (plays the violin)।'
      },
      {
        id: 3,
        question: 'A pair of shoes ___ under the bed.',
        options: {
          A: 'are',
          B: 'were',
          C: 'is',
          D: 'have'
        },
        correctAnswer: 'C',
        topic: 'Subject-Verb Agreement ("A pair of" takes singular verb)',
        explanation: '“Shoes” শব্দটি Plural হলেও বাক্যের মূল Subject হলো “A pair” (এক জোড়া - Singular), তাই Verb Singular “is” হবে।'
      },
      {
        id: 4,
        question: 'He is addicted ___ gambling.',
        options: {
          A: 'with',
          B: 'to',
          C: 'for',
          D: 'at'
        },
        correctAnswer: 'B',
        topic: 'Appropriate Prepositions (addicted to = habituated to bad habits)',
        explanation: 'খারাপ কাজে আসক্তি বুঝাতে “addicted” এর পর উপযুক্ত Preposition হিসেবে “to” বসে।'
      },
      {
        id: 5,
        question: 'If you heat ice, it ___.',
        options: {
          A: 'melted',
          B: 'melts',
          C: 'will melt',
          D: 'would melt'
        },
        correctAnswer: 'B',
        topic: 'Zero Conditional (Scientific Fact / Universal Truth: If + Present, Present)',
        explanation: 'চিরন্তন বৈজ্ঞানিক সত্য (Scientific Truth) প্রকাশে Zero Conditional ব্যবহৃত হয়, যেখানে উভয় ক্লজই Present Simple (it melts) হয়।'
      },
      {
        id: 6,
        question: 'She ___ before I arrived.',
        options: {
          A: 'leaves',
          B: 'left',
          C: 'had left',
          D: 'has left'
        },
        correctAnswer: 'C',
        topic: 'Past Perfect Tense with "before" (Past Perfect + before + Simple Past)',
        explanation: 'অতীতে দুটি কাজের মধ্যে যে কাজটি পূর্বে সংঘটিত হয়েছিল তা Past Perfect (had left) এবং পরবর্তী কাজটি Simple Past (arrived) হয়।'
      },
      {
        id: 7,
        question: '“Someone has stolen my bag.” Passive:',
        options: {
          A: 'My bag has been stolen.',
          B: 'My bag had stolen.',
          C: 'My bag is stolen.',
          D: 'My bag was stealing.'
        },
        correctAnswer: 'A',
        topic: 'Voice Change (Present Perfect Passive: has been + V3, agent omitted)',
        explanation: 'Present Perfect-এর Passive Voice-এ “has been stolen” বসে। অনির্দিষ্ট কর্তা “by someone” প্যাসিভ বাক্যে সাধারণত বাদ পড়ে।'
      },
      {
        id: 8,
        question: 'He said to me, “Where do you live?”',
        options: {
          A: 'He asked me where I lived.',
          B: 'He asked me where did I live.',
          C: 'He said where I lived.',
          D: 'He told me where do I live.'
        },
        correctAnswer: 'A',
        topic: 'Indirect Speech (Wh- Question changes to assertive past order)',
        explanation: 'Wh- Interrogative বাক্যের Indirect রূপান্তর: “said to” পরিবর্তিত হয়ে “asked” হয়, Wh-word (where) ঠিক থাকে এবং ক্লজটি Assertive হয়ে Past Simple (“I lived”) হয়।'
      },
      {
        id: 9,
        question: '“Bravery” is a/an—',
        options: {
          A: 'Abstract noun',
          B: 'Material noun',
          C: 'Proper noun',
          D: 'Collective noun'
        },
        correctAnswer: 'A',
        topic: 'Classification of Nouns (Abstract Noun derived from "brave")',
        explanation: '“Bravery” (বীরত্ব/সাহসিকতা) একটি গুণের নাম যা দেখা বা স্পর্শ করা যায় না; এটি গুণবাচক বা Abstract Noun।'
      },
      {
        id: 10,
        question: 'Which word is an adjective?',
        options: {
          A: 'Danger',
          B: 'Dangerously',
          C: 'Dangerous',
          D: 'Endanger'
        },
        correctAnswer: 'C',
        topic: 'Parts of Speech / Suffix Rules (-ous suffix denotes Adjectives)',
        explanation: '“Dangerous” (বিপজ্জনক) হলো Adjective। “Danger” হলো Noun (বিপদ), “Dangerously” হলো Adverb (বিপজ্জনকভাবে), এবং “Endanger” হলো Verb (বিপন্ন করা)।'
      },
      {
        id: 11,
        question: 'He is indifferent ___ my opinion.',
        options: {
          A: 'at',
          B: 'to',
          C: 'with',
          D: 'for'
        },
        correctAnswer: 'B',
        topic: 'Appropriate Prepositions (indifferent to = unconcerned)',
        explanation: 'কারো মতামত বা কোনো বিষয়ে উদাসীন বুঝাতে Adjective “indifferent” এর পর Preposition হিসেবে “to” বসে।'
      },
      {
        id: 12,
        question: 'I remember ___ him before.',
        options: {
          A: 'meet',
          B: 'to meet',
          C: 'meeting',
          D: 'met'
        },
        correctAnswer: 'C',
        topic: 'Gerund vs. Infinitive ("remember + V-ing" for past recollection)',
        explanation: 'অতীতের কোনো স্মৃতি মনে করা বুঝাতে “remember + gerund (meeting)” ব্যবহৃত হয়। ভবিষ্যতের কোনো দায়িত্ব মনে রাখার ক্ষেত্রে “remember + to-infinitive” বসত।'
      },
      {
        id: 13,
        question: 'She wants ___ a doctor.',
        options: {
          A: 'becoming',
          B: 'become',
          C: 'to become',
          D: 'became'
        },
        correctAnswer: 'C',
        topic: 'Verbs followed by to-Infinitive (want + to-infinitive)',
        explanation: '“Want” verb-টির পর Direct Object হিসেবে Infinitive (“to become”) ব্যবহৃত হয়।'
      },
      {
        id: 14,
        question: 'The ___ child was crying.',
        options: {
          A: 'sleep',
          B: 'sleeping',
          C: 'slept',
          D: 'sleeps'
        },
        correctAnswer: 'B',
        topic: 'Participles as Adjectives (Present Participle as Attributive Adjective)',
        explanation: '“Child” Noun-এর পূর্বে তার অবস্থা নির্দেশ করতে Present Participle “sleeping” (ঘুমন্ত) Adjective হিসেবে ব্যবহৃত হয়েছে।'
      },
      {
        id: 15,
        question: 'Everyone ___ invited.',
        options: {
          A: 'were',
          B: 'are',
          C: 'was',
          D: 'have'
        },
        correctAnswer: 'C',
        topic: 'Subject-Verb Agreement (Indefinite Pronouns ending in -one take singular verbs)',
        explanation: '“Everyone”, “Somebody”, “Nobody” ইত্যাদি Indefinite Pronoun ব্যাকরণগতভাবে Singular, তাই এদের পর Singular Verb “was” বসবে।'
      },
      {
        id: 16,
        question: '“Bread and butter” ___ my usual breakfast.',
        options: {
          A: 'are',
          B: 'were',
          C: 'is',
          D: 'have'
        },
        correctAnswer: 'C',
        topic: 'Subject-Verb Agreement (Compound subject expressing a single combined idea/dish)',
        explanation: '“Bread and butter” যখন একটি অবিভাজ্য খাবার বা মেনু নির্দেশ করে, তখন তা Singular হিসেবে গণ্য হয়ে Singular Verb “is” গ্রহণ করে।'
      },
      {
        id: 17,
        question: 'He congratulated me ___ my success.',
        options: {
          A: 'for',
          B: 'on',
          C: 'at',
          D: 'with'
        },
        correctAnswer: 'B',
        topic: 'Appropriate Prepositions (congratulate on success)',
        explanation: 'কোনো সাফল্য বা অর্জনে অভিনন্দন জানানো বুঝাতে “congratulate” এর সাথে Preposition হিসেবে “on” বসে।'
      },
      {
        id: 18,
        question: 'The word “quickly” modifies a—',
        options: {
          A: 'Noun',
          B: 'Pronoun',
          C: 'Verb',
          D: 'Preposition'
        },
        correctAnswer: 'C',
        topic: 'Grammatical Function of Adverbs (Adverb modifying Verb)',
        explanation: '“Quickly” একটি Adverb of Manner, যার প্রধান কাজ হলো কোনো কাজের বা Verb-এর সম্পন্ন হওয়ার ধরন প্রকাশ করা বা Verb-কে বিশেষায়িত করা।'
      },
      {
        id: 19,
        question: 'Choose the correct spelling.',
        options: {
          A: 'Separate',
          B: 'Seperate',
          C: 'Separete',
          D: 'Sepparate'
        },
        correctAnswer: 'A',
        topic: 'Spelling Rules (S-E-P-A-R-A-T-E with "-par-")',
        explanation: 'সঠিক বানান হলো “Separate” (পৃথক)। মনে রাখার সহজ কৌশল: এতে "a rat" রয়েছে (S-E-P-A-R-A-T-E)।'
      },
      {
        id: 20,
        question: 'I wish I ___ rich.',
        options: {
          A: 'am',
          B: 'were',
          C: 'will be',
          D: 'have been'
        },
        correctAnswer: 'B',
        topic: 'Subjunctive Mood / Unreal Wish ("I wish + were")',
        explanation: 'বর্তমান বা অতীতের কোনো অবাস্তব ও কাল্পনিক আকাঙ্ক্ষা প্রকাশে “I wish” এর পর সাবজেক্টিভ পাস্ট “were” বসে।'
      },
      {
        id: 21,
        question: 'He works hard, ___ he?',
        options: {
          A: 'does',
          B: 'doesn\'t',
          C: 'isn\'t',
          D: 'didn\'t'
        },
        correctAnswer: 'B',
        topic: 'Tag Questions (Present Simple Affirmative takes negative tag with "doesn\'t")',
        explanation: 'মূল বক্তব্যটি Present Simple Affirmative (“works”), তাই Tag হবে Negative এবং auxiliary হিসেবে “doesn\'t” এসে “doesn\'t he?” গঠিত হবে।'
      },
      {
        id: 22,
        question: 'The opposite of “expand” is—',
        options: {
          A: 'enlarge',
          B: 'extend',
          C: 'contract',
          D: 'increase'
        },
        correctAnswer: 'C',
        topic: 'Vocabulary / Antonyms (expand = become larger; antonym = contract)',
        explanation: '“Expand” অর্থ প্রসারিত বা বর্ধিত হওয়া। এর সরাসরি বিপরীতার্থক বা Antonym হলো “contract” (সংকুচিত হওয়া)।'
      },
      {
        id: 23,
        question: 'The phrase “at the eleventh hour” means—',
        options: {
          A: 'very early',
          B: 'at the last moment',
          C: 'every hour',
          D: 'after eleven hours'
        },
        correctAnswer: 'B',
        topic: 'Idioms and Phrases ("at the eleventh hour" = at the very last moment)',
        explanation: '“At the eleventh hour” ইংরেজি প্রবাদটির অর্থ হলো শেষ মুহূর্তে বা একদম অন্তিম সময়ে (at the last moment)।'
      },
      {
        id: 24,
        question: '“Having completed the task, he left.” The opening phrase is—',
        options: {
          A: 'Gerund phrase',
          B: 'Perfect participial phrase',
          C: 'Infinitive phrase',
          D: 'Noun phrase'
        },
        correctAnswer: 'B',
        topic: 'Identification of Phrases (Perfect Participial Phrase: Having + V3)',
        explanation: '“Having completed the task” গঠিত হয়েছে “Having + Past Participle” দিয়ে, যা পূর্বে সম্পন্ন হওয়া কার্য নির্দেশকারী একটি Perfect Participial Phrase।'
      },
      {
        id: 25,
        question: 'Choose the correct sentence.',
        options: {
          A: 'He is accustomed to work hard.',
          B: 'He is accustomed to working hard.',
          C: 'He is accustomed working hard.',
          D: 'He accustomed to working hard.'
        },
        correctAnswer: 'B',
        topic: 'Prepositional Idiom + Gerund ("accustomed to + V-ing")',
        explanation: '“Accustomed to” এর “to” একটি Preposition, যার পরে Verb-এর Base Form বসে না, বরং Gerund (“working”) বসে। তাই “He is accustomed to working hard” সঠিক।'
      }
    ]
  }
];
