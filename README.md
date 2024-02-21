
## 💡 서비스 소개
![Untitled (2)](https://github.com/Junikarp/lookatmein/assets/118621835/6d3d44a1-a785-4ff6-b967-083faa222e27)
---

## 손쉽게 상담부터 예약까지, 내 손 안에 성형서비스

> 성형 상담을 위해 병원에 직접 방문하는 것은 시간과 노력이 많이 드는 일입니다.
그래서 저희는 집에서 편안하게 비대면으로 성형 상담을 받고, 원하는 병원을 예약할 수 있는 
웹서비스를 만들었습니다.
이제 직접 병원에 가지 않아도, 화상통화를 통해 전문적인 상담을 받고, 바로 예약까지 할 수 있습니다.
> 

## 🔎 프로젝트 개요

---

### 🤔 이런 사람들을 위해 만들었어요

- 성형이 하고 싶지만 상담을 받기 위해 시간을 투자하기 어려운 사람
- 혼자서 상담 받으러 가기 부담스러운 사람
- 솔직한 후기를 통해 내가 원하는 병원을 선택하고 싶은 사람

### 🗓️ 개발 기간 : 2024.01.08 - 2024.02.16 (6주)

## 🛠️ 기술스택
![Untitled (1)](https://github.com/Junikarp/lookatmein/assets/118621835/6a51a956-5a1b-4c77-bba9-5b6b93006e87)
---


## ⚙️ 아키텍처
![Untitled](https://github.com/Junikarp/lookatmein/assets/118621835/44716b67-a708-43b9-a6b4-f991bc2534f8)

---


### 버전 정보

- Spring : 3.2.1 (gradle 8.5)
- Java 17
- JPA : 6.4.2
- MySQL - 8.0.36
- Python : ??
- nginx: 1.25.3

## 📕 주요기능 및 데모영상

---

- **찜하기 버튼을 통한 병원 즐겨찾기 등록** : 병원 상세 페이지에서 찜하기 하트 버튼을 통해 마이페이지에서 즐겨찾는 병원을 조회할 수 있습니다.
    

https://github.com/Junikarp/lookatmein/assets/118621835/2169f8aa-c935-4955-b30e-a7a4bb52b47a

    
- **채팅을 통한 상담** : webRTC를 통한 채팅 기능으로 병원과 직접 대화를 할 수 있으며, 화상 상담 예약도 실시간으로 잡을 수 있습니다.
    
![채팅 gif 1](https://github.com/Junikarp/lookatmein/assets/118621835/e5288b05-8ae3-495b-8951-018480c3ba5d)

    
- **비대면 성형 상담** : RTC 화상 상담 기능을 통해 어디서든 전문가와 상담할 수 있습니다. 집에서도, 카페에서도 상담이 가능합니다.
    
    [화상 상담.mp4](https://prod-files-secure.s3.us-west-2.amazonaws.com/f87af578-f38a-4c45-b3f1-8b8d92f51a98/53bff06b-3f89-43dd-94f5-4b76d70b842d/%ED%99%94%EC%83%81_%EC%83%81%EB%8B%B4.mp4)
    
- **성형 요청 기능** : 내가 글을 작성하면 병원에서 상담을 요청할 수 있습니다. 내가 작성한 글에 병원이 응답한다면 마이페이지에서 요청을 보내온 병원 목록을 조회할 수 있습니다.
    
    [상담 요청 게시판.mp4](https://prod-files-secure.s3.us-west-2.amazonaws.com/f87af578-f38a-4c45-b3f1-8b8d92f51a98/59b6dc76-d848-4e82-8aa3-5004f88b079f/%EC%83%81%EB%8B%B4_%EC%9A%94%EC%B2%AD_%EA%B2%8C%EC%8B%9C%ED%8C%90.mp4)
    
- **편리한 병원 예약** : 상담을 마친 후, 마음에 드는 병원을 바로 예약할 수 있습니다. 복잡한 절차 없이 몇 번의 클릭으로 예약 완료!
    
    [편리한 병원 예약.mp4](https://prod-files-secure.s3.us-west-2.amazonaws.com/f87af578-f38a-4c45-b3f1-8b8d92f51a98/55acd796-5fac-4a71-9360-65f1b862d8a4/%ED%8E%B8%EB%A6%AC%ED%95%9C_%EB%B3%91%EC%9B%90_%EC%98%88%EC%95%BD.mp4)
    
- **수술 후기 모음** : 수술을 경험한 사람들만이 작성할 수 있는 진솔한 후기를 확인할 수 있습니다.
    
    [시술 후기 보기.mp4](https://prod-files-secure.s3.us-west-2.amazonaws.com/f87af578-f38a-4c45-b3f1-8b8d92f51a98/9fde520c-30d6-40a4-ac07-ea376e2cef61/%EC%8B%9C%EC%88%A0_%ED%9B%84%EA%B8%B0_%EB%B3%B4%EA%B8%B0.mp4)
    

- **얼굴 비대칭 검사** : 사진을 업로드 하면 얼굴 비대칭 검사를 통해 얼마나 대칭이 맞는지 알려드립니다.
    
    [Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/f87af578-f38a-4c45-b3f1-8b8d92f51a98/ed7a41d1-5f8d-4a9b-a4ae-c2fe64573245/Untitled.mp4)
    
- **얼굴 성형 기능** : 룩엣미인에서 제공하는 가상 성형 기능을 통해 성형결과를 예측해 볼 수 있습니다.
    
    (영상)
    

## 📽️ UCC

---

## 👨‍👩‍👧‍👧 개발멤버 소개

---

심규리 : 

박지운 :

오건영 :

권준구 :

김희수 :

박하윤 :
