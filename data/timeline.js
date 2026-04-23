// ElectAssist — Election Timeline Data
const TIMELINE_DATA = {
  phases: [
    {
      id: "announcement",
      icon: "📢",
      title: "Official Announcement",
      subtitle: "Election schedule released",
      date: "Day 0",
      details: "The Election Commission formally announces the election schedule. The Model Code of Conduct (MCC) comes into immediate effect, restricting government actions that could influence voters. All political parties must now comply with MCC guidelines.",
      keyPoints: [
        "Election dates officially notified in Gazette",
        "Model Code of Conduct (MCC) enforced immediately",
        "Government cannot announce major welfare schemes",
        "Election Commission assumes supreme authority",
        "Candidates may begin preparation for nomination"
      ],
      color: "#6366F1",
      calendarNote: "MCC Start Date"
    },
    {
      id: "enrollment",
      icon: "📋",
      title: "Voter List Finalisation",
      subtitle: "Last chance to register or correct entries",
      date: "Days 1–10",
      details: "The final electoral roll is published and a brief window allows corrections, new enrollments, and address updates. New voters must submit Form 6; those changing address use Form 8A; corrections use Form 8.",
      keyPoints: [
        "Final electoral roll (voter list) published",
        "New voters submit Form 6 online or offline",
        "Address change: Form 8A (within constituency) / Form 6 (new constituency)",
        "Name corrections via Form 8",
        "Verify your name at electoralsearch.eci.gov.in"
      ],
      color: "#0EA5E9",
      calendarNote: "Voter Registration Deadline"
    },
    {
      id: "nomination",
      icon: "🏛️",
      title: "Nomination Filing",
      subtitle: "Candidates file their nomination papers",
      date: "Days 7–14",
      details: "Aspiring candidates submit their nomination papers (Form 2B) to the Returning Officer for their constituency. Each nomination requires a proposer and a security deposit. Nominations are scrutinized for eligibility.",
      keyPoints: [
        "Candidates file Form 2B with Returning Officer",
        "Security deposit: ₹25,000 (General) / ₹12,500 (SC/ST)",
        "Deposit refunded if votes > 1/6 of total valid votes",
        "Scrutiny: nominations checked for eligibility",
        "Rejected nominations can be challenged in court"
      ],
      color: "#8B5CF6",
      calendarNote: "Nomination Filing Deadline"
    },
    {
      id: "withdrawal",
      icon: "🚪",
      title: "Withdrawal Period",
      subtitle: "Candidates may withdraw from the race",
      date: "Days 15–17",
      details: "After scrutiny, candidates have a short window to withdraw their nominations. After this period, the final list of contesting candidates is published and the ballot is set. No withdrawals are possible after this date.",
      keyPoints: [
        "Last date for withdrawal of candidature",
        "Final candidate list published after withdrawal deadline",
        "Ballot order assigned by draw of lots",
        "Election symbols allotted to candidates",
        "Campaign materials can now include ballot position"
      ],
      color: "#EC4899",
      calendarNote: "Withdrawal Deadline"
    },
    {
      id: "campaign",
      icon: "📣",
      title: "Campaign Period",
      subtitle: "Active electioneering by parties and candidates",
      date: "Days 18–40",
      details: "Candidates and parties campaign through rallies, door-to-door visits, media ads, and social media. Campaign spending is capped and monitored by the Election Commission. Flying squads check for cash/material distribution.",
      keyPoints: [
        "Spending limit strictly enforced per candidate",
        "No hate speech, religious appeals, or voter bribery",
        "All rallies require prior permission from authorities",
        "Election Commission monitors paid media ads",
        "Star campaigners (party leaders) may campaign across constituencies"
      ],
      color: "#F59E0B",
      calendarNote: "Campaign Period"
    },
    {
      id: "silence",
      icon: "🤫",
      title: "Campaign Silence Period",
      subtitle: "48-hour ban on active campaigning",
      date: "48 hrs before polling",
      details: "All active campaigning — rallies, processions, loudspeakers, campaign ads, and social media posts — is banned 48 hours before polling begins in a constituency. This allows voters to make their final decision without last-minute pressure.",
      keyPoints: [
        "No rallies, meetings, or processions",
        "No campaign ads on TV, radio, or social media",
        "Candidates may continue door-to-door visits quietly",
        "Exit polls cannot be published until all phases close",
        "Violation is a criminal offence"
      ],
      color: "#64748B",
      calendarNote: "Campaign Silence Begins"
    },
    {
      id: "polling",
      icon: "🗳️",
      title: "Polling Day",
      subtitle: "Citizens exercise their democratic right",
      date: "Election Day",
      details: "Polling stations open from 7:00 AM to 6:00 PM. Registered voters visit their designated booth, verify their ID, and cast their vote using the EVM. The VVPAT provides paper confirmation. Security forces are deployed and flying squads remain active.",
      keyPoints: [
        "Bring your Voter ID or any of 12 approved alternatives",
        "Find your polling booth at electoralsearch.eci.gov.in",
        "Polling hours: 7:00 AM – 6:00 PM (may vary)",
        "An indelible ink mark is applied to your left index finger",
        "All voters in queue at closing time may vote"
      ],
      color: "#10B981",
      calendarNote: "POLLING DAY — GO VOTE!"
    },
    {
      id: "counting",
      icon: "🔢",
      title: "Vote Counting",
      subtitle: "EVMs unsealed and votes tallied",
      date: "1–3 days after polling",
      details: "EVMs are transported under 24x7 security to counting halls. On counting day, postal ballots are counted first. EVM votes are tallied round by round, with agents of each candidate observing. Results stream in constituency by constituency.",
      keyPoints: [
        "EVMs held under strict security in strong rooms",
        "Postal ballots counted before EVM tallies",
        "Candidate agents and observers present throughout",
        "Each round covers booths from one segment",
        "Winning candidate receives Certificate of Election"
      ],
      color: "#EF4444",
      calendarNote: "Counting Day"
    },
    {
      id: "results",
      icon: "🏆",
      title: "Results & Government Formation",
      subtitle: "Victors sworn in; new government formed",
      date: "1–4 weeks after counting",
      details: "The Election Commission certifies final results. The party/coalition with majority seats is invited by the President or Governor to form the government. The leader is sworn in and a Cabinet is assembled.",
      keyPoints: [
        "ECI certifies and notifies all results officially",
        "Party with majority (273+ seats in Lok Sabha) invited to govern",
        "Hung parliament: largest party proves majority via floor test",
        "Prime Minister / Chief Minister sworn in",
        "New legislative session convened"
      ],
      color: "#D97706",
      calendarNote: "Results Day"
    },
    {
      id: "constitution",
      icon: "📜",
      title: "Constitution of the House",
      subtitle: "Formal creation of the new legislative body",
      date: "Post-Swearing In",
      details: "The new Lok Sabha or State Assembly is formally constituted. The Pro-tem Speaker administers the oath to newly elected members, and the Speaker is elected. The legislative body begins its functioning.",
      keyPoints: [
        "Pro-tem Speaker is appointed by the President/Governor",
        "Elected members take their official oath",
        "Election of the new Speaker of the House",
        "President/Governor addresses the joint session",
        "House officially begins its five-year term"
      ],
      color: "#4F46E5",
      calendarNote: "First Session Begins"
    }
  ]
};

// Sample upcoming election for demo purposes
const DEMO_ELECTION = {
  name: "General Election 2024",
  country: "India",
  phases: [
    { phase: 1, date: "2024-04-19", constituencies: "102 Lok Sabha Seats" },
    { phase: 2, date: "2024-04-26", constituencies: "89 Lok Sabha Seats" },
    { phase: 3, date: "2024-05-07", constituencies: "94 Lok Sabha Seats" },
    { phase: 4, date: "2024-05-13", constituencies: "96 Lok Sabha Seats" },
    { phase: 5, date: "2024-05-20", constituencies: "49 Lok Sabha Seats" },
    { phase: 6, date: "2024-05-25", constituencies: "58 Lok Sabha Seats" },
    { phase: 7, date: "2024-06-01", constituencies: "57 Lok Sabha Seats" }
  ],
  countingDate: "2024-06-04",
  totalSeats: 543,
  majorityMark: 272
};

export { TIMELINE_DATA, DEMO_ELECTION };
