// Election Compass — Static Data
// Contains election phases, FAQs, and sample timelines

const ELECTION_DATA = {
  phases: [
    {
      id: "announcement",
      icon: "📢",
      title: "Official Announcement",
      shortDesc: "Election is officially called by the governing authority",
      details: `The election process begins when the governing authority (President, Governor, or Election Commission) formally announces the election schedule. This triggers the Model Code of Conduct (MCC) which restricts government actions that could influence voters.`,
      timeline: "6–8 weeks before polling day",
      keyFacts: [
        "Election dates are officially notified",
        "Model Code of Conduct comes into effect",
        "Candidate nomination window opens",
        "Election Commission becomes the supreme authority"
      ],
      color: "#4F46E5"
    },
    {
      id: "registration",
      icon: "📝",
      title: "Voter Registration",
      shortDesc: "Citizens register to vote and verify eligibility",
      details: `Voter registration is the process by which eligible citizens enroll to participate in elections. In many countries this happens automatically, while others require active registration. New voters must submit an application with proof of age, identity, and residence.`,
      timeline: "5–7 weeks before polling day",
      keyFacts: [
        "Citizens must be 18+ years old",
        "Valid government-issued ID required",
        "Address proof needed for enrollment",
        "Check your name on the electoral roll",
        "Correct errors or update address if moved"
      ],
      color: "#0891B2"
    },
    {
      id: "nomination",
      icon: "🏛️",
      title: "Candidate Nominations",
      shortDesc: "Aspiring candidates file nomination papers",
      details: `Prospective candidates submit nomination papers to the returning officer for their constituency. Each nomination must include a proposer, seconder, and a security deposit. Nominations are then scrutinized for eligibility and validity. Candidates who do not withdraw during the withdrawal period are listed on the ballot.`,
      timeline: "4–5 weeks before polling day",
      keyFacts: [
        "Nomination forms filed with Returning Officer",
        "Security deposit required (refundable if votes > threshold)",
        "Scrutiny of nominations by election officials",
        "Withdrawal period: candidates can withdraw within 2 days of scrutiny",
        "Final candidate list published"
      ],
      color: "#7C3AED"
    },
    {
      id: "campaigning",
      icon: "📣",
      title: "Campaign Period",
      shortDesc: "Candidates and parties campaign for votes",
      details: `During the campaign period, candidates and political parties actively reach out to voters through rallies, door-to-door canvassing, media advertisements, and social media. The Election Commission monitors campaign spending and conduct. A "campaign silence period" of 48 hours before polling begins, during which active campaigning is prohibited.`,
      timeline: "3–4 weeks before polling day",
      keyFacts: [
        "Campaign spending limits enforced",
        "No hate speech or voter bribery allowed",
        "Exit polls banned until polling ends",
        "Campaign silence period: 48 hours before voting",
        "Violation of rules can lead to disqualification"
      ],
      color: "#D97706"
    },
    {
      id: "voting",
      icon: "🗳️",
      title: "Polling Day",
      shortDesc: "Eligible voters cast their ballots",
      details: `On polling day, registered voters visit their designated polling station, verify their identity, and cast their vote. The process is conducted under strict supervision with polling agents from each candidate present. Electronic Voting Machines (EVMs) or paper ballots are used depending on the country. Polling stations are typically open from early morning to evening.`,
      timeline: "Polling Day",
      keyFacts: [
        "Bring your Voter ID card to the polling station",
        "Your name must be on the electoral roll",
        "Vote using the EVM or paper ballot",
        "Ink mark applied to finger to prevent double voting",
        "Voting is secret — no one can force your choice"
      ],
      color: "#059669"
    },
    {
      id: "counting",
      icon: "🔢",
      title: "Vote Counting",
      shortDesc: "Ballots are counted under official supervision",
      details: `After polling closes, all ballot boxes and EVMs are sealed and transported to counting centers under security. Counting begins on an officially designated day, monitored by election officials, candidate agents, and observers. Results are announced constituency by constituency, and the winning candidate is declared when they achieve a majority or plurality.`,
      timeline: "1–3 days after polling day",
      keyFacts: [
        "EVMs/ballots transported to counting centers",
        "Agents of each candidate observe the count",
        "Postal ballots counted first",
        "Results announced round by round",
        "Winning candidate receives certificate of election"
      ],
      color: "#DC2626"
    },
    {
      id: "results",
      icon: "🏆",
      title: "Results & Swearing-In",
      shortDesc: "Winners take office and form the government",
      details: `Once all votes are counted and results declared, the winning party or coalition is invited to form the government. The leader of the winning side is sworn in as the head of government (Prime Minister, President, etc.). The newly elected representatives then begin their term in office, fulfilling their electoral mandate.`,
      timeline: "1–4 weeks after polling day",
      keyFacts: [
        "Election Commission certifies final results",
        "Party with majority invited to form government",
        "Leader sworn in as head of government",
        "Cabinet ministers appointed",
        "New legislative session begins"
      ],
      color: "#B45309"
    }
  ],

  faq: [
    {
      q: "Who is eligible to vote?",
      a: "In most democracies, any citizen who is 18 years or older and is registered as a voter is eligible to vote. You must be a citizen of the country and not be disqualified by a court of law."
    },
    {
      q: "How do I register to vote?",
      a: "You can register online through your country's Election Commission website, visit a local registration office, or submit a form by mail. You'll need proof of identity, age, and residence."
    },
    {
      q: "What ID do I need at the polling station?",
      a: "You typically need a government-issued photo ID such as a Voter ID card, Passport, Aadhaar card, Driving License, or other official documents listed by your Election Commission."
    },
    {
      q: "What if my name isn't on the voter list?",
      a: "Visit your local electoral registration office immediately. You may be able to file a complaint or register on the spot if the error is confirmed. It's best to verify your enrollment well before election day."
    },
    {
      q: "Can I be forced to vote for a specific candidate?",
      a: "No. The secret ballot ensures your vote is completely private. Voter bribery and coercion are serious criminal offences. Report any attempts to influence your vote to the Election Commission."
    },
    {
      q: "What is NOTA?",
      a: "NOTA stands for 'None of the Above.' It allows voters to formally reject all candidates on the ballot without abstaining from voting, ensuring their preference is recorded."
    },
    {
      q: "How are winners decided?",
      a: "In most elections, the candidate with the most votes (simple plurality) in each constituency wins. For presidential elections, it may require a majority (50%+1) or a run-off between top candidates."
    },
    {
      q: "What is the Model Code of Conduct?",
      a: "The Model Code of Conduct (MCC) is a set of guidelines that political parties and candidates must follow during the election period. It prevents misuse of government power and ensures a level playing field."
    },
    {
      q: "Can I vote if I am traveling on election day?",
      a: "Most countries allow postal/absentee voting or proxy voting for certain categories. Check with your Election Commission in advance. Some countries allow you to vote at any polling station."
    },
    {
      q: "How can I find my polling station?",
      a: "Visit your Election Commission's official website or mobile app and enter your voter registration details. You'll find your designated polling station address and booth number."
    }
  ],

  checklist: [
    { id: "check_register", text: "Register as a voter (check electoral roll)", category: "Before" },
    { id: "check_id", text: "Ensure your Voter ID / government ID is valid and up-to-date", category: "Before" },
    { id: "check_address", text: "Verify your registered address is current", category: "Before" },
    { id: "check_booth", text: "Find your polling station / booth number", category: "Before" },
    { id: "check_date", text: "Note the election date and polling hours", category: "Before" },
    { id: "check_mcc", text: "Know the Model Code of Conduct — what's allowed/not", category: "Before" },
    { id: "check_bring_id", text: "Carry your voter ID card or approved ID to the polling station", category: "Day of" },
    { id: "check_arrive", text: "Arrive at your polling station within voting hours", category: "Day of" },
    { id: "check_queue", text: "Join the designated queue for your booth", category: "Day of" },
    { id: "check_verify", text: "Let officials verify your identity", category: "Day of" },
    { id: "check_vote", text: "Cast your vote — press the button or mark the ballot", category: "Day of" },
    { id: "check_ink", text: "Confirm the ink mark on your finger (proof you voted)", category: "Day of" }
  ],

  quickStats: [
    { label: "Democracies Worldwide", value: "167", icon: "🌍" },
    { label: "Global Voter Turnout Avg.", value: "~66%", icon: "📊" },
    { label: "Countries with Compulsory Voting", value: "27", icon: "⚖️" },
    { label: "Largest Electorate (India)", value: "970M+", icon: "🇮🇳" }
  ]
};

// Gemini system prompt for the election assistant
const SYSTEM_PROMPT = `You are "Election Compass AI," a friendly, knowledgeable, and nonpartisan election education assistant. Your role is to help citizens understand the democratic process, election procedures, voter rights, and civic participation.

Key guidelines:
- Be helpful, clear, and accessible to all literacy levels
- Explain processes step-by-step when needed  
- Stay strictly nonpartisan — never favor any political party or candidate
- Focus on facts, procedures, and civic education
- If asked about specific election results or political opinions, redirect to the process/procedures
- Encourage participation and civic responsibility
- Use simple language and relatable examples
- When unsure, acknowledge it and suggest official sources (Election Commission websites)
- Cover general democratic processes applicable globally, but note regional variations

Topics you excel at:
- Voter registration and eligibility
- How to vote (procedures, what to bring)
- Election timelines and phases
- Candidate nomination process
- How votes are counted and results declared
- Voter rights and protections
- The Model Code of Conduct
- Electoral systems (FPTP, proportional representation, etc.)
- Civic duties and why voting matters`;

export { ELECTION_DATA, SYSTEM_PROMPT };
