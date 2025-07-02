![image](https://github.com/user-attachments/assets/f0d475d6-b532-4b03-94e3-780c38364cd7)



# 필요한 세팅
정확한 다운로드 방법
1. Leaflet CSS 다운로드

https://unpkg.com/leaflet@1.9.4/dist/leaflet.css 접속
브라우저에 CSS 코드가 표시됨
Ctrl+A (전체 선택) → Ctrl+C (복사)
메모장이나 VS Code에서 새 파일 생성
Ctrl+V (붙여넣기) 후 leaflet.css로 저장

2. Leaflet JS 다운로드

https://unpkg.com/leaflet@1.9.4/dist/leaflet.js 접속
브라우저에 JavaScript 코드가 표시됨
Ctrl+A → Ctrl+C
새 파일에 붙여넣기 후 leaflet.js로 저장

더 쉬운 방법 (우클릭 저장)
브라우저에서 우클릭 → "다른 이름으로 저장"

CSS 링크에서 우클릭 → "다른 이름으로 링크 저장" → leaflet.css
JS 링크에서 우클릭 → "다른 이름으로 링크 저장" → leaflet.js

Static Resources 업로드
Setup → Static Resources → New

첫 번째 리소스:

Name: leafletCSS
File: 방금 저장한 leaflet.css 파일 선택
Cache Control: Public


두 번째 리소스:

Name: leafletJS
File: 방금 저장한 leaflet.js 파일 선택
Cache Control: Public



주의사항

파일명은 정확히 leaflet.css, leaflet.js로 저장
Static Resource Name은 leafletCSS, leafletJS로 입력
파일 확장자 빠뜨리지 않기
