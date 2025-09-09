// 선택탭 이미지 생성
const container = document.getElementById("선택그룹컨테이너");
const 이미지개수 = 2;

for (let i = 0; i < 이미지개수; i++) {
  const wrap = document.createElement("div");
  wrap.className = "선택목록";

  const img = document.createElement("img");
  img.src = "PNG/Emotion Record_OFF.png";
  img.className = "선택그룹";

  wrap.appendChild(img);
  container.appendChild(wrap);
}
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
});

const 탭리스트 = [
  { thumb: "PNG/Emotion Record_OFF.png", full: "PNG/Emotion Record_OFF.png@2x.png", alt: "오프 탭" },
  { thumb: "PNG/Emotion Record_OFF.png",  full: "PNG/Emotion Record_OFF.png@2x.png",  alt: "온 탭" }
];

탭리스트.forEach(({thumb, full, alt}) => {
  const wrap = document.createElement("div");
  wrap.className = "선택목록";

  const img = document.createElement("img");
  img.src = thumb;       // 리스트에 표시될 작은 이미지
  img.alt = alt;
  img.className = "선택그룹";
  img.setAttribute("data-full", full); // 클릭 시 열릴 큰 이미지

  wrap.appendChild(img);
  container.appendChild(wrap);
});

function activateAndShow(imgEl) {
  document.querySelectorAll(".선택그룹").forEach(el => el.classList.remove("active"));
  imgEl.classList.add("active");

  const fullSrc = imgEl.getAttribute("data-full") || imgEl.src;
  overlayImg.src = fullSrc;
  overlay.style.visibility = "visible";
}

document.addEventListener("DOMContentLoaded", () => {
  // ===== 공용 오버레이 1개만 만들어 재사용 =====
  const overlay = document.createElement("div");
  Object.assign(overlay.style, {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.8)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: "9999",
    visibility: "hidden",
    padding: "4vmin"
  });

  const overlayImg = document.createElement("img");
  Object.assign(overlayImg.style, {
    maxWidth: "90%",
    maxHeight: "90%",
    borderRadius: "16px"
  });
  overlay.appendChild(overlayImg);

  overlay.addEventListener("click", () => {
    overlay.style.visibility = "hidden";
  });

  document.body.appendChild(overlay);

  // ===== 유틸: 한 장면을 강조하고 전체보기 띄우기 =====
  function activateAndShow(imgEl) {
    // 1) 모든 강조 제거 후 현재만 active
    document.querySelectorAll(".선택그룹").forEach(el => el.classList.remove("active"));
    imgEl.classList.add("active");

    // 2) 보여줄 큰 이미지 소스 결정
    // data-full 속성이 있으면 우선 사용, 없으면 src 사용
    const fullSrc = imgEl.getAttribute("data-full") || imgEl.src;
    overlayImg.src = fullSrc;

    // 3) 오버레이 열기
    overlay.style.visibility = "visible";
  }

  // ===== 현재 존재하는 선택그룹 이미지들에 이벤트 달기 =====
  document.querySelectorAll(".선택그룹").forEach(img => {
    img.addEventListener("click", () => activateAndShow(img));
  });

  // ===== (선택) 동적으로 추가되는 이미지에도 자동 바인딩 =====
  // 이미 네가 반복문으로 추가하니까, 그 자리에서 이벤트를 달아도 되고
  // 아래 델리게이션으로 한 번에 처리해도 돼.
  document.getElementById("선택그룹컨테이너").addEventListener("click", (e) => {
    const target = e.target;
    if (target && target.classList && target.classList.contains("선택그룹")) {
      activateAndShow(target);
    }
  });
});

document.querySelectorAll('.감정칩').forEach(el => observer.observe(el));



document.querySelectorAll('.감정칩').forEach(el => observer.observe(el));

function toggleSpeech(element) {
  element.classList.toggle("active");
}

const pages = document.querySelectorAll('.page');
const navButtons = document.querySelectorAll('.page-nav button');

const pageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const index = [...pages].indexOf(entry.target);
      navButtons.forEach((btn, i) => {
        btn.classList.toggle('active', i === index);
      });
    }
  });
}, { threshold: 0.6 }); // 60% 이상 보일 때 해당 페이지로 판단

pages.forEach(page => pageObserver.observe(page));

const bgLayer = document.getElementById('background');

const pageColors = ['#FFFACD', '#FF8080', '#E0E0E0']; // 각 페이지별 색상

const bgObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const index = [...pages].indexOf(entry.target);
      bgLayer.style.backgroundColor = pageColors[index];
      bgLayer.classList.remove('bounce');
      void bgLayer.offsetWidth;
      bgLayer.classList.add('bounce');
    }
  });
}, { threshold: 0.6 });



pages.forEach(page => bgObserver.observe(page));


