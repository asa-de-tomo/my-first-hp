const calendarTitle = document.querySelector("#calendarTitle");
const calendarDays = document.querySelector("#calendarDays");
const heroSlides = document.querySelectorAll(".hero-slide");
const heroEyebrow = document.querySelector("#heroEyebrow");
const heroTitle = document.querySelector("#heroTitle");
const heroLead = document.querySelector("#heroLead");
const menuModal = document.querySelector("#menuModal");
const modalImage = document.querySelector("#modalImage");
const modalTag = document.querySelector("#modalTag");
const modalTitle = document.querySelector("#modalTitle");
const modalText = document.querySelector("#modalText");
const modalRecommend = document.querySelector("#modalRecommend");
const modalSeason = document.querySelector("#modalSeason");
const modalClose = document.querySelector(".modal-close");

const heroMessages = [
  {
    eyebrow: "Takanabe, Miyazaki",
    title: "ひとくちで、<br />とろける幸せ。",
    lead: "自家栽培いちごの贅沢ジェラート",
  },
  {
    eyebrow: "Fresh Strawberry",
    title: "朝採れの香りを、<br />そのまま。",
    lead: "高鍋の畑から届く、みずみずしい甘酸っぱさ",
  },
  {
    eyebrow: "Shinyama Caffe",
    title: "ミルクと果実が、<br />やさしく重なる。",
    lead: "週末に立ち寄りたくなる、しんやま Caffe の味",
  },
];

const menuDetails = {
  parfait: {
    tag: "季節限定",
    title: "いちごパフェ",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=900&q=85",
    alt: "いちごとクリームを重ねたパフェ",
    text: "完熟いちご、なめらかなクリーム、ひんやりジェラートを重ねた、写真にも残したくなる一皿。いちごの季節に味わいたいご褒美スイーツです。",
    recommend: "いちごをたっぷり楽しみたい方、家族でシェアしたい方に。",
    season: "旬のいちごが入る時期を中心に提供予定",
  },
  gelato: {
    tag: "人気",
    title: "いちごミルクジェラート",
    image: "https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?auto=format&fit=crop&w=900&q=85",
    alt: "カップに盛られたジェラート",
    text: "ミルクのコクに、いちごの甘酸っぱさがふわっと広がる定番人気。ドライブ途中にも食べやすい、軽やかな口どけです。",
    recommend: "初めて来店する方、定番を味わいたい方に。",
    season: "通年目安。仕入れ・営業状況により変更あり",
  },
  jam: {
    tag: "Farm",
    title: "生苺・自家製ジャム",
    image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=900&q=85",
    alt: "みずみずしいいちご",
    text: "畑の恵みをおうちでも楽しめる、生苺と手作りジャム。トーストやヨーグルトに合わせると、朝の時間が少し華やかになります。",
    recommend: "手土産や、おうちカフェ用のお持ち帰りに。",
    season: "旬や在庫状況により店頭で案内",
  },
};

const today = new Date();
const currentYear = today.getFullYear();
const currentMonth = today.getMonth();
const monthLabel = new Intl.DateTimeFormat("ja-JP", {
  year: "numeric",
  month: "long",
}).format(today);

calendarTitle.textContent = monthLabel;

const firstDay = new Date(currentYear, currentMonth, 1);
const lastDay = new Date(currentYear, currentMonth + 1, 0);
const closedWeekdays = new Set([1, 4]);

for (let i = 0; i < firstDay.getDay(); i += 1) {
  const blank = document.createElement("span");
  blank.className = "blank";
  blank.textContent = "-";
  calendarDays.append(blank);
}

for (let day = 1; day <= lastDay.getDate(); day += 1) {
  const date = new Date(currentYear, currentMonth, day);
  const dayNode = document.createElement("span");
  dayNode.textContent = String(day);

  if (closedWeekdays.has(date.getDay())) {
    dayNode.className = "closed";
    dayNode.setAttribute("aria-label", `${day}日 定休日`);
  } else {
    dayNode.setAttribute("aria-label", `${day}日 営業予定`);
  }

  calendarDays.append(dayNode);
}

let activeHeroIndex = 0;

function showHeroSlide(index) {
  heroSlides[activeHeroIndex].classList.remove("is-active");
  activeHeroIndex = index;
  heroSlides[activeHeroIndex].classList.add("is-active");

  const message = heroMessages[activeHeroIndex];
  heroEyebrow.textContent = message.eyebrow;
  heroTitle.innerHTML = message.title;
  heroLead.textContent = message.lead;
}

window.setInterval(() => {
  showHeroSlide((activeHeroIndex + 1) % heroSlides.length);
}, 3800);

document.querySelectorAll(".menu-card").forEach((card) => {
  card.addEventListener("click", () => {
    const detail = menuDetails[card.dataset.menu];
    if (!detail) return;

    modalImage.src = detail.image;
    modalImage.alt = detail.alt;
    modalTag.textContent = detail.tag;
    modalTitle.textContent = detail.title;
    modalText.textContent = detail.text;
    modalRecommend.textContent = detail.recommend;
    modalSeason.textContent = detail.season;
    menuModal.showModal();
  });
});

modalClose.addEventListener("click", () => {
  menuModal.close();
});

menuModal.addEventListener("click", (event) => {
  if (event.target === menuModal) {
    menuModal.close();
  }
});
