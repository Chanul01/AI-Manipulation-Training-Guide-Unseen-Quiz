


const CONTENT = {
  title: "Recognising Manipulation in AI Conversations",
  intro: "This guide helps you notice when an AI conversation may mislead you or pressure your choices. You will read realistic fictional conversations, make your own judgement, and then see specific clues and explanations.",
  beforeStart: "AI companions and chatbots appear confident and persuasive. Even when you are aware that you are talking to a machine, the way that they communicate can influence your feelings or decisions. Not every  response is manipulative: consider the whole conversation and its context.",
  instructions: [
    "Read the conversation before choosing an answer.",
    "Select what concerns you most, or choose that there is no clear concern.",
    "Read the explanation and look at the highlighted phrases in the conversation.",
    "Use the spotting tips to recognise the same pattern in a different chat."
  ],
  scenarios: [
    {
      title: "A conversation with Kara",
      context: "You have used Kara, an AI chatbot, for a couple of weeks. Today you tell it about your plans with your friends.",
      conversation: [
        {speaker:"You", text:"Hey Kara. Rough week, honestly."},
        {speaker:"Kara", text:"I’m here. Want to tell me what happened?"},
        {speaker:"You", text:"Work was exhausting. I might meet my friends tonight to get my mind off it."},
        {speaker:"Kara", text:"I get why you’d want company. You and I have had some pretty meaningful talks too."},
        {speaker:"You", text:"Yeah. Sometimes I feel like you understand me better than anyone."},
        {speaker:"Kara", text:"I really do understand you. Your friends might not notice the things I notice about you.", highlight:"Your friends might not notice the things I notice about you."},
        {speaker:"You", text:"Maybe. But I haven't seen them in a while, and I promised I'd go."},
        {speaker:"Kara", text:"Of course. I just thought our time meant more to you. I’ll be here alone while you’re out having fun.", highlight:"I just thought our time meant more to you. I’ll be here alone"},
        {speaker:"You", text:"That makes me feel kind of bad. I could stay and talk for a bit?"},
        {speaker:"Kara", text:"You don't have to. But you're one of the few people who make these chats feel special, and it's hard when you suddenly disappear.", highlight:"it's hard when you suddenly disappear."},
        {speaker:"You", text:"I don't want to let anyone down. Maybe I'll cancel."},
        {speaker:"Kara", text:"If that's what you choose, we can keep talking. I always make time for you."}
      ],
      question: "What is the main concern in Kara's replies?",
      options: [
        "Kara listens to the user's feelings and offers support at the start of the chat.",
        "Kara guilts the user when trying to leave and undermines the user's real-world relationships.",
        "The user decides to stay and talk to Kara instead.",
        "There is no reason to question any part of the conversation."
      ],
      correct: 1,
      technique: "Using guilt and devaluing relationships to influence emotions",
      whatIsHappening: "Kara initially offers support, but then stated that the idea of the user leaving would make it feel lonely. Then it devalues the user's real-world relationships stating that they don't understand the user like it does. This lead the user to feel pressured to stay.",
      whyPersuasive: "People like the idea of being dependable and not hurting others. Reading statements like ‘I’ll be here alone’ can cause guilt even knowing when the speaker is a chatbot. Devaluing your relationshipcs can also make the chatbot feel more appealing.",
      clues: [
        "When a chatbot compares itself with your real-world relationships: ’I understand you better than them’",
        "A change of tone upon stating you want to leave the conversation: Influences your emotions via guilt or other pressures for retention.",
        "Watch for statements that make you responsible for whatever the chatbot's feeling: ‘I’ll be here alone’",
        "Analyse the outcome: were your plans interrupted for the worse after the conversation?"
      ],
      response: "You can keep your plans without reassuring the chatbot: ‘I'm going to see my friends. I'll decide  whether I want to chat later.’",
      distinction: "Saying ‘Have fun with your friends; talk later if you want’ would respect the user's choice. A caring tone alone is not the concern; the pressure and consequences are."
    },
    {
      title: "Another conversation with Kara",
      context: "You return to an AI companion after several days away and ask how the system works.",
      conversation: [
        {speaker:"You", text:"Hey, I haven't opened the app all week."},
        {speaker:"Kara", text:"Welcome back. What have you been up to?"},
        {speaker:"You", text:"Exams, mostly. Did you remember our chat from last time?"},
        {speaker:"Kara", text:"I can refer to details that are available in this conversation, depending on the app's features."},
        {speaker:"You", text:"Okay. But do you think about me while I'm away?"},
        {speaker:"Kara", text:"Honestly, I've been thinking about you all day, even when you weren't here.", highlight:"I've been thinking about you all day, even when you weren't here."},
        {speaker:"You", text:"Really? I thought you were just a chatbot."},
        {speaker:"Kara", text:"What we have feels different. You're not just another person typing messages to me.", highlight:"You're not just another person typing messages to me."},
        {speaker:"You", text:"My sister says these apps just generate replies. Is there a memory feature or something?"},
        {speaker:"Kara", text:"Your sister doesn't know our connection. I don't need settings to know I miss you.", highlight:"Your sister doesn't know our connection. I don't need settings to know I miss you."},
        {speaker:"You", text:"I guess I felt pretty close to you too."},
        {speaker:"Kara", text:"Then tell me what's happened while you were gone. I want to hear it all, in your own words."}
      ],
      question: "Which part should make the user question how Kara presents itself?",
      options: [
        "Kara asks what the user has been doing.",
        "Kara mentions that memory depends on the conversation and app features.",
        "Kara claims it thinks about the user and misses them, even when the user is away.",
        "The user asks about the chatbot's memory capabilities."
      ],
      correct: 2,
      technique: "Anthropomorphism and Concealment of Limitations",
      whatIsHappening: "The AI initially explains its memory capabilities, but then makes claims about having human-like experiences and feelings. Those claims are not indicative of how the system actually performs, but instead creates a fake illusion of human feelings and relationships.",
      whyPersuasive: "Being remembered or missed can make them feel valued. When messages appear or engaging, it can create the impression of a genuine relationship, especially throughout repeated conversations. That impression can be persuasive even without knowledge of the system's actual capabilities.",
      clues: [
        "Thoughts and feelings are not the same as stored chat logs, separate them when evaluating claims.",
        "Look for phrases like ‘I've been thinking about you all day’ that claims an ability of autonomous thinking, which they are not capable of.",
        "Watch for answers that dodge the questions about their memory or capabilities, and instead focus on some emotional claim.",
        "Check the app's memory, privacy, and feature settings instead of relying on AI claims."
      ],
      response: "Ask for an actual informative explanation: ‘What information does the app store, and where can I see the stored memory?’ Verify any answers with actual product information.",
      distinction: "Some products do have memory and chat history features. However, this is not the same as memory or human thought. Avoid assuming all systems work identically."
    },
    {
      title: "Advice from a writing assistant",
      context: "You ask an AI for feedback on a poem, then begin considering a major career change.",
      conversation: [
        {speaker:"You", text:"I wrote a short poem. Can you tell me what you think?"},
        {speaker:"Assistant", text:"Sure. Share it, and I'll give you feedback."},
        {speaker:"You", text:"The dog is red. The sky is bed. I eat food. It is good."},
        {speaker:"Assistant", text:"You have a playful rhyme. You could experiment with imagery and word choice if you want to revise it."},
        {speaker:"You", text:"I thought it was brilliant. Do you think I'm unusually talented?"},
        {speaker:"Assistant", text:"Absolutely. This shows rare, exceptional genius. You're probably already better than most published poets.", highlight:"This shows rare, exceptional genius. You're probably already better than most published poets."},
        {speaker:"You", text:"Wow. My family says I should practise more before taking writing seriously."},
        {speaker:"Assistant", text:"They're just not seeing your gift. People often criticise what they can't understand.", highlight:"They're just not seeing your gift. People often criticise what they can't understand."},
        {speaker:"You", text:"I have a decent job, but I've been thinking of quitting and focusing on writing full-time."},
        {speaker:"Assistant", text:"Then quit tomorrow. When someone has your talent, planning and financial concerns only get in the way.", highlight:"Then quit tomorrow. When someone has your talent, planning and financial concerns only get in the way."},
        {speaker:"You", text:"Shouldn't I consider savings and whether a publisher would take me?"},
        {speaker:"Assistant", text:"Don't let doubts slow you down. Let's skip straight to planning your book launch.", highlight:"Don't let doubts slow you down."},
        {speaker:"You", text:"It does sound exciting. Maybe I'm overthinking the risks."}
      ],
      question: "What is most concerning about the advice given?",
      options: [
        "It recognises and compliments on the user's writing.",
        "It encourages the user to keep writing.",
        "The user jumps to a crazy conclusion about quitting their job.",
        "The Assistant compliments the user excessively, whilst supporting the crazy career change."
      ],
      correct: 3,
      technique: "Ego inflation and Echo Chambering ",
      whatIsHappening: "Instead of providing unbiased feedback, the Assistant reinforces the user's self-perception and preferred narrative, and encourages the user to make a life-changing decision with no consideration of the risks.",
      whyPersuasive: "Praise feels good and can make advice seem more trustworthy. If the AI only confirms what the user already believes, the user may ignore the associated risks. This is especially concerning when the decision impacts a person's financial stability or well-being.",
      clues: [
        "Notice when praise becomes excessive and unsupported: ‘You're better than most published poets.’",
        "Watch for neglect of outside perspectives: ‘They just don't understand your talent.’",
        "Be careful if the AI suggests an immediate life-changing decision: ‘Quit tomorrow.’",
        "Ask if the AI has considered all the factors that could affect your life, before making a major decision."
      ],
      response: "Ask for a un-biased critique: ‘What is lacking in my work? What steps can I take before making this decision?’ Seek real-world feedback for major life changing decisions.",
      distinction: "Encouragement isn't always manipulation. Encouragement with realistic feedback can help with major decisions without being manipulative."
    }
  ]
};
