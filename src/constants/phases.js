export const PHASES = [
  {
    name: "월경기",
    range: [1, 5],
    hormones: "에스트로겐과 프로게스테론이 가장 낮은 시기예요.",
    keywords: ["휴식", "위로", "영양"],
    suggestions: {
      body: "부드러운 요가, 온수 목욕, 철분이 풍부한 음식처럼 몸을 편안하게 해주세요.",
      mind: "오늘 몸의 느낌을 일기에 적고 기대감을 내려놓으세요.",
      connection: "에너지 상태를 친구나 동료에게 솔직하게 나눠보세요."
    }
  },
  {
    name: "난포기",
    range: [6, 12],
    hormones: "에스트로겐이 상승하며 집중력과 동기가 살아나요.",
    keywords: ["창조", "계획", "확장"],
    suggestions: {
      body: "늘어나는 에너지를 활용해 새로운 운동이나 기술을 시도해보세요.",
      mind: "뇌가 예리할 때 이번 주 목표를 설계해보세요.",
      connection: "협업 미팅이나 만남을 잡기 좋은 시기예요."
    }
  },
  {
    name: "배란기",
    range: [13, 16],
    hormones: "에스트로겐이 최고조, 소량의 테스토스테론이 자신감을 더해줘요.",
    keywords: ["빛남", "교류", "축하"],
    suggestions: {
      body: "사교적인 운동이나 기념 식사를 즐겨보세요.",
      mind: "의사소통이 잘 되는 때, 아이디어를 공유하거나 발표해보세요.",
      connection: "데이트, 네트워킹, 모임을 계획하기 딱 좋아요."
    }
  },
  {
    name: "황체기",
    range: [17, 28],
    hormones: "프로게스테론이 주도하며 에너지는 느려지지만 직감이 깊어져요.",
    keywords: ["뿌리내림", "정리", "안식"],
    suggestions: {
      body: "근력과 스트레칭을 함께하고 마그네슘이 풍부한 레시피를 골라보세요.",
      mind: "진행 중인 프로젝트를 검토하고 마무리를 정리하세요.",
      connection: "아늑한 모임을 열거나 휴식을 위한 경계를 세우세요."
    }
  }
];

export const MOODS = [
  {
    id: "radiant",
    title: "빛나는",
    tone: "햇살",
    affirmation: "오늘 나는 안에서부터 빛나요."
  },
  {
    id: "focused",
    title: "집중하는",
    tone: "차분",
    affirmation: "집중력은 나의 초능력이에요."
  },
  {
    id: "sensitive",
    title: "섬세한",
    tone: "포근",
    affirmation: "느껴지는 모든 파도를 존중해요."
  },
  {
    id: "creative",
    title: "창의적인",
    tone: "유쾌",
    affirmation: "아이디어가 나에게 자유롭게 흘러와요."
  }
];