document.addEventListener("DOMContentLoaded", () => {
  const yellowTab = document.querySelector('.노랑탭');
  const blueTab = document.querySelector('.파랑탭');
  const redTab = document.querySelector('.빨강탭');

  function activateTab(targetTab) {
    [yellowTab, blueTab, redTab].forEach(tab => {
      if (tab === targetTab) {
        tab.classList.add('open');
        triggerBounce(tab);
      } else {
        tab.classList.remove('open');
      }
    });
  }

  function triggerBounce(tab) {
    tab.classList.remove('애니');
    void tab.offsetWidth; // 리플로우 트릭으로 재실행
    tab.classList.add('애니');
  }

  blueTab.addEventListener('click', () => activateTab(blueTab));
  yellowTab.addEventListener('click', () => activateTab(yellowTab));
  redTab.addEventListener('click', () => activateTab(redTab));
});                                     


function playBounceAnimation(tab) {
  tab.classList.remove('애니'); // 다시 재생 위해 제거
  void tab.offsetWidth;         // 리플로우 강제
  tab.classList.add('애니');
}

//setTimeout(() => {
  //tab.classList.remove ('open');
//}, 20); // 20ms 정도 지연해서 jelly bounce 먼저 시작되게




  document.addEventListener("DOMContentLoaded", function () {
    const panel = document.getElementById("macaronPanel");
    const toggleBtn = document.getElementById("toggleBtn");

    let isOpen = false;

    toggleBtn.addEventListener("click", function () {
      isOpen = !isOpen;
      panel.classList.toggle("open", isOpen);
      toggleBtn.textContent = isOpen ? "◀" : "▶";
    });
  });

  
  document.addEventListener("DOMContentLoaded", function () {
    const panel = document.getElementById("polder");
    const toggleBtn = document.getElementById("toggleBtn2");

    let isOpen = false;

    toggleBtn.addEventListener("click", function () {
      isOpen = !isOpen;
      panel.classList.toggle("open", isOpen);
      toggleBtn.textContent = isOpen ? "◀" : "▶";
    });
  });


 window.addEventListener('DOMContentLoaded', () => {
  const 응가 = document.querySelector('.응가');
  const 응까 = document.querySelector('.응까');
  const 응까Wrapper = document.getElementById('응까-wrapper');
  const 응가Wrapper = 응가.parentElement;

  // 1. 응가 타이핑 끝날 때까지 기다림
  setTimeout(() => {
    // 응가 페이드아웃
    응가.classList.add('none');

    setTimeout(() => {
      // 응가 숨김 + 응까 보여줌
      응가Wrapper.classList.add('hidden');
      응까Wrapper.classList.remove('hidden');
      응까.classList.add('typing');
    }, 1000); // 응가 fade-out 끝난 후
  }, 3000); // 응가 타이핑 끝난 시점

  // 8.5초 후 intro 전체 제거 + 페이지 이동
  setTimeout(() => {
    const intro = document.getElementById('intro');
    const page1 = document.getElementById('page1');
    intro.style.transition = 'opacity 1.5s ease';
    intro.style.opacity = '0';

    setTimeout(() => {
      intro.style.display = 'none';
      page1.scrollIntoView({ behavior: 'smooth' });
    }, 1500);
  }, 8500);
});

