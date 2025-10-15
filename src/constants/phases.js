export const PHASES = [
  {
    name: "월경기",
    range: [1, 5],
    hormones: "에스트로겐과 프로게스테론이 가장 낮은 시기예요.",
    keywords: ["휴식", "위로", "영양"],
    suggestions: {
      body: "부드러운 요가, 온수 목욕, 철분이 풍부한 음식처럼 몸을 편안하게 해주세요.",
      mind: "오늘 몸의 느낌을 일기에 적고 기대감을 내려놓으세요.",
      connection: "에너지 상태를 친구나 동료에게 솔직하게 나눠보세요.",
      food: "부드러운 소고기를 더한 토마토 스튜 한 그릇과 구운 통곡물 빵을 곁들여 체온을 높이고 철분을 채워보세요.",
      music: {
        global: {
          title: "Holocene",
          artist: "Bon Iver",
          description: "잔잔한 기타와 따뜻한 보컬이 오늘을 다독여줄 거예요.",
          url: "https://www.youtube.com/watch?v=TWcyIpul8OE"
        },
        korean: {
          title: "Bye bye my blue",
          artist: "백예린",
          description: "포근한 목소리가 마음을 부드럽게 감싸줘요.",
          url: "https://www.youtube.com/watch?v=8Z1eMy2FO9U"
        }
      }
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
      connection: "협업 미팅이나 만남을 잡기 좋은 시기예요.",
      food: "레몬 허브로 구운 연어와 현미 퀴노아 샐러드를 즐기며 맑은 에너지를 이어가보세요.",
      music: {
        global: {
          title: "Physical",
          artist: "Dua Lipa",
          description: "생동감 넘치는 비트가 집중력과 추진력을 끌어올려줘요.",
          url: "https://www.youtube.com/watch?v=9HDEHj2yzew"
        },
        korean: {
          title: "보라빛 밤 (pporappippam)",
          artist: "선미",
          description: "경쾌한 리듬이 아이디어를 펼치기에 딱 맞는 기운을 전해요.",
          url: "https://www.youtube.com/watch?v=w4cTYnOPdNk"
        }
      }
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
      connection: "데이트, 네트워킹, 모임을 계획하기 딱 좋아요.",
      food: "바질을 올린 모짜렐라 카프레제를 곁들인 상큼한 레몬 파스타로 활력을 만끽해보세요.",
      music: {
        global: {
          title: "Golden",
          artist: "Harry Styles",
          description: "빛나는 리듬이 사교적인 에너지를 더욱 반짝이게 해줘요.",
          url: "https://www.youtube.com/watch?v=P3cffdsEXXw"
        },
        korean: {
          title: "Super Shy",
          artist: "NewJeans",
          description: "산뜻한 비트가 설레는 마음과 어울려 자신감을 북돋워요.",
          url: "https://www.youtube.com/watch?v=ArmDp-zijuc"
        }
      }
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
      connection: "아늑한 모임을 열거나 휴식을 위한 경계를 세우세요.",
      food: "구운 단호박과 시나몬을 곁들인 치킨 허니 글레이즈 볼로 속을 편안히 채워보세요.",
      music: {
        global: {
          title: "Mystery of Love",
          artist: "Sufjan Stevens",
          description: "섬세한 선율이 마음을 차분히 가라앉혀 줘요.",
          url: "https://www.youtube.com/watch?v=KQT32vW61eI"
        },
        korean: {
          title: "한숨",
          artist: "이하이",
          description: "잔잔한 피아노와 목소리가 깊은 숨을 고르게 도와줘요.",
          url: "https://www.youtube.com/watch?v=7Bh9Ud0Ljgk"
        }
      }
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
