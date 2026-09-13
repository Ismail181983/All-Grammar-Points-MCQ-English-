import { ModelQuestionSet } from '../types';

export const modelQuestionSets16to20: ModelQuestionSet[] = [
  {
    id: 16,
    title: 'Model Question 16',
    subtitle: 'Competitive Grammar MCQ - Set 16 (MCQ 126–150)',
    description: 'Material nouns, secondary purpose school article, scissors plural verb, capable of, second conditional, past continuous interrupted action, and as soon as transformation.',
    totalQuestions: 25,
    questions: [
      {
        id: 1,
        question: 'Which is a material noun?',
        options: {
          A: 'Gold',
          B: 'Honesty',
          C: 'Committee',
          D: 'Childhood'
        },
        correctAnswer: 'A',
        topic: 'Classification of Noun (Material Noun)',
        explanation: '“Gold” (স্বর্ণ) একটি বস্তুগত বা উপাদানবাচক বিশেষ্য (Material Noun), যা গণনা করা যায় না বরং ওজন বা পরিমাপ করা যায়। অপরদিকে “Honesty” ও “Childhood” হলো Abstract Noun এবং “Committee” হলো Collective Noun।'
      },
      {
        id: 2,
        question: 'He went to ___ school to meet the headmaster.',
        options: {
          A: 'a',
          B: 'an',
          C: 'the',
          D: 'no article'
        },
        correctAnswer: 'C',
        topic: 'Definite Article with Institution Places for Secondary Purpose',
        explanation: 'School, college, hospital, church, mosque ইত্যাদিতে যদি তাদের প্রাথমিক বা মূল উদ্দেশ্যে (যেমন: পড়াশোনা বা চিকিৎসার জন্য) যাওয়া না হয়ে অন্য কোনো বিশেষ বা গৌণ উদ্দেশ্যে (যেমন: হেডমাস্টারের সাথে দেখা করতে) যাওয়া বোঝায়, তবে তার পূর্বে Definite Article ‘the’ বসে।'
      },
      {
        id: 3,
        question: 'The scissors ___ sharp.',
        options: {
          A: 'is',
          B: 'are',
          C: 'was',
          D: 'has'
        },
        correctAnswer: 'B',
        topic: 'Plural Nouns of Two Parts (Scissors)',
        explanation: '“Scissors” (কাঁচি), “trousers”, “spectacles”, “pliers” ইত্যাদি শব্দগুলো দুটি অবিচ্ছেদ্য অংশের সমন্বয়ে গঠিত হওয়ায় এরা সর্বদাই Plural হিসেবে গণ্য হয় এবং এদের সাথে Plural Verb (“are”) বসে।'
      },
      {
        id: 4,
        question: 'He is capable ___ doing the work.',
        options: {
          A: 'to',
          B: 'of',
          C: 'for',
          D: 'with'
        },
        correctAnswer: 'B',
        topic: 'Appropriate Preposition (capable of)',
        explanation: '“Capable” এর পর নির্দিষ্ট Preposition হিসেবে ‘of’ বসে এবং এরপরে Gerund (Verb + ing) রূপ বসে: “capable of doing something”। এর সমার্থক “able” এর পর “to + base verb” বসে।'
      },
      {
        id: 5,
        question: 'If I had money, I ___ a car.',
        options: {
          A: 'buy',
          B: 'bought',
          C: 'would buy',
          D: 'will buy'
        },
        correctAnswer: 'C',
        topic: 'Second Conditional Sentence',
        explanation: 'If-clause টি Simple Past Tense এ থাকলে (এখানে had হলো মূল verb-এর V2) Main clause এ “would/could/might + base form of verb” (would buy) বসে। এটি Second Conditional-এর নিয়ম।'
      },
      {
        id: 6,
        question: 'They ___ football when it began to rain.',
        options: {
          A: 'play',
          B: 'played',
          C: 'were playing',
          D: 'have played'
        },
        correctAnswer: 'C',
        topic: 'Interrupted Action in the Past (Past Continuous + Simple Past)',
        explanation: 'অতীতে কোনো দীর্ঘস্থায়ী কাজ চলছিল (Past Continuous: “were playing”) এমন সময়ে অন্য একটি কাজ হঠাৎ সংঘটিত হলে (when it began to rain - Simple Past), চলমান কাজটি Past Continuous Tense এ হয়।'
      },
      {
        id: 7,
        question: '“The teacher praised the student.” Passive:',
        options: {
          A: 'The student praised the teacher.',
          B: 'The student was praised by the teacher.',
          C: 'The student is praised by the teacher.',
          D: 'The student had praised by the teacher.'
        },
        correctAnswer: 'B',
        topic: 'Voice Change (Past Indefinite Tense)',
        explanation: 'Past Indefinite Tense এর বাক্যকে Passive করতে: Object টি Subject হয় (“The student”) + was/were (“was”) + Verb-এর Past Participle (“praised”) + by + Subject টি Object হয় (“the teacher”)। সুতরাং B সঠিক।'
      },
      {
        id: 8,
        question: 'He said, “I can solve it.”',
        options: {
          A: 'He said that he could solve it.',
          B: 'He said that he can solve it.',
          C: 'He told that he could solved it.',
          D: 'He said he can solved it.'
        },
        correctAnswer: 'A',
        topic: 'Narration / Indirect Speech (Modal Auxiliary Change)',
        explanation: 'Reporting verb past tense এ থাকলে Reported Speech এর modal auxiliary ‘can’ পরিবর্তিত হয়ে ‘could’ হয় এবং সংযোগকারী হিসেবে ‘that’ বসে: “He said that he could solve it.”'
      },
      {
        id: 9,
        question: 'Which is a demonstrative pronoun?',
        options: {
          A: 'Who',
          B: 'This',
          C: 'Someone',
          D: 'Myself'
        },
        correctAnswer: 'B',
        topic: 'Classification of Pronouns (Demonstrative Pronoun)',
        explanation: '“This”, “that”, “these”, “those” কোনো ব্যক্তি বা বস্তুকে সুনির্দিষ্টভাবে নির্দেশ করে বলে এদের Demonstrative Pronoun বলা হয়। Who হলো Relative/Interrogative, Someone হলো Indefinite এবং Myself হলো Reflexive pronoun।'
      },
      {
        id: 10,
        question: 'He behaved ___.',
        options: {
          A: 'bad',
          B: 'badly',
          C: 'worse manner',
          D: 'badness'
        },
        correctAnswer: 'B',
        topic: 'Adverb of Manner',
        explanation: 'Verb “behaved” (আচরণ করেছিল) কীভাবে সম্পন্ন হয়েছিল তা প্রকাশ করতে Adverb of Manner প্রয়োজন। Bad হলো Adjective, আর এর Adverb রূপ হলো “badly”।'
      },
      {
        id: 11,
        question: 'He is fond ___ music.',
        options: {
          A: 'at',
          B: 'of',
          C: 'in',
          D: 'on'
        },
        correctAnswer: 'B',
        topic: 'Appropriate Preposition (fond of)',
        explanation: '“Fond of” একটি প্রচলিত উপযুক্ত Preposition যার অর্থ অনুরাগী, ভক্ত বা প্রিয় (fond of music/sweets)। সুতরাং ‘of’ সঠিক।'
      },
      {
        id: 12,
        question: 'I stopped ___ because I was tired.',
        options: {
          A: 'work',
          B: 'to work',
          C: 'working',
          D: 'worked'
        },
        correctAnswer: 'C',
        topic: 'Gerund vs Infinitive after Stop (Ceasing an action)',
        explanation: 'কোনো কাজ করা বন্ধ বা ক্ষান্ত দেওয়া বোঝালে “stop + Gerund (v-ing)” ব্যবহৃত হয়: “stopped working” (কাজ বন্ধ করেছিলাম)। আর কোনো কাজের উদ্দেশ্যে অন্য কাজ থামানো বোঝালে “stop + to-infinitive” বসে।'
      },
      {
        id: 13,
        question: 'He stopped ___ a cigarette.',
        options: {
          A: 'smoking',
          B: 'smoke',
          C: 'to smoke',
          D: 'smoked'
        },
        correctAnswer: 'C',
        topic: 'Infinitive of Purpose after Stop',
        explanation: 'ধূমপান করার উদ্দেশ্যে হাঁটা বা অন্য কাজ থামানো (stopped in order to smoke a cigarette) বোঝাতে “stop + to-infinitive” (to smoke) ব্যবহৃত হয়। (ধূমপান চিরতরে ত্যাগ করা বোঝালে stopped smoking হতো)।'
      },
      {
        id: 14,
        question: 'The ___ man helped me.',
        options: {
          A: 'injured',
          B: 'injuring',
          C: 'injure',
          D: 'injury'
        },
        correctAnswer: 'A',
        topic: 'Past Participle as Attributive Adjective',
        explanation: 'Noun “man” এর পূর্বে অবস্থা বর্ণনাকারী Adjective হিসেবে Past Participle “injured” (আহত ব্যক্তি) বসেছে। লোকটি নিজে আঘাতপ্রাপ্ত ছিল (passive sense), তাই “injured” সঠিক।'
      },
      {
        id: 15,
        question: 'There ___ a lot of furniture in the room.',
        options: {
          A: 'are',
          B: 'were',
          C: 'is',
          D: 'have'
        },
        correctAnswer: 'C',
        topic: 'Subject-Verb Agreement with Uncountable Noun (Furniture)',
        explanation: '“Furniture” একটি Uncountable Noun। এর পূর্বে ‘a lot of’ থাকলেও Uncountable Noun সর্বদা Singular Verb গ্রহণ করে। তাই “There is a lot of furniture in the room” সঠিক।'
      },
      {
        id: 16,
        question: '“Many a student” ___ failed.',
        options: {
          A: 'have',
          B: 'has',
          C: 'are',
          D: 'were'
        },
        correctAnswer: 'B',
        topic: 'Subject-Verb Agreement (Many a + Singular Noun + Singular Verb)',
        explanation: '“Many a” এর পরে সর্বদা Singular Noun (student) এবং Singular Verb (has failed) বসে। অপরদিকে “Many students” থাকলে Plural Verb (have failed) বসত।'
      },
      {
        id: 17,
        question: 'He is junior ___ me.',
        options: {
          A: 'than',
          B: 'to',
          C: 'from',
          D: 'with'
        },
        correctAnswer: 'B',
        topic: 'Latin Comparatives with Preposition "to"',
        explanation: 'ল্যাটিন তুলনামূলক বিশেষণ যেমন: Junior, Senior, Superior, Inferior, Prior, Anterior ইত্যাদির পর তুলনার ক্ষেত্রে ‘than’ না বসে Preposition ‘to’ বসে: “junior to me”।'
      },
      {
        id: 18,
        question: 'Choose the correctly spelt word.',
        options: {
          A: 'Questionnaire',
          B: 'Questionaire',
          C: 'Questionnair',
          D: 'Questinnaire'
        },
        correctAnswer: 'A',
        topic: 'Spelling Rules (Questionnaire)',
        explanation: 'সঠিক বানান হলো “Questionnaire” (Q-u-e-s-t-i-o-n-n-a-i-r-e), যার অর্থ প্রশ্নমালা। এখানে ‘question’ শব্দের সাথে ‘naire’ যুক্ত হওয়ার সময় ডাবল ‘n’ (nn) গঠিত হয়।'
      },
      {
        id: 19,
        question: 'He acts as though he ___ mad.',
        options: {
          A: 'is',
          B: 'were',
          C: 'has',
          D: 'will'
        },
        correctAnswer: 'B',
        topic: 'Subjunctive Mood with As Though / As If',
        explanation: '“As if” বা “as though” দ্বারা অবাস্তব বা কাল্পনিক কোনো অবস্থা প্রকাশ পেলে Present Tense এর পরেও be-verb হিসেবে Subjunctive Past “were” বসে।'
      },
      {
        id: 20,
        question: 'The positive degree of “better” is—',
        options: {
          A: 'good',
          B: 'well',
          C: 'best',
          D: 'goodly'
        },
        correctAnswer: 'A',
        topic: 'Degrees of Comparison (Irregular Adjectives)',
        explanation: 'Irregular adjective “good” এর রূপান্তর হলো: Good (Positive) → Better (Comparative) → Best (Superlative)। সুতরাং “better” এর Positive Degree হলো “good”।'
      },
      {
        id: 21,
        question: '“As soon as he came, I left.” This can be replaced by—',
        options: {
          A: 'No sooner did he come than I left.',
          B: 'No sooner had he come than I left.',
          C: 'No sooner he came when I left.',
          D: 'Hardly he came than I left.'
        },
        correctAnswer: 'B',
        topic: 'Transformation with Correlative Conjunction (No sooner had... than)',
        explanation: '“As soon as + past, past” বাক্যকে “No sooner” দিয়ে রূপান্তর করার ব্যাকরণিক গঠন: “No sooner had + Subject + V3 (come) + than + Simple Past (I left)”। সুতরাং B সঠিক।'
      },
      {
        id: 22,
        question: 'He hardly ever comes here, ___?',
        options: {
          A: 'does he',
          B: 'doesn\'t he',
          C: 'did he',
          D: 'isn\'t he'
        },
        correctAnswer: 'A',
        topic: 'Tag Questions with Semi-Negative Words (hardly)',
        explanation: 'বাক্যে “hardly”, “seldom”, “scarcely”, “rarely”, “barely” ইত্যাদি আধা-নেতিবাচক শব্দ থাকলে বাক্যটিকে Negative বিবেচনা করা হয়। ফলে এর Tag Question টি Affirmative হবে: “does he?”।'
      },
      {
        id: 23,
        question: '“Because he was ill, he could not attend.” The first clause is—',
        options: {
          A: 'Noun clause',
          B: 'Adjective clause',
          C: 'Adverb clause',
          D: 'Principal clause'
        },
        correctAnswer: 'C',
        topic: 'Clause Identification (Adverb Clause of Reason)',
        explanation: '“Because he was ill” ক্লজটি প্রধান ক্লজের কাজ না করতে পারার কারণ (reason/cause) প্রকাশ করছে। কারণ নির্দেশক সাবঅর্ডিনেট ক্লজ Adverb Clause of Reason।'
      },
      {
        id: 24,
        question: 'Choose the correct sentence.',
        options: {
          A: 'He is as tall as me.',
          B: 'He is as tall as I am.',
          C: 'He is as tall than I.',
          D: 'He is so tall as I am.'
        },
        correctAnswer: 'B',
        topic: 'Comparative Structure (as... as with Subject Pronoun + Verb)',
        explanation: 'Formal English এ সমতা নির্দেশক তুলনায় ‘as... as’ এর পরে Subjective Pronoun এবং এর সাথে সংশ্লিষ্ট Verb বসে: “He is as tall as I am”। হাবোধক বাক্যে ‘so... as’ এর চেয়ে ‘as... as’ ব্যবহৃত হয়।'
      },
      {
        id: 25,
        question: 'The word “although” is a—',
        options: {
          A: 'Preposition',
          B: 'Subordinating conjunction',
          C: 'Adverb',
          D: 'Pronoun'
        },
        correctAnswer: 'B',
        topic: 'Parts of Speech (Subordinating Conjunction)',
        explanation: '“Although” একটি Subordinating Conjunction যা বিপরীতধর্মী শর্ত বা বৈপরীত্য (concession/contrast) নির্দেশক সাবঅর্ডিনেট ক্লজ যুক্ত করে Complex Sentence গঠন করে।'
      }
    ]
  },
  {
    id: 17,
    title: 'Model Question 17',
    subtitle: 'Competitive Grammar MCQ - Set 17 (MCQ 151–175)',
    description: 'Latin plural datum, MLA article, collective police, responsible for, first conditional, passive of who, imperative let us, and a number of vs the number of.',
    totalQuestions: 25,
    questions: [
      {
        id: 1,
        question: 'The plural of “datum” is—',
        options: {
          A: 'datums',
          B: 'data',
          C: 'datas',
          D: 'datum'
        },
        correctAnswer: 'B',
        topic: 'Foreign / Latin Plurals (datum → data)',
        explanation: 'ল্যাটিন মূল শব্দ ‘datum’ (একবচন) এর সঠিক বহুবচন (plural) রূপ হলো ‘data’। আধুনিক ব্যবহারে data অনেক সময় collective হিসেবে ব্যবহৃত হলেও ব্যাকরণগত মূল বহুবচন হলো data।'
      },
      {
        id: 2,
        question: 'He is ___ MLA.',
        options: {
          A: 'a',
          B: 'an',
          C: 'the',
          D: 'no article'
        },
        correctAnswer: 'B',
        topic: 'Articles with Abbreviation (Vowel Sound /em/)',
        explanation: '‘MLA’ এর প্রথম অক্ষর ‘M’ উচ্চারণের সময় প্রথমে ভাওয়েল সাউন্ড /em/ (এ-ম্) আসে। সংক্ষেপিত অক্ষরের উচ্চারণ ভাওয়েল সাউন্ড দিয়ে শুরু হলে তার পূর্বে ‘an’ বসে।'
      },
      {
        id: 3,
        question: 'The police ___ arrested the thief.',
        options: {
          A: 'has',
          B: 'have',
          C: 'is',
          D: 'was'
        },
        correctAnswer: 'B',
        topic: 'Plural Nouns without -s (The police)',
        explanation: '‘Police’, ‘cattle’, ‘people’, ‘poultry’, ‘gentry’ ইত্যাদি শব্দগুলো দেখতে singular মনে হলেও ব্যাকরণগতভাবে সর্বদা Plural Noun এবং এদের সাথে Plural Verb (“have”) বসে।'
      },
      {
        id: 4,
        question: 'He is responsible ___ the project.',
        options: {
          A: 'of',
          B: 'for',
          C: 'to',
          D: 'with'
        },
        correctAnswer: 'B',
        topic: 'Appropriate Preposition (responsible for)',
        explanation: 'কোনো কাজ বা দায়িত্বের জন্য দায়ী/দায়বদ্ধ বোঝাতে ‘responsible for’ বসে (responsible for the project)। আর কোনো ঊর্ধ্বতন ব্যক্তির নিকট দায়বদ্ধ বোঝাতে ‘responsible to someone’ বসে।'
      },
      {
        id: 5,
        question: 'If it rains, we ___ at home.',
        options: {
          A: 'stayed',
          B: 'stay',
          C: 'will stay',
          D: 'would stay'
        },
        correctAnswer: 'C',
        topic: 'First Conditional Sentence',
        explanation: 'First Conditional এর নিয়মানুযায়ী If-clause টি Present Indefinite (it rains) হলে Main clause টি Future Indefinite (will stay) হয়: “we will stay at home”।'
      },
      {
        id: 6,
        question: 'I ___ him yesterday.',
        options: {
          A: 'meet',
          B: 'have met',
          C: 'met',
          D: 'had met'
        },
        correctAnswer: 'C',
        topic: 'Past Indefinite Tense with Past Time Indicator (yesterday)',
        explanation: 'বাক্যে নির্দিষ্ট অতীত সময় প্রকাশক শব্দ যেমন ‘yesterday’, ‘ago’, ‘last night/year’ থাকলে বাক্যটি Past Indefinite Tense (V2) হয়। Meet-এর Past রূপ হলো “met”।'
      },
      {
        id: 7,
        question: 'Who broke the glass? Passive:',
        options: {
          A: 'By whom was the glass broken?',
          B: 'By whom did the glass break?',
          C: 'Who was broken the glass?',
          D: 'The glass was break by whom?'
        },
        correctAnswer: 'A',
        topic: 'Passive Voice of Interrogative Sentences with "Who"',
        explanation: '‘Who’ যুক্ত Past Indefinite এর প্রশ্নকে Passive করার নিয়ম: ‘By whom + was/were + object (the glass) + V3 (broken)?’। সুতরাং A সঠিক।'
      },
      {
        id: 8,
        question: 'He said, “Let us go out.”',
        options: {
          A: 'He suggested that they should go out.',
          B: 'He ordered that they went out.',
          C: 'He said that let us go out.',
          D: 'He told us go out.'
        },
        correctAnswer: 'A',
        topic: 'Indirect Speech of Imperative with "Let us" (Proposal)',
        explanation: '‘Let us’ বা ‘Let\'s’ দ্বারা প্রস্তাব (proposal/suggestion) প্রকাশ পেলে reporting verb পরিবর্তিত হয়ে ‘proposed’ বা ‘suggested’ হয় এবং reported clause এ ‘that + they/we + should + V1’ বসে।'
      },
      {
        id: 9,
        question: '“Myself” is a/an—',
        options: {
          A: 'Personal pronoun',
          B: 'Reflexive pronoun',
          C: 'Demonstrative pronoun',
          D: 'Relative pronoun'
        },
        correctAnswer: 'B',
        topic: 'Classification of Pronouns (Reflexive Pronoun)',
        explanation: 'Subject এবং Object যখন একই ব্যক্তি হয় এবং ক্রিয়ার ফল কর্তার নিজের ওপর প্রতিফলিত হয়, তখন self/selves যুক্ত প্রোনাউনকে Reflexive Pronoun বলে (myself, yourself, himself)।'
      },
      {
        id: 10,
        question: 'She sings ___.',
        options: {
          A: 'beautiful',
          B: 'beautifully',
          C: 'beauty',
          D: 'beautify'
        },
        correctAnswer: 'B',
        topic: 'Adverb of Manner',
        explanation: 'ক্রিয়া ‘sings’ (গান গায়) কীভাবে সম্পন্ন হয় তা প্রকাশ করতে Adverb of Manner ‘beautifully’ ব্যবহৃত হয়। Beautiful হলো Adjective এবং Beauty হলো Noun।'
      },
      {
        id: 11,
        question: 'He is anxious ___ his result.',
        options: {
          A: 'about',
          B: 'at',
          C: 'on',
          D: 'for'
        },
        correctAnswer: 'A',
        topic: 'Appropriate Preposition (anxious about)',
        explanation: 'কোনো ফলাফল, ভবিষ্যৎ বা পরিস্থিতি নিয়ে উদ্বিগ্ন বা শঙ্কিত হওয়া বোঝাতে ‘anxious about’ বসে (anxious about his result)। কোনো কিছু পাওয়ার তীব্র আকাঙ্ক্ষায় ‘anxious for’ ব্যবহৃত হয়।'
      },
      {
        id: 12,
        question: 'I cannot help ___.',
        options: {
          A: 'laugh',
          B: 'laughing',
          C: 'to laugh',
          D: 'laughed'
        },
        correctAnswer: 'B',
        topic: 'Gerund after Idiomatic Expression (cannot help)',
        explanation: '‘Cannot help’ বা ‘could not help’ এর পর সর্বদা Gerund (verb + ing) রূপ বসে: “I cannot help laughing” (আমি না হেসে পারলাম না)। কিন্তু ‘cannot but’ থাকলে base verb (bare infinitive) বসত।'
      },
      {
        id: 13,
        question: 'He made a ___ speech.',
        options: {
          A: 'moving',
          B: 'moved',
          C: 'move',
          D: 'movement'
        },
        correctAnswer: 'A',
        topic: 'Present Participle as Attributive Adjective',
        explanation: 'Noun “speech” (বক্তৃতা) এর গুণ বা প্রভাব বোঝাতে যা শ্রোতার মন ছুঁয়ে যায় বা আবেগ সৃষ্টি করে, সেক্ষেত্রে Present Participle “moving” (হৃদয়স্পর্শী) Adjective হিসেবে বসে।'
      },
      {
        id: 14,
        question: 'Either the teacher or the students ___ responsible.',
        options: {
          A: 'is',
          B: 'was',
          C: 'are',
          D: 'has'
        },
        correctAnswer: 'C',
        topic: 'Subject-Verb Agreement (Proximity Rule with Either... or)',
        explanation: '‘Either... or’ বা ‘Neither... nor’ দ্বারা দুটি ভিন্ন বচনের সাবজেক্ট যুক্ত হলে ভার্বের নিকটতম সাবজেক্ট অনুযায়ী ভার্ব বসে। এখানে ভার্বের কাছাকাছি রয়েছে Plural Noun “the students”, তাই Plural Verb “are” সঠিক।'
      },
      {
        id: 15,
        question: '“A number of students” ___ absent.',
        options: {
          A: 'is',
          B: 'was',
          C: 'are',
          D: 'has'
        },
        correctAnswer: 'C',
        topic: 'Subject-Verb Agreement ("A number of" + Plural Verb)',
        explanation: '“A number of + plural noun” এর অর্থ হলো ‘অনেক/বহু’ (many), তাই এটি সর্বদাই Plural Verb (“are”) গ্রহণ করে।'
      },
      {
        id: 16,
        question: '“The number of students” ___ increasing.',
        options: {
          A: 'are',
          B: 'were',
          C: 'is',
          D: 'have'
        },
        correctAnswer: 'C',
        topic: 'Subject-Verb Agreement ("The number of" + Singular Verb)',
        explanation: '“The number of + plural noun” দ্বারা শিক্ষার্থীদের একটি সুনির্দিষ্ট সামগ্রিক সংখ্যাকে নির্দেশ করা হয় (একবচন ধারণা), তাই এর সাথে সর্বদা Singular Verb (“is”) বসে।'
      },
      {
        id: 17,
        question: 'He is acquainted ___ the facts.',
        options: {
          A: 'to',
          B: 'with',
          C: 'at',
          D: 'for'
        },
        correctAnswer: 'B',
        topic: 'Appropriate Preposition (acquainted with)',
        explanation: 'কোনো তথ্য, বিষয় বা ব্যক্তির সাথে পরিচিত বা অবহিত থাকা বোঝাতে ‘acquainted with’ ব্যবহৃত হয় (যেমন: acquainted with the facts)।'
      },
      {
        id: 18,
        question: 'Choose the correct spelling.',
        options: {
          A: 'Conscientious',
          B: 'Consciencious',
          C: 'Conscientous',
          D: 'Conscintious'
        },
        correctAnswer: 'A',
        topic: 'Spelling Rules (Conscientious)',
        explanation: 'সঠিক বানান হলো “Conscientious” (C-o-n-s-c-i-e-n-t-i-o-u-s), যার অর্থ বিবেকবান, সুবিবেচক বা কর্তব্যনিষ্ঠ।'
      },
      {
        id: 19,
        question: 'He talks as if he ___ the boss.',
        options: {
          A: 'is',
          B: 'were',
          C: 'has',
          D: 'will'
        },
        correctAnswer: 'B',
        topic: 'Subjunctive Mood with As If',
        explanation: '“As if” যুক্ত ক্লজে অবাস্তব বা কাল্পনিক ভান প্রকাশ করতে Present Indefinite এর পরেও Past Subjunctive হিসেবে সর্বদা ‘were’ বসে: “as if he were the boss”।'
      },
      {
        id: 20,
        question: 'The superlative of “far” is—',
        options: {
          A: 'farther',
          B: 'farthest',
          C: 'further',
          D: 'farrer'
        },
        correctAnswer: 'B',
        topic: 'Degrees of Comparison (Irregular Comparison of Far)',
        explanation: '‘Far’ এর Comparative রূপ হলো farther/further এবং Superlative রূপ হলো ‘farthest’ (বা furthest)। প্রদত্ত অপশনগুলোর মধ্যে B (farthest) সঠিক।'
      },
      {
        id: 21,
        question: '“The sooner, the better” contains—',
        options: {
          A: 'Positive degrees',
          B: 'Comparative degrees',
          C: 'Superlative degrees',
          D: 'Mixed degrees'
        },
        correctAnswer: 'B',
        topic: 'Parallel Double Comparatives',
        explanation: '“The sooner, the better” প্রবাদটিতে ‘the + comparative ... the + comparative’ এর সমান্তরাল কাঠামো রয়েছে। এখানে ‘sooner’ এবং ‘better’ উভয়ই Comparative Degree।'
      },
      {
        id: 22,
        question: 'He is so weak that he cannot walk. The equivalent is—',
        options: {
          A: 'He is too weak to walk.',
          B: 'He is enough weak to walk.',
          C: 'He is weak enough to walk.',
          D: 'He is very weak for walking.'
        },
        correctAnswer: 'A',
        topic: 'Transformation of Sentences (so... that cannot → too... to)',
        explanation: 'Complex বাক্যের ‘so + adjective + that + cannot + verb’ রূপকে Simple বাক্যে রূপান্তর করতে ‘too + adjective + to + base verb’ ব্যবহৃত হয়: “He is too weak to walk” (তিনি হাঁটার পক্ষে অতিরিক্ত দুর্বল)।'
      },
      {
        id: 23,
        question: 'Nobody came, ___?',
        options: {
          A: 'did they',
          B: 'didn\'t they',
          C: 'did he',
          D: 'didn\'t he'
        },
        correctAnswer: 'A',
        topic: 'Tag Questions with Indefinite Pronoun (Nobody)',
        explanation: '‘Nobody’, ‘None’, ‘No one’ ইত্যাদি নেতিবাচক অনির্দিষ্ট সর্বনাম থাকলে Tag Question এ pronoun হিসেবে ‘they’ বসে। বাক্যটি নাবোধক হওয়ায় ট্যাগটি হবে হাবোধক, এবং Past Tense এর জন্য auxiliary ‘did’ → “did they?”।'
      },
      {
        id: 24,
        question: '“What a beautiful flower!” is—',
        options: {
          A: 'Assertive sentence',
          B: 'Interrogative sentence',
          C: 'Exclamatory sentence',
          D: 'Imperative sentence'
        },
        correctAnswer: 'C',
        topic: 'Classification of Sentences (Exclamatory Sentence)',
        explanation: 'যে বাক্যের মাধ্যমে মনের আকস্মিক অনুভূতি, বিস্ময় বা আনন্দ প্রকাশ পায় এবং বাক্যের শেষে বিস্ময়সূচক চিহ্ন (!) থাকে, তাকে Exclamatory sentence বলে।'
      },
      {
        id: 25,
        question: '“To tell a lie is a sin.” Here “to tell a lie” functions as—',
        options: {
          A: 'Subject',
          B: 'Object',
          C: 'Adjective',
          D: 'Adverb'
        },
        correctAnswer: 'A',
        topic: 'Non-finite Verbs (Infinitive Phrase as Subject)',
        explanation: '“To tell a lie” হলো একটি Infinitive Phrase যা বাক্যটির প্রধান সসীম ক্রিয়া ‘is’ এর Subject হিসেবে কাজ করছে।'
      }
    ]
  },
  {
    id: 18,
    title: 'Model Question 18',
    subtitle: 'Competitive Grammar MCQ - Set 18 (MCQ 176–200)',
    description: 'Army collective noun, university article, uncountable furniture, married to, past perfect before, hard vs hardly, be used to, and know how to.',
    totalQuestions: 25,
    questions: [
      {
        id: 1,
        question: 'The word “army” is a—',
        options: {
          A: 'Collective noun',
          B: 'Abstract noun',
          C: 'Material noun',
          D: 'Proper noun'
        },
        correctAnswer: 'A',
        topic: 'Classification of Nouns (Collective Noun)',
        explanation: '“Army” (সৈন্যবাহিনী) একদল সৈনিকের সমষ্টিগত নাম। কোনো সমজাতীয় ব্যক্তি বা প্রাণীর অবিভাজ্য সমষ্টি বা দলকে Collective Noun বলা হয়।'
      },
      {
        id: 2,
        question: 'He is ___ university student.',
        options: {
          A: 'an',
          B: 'a',
          C: 'the',
          D: 'no article'
        },
        correctAnswer: 'B',
        topic: 'Articles with Vowel "U" sounding like /juː/',
        explanation: '“University” শব্দের শুরুর বর্ণ Vowel ‘U’ হলেও এর উচ্চারণ কনসোনেন্ট গ্লাইড ‘ইউ’ (/juː/ - consonant sound) এর মতো। তাই এর পূর্বে ‘an’ না বসে ‘a’ বসে: “a university student”।'
      },
      {
        id: 3,
        question: 'The furniture ___ expensive.',
        options: {
          A: 'are',
          B: 'were',
          C: 'is',
          D: 'have'
        },
        correctAnswer: 'C',
        topic: 'Subject-Verb Agreement with Uncountable Noun',
        explanation: '“Furniture” একটি Uncountable Noun। এর কোনো বহুবচন (furnitures) হয় না এবং এটি সর্বদা Singular Verb গ্রহণ করে। তাই “The furniture is expensive” সঠিক।'
      },
      {
        id: 4,
        question: 'He is married ___ a doctor.',
        options: {
          A: 'with',
          B: 'to',
          C: 'by',
          D: 'at'
        },
        correctAnswer: 'B',
        topic: 'Appropriate Preposition (married to)',
        explanation: 'কারো সাথে বিবাহিত বোঝাতে ‘married’ এর পর সর্বদা Preposition ‘to’ বসে: “married to someone”। ‘Married with’ ব্যাকরণগতভাবে অশুদ্ধ।'
      },
      {
        id: 5,
        question: 'If I were rich, I ___ the poor.',
        options: {
          A: 'help',
          B: 'helped',
          C: 'would help',
          D: 'will help'
        },
        correctAnswer: 'C',
        topic: 'Second Conditional Sentence (Unreal Present)',
        explanation: 'If-clause এ Subjunctive Past “were” থাকলে Main clause এ “would/could/might + base verb” বসে। সুতরাং “I would help the poor” সঠিক।'
      },
      {
        id: 6,
        question: 'She ___ the book before she watched the movie.',
        options: {
          A: 'reads',
          B: 'read',
          C: 'had read',
          D: 'has read'
        },
        correctAnswer: 'C',
        topic: 'Past Perfect Tense with "before"',
        explanation: 'অতীতে দুটি ঘটনার মধ্যে যে কাজটি অপেক্ষাকৃত আগে সম্পন্ন হয়েছিল তা Past Perfect (had + V3: “had read”) এবং যা পরে হয়েছিল তা Past Simple (watched) হয়। ‘Before’ এর আগের ক্লজটি Past Perfect হয়।'
      },
      {
        id: 7,
        question: '“They will complete the work.” Passive:',
        options: {
          A: 'The work will be completed by them.',
          B: 'The work is completed by them.',
          C: 'The work would complete by them.',
          D: 'The work has completed by them.'
        },
        correctAnswer: 'A',
        topic: 'Passive Voice of Future Indefinite Tense',
        explanation: 'Future Indefinite Tense এর passive গঠন: ‘Object (The work) + will be + V3 (completed) + by + Subject-এর objective form (them)’।'
      },
      {
        id: 8,
        question: 'He said, “Please help me.”',
        options: {
          A: 'He requested me to help him.',
          B: 'He ordered me help him.',
          C: 'He said me to help him.',
          D: 'He told that help me.'
        },
        correctAnswer: 'A',
        topic: 'Indirect Speech of Imperative Sentence with "Please"',
        explanation: '‘Please’ যুক্ত অনুরোধসূচক Imperative বাক্যে reporting verb ‘requested’ হয় এবং কমা ও কোটেশন উঠে ‘to + base verb’ বসে: “He requested me to help him.”'
      },
      {
        id: 9,
        question: '“Who” in “Who are you?” is a/an—',
        options: {
          A: 'Relative pronoun',
          B: 'Interrogative pronoun',
          C: 'Demonstrative pronoun',
          D: 'Reflexive pronoun'
        },
        correctAnswer: 'B',
        topic: 'Classification of Pronouns (Interrogative Pronoun)',
        explanation: 'যে pronoun সরাসরি কোনো প্রশ্ন জিজ্ঞাসা করতে বাক্যের শুরুতে ব্যবহৃত হয়, তাকে Interrogative Pronoun বলে। এখানে ‘Who’ সরাসরি পরিচয় জানতে প্রশ্ন করছে।'
      },
      {
        id: 10,
        question: 'He worked ___.',
        options: {
          A: 'hardly',
          B: 'hard',
          C: 'hardness',
          D: 'harderly'
        },
        correctAnswer: 'B',
        topic: 'Adverbs with Distinct Meanings (hard vs hardly)',
        explanation: 'কঠোর বা উদ্যমীভাবে কাজ করা বোঝাতে Adverb হিসেবে ‘hard’ বসে (worked hard)। আর ‘hardly’ অর্থ কদাচিৎ বা প্রায় না বললেই চলে (নেতিবাচক)।'
      },
      {
        id: 11,
        question: 'He is famous ___ his honesty.',
        options: {
          A: 'for',
          B: 'of',
          C: 'by',
          D: 'with'
        },
        correctAnswer: 'A',
        topic: 'Appropriate Preposition (famous for)',
        explanation: 'কোনো গুণ, কর্ম বা বৈশিষ্ট্যের জন্য বিখ্যাত হওয়া বোঝাতে ‘famous for’ বসে (যেমন: famous for his honesty)।'
      },
      {
        id: 12,
        question: 'I am used to ___ early.',
        options: {
          A: 'get up',
          B: 'getting up',
          C: 'got up',
          D: 'have got up'
        },
        correctAnswer: 'B',
        topic: 'Gerund after "be used to" (Accustomed to)',
        explanation: '‘Be used to’ (am/is/are/was/were used to) বা ‘get used to’ এর পর অভ্যাস বোঝাতে Gerund (verb + ing: “getting up”) বসে। তবে শুধু ‘used to’ থাকলে base form (get up) বসত।'
      },
      {
        id: 13,
        question: 'The ___ leaves fell from the tree.',
        options: {
          A: 'fallen',
          B: 'falling',
          C: 'fall',
          D: 'fell'
        },
        correctAnswer: 'B',
        topic: 'Participle as Attributive Adjective (falling leaves)',
        explanation: 'ঝরে পড়ছিল এমন চলমান অবস্থার পাতা (action in progress) নির্দেশ করতে Present Participle “falling” Noun “leaves” এর পূর্বে Attributive Adjective হিসেবে ব্যবহৃত হয়েছে।'
      },
      {
        id: 14,
        question: 'He as well as his brothers ___ invited.',
        options: {
          A: 'were',
          B: 'have',
          C: 'was',
          D: 'are'
        },
        correctAnswer: 'C',
        topic: 'Subject-Verb Agreement with "as well as"',
        explanation: '‘As well as’, ‘along with’, ‘together with’, ‘with’ দ্বারা দুটি subject যুক্ত হলে প্রথম subject (এখানে He) অনুযায়ী verb নির্ধারিত হয়। He singular হওয়ায় singular verb “was” সঠিক।'
      },
      {
        id: 15,
        question: 'One of my friends ___ abroad.',
        options: {
          A: 'live',
          B: 'lives',
          C: 'are living',
          D: 'have lived'
        },
        correctAnswer: 'B',
        topic: 'Subject-Verb Agreement (One of + Plural Noun + Singular Verb)',
        explanation: '“One of + plural noun” থাকলে মূল subject হলো ‘One’ (একজন বন্ধু), যা ৩য় পুরুষ একবচন। তাই Present Indefinite এ verb-এর সাথে s/es যুক্ত হয়ে “lives” হবে।'
      },
      {
        id: 16,
        question: 'He is different ___ his brother.',
        options: {
          A: 'than',
          B: 'from',
          C: 'with',
          D: 'to'
        },
        correctAnswer: 'B',
        topic: 'Appropriate Preposition (different from)',
        explanation: 'কারো বা কোনো কিছুর চেয়ে ভিন্ন বা আলাদা বোঝাতে Standard English এ ‘different’ এর পর সর্বদাই Preposition ‘from’ বসে (different from someone)।'
      },
      {
        id: 17,
        question: 'Choose the correct spelling.',
        options: {
          A: 'Maintenance',
          B: 'Maintainance',
          C: 'Maintanence',
          D: 'Maintenence'
        },
        correctAnswer: 'A',
        topic: 'Spelling Rules (Maintenance)',
        explanation: 'মূল Verb ‘maintain’ হলেও এর Noun রূপের সঠিক বানান হলো “Maintenance” (M-a-i-n-t-e-n-a-n-c-e), যার অর্থ রক্ষণাবেক্ষণ।'
      },
      {
        id: 18,
        question: 'I would rather you ___ here.',
        options: {
          A: 'stay',
          B: 'stayed',
          C: 'will stay',
          D: 'have stayed'
        },
        correctAnswer: 'B',
        topic: 'Subjunctive Past with "would rather + Subject"',
        explanation: '‘Would rather’ এর পর সরাসরি verb থাকলে bare infinitive বসে, কিন্তু ‘would rather’ এর পর যদি অন্য কোনো Subject (you) আসে, তবে পরবর্তী verb টি Past Subjunctive (stayed) হয়।'
      },
      {
        id: 19,
        question: '“No other boy is as intelligent as Rahim.” The comparative form is—',
        options: {
          A: 'Rahim is more intelligent than any other boy.',
          B: 'Rahim is more intelligent than all boys.',
          C: 'Rahim is the more intelligent boy.',
          D: 'Rahim is intelligent than any boy.'
        },
        correctAnswer: 'A',
        topic: 'Degree Transformation (Positive to Comparative)',
        explanation: '“No other + noun” যুক্ত Positive বাক্যকে Comparative করতে: ‘Subject (Rahim) + verb + comparative degree (more intelligent) + than any other + singular noun (boy)’ গঠন প্রযোজ্য।'
      },
      {
        id: 20,
        question: 'He is one of the best students, ___?',
        options: {
          A: 'isn\'t he',
          B: 'doesn\'t he',
          C: 'isn\'t it',
          D: 'is he'
        },
        correctAnswer: 'A',
        topic: 'Tag Question with Be-verb',
        explanation: 'বাক্যের মূল সাবজেক্ট ‘He’ এবং সসীম ক্রিয়া হলো Affirmative ‘is’। সুতরাং এর Tag Question টি হবে Negative: “isn\'t he?”।'
      },
      {
        id: 21,
        question: '“Although he is poor, he is honest.” The sentence is—',
        options: {
          A: 'Simple',
          B: 'Compound',
          C: 'Complex',
          D: 'Compound-complex'
        },
        correctAnswer: 'C',
        topic: 'Classification of Sentences according to Structure (Complex)',
        explanation: 'বাক্যটিতে একটি Subordinate Clause (“Although he is poor”) এবং একটি Principal Clause (“he is honest”) রয়েছে যা Subordinating Conjunction ‘Although’ দ্বারা যুক্ত। এটি একটি Complex Sentence।'
      },
      {
        id: 22,
        question: '“He came and sat down.” This is a—',
        options: {
          A: 'Simple sentence',
          B: 'Compound sentence',
          C: 'Complex sentence',
          D: 'Interrogative sentence'
        },
        correctAnswer: 'B',
        topic: 'Compound Sentence with Coordinating Conjunction "and"',
        explanation: 'দুটি স্বাধীন সমজাতীয় প্রেডিকেট যখন Coordinating Conjunction ‘and’ দ্বারা যুক্ত হয়, তখন বাক্যটি Compound Sentence হিসেবে গণ্য হয়।'
      },
      {
        id: 23,
        question: '“Having finished the work, he left.” The sentence begins with—',
        options: {
          A: 'Gerund',
          B: 'Perfect participle',
          C: 'Infinitive',
          D: 'Finite verb'
        },
        correctAnswer: 'B',
        topic: 'Non-finite Verbs (Perfect Participle)',
        explanation: '“Having + Past Participle (Having finished)” গঠনটিকে Perfect Participle বলা হয়। এটি অতীতে একটি কাজ সম্পূর্ণ হওয়ার পরই আরেকটি কাজ শুরু হওয়া নির্দেশ করে।'
      },
      {
        id: 24,
        question: 'The word “very” in “very beautiful” modifies—',
        options: {
          A: 'Noun',
          B: 'Verb',
          C: 'Adjective',
          D: 'Pronoun'
        },
        correctAnswer: 'C',
        topic: 'Adverb of Degree Modifying an Adjective',
        explanation: '“Beautiful” হলো একটি Adjective। ‘Very’ শব্দটি এর তীব্রতা বা মাত্রা প্রকাশ করে Adjective টিকে মডিফাই করছে। সুতরাং এটি Adjective কে মডিফাই করে।'
      },
      {
        id: 25,
        question: 'Choose the correct sentence.',
        options: {
          A: 'He knows to swim.',
          B: 'He knows swimming.',
          C: 'He knows how to swim.',
          D: 'He knows how swimming.'
        },
        correctAnswer: 'C',
        topic: 'Usage of "Know how to" for Abilities/Skills',
        explanation: 'সাঁতার কাটা, গাড়ি চালানো ইত্যাদির মতো কৌশল বা দক্ষতা জানা বোঝাতে ‘know’ ক্রিয়ার পর সরাসরি infinitive বা gerund বসে না; বরং ‘know + how to + base verb’ (knows how to swim) ব্যবহৃত হয়।'
      }
    ]
  },
  {
    id: 19,
    title: 'Model Question 19',
    subtitle: 'Competitive Grammar MCQ - Set 19 (MCQ 201–225)',
    description: 'Analyses plural, heir silent h, United States singular verb, blind in one eye, inverted second conditional, optative indirect speech, and dangling modifiers.',
    totalQuestions: 25,
    questions: [
      {
        id: 1,
        question: 'The plural of “analysis” is—',
        options: {
          A: 'analysises',
          B: 'analyses',
          C: 'analysis',
          D: 'analysi'
        },
        correctAnswer: 'B',
        topic: 'Greek/Latin Noun Plurals (-is → -es)',
        explanation: 'গ্রিক বা ল্যাটিন যেসব বিশেষ্যের শেষে ‘-is’ থাকে (যেমন: analysis, crisis, basis, thesis), সেগুলোর বহুবচনে ‘-is’ পরিবর্তিত হয়ে ‘-es’ হয়। সুতরাং analysis এর plural হলো “analyses”।'
      },
      {
        id: 2,
        question: 'He is ___ heir to the throne.',
        options: {
          A: 'a',
          B: 'an',
          C: 'the',
          D: 'no article'
        },
        correctAnswer: 'B',
        topic: 'Indefinite Article with Silent "H"',
        explanation: '‘Heir’ (উত্তরাধিকারী) শব্দের প্রথম বর্ণ ‘H’ হলেও এটি অনুচ্চারিত থাকে (silent h) এবং উচ্চারণ ভাওয়েল সাউন্ড /eə/ (এয়ার) দিয়ে শুরু হয়। তাই এর পূর্বে ‘an’ বসে।'
      },
      {
        id: 3,
        question: 'The United States ___ a developed country.',
        options: {
          A: 'are',
          B: 'were',
          C: 'is',
          D: 'have'
        },
        correctAnswer: 'C',
        topic: 'Subject-Verb Agreement (Proper Name of Country)',
        explanation: '“The United States” এর নামে ‘States’ বহুবচন রূপ হলেও এটি একটি অবিভাজ্য একক দেশের নাম। কোনো দেশের নাম সর্বদা Singular এবং Singular Verb (“is”) গ্রহণ করে।'
      },
      {
        id: 4,
        question: 'He is blind ___ one eye.',
        options: {
          A: 'in',
          B: 'at',
          C: 'with',
          D: 'on'
        },
        correctAnswer: 'A',
        topic: 'Appropriate Preposition (blind in one eye)',
        explanation: 'শারীরিকভাবে এক চোখে অন্ধ বা দৃষ্টিহীন বোঝাতে ‘blind in one eye’ (বা blind of an eye) বসে। আর কোনো দোষের প্রতি অন্ধ বা উদাসীন বোঝাতে ‘blind to’ বসে।'
      },
      {
        id: 5,
        question: 'Were I you, I ___ accept the proposal.',
        options: {
          A: 'will',
          B: 'would',
          C: 'shall',
          D: 'can'
        },
        correctAnswer: 'B',
        topic: 'Inverted Second Conditional (Were I you...)',
        explanation: '“Were I you” হলো “If I were you” এর ইনভারশন রূপ (Second Conditional)। এর ফলশ্রুতিতে মূল ক্লজে “would/could/might + base verb” (would accept) বসে।'
      },
      {
        id: 6,
        question: 'She ___ here for five years before moving abroad.',
        options: {
          A: 'lived',
          B: 'had lived',
          C: 'has lived',
          D: 'lives'
        },
        correctAnswer: 'B',
        topic: 'Past Perfect Tense for Preceding Duration',
        explanation: 'অতীতে অন্য একটি অতীত ঘটনার (before moving abroad) পূর্ব পর্যন্ত কোনো কাজ দীর্ঘ পাঁচ বছর ধরে চলেছিল বোঝাতে Past Perfect Tense (“had lived”) ব্যবহৃত হয়।'
      },
      {
        id: 7,
        question: '“Someone is knocking at the door.” Passive:',
        options: {
          A: 'The door is being knocked at.',
          B: 'The door was knocked at.',
          C: 'The door has knocked at.',
          D: 'The door is knocked by someone.'
        },
        correctAnswer: 'A',
        topic: 'Passive Voice of Group Verbs in Present Continuous',
        explanation: 'Present Continuous Tense এর passive রূপ: ‘Object (The door) + is being + V3 (knocked at)’। গ্রুপ ভার্বের সাথে থাকা preposition ‘at’ অপরিবর্তিত থাকে এবং অনির্দিষ্ট কর্তাকে (someone) বাদ রাখা যায়।'
      },
      {
        id: 8,
        question: 'He said, “May Allah help you.”',
        options: {
          A: 'He prayed that Allah might help me.',
          B: 'He said Allah may help you.',
          C: 'He told that Allah helped me.',
          D: 'He ordered Allah to help me.'
        },
        correctAnswer: 'A',
        topic: 'Indirect Speech of Optative Sentence',
        explanation: 'স্রষ্টা বা আল্লাহর কাছে প্রার্থনা বোঝালে reporting verb ‘prayed’ হয়, linker হিসেবে ‘that’ বসে এবং reported clause এ ‘Subject (Allah) + might + base verb (help me)’ বসে।'
      },
      {
        id: 9,
        question: '“Each” is a/an—',
        options: {
          A: 'Demonstrative',
          B: 'Distributive pronoun/determiner',
          C: 'Relative pronoun',
          D: 'Reflexive pronoun'
        },
        correctAnswer: 'B',
        topic: 'Classification of Pronouns (Distributive Pronoun)',
        explanation: '‘Each’, ‘every’, ‘either’, ‘neither’ কোনো ব্যক্তি বা বস্তুকে পৃথক বা আলাদাভাবে নির্দেশ করে বলে এদের Distributive Pronoun/Determiner বলা হয়।'
      },
      {
        id: 10,
        question: 'He arrived ___.',
        options: {
          A: 'lately',
          B: 'late',
          C: 'latest',
          D: 'laterly'
        },
        correctAnswer: 'B',
        topic: 'Adverb of Time (late vs lately)',
        explanation: 'বিলম্ব বা দেরিতে আসা বোঝাতে Adverb হিসেবে ‘late’ বসে (“He arrived late”)। আর ‘lately’ অর্থ সম্প্রতি বা ইদানীং (recently)।'
      },
      {
        id: 11,
        question: 'He is obedient ___ his parents.',
        options: {
          A: 'with',
          B: 'to',
          C: 'for',
          D: 'by'
        },
        correctAnswer: 'B',
        topic: 'Appropriate Preposition (obedient to)',
        explanation: 'কারো প্রতি অনুগত বা আজ্ঞাবহ বোঝাতে ‘obedient to’ ব্যবহৃত হয় (যেমন: obedient to his parents)।'
      },
      {
        id: 12,
        question: 'She avoided ___ to him.',
        options: {
          A: 'speak',
          B: 'to speak',
          C: 'speaking',
          D: 'spoke'
        },
        correctAnswer: 'C',
        topic: 'Verbs Followed Exclusively by Gerund (avoid)',
        explanation: '‘Avoid’, ‘enjoy’, ‘mind’, ‘finish’, ‘admit’, ‘deny’ ইত্যাদি ক্রিয়ার পর সর্বদা Gerund (verb + ing: “speaking”) বসে।'
      },
      {
        id: 13,
        question: 'The ___ sun disappeared behind the clouds.',
        options: {
          A: 'setting',
          B: 'set',
          C: 'sets',
          D: 'to set'
        },
        correctAnswer: 'A',
        topic: 'Present Participle as Attributive Adjective',
        explanation: 'সূর্যাস্তের চলমান অবস্থা প্রকাশ করতে Noun “sun” এর পূর্বে Present Participle “setting” (অস্তগামী) Adjective হিসেবে ব্যবহৃত হয়েছে।'
      },
      {
        id: 14,
        question: 'Every man and woman ___ a right to vote.',
        options: {
          A: 'have',
          B: 'has',
          C: 'are having',
          D: 'were'
        },
        correctAnswer: 'B',
        topic: 'Subject-Verb Agreement with "Every"',
        explanation: 'একাধিক Noun ‘and’ দ্বারা যুক্ত হলেও তাদের পূর্বে ‘Every’ বা ‘Each’ থাকলে সমগ্র Subject টি ব্যাকরণগতভাবে Singular হয় এবং Singular Verb (“has”) গ্রহণ করে।'
      },
      {
        id: 15,
        question: '“Bread and butter” is an example of—',
        options: {
          A: 'Compound noun',
          B: 'Abstract noun',
          C: 'Proper noun',
          D: 'Material noun'
        },
        correctAnswer: 'A',
        topic: 'Types of Nouns (Compound Noun)',
        explanation: 'দুই বা ততোধিক শব্দ একত্রিত হয়ে যখন একটি অবিভাজ্য একক ধারণা বা খাদ্যদ্রব্যের নাম প্রকাশ করে, তখন তাকে Compound Noun বলা হয়।'
      },
      {
        id: 16,
        question: 'He is devoid ___ common sense.',
        options: {
          A: 'from',
          B: 'of',
          C: 'with',
          D: 'by'
        },
        correctAnswer: 'B',
        topic: 'Appropriate Preposition (devoid of)',
        explanation: 'কোনো গুণ বা বৈশিষ্ট্য থেকে বঞ্চিত বা শূন্য হওয়া বোঝাতে ‘devoid of’ বসে: “devoid of common sense” (কাণ্ডজ্ঞানহীন)।'
      },
      {
        id: 17,
        question: 'Choose the correctly spelt word.',
        options: {
          A: 'Entrepreneur',
          B: 'Enterpreneur',
          C: 'Entreprenuer',
          D: 'Entreprenure'
        },
        correctAnswer: 'A',
        topic: 'Spelling Rules (Entrepreneur)',
        explanation: 'সঠিক বানান হলো “Entrepreneur” (E-n-t-r-e-p-r-e-n-e-u-r), যার অর্থ উদ্যোক্তা। ফরাসি ভাষার এই শব্দটিতে ‘e-u-r’ সমাপ্তি লক্ষণীয়।'
      },
      {
        id: 18,
        question: 'If you had asked me, I ___ helped you.',
        options: {
          A: 'will have',
          B: 'would have',
          C: 'would',
          D: 'had'
        },
        correctAnswer: 'B',
        topic: 'Third Conditional Sentence',
        explanation: 'If-clause টি Past Perfect (had asked) হলে Main clause এ “would have / could have + V3” (would have helped) বসে। এটি Third Conditional-এর নিয়ম।'
      },
      {
        id: 19,
        question: '“The more you read, the more you learn.” This expresses—',
        options: {
          A: 'Cause',
          B: 'Proportion',
          C: 'Condition only',
          D: 'Contrast'
        },
        correctAnswer: 'B',
        topic: 'Parallel Double Comparatives Expressing Proportion',
        explanation: '“The more... the more...” কাঠামোটি দুটি ঘটনার আনুপাতিক বা সমান্তরাল বৃদ্ধি/হ্রাস (Proportion / Proportional relation) প্রকাশ করে।'
      },
      {
        id: 20,
        question: 'Let us have a cup of tea, ___?',
        options: {
          A: 'will we',
          B: 'shall we',
          C: 'do we',
          D: 'don\'t we'
        },
        correctAnswer: 'B',
        topic: 'Tag Questions with "Let us / Let\'s"',
        explanation: '‘Let us’ বা ‘Let\'s’ দিয়ে শুরু হওয়া প্রস্তাবমূলক Imperative বাক্যের Tag Question সর্বদাই “shall we?” হয়।'
      },
      {
        id: 21,
        question: '“He is too intelligent to make such a mistake.” The meaning is—',
        options: {
          A: 'He is so intelligent that he cannot make such a mistake.',
          B: 'He is very unintelligent.',
          C: 'He always makes such mistakes.',
          D: 'He is intelligent enough to make mistakes.'
        },
        correctAnswer: 'A',
        topic: 'Negative Implication of "too... to"',
        explanation: '‘too + adjective + to-verb’ গঠনটি অন্তরালে নেতিবাচক অর্থ বহন করে। এর অর্থ হলো: “তিনি এতটাই বুদ্ধিমান যে তিনি এমন ভুল করতে পারেন না” (“He is so intelligent that he cannot make such a mistake”)।'
      },
      {
        id: 22,
        question: '“When the sun sets, darkness falls.” The sentence is—',
        options: {
          A: 'Simple',
          B: 'Compound',
          C: 'Complex',
          D: 'Fragment'
        },
        correctAnswer: 'C',
        topic: 'Classification of Sentences (Complex Sentence)',
        explanation: 'বাক্যটিতে একটি Subordinate Adverbial Clause (“When the sun sets”) এবং একটি Principal Clause (“darkness falls”) রয়েছে, তাই এটি Complex Sentence।'
      },
      {
        id: 23,
        question: '“To see is to believe.” The two infinitives function as—',
        options: {
          A: 'Objects',
          B: 'Subjects and complements',
          C: 'Adjectives',
          D: 'Adverbs'
        },
        correctAnswer: 'B',
        topic: 'Syntactic Roles of Infinitives',
        explanation: 'বাক্যটির প্রথম Infinitive “To see” হলো মূল সসীম ক্রিয়া ‘is’ এর Subject এবং দ্বিতীয় Infinitive “to believe” হলো Predicate / Subjective Complement।'
      },
      {
        id: 24,
        question: 'Which sentence contains a dangling modifier?',
        options: {
          A: 'Walking down the road, I saw a bird.',
          B: 'Walking down the road, the trees looked beautiful.',
          C: 'While I was walking, I saw a bird.',
          D: 'I saw a bird while walking.'
        },
        correctAnswer: 'B',
        topic: 'Dangling / Misplaced Modifiers',
        explanation: 'অপশন B-তে “Walking down the road” পার্টিসিপিয়াল ফ্রেজের পর সরাসরি সাবজেক্ট বসেছে “the trees”, যার অর্থ দাঁড়ায় গাছগুলোই রাস্তায় হাঁটছিল। এই ধরণের ভুল মডিফিকেশনকে Dangling Modifier বলে।'
      },
      {
        id: 25,
        question: 'Choose the correct sentence.',
        options: {
          A: 'Neither of them are ready.',
          B: 'Neither of them is ready.',
          C: 'Neither them is ready.',
          D: 'Neither of them were ready.'
        },
        correctAnswer: 'B',
        topic: 'Subject-Verb Agreement (Distributive "Neither of")',
        explanation: '“Neither of + plural pronoun” থাকলেও ব্যাকরণগত সাবজেক্ট হলো ‘Neither’ (দুজনের কেউই না), যা Singular। তাই এর সাথে Singular Verb “is” বসে: “Neither of them is ready”।'
      }
    ]
  },
  {
    id: 20,
    title: 'Model Question 20',
    subtitle: 'Competitive Grammar MCQ - Set 20 (MCQ 226–250)',
    description: 'Luggage uncountable, European vowel sound, news singular, third conditional, factitive passive, more than one, senior to, inversion, and despite vs in spite of.',
    totalQuestions: 25,
    questions: [
      {
        id: 1,
        question: '“Luggage” is—',
        options: {
          A: 'Countable noun',
          B: 'Uncountable noun',
          C: 'Collective noun',
          D: 'Proper noun'
        },
        correctAnswer: 'B',
        topic: 'Classification of Nouns (Uncountable Nouns)',
        explanation: '“Luggage” (যাত্রীদের মালপত্র), ‘baggage’, ‘furniture’ ইত্যাদি সামগ্রিক ধারণা প্রকাশ করে, তাই এরা Uncountable Noun। এদের কোনো প্লুরাল রূপ (luggages) হয় না।'
      },
      {
        id: 2,
        question: 'He is ___ European scholar.',
        options: {
          A: 'an',
          B: 'a',
          C: 'the',
          D: 'no article'
        },
        correctAnswer: 'B',
        topic: 'Indefinite Article with /juː/ sound',
        explanation: '‘European’ শব্দের প্রথম বর্ণ ভাওয়েল ‘E’ হলেও এর উচ্চারণ কনসোনেন্ট গ্লাইড ‘ইউ’ (/juː/) এর মতো হওয়ায় এর পূর্বে ‘an’ না বসে ‘a’ বসে: “a European scholar”।'
      },
      {
        id: 3,
        question: 'The news ___ encouraging.',
        options: {
          A: 'are',
          B: 'were',
          C: 'is',
          D: 'have'
        },
        correctAnswer: 'C',
        topic: 'Nouns Plural in Form but Singular in Meaning',
        explanation: '‘News’ শব্দের শেষে ‘s’ থাকলেও এটি একটি Uncountable Noun এবং এর অর্থ একবচন। তাই এর সাথে সর্বদা Singular Verb (“is”) বসে।'
      },
      {
        id: 4,
        question: 'He has no control ___ his emotions.',
        options: {
          A: 'at',
          B: 'over',
          C: 'for',
          D: 'to'
        },
        correctAnswer: 'B',
        topic: 'Appropriate Preposition (control over)',
        explanation: 'কোনো আবেগ, অনুভূতি বা পরিস্থিতির ওপর কর্তৃত্ব বা নিয়ন্ত্রণ থাকা বোঝাতে ‘control over’ বসে (control over his emotions)।'
      },
      {
        id: 5,
        question: 'If I had seen him, I ___ him.',
        options: {
          A: 'greet',
          B: 'greeted',
          C: 'would greet',
          D: 'would have greeted'
        },
        correctAnswer: 'D',
        topic: 'Third Conditional Sentence',
        explanation: 'If-clause টি Past Perfect (had seen) হলে Main clause এ “would have / could have + V3” (would have greeted) বসে। সুতরাং D সঠিক।'
      },
      {
        id: 6,
        question: 'By the time we arrived, the movie ___.',
        options: {
          A: 'starts',
          B: 'started',
          C: 'had started',
          D: 'has started'
        },
        correctAnswer: 'C',
        topic: 'Past Perfect with "By the time"',
        explanation: 'অতীতে নির্দিষ্ট একটি ঘটনার (we arrived) আগেই অন্য কোনো কাজ সম্পন্ন হয়ে থাকলে ‘By the time + Past Simple, Past Perfect (had started)’ বসে।'
      },
      {
        id: 7,
        question: '“They made him captain.” Passive:',
        options: {
          A: 'He was made captain by them.',
          B: 'He made captain by them.',
          C: 'Captain was made him.',
          D: 'He is made captain by them.'
        },
        correctAnswer: 'A',
        topic: 'Passive Voice with Factitive Object',
        explanation: 'Factitive Object বা পরিপূরক পদ (captain) প্যাসিভ বাক্যের Subject হতে পারে না; মূল ব্যক্তিবাচক Object (him) Subject (He) হয়: “He was made captain by them.”'
      },
      {
        id: 8,
        question: 'He said, “What a beautiful scene!”',
        options: {
          A: 'He exclaimed that it was a very beautiful scene.',
          B: 'He asked what a beautiful scene it was.',
          C: 'He said what beautiful scene.',
          D: 'He told that scene was beautiful.'
        },
        correctAnswer: 'A',
        topic: 'Indirect Speech of Exclamatory Sentences',
        explanation: 'Exclamatory বাক্যকে Indirect করতে: Reporting verb ‘exclaimed that’ হয়, এবং ‘What a/an + adjective + noun’ পরিবর্তিত হয়ে ‘it was a very + adjective + noun’ হয়।'
      },
      {
        id: 9,
        question: '“Whom” is used as—',
        options: {
          A: 'Subjective pronoun only',
          B: 'Objective pronoun',
          C: 'Possessive pronoun',
          D: 'Reflexive pronoun'
        },
        correctAnswer: 'B',
        topic: 'Case of Pronouns (Objective Case)',
        explanation: '‘Who’ হলো Nominative/Subjective case, ‘Whose’ হলো Possessive case, এবং ‘Whom’ হলো Objective/Accusative case pronoun।'
      },
      {
        id: 10,
        question: 'He drives ___.',
        options: {
          A: 'careful',
          B: 'carefully',
          C: 'care',
          D: 'carefulness'
        },
        correctAnswer: 'B',
        topic: 'Adverb of Manner',
        explanation: 'Verb ‘drives’ কীভাবে সম্পন্ন হচ্ছে তা প্রকাশ করতে Adverb of Manner ‘carefully’ প্রয়োজন। Careful হলো Adjective।'
      },
      {
        id: 11,
        question: 'He is addicted ___ drugs.',
        options: {
          A: 'with',
          B: 'to',
          C: 'for',
          D: 'by'
        },
        correctAnswer: 'B',
        topic: 'Appropriate Preposition (addicted to)',
        explanation: 'কোনো ক্ষতিকর অভ্যাস বা নেশায় আসক্ত হওয়া বোঝাতে ‘addicted to’ ব্যবহৃত হয় (যেমন: addicted to drugs/gambling)।'
      },
      {
        id: 12,
        question: 'I cannot afford ___ a new car.',
        options: {
          A: 'buy',
          B: 'buying',
          C: 'to buy',
          D: 'bought'
        },
        correctAnswer: 'C',
        topic: 'Verbs Followed by to-Infinitive (afford to)',
        explanation: '‘Afford’, ‘agree’, ‘decide’, ‘hope’, ‘refuse’, ‘manage’ ইত্যাদি ক্রিয়ার পর সর্বদা to-infinitive (“to buy”) বসে: “cannot afford to buy”。'
      },
      {
        id: 13,
        question: 'The ___ bird was rescued.',
        options: {
          A: 'injuring',
          B: 'injured',
          C: 'injury',
          D: 'injure'
        },
        correctAnswer: 'B',
        topic: 'Past Participle as Attributive Adjective',
        explanation: 'পাখিটি আঘাত পেয়েছিল (passive/completed state), তাই Noun ‘bird’ এর পূর্বে Past Participle “injured” (আহত) Adjective হিসেবে বসেছে।'
      },
      {
        id: 14,
        question: 'More than one student ___ absent.',
        options: {
          A: 'are',
          B: 'were',
          C: 'is',
          D: 'have'
        },
        correctAnswer: 'C',
        topic: 'Subject-Verb Agreement ("More than one" rule)',
        explanation: '“More than one + singular noun” থাকলে ব্যাকরণগতভাবে Verb টি সর্বদা Singular (“is”) হয়। কিন্তু “More students than one” থাকলে Plural Verb (are) হতো।'
      },
      {
        id: 15,
        question: 'Neither of the answers ___ correct.',
        options: {
          A: 'are',
          B: 'is',
          C: 'have',
          D: 'were'
        },
        correctAnswer: 'B',
        topic: 'Subject-Verb Agreement (Neither of + Plural Noun + Singular Verb)',
        explanation: '“Neither of” দ্বারা দুটি উত্তরের একটিও নয় বোঝায়। মূল সাবজেক্ট ‘Neither’ একবচন হওয়ায় এর সাথে Singular Verb “is” বসে।'
      },
      {
        id: 16,
        question: 'He is conversant ___ English.',
        options: {
          A: 'with',
          B: 'to',
          C: 'at',
          D: 'by'
        },
        correctAnswer: 'A',
        topic: 'Appropriate Preposition (conversant with)',
        explanation: 'কোনো ভাষা, বিষয় বা জ্ঞানে সুপরিচিত ও অভিজ্ঞ হওয়া বোঝাতে ‘conversant with’ ব্যবহৃত হয় (conversant with English)।'
      },
      {
        id: 17,
        question: 'Choose the correct spelling.',
        options: {
          A: 'Exaggerate',
          B: 'Exagerrate',
          C: 'Exaggerete',
          D: 'Exagerate'
        },
        correctAnswer: 'A',
        topic: 'Spelling Rules (Exaggerate)',
        explanation: 'সঠিক বানান হলো “Exaggerate” (E-x-a-g-g-e-r-a-t-e), যার অর্থ অতিরঞ্জিত করা বা বাড়িয়ে বলা। এখানে ডাবল ‘g’ (gg) এবং সিঙ্গেল ‘r’ থাকে।'
      },
      {
        id: 18,
        question: 'He talks as though he ___ everything.',
        options: {
          A: 'knows',
          B: 'knew',
          C: 'has known',
          D: 'will know'
        },
        correctAnswer: 'B',
        topic: 'Subjunctive Past with "As Though"',
        explanation: '“As though” বা “as if” এর আগের ক্লজটি Present Indefinite (talks) হলে কাল্পনিক বা অবাস্তব অর্থ প্রকাশে পরবর্তী ক্লজে Past Subjunctive (V2 - knew) ব্যবহৃত হয়।'
      },
      {
        id: 19,
        question: 'Which sentence is correct?',
        options: {
          A: 'He is senior than me.',
          B: 'He is senior to me.',
          C: 'He is senior from me.',
          D: 'He is senior with me.'
        },
        correctAnswer: 'B',
        topic: 'Latin Comparatives with Preposition "to"',
        explanation: 'ল্যাটিন তুলনামূলক শব্দ Senior, Junior, Superior, Inferior ইত্যাদির পর ‘than’ না বসে সর্বদাই Preposition ‘to’ বসে: “He is senior to me” সঠিক।'
      },
      {
        id: 20,
        question: '“No other metal is as useful as iron.” The superlative form is—',
        options: {
          A: 'Iron is more useful than all metals.',
          B: 'Iron is the most useful metal.',
          C: 'Iron is useful than other metals.',
          D: 'Iron is very useful metal.'
        },
        correctAnswer: 'B',
        topic: 'Degree Transformation (Positive to Superlative)',
        explanation: '“No other + singular noun + as... as” যুক্ত Positive বাক্যকে Superlative করতে: ‘Subject (Iron) + verb (is) + the + superlative degree (most useful) + singular noun (metal)’ গঠন প্রযোজ্য।'
      },
      {
        id: 21,
        question: '“He worked hard so that he might succeed.” The clause “so that he might succeed” is—',
        options: {
          A: 'Noun clause',
          B: 'Adjective clause',
          C: 'Adverb clause of purpose',
          D: 'Principal clause'
        },
        correctAnswer: 'C',
        topic: 'Classification of Clauses (Adverb Clause of Purpose)',
        explanation: '‘So that’ (যাতে) দ্বারা কঠোর পরিশ্রম করার উদ্দেশ্য (purpose) ব্যক্ত করা হয়েছে। সুতরাং এটি Adverb Clause of Purpose।'
      },
      {
        id: 22,
        question: 'Choose the correct parallel structure.',
        options: {
          A: 'He likes reading, swimming and to cycle.',
          B: 'He likes reading, swimming and cycling.',
          C: 'He likes to read, swimming and cycling.',
          D: 'He likes reading, to swim and cycling.'
        },
        correctAnswer: 'B',
        topic: 'Parallelism / Parallel Structure',
        explanation: 'একটি তালিকায় থাকা সকল উপাদান একই ব্যাকরণিক গঠনে থাকতে হবে। ‘reading’ ও ‘swimming’ Gerund (v-ing) হওয়ায় তৃতীয় উপাদানটিও Gerund “cycling” হতে হবে।'
      },
      {
        id: 23,
        question: 'Not only did he come, ___ he also helped me.',
        options: {
          A: 'and',
          B: 'but',
          C: 'so',
          D: 'yet'
        },
        correctAnswer: 'B',
        topic: 'Correlative Conjunctions (Not only... but also)',
        explanation: '‘Not only’ এর সাথে জোড়া হিসেবে সর্বদা ‘but also’ (বা but... also) বসে। সুতরাং সঠিক সংযোজক হলো “but”।'
      },
      {
        id: 24,
        question: '“Only then did I understand the truth.” This construction illustrates—',
        options: {
          A: 'Ellipsis',
          B: 'Inversion',
          C: 'Coordination',
          D: 'Apposition'
        },
        correctAnswer: 'B',
        topic: 'Negative/Restrictive Adverbial Inversion',
        explanation: '‘Only then’, ‘Seldom’, ‘Never’, ‘Hardly’ ইত্যাদি সীমাবদ্ধকারী শব্দ যখন জোর দেওয়ার জন্য বাক্যের শুরুতে বসে, তখন Auxiliary Verb সাবজেক্টের পূর্বে চলে আসে (did I understand)। এই গঠনকে Inversion বলা হয়।'
      },
      {
        id: 25,
        question: 'Choose the grammatically correct sentence.',
        options: {
          A: 'Despite of being poor, he is honest.',
          B: 'Despite being poor, he is honest.',
          C: 'In spite being poor, he is honest.',
          D: 'Despite he is poor, he is honest.'
        },
        correctAnswer: 'B',
        topic: 'Prepositions of Concession (Despite vs In spite of)',
        explanation: '‘Despite’ এর পর কখনো ‘of’ বসে না (Despite being poor)। কিন্তু ‘In spite’ ব্যবহার করলে অবশ্যই ‘of’ বসাতে হয় (In spite of being poor)। সুতরাং B সম্পূর্ণ শুদ্ধ।'
      }
    ]
  }
];