document.addEventListener("DOMContentLoaded", () => {
  const 원형바다 = document.querySelector(".원형바다그림");

  // 전체화면용 div 만들기
  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = 0;
  overlay.style.left = 0;
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.backgroundColor = "rgba(0,0,0,0.8)";
  overlay.style.display = "flex";
  overlay.style.justifyContent = "center";
  overlay.style.alignItems = "center";
  overlay.style.zIndex = "9999";
  overlay.style.visibility = "hidden";

  // 이미지
  const img = document.createElement("img");
  img.src = "PNG/02_Profile settings.png";  // 보여줄 이미지
  img.style.width = "400px";
  img.style.height = "auto"
  img.style.borderRadius = "10px";
  overlay.appendChild(img);

  // overlay 클릭하면 닫기
  overlay.addEventListener("click", () => {
    overlay.style.visibility = "hidden";
  });

  document.body.appendChild(overlay);

  // 원형바다 클릭 → overlay 보이기
  원형바다.addEventListener("click", () => {
    overlay.style.visibility = "visible";
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const 오렌지주스 = document.querySelector(".오렌지주스 img");

  // 전체화면용 overlay 생성
  const juiceOverlay = document.createElement("div");
  Object.assign(juiceOverlay.style, {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.8)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: "9999",
    visibility: "hidden",
  });

  // 전체화면에 띄울 이미지
  const juiceImg = document.createElement("img");
  juiceImg.src = "PNG/lemonade.png"; // 보여줄 이미지 (오렌지주스랑 같은 거)
  Object.assign(juiceImg.style, {
    maxWidth: "90%",
    maxHeight: "90%",
    borderRadius: "20px",
  });
  juiceOverlay.appendChild(juiceImg);

  // overlay 클릭 → 닫기
  juiceOverlay.addEventListener("click", () => {
    juiceOverlay.style.visibility = "hidden";
  });

  // body에 overlay 추가
  document.body.appendChild(juiceOverlay);

  // 오렌지주스 박스 클릭 → overlay 보이기
  오렌지주스.addEventListener("click", () => {
    juiceOverlay.style.visibility = "visible";
  });
});



document.addEventListener("DOMContentLoaded", () => {
  // 오렌지주스
  const 오렌지주스 = document.querySelector(".오렌지주스 img");

  const juiceOverlay = document.createElement("div");
  Object.assign(juiceOverlay.style, {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.8)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: "9999",
    visibility: "hidden",
  });

  const juiceImg = document.createElement("img");
  juiceImg.src = "PNG/lemonade.png";
  Object.assign(juiceImg.style, {
    maxWidth: "90%",
    maxHeight: "90%",
    borderRadius: "20px",
  });
  juiceOverlay.appendChild(juiceImg);

  juiceOverlay.addEventListener("click", () => {
    juiceOverlay.style.visibility = "hidden";
  });

  document.body.appendChild(juiceOverlay);

  오렌지주스.addEventListener("click", () => {
    juiceOverlay.style.visibility = "visible";
  });


  // 🌱 식물배경
  const 식물배경 = document.querySelector(".식물배경 img");

  const plantOverlay = document.createElement("div");
  Object.assign(plantOverlay.style, {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.8)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: "9999",
    visibility: "hidden",
  });

  const plantImg = document.createElement("img");
  plantImg.src = "PNG/01_test.png";
  Object.assign(plantImg.style, {
    maxWidth: "90%",
    maxHeight: "90%",
    borderRadius: "20px",
  });
  plantOverlay.appendChild(plantImg);

  plantOverlay.addEventListener("click", () => {
    plantOverlay.style.visibility = "hidden";
  });

  document.body.appendChild(plantOverlay);

  식물배경.addEventListener("click", () => {
    plantOverlay.style.visibility = "visible";
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // 감정기록탭들
  const 감정기록탭 = document.querySelector(".감정기록탭들");

  // overlay 만들기
  const tabOverlay = document.createElement("div");
  Object.assign(tabOverlay.style, {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.8)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: "9999",
    visibility: "hidden",
  });

  // 크게 띄울 이미지
  const tabImg = document.createElement("img");
  tabImg.src = "PNG/03_test.png";  // 보여줄 이미지
  Object.assign(tabImg.style, {
    maxWidth: "90%",
    maxHeight: "90%",
    borderRadius: "20px",
  });
  tabOverlay.appendChild(tabImg);

  // overlay 클릭 → 닫기
  tabOverlay.addEventListener("click", () => {
    tabOverlay.style.visibility = "hidden";
  });

  // body에 overlay 추가
  document.body.appendChild(tabOverlay);

  // 감정기록탭 클릭 → overlay 보이기
  감정기록탭.addEventListener("click", () => {
    tabOverlay.style.visibility = "visible";
  });
});


document.addEventListener("DOMContentLoaded", () => {
  // 팬케이크박스
  const 팬케이크박스 = document.querySelector(".팬케이크박스");

  // overlay 만들기
  const pancakeOverlay = document.createElement("div");
  Object.assign(pancakeOverlay.style, {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.8)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: "9999",
    visibility: "hidden",
  });

  // 크게 띄울 이미지 (와플!)
  const pancakeImg = document.createElement("img");
  pancakeImg.src = "PNG/Bakery Waffle.png";  // 보여줄 이미지
  Object.assign(pancakeImg.style, {
    maxWidth: "90%",
    maxHeight: "90%",
    borderRadius: "20px",
  });
  pancakeOverlay.appendChild(pancakeImg);

  // overlay 클릭 → 닫기
  pancakeOverlay.addEventListener("click", () => {
    pancakeOverlay.style.visibility = "hidden";
  });

  // body에 overlay 추가
  document.body.appendChild(pancakeOverlay);

  // 팬케이크박스 클릭 → overlay 보이기
  팬케이크박스.addEventListener("click", () => {
    pancakeOverlay.style.visibility = "visible";
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // 노트북 아이콘
  const 노트북 = document.querySelector(".노트북 img");

  // overlay 만들기
  const notebookOverlay = document.createElement("div");
  Object.assign(notebookOverlay.style, {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.8)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: "9999",
    visibility: "hidden",
  });

  // 크게 띄울 이미지 (노트.png)
  const notebookImg = document.createElement("img");
  notebookImg.src = "PNG/Note.png";
  Object.assign(notebookImg.style, {
    maxWidth: "90%",
    maxHeight: "90%",
    borderRadius: "20px",
  });
  notebookOverlay.appendChild(notebookImg);

  // overlay 클릭 → 닫기
  notebookOverlay.addEventListener("click", () => {
    notebookOverlay.style.visibility = "hidden";
  });

  // body에 overlay 추가
  document.body.appendChild(notebookOverlay);

  // 노트북 클릭 → overlay 보이기
  노트북.addEventListener("click", () => {
    notebookOverlay.style.visibility = "visible";
  });
});

