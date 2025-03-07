const diseaseData = {
    "눈 건강 문제": ["루테인", "지아잔틴", "오메가-3"],
    "관절염": ["글루코사민", "콘드로이틴", "MSM"],
    "골다공증": ["칼슘", "비타민 D", "마그네슘"],
    "빈혈": ["철분", "엽산", "비타민 B12"],
    "고혈압": ["코엔자임 Q10", "오메가-3", "마그네슘"],
    "고지혈증": ["오메가-3", "식이 섬유", "폴리코사놀"],
    "당뇨병": ["크롬", "알파 리포산", "식이 섬유"],
    "간 기능 저하": ["밀크시슬", "아티초크 추출물"],
    "소화 불량": ["프로바이오틱스", "소화 효소"],
    "면역력 저하": ["홍삼", "아연", "비타민 C"],
    "피로": ["비타민 B군", "마카 추출물"],
    "수면 장애": ["멜라토닌", "테아닌", "감태 추출물"],
    "우울증": ["오메가-3", "비타민 D", "엽산"],
    "불안 장애": ["테아닌", "마그네슘", "감태 추출물"],
    "기억력 저하": ["포스파티딜세린", "오메가-3", "은행잎 추출물"],
    "체중 관리": ["가르시니아", "녹차 추출물", "CLA"],
    "피부 건강": ["콜라겐", "비타민 E", "히알루론산"],
    "탈모": ["비오틴", "아연", "쏘팔메토"],
    "전립선 건강": ["쏘팔메토", "아연", "리코펜"],
    "갱년기 증상": ["이소플라본", "감마 리놀렌산", "블랙 코호시"],
    "심혈관 질환": ["오메가-3", "코엔자임 Q10", "폴리코사놀"],
    "호흡기 건강": ["NAC", "프로폴리스", "비타민 C"],
    "알레르기": ["퀘르세틴", "비타민 C", "프로바이오틱스"],
    "변비": ["식이 섬유", "프로바이오틱스", "마그네슘"],
    "설사": ["프로바이오틱스", "아연", "전해질 보충제"],
    "천식": ["오메가-3", "마그네슘", "비타민 D"],
    "치주 질환": ["코엔자임 Q10", "비타민 C", "엽산"],
    "요로 감염": ["크랜베리 추출물", "D-만노스", "프로바이오틱스"],
    "갑상선 기능 저하증": ["요오드", "셀레늄", "아연"],
    "눈의 건조함": ["오메가-3", "비타민 A", "히알루론산"]
};

const confirmBtn = document.getElementById("confirm-btn");
const resultDiv = document.getElementById("result");
const diseaseList = document.getElementById("disease-list");
const promoContainer = document.getElementById("promo-container");

let selectedDiseases = [];

Object.keys(diseaseData).forEach((disease) => {
    const item = document.createElement("div");
    item.textContent = disease;
    item.classList.add("disease-item");

    item.addEventListener("click", () => {
        if (selectedDiseases.includes(disease)) {
            selectedDiseases = selectedDiseases.filter(d => d !== disease);
            item.classList.remove("selected");
        } else if (selectedDiseases.length < 3) {
            selectedDiseases.push(disease);
            item.classList.add("selected");
        } else {
            alert("최대 3개까지 선택할 수 있습니다.");
        }
    });

    diseaseList.appendChild(item);
});

confirmBtn.addEventListener("click", () => {
    if (selectedDiseases.length === 0) {
        resultDiv.innerHTML = "⚠️ 질병을 선택하세요.";
        promoContainer.innerHTML = ""; // 선택창 제거
        return;
    }

    let recommendations = new Set();
    selectedDiseases.forEach(disease => {
        diseaseData[disease].forEach(item => recommendations.add(item));
    });

    resultDiv.innerHTML = 
        `💊 <strong>추천 건강기능식품:</strong><br>${Array.from(recommendations).join(", ")}`;

    // 선택창 생성
    promoContainer.innerHTML = "";
    const promos = [
        { text: "욕실에 아직도 이게 없다고?", url: "https://msearch.shopping.naver.com/search/all?adQuery=%EC%83%A4%EC%9B%8C%ED%97%A4%EB%93%9C&maxPrice=15900&minPrice=15900&naverPay=true&origQuery=%EC%83%A4%EC%9B%8C%ED%97%A4%EB%93%9C&pagingIndex=1&pagingSize=40&productSet=total&query=%EC%83%A4%EC%9B%8C%ED%97%A4%EB%93%9C&sort=rel&spec=M10014548%7CM10773813%20M10014547%7CM10030653&viewType=list" },
        { text: "이것만 있으면 문어는 공짜", url: "https://msearch.shopping.naver.com/search/all?adQuery=%EA%B0%80%EC%8A%B4%EC%9E%A5%ED%99%94&brand=139542&maxPrice=18900&minPrice=18900&naverPay=true&origQuery=%EA%B0%80%EC%8A%B4%EC%9E%A5%ED%99%94&pagingIndex=1&pagingSize=40&productSet=total&query=%EA%B0%80%EC%8A%B4%EC%9E%A5%ED%99%94&sort=rel&viewType=list" },
        { text: "캠핑 필수 아이템", url: "https://msearch.shopping.naver.com/search/all?adQuery=%EC%A0%84%EC%84%A0%EB%A6%B4&coupon=true&maxPrice=19700&minPrice=19700&naverPay=true&origQuery=%EC%A0%84%EC%84%A0%EB%A6%B4&pagingIndex=1&pagingSize=40&productSet=total&query=%EC%A0%84%EC%84%A0%EB%A6%B4&sort=rel&viewType=list" }
    ];

    promos.forEach(promo => {
        const button = document.createElement("button");
        button.textContent = promo.text;
        button.classList.add("promo-button", "blink");
        button.addEventListener("click", () => {
            window.open(promo.url, "_blank");
        });
        promoContainer.appendChild(button);
    });
});
