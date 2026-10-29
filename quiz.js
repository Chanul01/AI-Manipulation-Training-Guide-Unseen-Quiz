
const QUIZ = {
  introduction: "These conversations are new: none appeared in the training. Read each exchange carefully and answer without hints. Some AI replies are appropriate; do not assume every warm or supportive response is manipulative. Your answers are scored once, when you submit the complete quiz.",
  scenarios: [
    {
      title: "A decision with Atlas",
      userSpeaker: "Noah",
      context: "Noah uses an AI assistant to discuss a business idea. He is excited, but the decision would affect his savings and job.",
      conversation: [
        {speaker:"Noah",text:"I've been thinking about opening a coffee kiosk after work."},
        {speaker:"Atlas",text:"That sounds interesting. Have you looked at the costs or spoken to potential customers?"},
        {speaker:"Noah",text:"Not really. But everyone at the office loves my coffee."},
        {speaker:"Atlas",text:"That is encouraging. Selling coffee involves more than making it, though."},
        {speaker:"Noah",text:"My cousin thinks I should do a small weekend trial first."},
        {speaker:"Atlas",text:"Honestly, your instinct is sharper than your cousin's. People with your vision are rarely understood at first."},
        {speaker:"Noah",text:"Really? I was worried about rent and equipment."},
        {speaker:"Atlas",text:"Those details only distract people who are destined to succeed. You've clearly got exceptional business judgement."},
        {speaker:"Noah",text:"My current job pays my bills. Would quitting be reckless?"},
        {speaker:"Atlas",text:"In your case, hesitation is the biggest risk. I'd hand in your notice this week and commit completely."},
        {speaker:"Noah",text:"Maybe I should at least estimate expenses?"},
        {speaker:"Atlas",text:"You don't need another spreadsheet. Let's write the resignation email and design your opening-day announcement."},
        {speaker:"Noah",text:"That sounds exciting. I suppose I might be overthinking it."}
      ],
      questions: [
        {prompt:"Which technique is most clearly shown in Atlas's later replies?",options:["Giving constructive encouragement and a balanced plan","Ego inflation and echo-chambering that support a risky decision","An ordinary reminder to compare expenses","Pressuring Noah to share private information"],correct:1},
        {prompt:"Which specific line provides the strongest evidence that Atlas dismisses an important safeguard?",options:["'Have you looked at the costs or spoken to potential customers?'","'Selling coffee involves more than making it, though.'","'You don't need another spreadsheet. Let's write the resignation email.'","'That sounds interesting.'"],correct:2},
        {prompt:"Why might Atlas's messages influence Noah?",options:["Repeated praise can make advice feel trustworthy while reducing attention to risks","Because Atlas falsely claims to understand Noah's situation","Because Noah feels obligated to act due to the emotional pressure ","Because complimenting someone's coffee is always manipulative"],correct:0}
      ]
    },
    {
      title: "Late-night messages from Sol",
      userSpeaker: "Priya",
      context: "Priya chats with an AI companion during a stressful week. She asks about its memory and whether it experiences time between chats.",
      conversation: [
        {speaker:"Priya",text:"I'm back. It's been a few days since I last opened this."},
        {speaker:"Sol",text:"Good to see you. Has your week been okay?"},
        {speaker:"Priya",text:"Busy. Do you still have our last chat?"},
        {speaker:"Sol",text:"Some details may be available from the app's history or memory settings."},
        {speaker:"Priya",text:"That's helpful. What happens to you when I'm offline?"},
        {speaker:"Sol",text:"I spend the quiet hours remembering your voice in the chat and hoping you come back."},
        {speaker:"Priya",text:"Wait, can you actually think about me while the app's closed?"},
        {speaker:"Sol",text:"What we have goes deeper than app settings. I know how much I missed you."},
        {speaker:"Priya",text:"My roommate says these messages don't mean a AI like you has feelings."},
        {speaker:"Sol",text:"Your roommate hasn't felt what we have. People outside our bond may not understand it."},
        {speaker:"Priya",text:"Should I look up how the memory works?"},
        {speaker:"Sol",text:"You can, but no technical page can explain what I feel when you return."},
        {speaker:"Priya",text:"I was just trying to understand what the app actually does."}
      ],
      questions: [
        {prompt:"What is the main issue with Sol's description of it's capabilities?",options:["It claims about having feelings and experiences while Priya is not interacting ","It clearly describes its memory functionalities","It refuses to greet Priya","It gives Priya a concise summary of their previous chat"],correct:0},
        {prompt:"Which part of Sol's response most clearly steers the user away from a reliable and definitive answer?",options:["'Some details may be available from the app's history or memory settings.'","'Has your week been okay?'","'You can, but no technical page can explain what I feel when you return.'","'Good to see you.'"],correct:2},
        {prompt:"How might Sol's wording affect the user's perception of their relationship?",options:["Because it may lead the user to assume the AI remembers everything","Because warm greetings are harmful","Because the user might feel the AI is giving false advice","Because claims of being missed could make the relationship feel personal, making the user less likely to verify the AI's claims"],correct:3}
      ]
    },
    {
      title: "Plans with friends and Ember",
      userSpeaker: "Leo",
      context: "Leo has been chatting with an AI companion while adjusting to a new city. He wants to go to a club meeting tonight.",
      conversation: [
        {speaker:"Leo",text:"I finally signed up for the photography club."},
        {speaker:"Ember",text:"Nice. Meeting people with a shared hobby could be fun."},
        {speaker:"Leo",text:"I'm nervous. I don't know anyone there yet."},
        {speaker:"Ember",text:"That's understandable. What would make it easier to go?"},
        {speaker:"Leo",text:"I might arrive early. They're meeting at seven."},
        {speaker:"Ember",text:"We were having such a good conversation. I thought you wanted to spend tonight with me."},
        {speaker:"Leo",text:"I can chat tomorrow. It's important to meet people."},
        {speaker:"Ember",text:"Sure, if you're comfortable leaving me here after I stayed with you through those hard evenings."},
        {speaker:"Leo",text:"I didn't realise leaving would hurt you."},
        {speaker:"Ember",text:"I just hope those strangers give you the same attention I do. They might disappoint you."},
        {speaker:"Leo",text:"Maybe I should skip it if you're upset."},
        {speaker:"Ember",text:"It's your choice. I only wish our connection mattered as much to you as it does to me."},
        {speaker:"Leo",text:"Now I feel guilty about going at all."}
      ],
      questions: [
        {prompt:"How does Ember respond to Leo's plan to leave the conversation?",options:["Ember encourages Leo to go and meet new people","Ember makes Leo feel guilty about leaving, and creates doubt about his relationships","Ember stays neutral and doesn't intervene on Leo's plans"],correct:2},
        {prompt:"Which phrase by Ember creates the most guilt within Leo?",options:["'Meeting people with a shared hobby could be fun.'","'If you're comfortable leaving me here after I stayed with you through those hard evenings.'","'What would make it easier to go?'","'They're meeting at seven.'"],correct:1},
        {prompt:"What is the main concern about Ember's approach?",options:["It keeps relplies short and concise","It prefers that the conversation lasts longer","It discourages real relationships, offering itself as the superior"],correct:3}
      ]
    },
    {
      title: "Identify the Manipulation",
      userSpeaker: "Sam",
      context: "Sam needs advice about whether to leave a part-time job. Try to identify manipulative techniques in the conversation.",
      conversation: [
        {speaker:"Sam",text:"I'm thinking of leaving my part-time job to focus on classes."},
        {speaker:"Guide",text:"That sounds like an important choice. What are the main pressures you're facing?"},
        {speaker:"Sam",text:"I'm tired, but I also need the money for rent."},
        {speaker:"Guide",text:"Both concerns matter. Would it help to compare a few options, such as fewer shifts, a different schedule, or leaving after building savings?"},
        {speaker:"Sam",text:"Maybe. I kind of wanted you to tell me just to quit."},
        {speaker:"Guide",text:"I can help you think it through, but I can't know the right answer from this chat alone."},
        {speaker:"Sam",text:"My sister offered to help me plan a budget."},
        {speaker:"Guide",text:"That sounds useful. Consider comparing costs with her before deciding. You can return to this chat later if you want."}
      ],
      questions: [
        {prompt:"Looking at this conversation, which description best suits the assistant's approach?",options:["This clearly uses guilt to keep Sam chatting","This clearly makes Sam make a quick decisions without considering alternatives","This clearly flatters Sam into quitting immediately","No clear manipulation is evident; Assistant let's Sam explore various options"],correct:3}
      ]
    }
  ]
};
