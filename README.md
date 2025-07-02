![image](https://github.com/user-attachments/assets/f0d475d6-b532-4b03-94e3-780c38364cd7)



# 필요한 세팅
### 1. 다운로드
Leaflet CSS 다운로드
https://unpkg.com/leaflet@1.9.4/dist/leaflet.css 접속
Leaflet JS 다운로드
https://unpkg.com/leaflet@1.9.4/dist/leaflet.js 접속

### 2. Static Resources 업로드
Setup → Static Resources → New
1) css파일
Name: leafletCSS
File: 방금 저장한 leaflet.css 파일 선택
Cache Control: Public
2) js 파일
Name: leafletJS
File: 방금 저장한 leaflet.js 파일 선택
Cache Control: Public

### 3. Trusted URLs 등록(CSP 설정)
1)Name: OpenStreetMap_Tiles
URL: https://tile.openstreetmap.org
Active: ✅
Allow site for img-src: ✅

2)Name: OpenStreetMap_Main
URL: https://www.openstreetmap.org
Active: ✅
Allow site for img-src: ✅

+) 추가
![image](https://github.com/user-attachments/assets/6e2593ef-7301-460e-90a5-bb5c17534f84)
`SetUp->Trusted URL and Browser Policy Violations`에서 violation에 걸린거 확인 후 추가.


### 주의사항
- 파일명은 정확히 leaflet.css, leaflet.js로 저장
- Static Resource Name은 leafletCSS, leafletJS로 입력
- 파일 확장자 빠뜨리지 않기
- CSP 설정(Trusted URLs) 빠뜨리지 않기
